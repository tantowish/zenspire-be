import { JournalAI } from "@prisma/client"
import moment from "moment-timezone"
import { timezone } from "../util/timezone"

export type JournalAIResponse = {
    id: number
    journal_id: number
    body: string
    created_at: string
    updated_at: string
}

export function toJournalAIResponse(journalAI: JournalAI): JournalAIResponse {
    return {
        id: journalAI.id,
        journal_id: journalAI.id,
        body: journalAI.body,
        created_at: moment(journalAI.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
        updated_at: moment(journalAI.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
    }
}