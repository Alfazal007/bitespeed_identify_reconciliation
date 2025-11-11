import type { Request, Response } from "express";
import z from "zod";
import { identifyInputType } from "../helpers/types/zodType";

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

    return res.status(200).json({
        message: "here"
    })
}
