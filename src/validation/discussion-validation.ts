import { z, ZodType } from "zod";

export class DiscussionValidation {
    static readonly CREATE: ZodType = z.object({
        title: z.string().min(1).max(255),
        body: z.string(),
        image: z.string().min(1).max(255).optional(),
    })

    static readonly UPDATE: ZodType = z.object({
        id: z.number(),
        title: z.string().min(1).max(255),
        body: z.string(),
        image: z.string().min(1).max(255).optional(),
    })
}