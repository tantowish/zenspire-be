import { User } from "@prisma/client";
import { CreateJournalRequest, JournalResponse, toJournalResponse } from "../model/journal-model";
import { Validation } from "../validation/validation";
import { JournalValidation } from "../validation/journal-validation";
import { prismaClient } from "../app/database";

export class JournalService {
    static async create(user: User, req: CreateJournalRequest): Promise<JournalResponse> {
        const journalRequest = Validation.validate(JournalValidation.CREATE, req)

        const data = {
            ...journalRequest,
            user_id: user.id 
        }

        const journal = await prismaClient.journal.create({
            data: data
        })

        return toJournalResponse(journal)
    }
}