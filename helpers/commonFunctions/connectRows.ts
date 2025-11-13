import type { Contact } from "../../generated/prisma/client";
import { prisma } from "../prisma/prisma";
import { tryCatch } from "./tryCatch";

export async function connectRows(rows: Contact[]): Promise<[boolean, number]> {
    if (rows.length == 0) {
        return [true, -1]
    }
    let primaryIds: number[] = []
    for (let row of rows) {
        if (row.linkPrecedence == "PRIMARY") {
            if (!primaryIds.includes(row.id))
                primaryIds.push(row.id)
        } else {
            if (!primaryIds.includes(row.linkedId as number))
                primaryIds.push(row.linkedId as number)
        }
    }
    const allRows = await tryCatch(prisma.contact.findMany({
        where: {
            OR: [
                {
                    linkedId: {
                        in: primaryIds
                    }
                },
                {
                    id: {
                        in: primaryIds
                    }
                }
            ]
        },
        orderBy: {
            createdAt: "asc"
        },
        select: {
            id: true
        }
    }))
    if (allRows.error) {
        return [false, -1]
    }
    const allIdsToUpdate = []
    for (let i = 1; i < allRows.data.length; i++) {
        allIdsToUpdate.push(allRows.data[i]?.id as number)
    }
    const updatedRows = await tryCatch(
        prisma.contact.updateMany({
            data: {
                linkPrecedence: "SECONDARY",
                linkedId: allRows.data[0]?.id as number,
            },
            where: {
                AND: [
                    {
                        id: {
                            not: allRows.data[0]?.id as number,
                        },
                    },
                    {
                        OR: [
                            {
                                linkedId: {
                                    in: allIdsToUpdate,
                                },
                            },
                            {
                                id: {
                                    in: allIdsToUpdate,
                                },
                            },
                        ],
                    },
                ],
            },
        })
    );
    if (updatedRows.error) {
        return [false, -1]
    }
    return [true, allRows.data[0]?.id as number]
}
