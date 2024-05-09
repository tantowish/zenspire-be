import { Journal, Mood } from "@prisma/client"
import moment from "moment-timezone"
import { timezone } from "../util/timezone"

export type JournalResponse = {
    id: number
    user_id: number
    mood: string
    title: string
    question_1: string
    question_2: string
    question_3?: string
    created_at: string
    updated_at: string
}

export type CreateJournalRequest = {
    mood: Mood
    title: string
    question_1: string
    question_2: string
    question_3?: string
}

export type UpdateJournalRequest = {
    id: number
    mood: Mood
    title: string
    question_1: string
    question_2: string
    question_3?: string
}

export function toJournalResponse(journal: Journal): JournalResponse {
    return {
        id: journal.id,
        user_id: journal.user_id,
        mood: journal.mood,
        title: journal.title,
        question_1: journal.question_1,
        question_2: journal.question_2,
        question_3: journal.question_3!,
        created_at: moment(journal.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
        updated_at: moment(journal.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
    }   
}

export function toJournalArrayResponse(journals: Journal[]): JournalResponse[] {
    return journals.map(journal => ({
        id: journal.id,
        user_id: journal.user_id,
        mood: journal.mood,
        title: journal.title,
        question_1: journal.question_1,
        question_2: journal.question_2,
        question_3: journal.question_3!,
        created_at: moment(journal.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
        updated_at: moment(journal.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
    }));
}