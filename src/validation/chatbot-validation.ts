import { z, ZodType } from "zod";

export class ChatbotValidation {
    static readonly CREATE: ZodType = z.object({
        message: z.string()
    })
}