import { Journal, Mood } from "@prisma/client"

export type JournalResponse = {
    id: number
    user_id: number
    mood: string
    question_1?: string
    question_2?: string
    question_3?: string
    question_4: string
    created_at: Date
    updated_at: Date
}

export type CreateJournalRequest = {
    mood: Mood
    question_1?: string
    question_2?: string
    question_3?: string
    question_4: string
}

export function toJournalResponse(journal: Journal): JournalResponse {
    return {
        id: journal.id,
        user_id: journal.user_id,
        mood: journal.mood,
        question_1: journal.question_1!,
        question_2: journal.question_2!,
        question_3: journal.question_3!,
        question_4: journal.question_4,
        created_at: journal.created_at,
        updated_at: journal.updated_at
    }   
}