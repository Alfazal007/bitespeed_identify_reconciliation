import type { Request, Response } from "express";
import z from "zod";
import { identifyInputType } from "../helpers/types/zodType";
import { tryCatch } from "../helpers/commonFunctions/tryCatch";
import { prisma } from "../helpers/prisma/prisma";
import { whereClauseReturner } from "../helpers/prisma/queryOptionalParams";
import { contactResponseReturner } from "../helpers/commonFunctions/responseReturner";

export const identifyHandler = async (req: Request, res: Response) => {
    const inputData = req.body
    if (!inputData || (!inputData.email && !inputData.phoneNumber)) {
        return res.status(400).json({
            errors: ["Need atleast email or phoneNumber"]
        })
    }
    const parsedData = identifyInputType.safeParse(inputData)
    if (!parsedData.success) {
        let errors: string[] = []
        let x = z.treeifyError(parsedData.error)
        if (x.properties?.email) {
            errors.push(x.properties?.email.errors[0] as string)
        }
        if (x.properties?.phoneNumber) {
            errors.push(x.properties?.phoneNumber.errors[0] as string)
        }
        return res.status(400).json({
            errors
        })
    }

    let whereClause = whereClauseReturner(parsedData)
    const databaseResults = await tryCatch(prisma.contact.findMany({
        where: whereClause,
        orderBy: {
            createdAt: "asc"
        }
    }))
    if (databaseResults.error) {
        return res.status(500).json({
            errors: ["Issue talking to the database"]
        })
    }

    if (databaseResults.data.length == 0) {
        const newPrimaryRow = await tryCatch(prisma.contact.create({
            data: {
                email: parsedData.data.email || null,
                phoneNumber: parsedData.data.phoneNumber?.toString() || null,
                linkPrecedence: "PRIMARY",
            },
        }))
        if (newPrimaryRow.error) {
            return res.status(500).json({
                errors: ["Issue talking to the database"]
            })
        }
        const responseContact = contactResponseReturner([newPrimaryRow.data])
        return res.status(200).json({
            responseContact
        })
    }

    return res.status(200).json({
        message: "here"
    })
}
