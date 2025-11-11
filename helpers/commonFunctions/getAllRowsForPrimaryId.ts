import { prisma } from "../prisma/prisma";
import { tryCatch } from "./tryCatch";

export async function getAllRowsForPrimaryId(id: number) {
    const allRows = await tryCatch(prisma.contact.findMany({
        where: {
            OR: [
                {
                    AND: [
                        {
                            linkPrecedence: "SECONDARY",
                        },
                        {
                            linkedId: id
                        }
                    ]
                },
                {
                    id: id
                }
            ]
        },
        orderBy: {
            createdAt: "asc"
        }
    }))
    return allRows
}
