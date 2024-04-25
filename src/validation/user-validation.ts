import { z, ZodType } from "zod";

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        password: z.string().min(1).max(255),
        first_name: z.string().min(1).max(255),
        last_name: z.string().min(1).max(255),
        email: z.string().min(1).max(255)
    })

    static readonly LOGIN: ZodType = z.object({
        password: z.string().min(1).max(255),
        email: z.string().min(1).max(255)
    })

    static readonly UPDATE: ZodType = z.object({
        password: z.string().min(1).max(255).optional(),
        first_name: z.string().min(1).max(255).optional(),
        last_name: z.string().min(1).max(255).optional(),
        email: z.string().min(1).max(255).optional(),
        isAnonymous: z.boolean().optional()
    })
}   