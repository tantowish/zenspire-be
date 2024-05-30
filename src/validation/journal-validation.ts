import { Mood } from "@prisma/client";
import { z, ZodType } from "zod";

export class JournalValidation {
    static readonly CREATE: ZodType = z.object({
        mood: z.nativeEnum(Mood),
        title: z.string().min(1).max(100),
        question_1: z.string().min(1),
        question_2: z.string().min(1),
        question_3: z.string().min(1),
        question_4: z.string().min(1),
    })

    static readonly UPDATE: ZodType = z.object({
        id: z.number(),
        mood: z.nativeEnum(Mood),
        title: z.string().min(1).max(100),
        question_1: z.string().min(1),
        question_2: z.string().min(1),
        question_3: z.string().min(1),
        question_4: z.string().min(1),
    })
}   