import { Mood } from "@prisma/client";
import { z, ZodType } from "zod";

export class JournalValidation {
    static readonly CREATE: ZodType = z.object({
        mood: z.nativeEnum(Mood),
        question_1: z.string().optional(),
        question_2: z.string().optional(),
        question_3: z.string().optional(),
        question_4: z.string(),
    })
}   