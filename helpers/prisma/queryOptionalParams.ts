import type z from "zod";

export function whereClauseReturner(parsedData: z.ZodSafeParseSuccess<{
    email?: string | null | undefined;
    phoneNumber?: string | null | undefined;
}>) {
    let res: any = []
    if (parsedData.data?.email) {
        res.push({ email: parsedData.data?.email })
    }
    if (parsedData.data?.phoneNumber) {
        res.push({ phoneNumber: parsedData.data.phoneNumber?.toString() })
    }
    return res
}
