import { z } from "zod"

export const identifyInputType = z.object({
    email: z.email({ error: "Invalid email" }).optional(),
    phoneNumber: z.number({ error: "Phone number should be of type number" }).optional()
})
