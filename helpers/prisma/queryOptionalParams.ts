import type z from "zod";

export function whereClauseReturner(parsedData: z.ZodSafeParseResult<{
    email?: string | undefined;
    phoneNumber?: number | undefined;
}>) {
    let res: any = {}
    if (parsedData.data?.email) {
        res.email = parsedData.data?.email
    }
    if (parsedData.data?.phoneNumber) {
        res.phoneNumber = parsedData.data?.phoneNumber.toString()
    }
    return res
}
