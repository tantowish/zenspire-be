import { User } from "@prisma/client";
import { CreateJournalRequest, JournalResponse, UpdateJournalRequest, toJournalArrayResponse, toJournalResponse } from "../model/journal-model";
import { Validation } from "../validation/validation";
import { JournalValidation } from "../validation/journal-validation";
import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import moment from 'moment-timezone';


export class JournalService {
    static async checkExistingJournal(user_id: number, id: number) {
        const existingJournal = await prismaClient.journal.findUnique({
            where: {
                id: id,
            },
        });

        if (!existingJournal) {
            throw new ResponseErorr(404, "Journal not found");
        }

        if (existingJournal.user_id != user_id) {
            throw new ResponseErorr(401, "Unauthorized")
        }
    }

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

    static async list(user: User, startDate: Date, endDate: Date): Promise<JournalResponse[]> {
        let journals;
        console.log(startDate, endDate)
        if(isNaN(startDate.getDate()) || isNaN(endDate.getDate())){
            journals = await prismaClient.journal.findMany({
                where: {
                    user_id: user.id
                }
            })
        }
        else{
            const indonesiaTimeZone = 'Asia/Jakarta';
      
            const utcStartDate = moment.tz(startDate, indonesiaTimeZone).utc().startOf('day').toDate();
            const utcEndDate = moment.tz(endDate, indonesiaTimeZone).utc().endOf('day').toDate();
          
            journals = await prismaClient.journal.findMany({
              where: {
                user_id: user.id,
                created_at: {
                  gte: utcStartDate,
                  lte: utcEndDate,
                },
              },
            });
        }
        return toJournalArrayResponse(journals)
    }

    static async get(user: User, id: number): Promise<JournalResponse> {
        if (!id) {
            throw new ResponseErorr(500, "id is invalid")
        }

        const journal = await prismaClient.journal.findUnique({
            where: {
                id: id
            }
        })

        if (!journal) {
            throw new ResponseErorr(404, "Journal not found")
        }

        if (journal.user_id != user.id) {
            throw new ResponseErorr(401, "Unauthorized")
        }

        return toJournalResponse(journal)
    }

    static async update(user: User, req: UpdateJournalRequest): Promise<JournalResponse> {
        if (!req.id) {
            throw new ResponseErorr(500, "id is invalid")
        }

        const updateRequest = Validation.validate(JournalValidation.UPDATE, req)

        await this.checkExistingJournal(user.id, updateRequest.id)

        const journal = await prismaClient.journal.update({
            where: {
                id: updateRequest.id
            },
            data: updateRequest
        })

        return toJournalResponse(journal)
    }

    static async delete(user: User, id: number): Promise<JournalResponse> {
        if (!id) {
            throw new ResponseErorr(500, "id is invalid")
        }

        await this.checkExistingJournal(user.id, id)

        const journal = await prismaClient.journal.delete({
            where: {
                id: id
            }
        })

        return toJournalResponse(journal)
    }
}