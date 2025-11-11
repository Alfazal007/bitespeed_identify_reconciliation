import { z } from "zod"

export const identifyInputType = z.object({
    email: z.email({ error: "Invalid email" }).optional().nullable(),
    phoneNumber: z.string({ error: "Valid phone number should be provided" }).optional().nullable()
})
