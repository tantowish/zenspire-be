import { z, ZodType } from "zod";

export class CommentValidation {
    static readonly CREATE: ZodType = z.object({
        body: z.string()
    })

    static readonly UPDATE: ZodType = z.object({
        id: z.number(),
        discussion_id: z.number(),
        body: z.string(),
    })
}