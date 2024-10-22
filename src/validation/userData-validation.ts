import { Gender } from "@prisma/client";
import { z, ZodType } from "zod";

export class UserDataValidation {
    static readonly REQUEST : ZodType = z.object({
        gender: z.nativeEnum(Gender),
        birthday: z.string(),
        preferences: z.array(z.string())
    })
}   