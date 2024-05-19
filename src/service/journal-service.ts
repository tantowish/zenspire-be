import { Mood, User } from "@prisma/client";
import { CreateJournalRequest, JournalResponse, MoodCountResponse, UpdateJournalRequest, toJournalArrayResponse, toJournalResponse, toMoodCountsResponse } from "../model/journal-model";
import { Validation } from "../validation/validation";
import { JournalValidation } from "../validation/journal-validation";
import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import moment from 'moment-timezone';
import { JournalAIResponse, toJournalAIResponse } from "../model/journalAI-model";
// import { runChatJournal } from "../util/chatgpt-generate";
import { runChatJournal } from "../util/gemini-generate";
import { ExpMapping } from "../util/exp-mapping";

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

        return existingJournal
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

        await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                experience_points: {
                    increment: ExpMapping.createDiscussion
                }
            }
        })

        return toJournalResponse(journal)
    }

    static async list(user: User, startDate: Date, endDate: Date, search?: string): Promise<JournalResponse[]> {
        let journals;
        if(isNaN(startDate.getDate()) || isNaN(endDate.getDate())){
            journals = await prismaClient.journal.findMany({
                where: {
                    user_id: user.id,
                    ...(search && {
                        OR: [
                            { title: { contains: search } },
                        ],
                    }),
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

        const journal = await this.checkExistingJournal(user.id, id)

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

    static async moodCount(user: User): Promise<MoodCountResponse[]> {
        const twoWeeksAgo = moment().subtract(2, 'weeks').toDate();

        const moodCounts = await prismaClient.journal.groupBy({
            by: ['mood'],
            _count: {
                _all: true
            },
            where: {
                user_id: user.id,
                updated_at: {
                gte: twoWeeksAgo
                }
            }
        });

        return toMoodCountsResponse(moodCounts)
    }

    static async journalAI(user: User, id: number): Promise<JournalAIResponse> {
        const journal = await this.checkExistingJournal(user.id, id)

        const checkExistingJournalAI = await prismaClient.journalAI.findUnique({
            where:{
                journal_id: id
            }
        })

        if(checkExistingJournalAI){
            return toJournalAIResponse(checkExistingJournalAI)
        }
        else {
            const response = await runChatJournal(journal.mood, journal.title, journal.question_1, journal.question_2, journal.question_3)

            const journalAI = await prismaClient.journalAI.create({
                data:{
                    journal_id: id,
                    body: response
                }
            })

            return toJournalAIResponse(journalAI)
        }
    }

    static async updateJournalAI(user: User, id: number): Promise<JournalAIResponse> {
        const journal = await this.checkExistingJournal(user.id, id)

        const checkExistingJournalAI = await prismaClient.journalAI.findUnique({
            where:{
                journal_id: id
            }
        })

        if(!checkExistingJournalAI) {
            throw new ResponseErorr(404, "Journal AI not found")
        }

        const response = await runChatJournal(journal.mood, journal.title, journal.question_1, journal.question_2, journal.question_3)

        const journalAI = await prismaClient.journalAI.update({
            where:{
                journal_id: id
            },
            data:{
                body: response
            }
        })

        return toJournalAIResponse(journalAI)
    }
}