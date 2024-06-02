import { ChatAI } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import moment from "moment-timezone";
import { timezone } from "../util/timezone";

export type ChatbotResponse = {
    id: number,
    user_id: number,
    history_chat: JsonValue,
    ai_analisis?: string,
    created_at: string,
    updated_at: string,
}

export type CreateChatbotRequest = {
    message: string
}

export type ChatMessage = {
    role: "user" | "model";
    parts: { text: string }[];
  }

  
export function toChatbotResponse(chat_ai: ChatAI): ChatbotResponse {
    return {
        id: chat_ai.id,
        user_id: chat_ai.user_id,
        history_chat: chat_ai.history_chat,
        ai_analisis: chat_ai.ai_analisis!,
        created_at: moment(chat_ai.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment(chat_ai.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
    }
}