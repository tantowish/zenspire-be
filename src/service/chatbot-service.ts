import { ChatAI, Prisma, User } from "@prisma/client";
import { ChatbotValidation } from "../validation/chatbot-validation";
import { Validation } from "../validation/validation";
import { ChatMessage, ChatbotResponse, CreateChatbotRequest, toChatbotResponse } from "../model/chatbot-model";
import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { JsonArray, JsonValue } from "@prisma/client/runtime/library";
import { runChatCompletion } from "../util/gemini-generate";

export class ChatbotService {
    static async checkChatbot(user_id: number) {
        let chatbot = await prismaClient.chatAI.findUnique({
            where: {
                user_id: user_id
            }
        })

        if(!chatbot){
            chatbot = await prismaClient.chatAI.create({
                data: {
                    user_id: user_id,
                    history_chat: []
                }
            })
        }

        return chatbot
    }

    static async createResponse(user: User, req: CreateChatbotRequest): Promise<JsonValue>{
        const chatbotRequest = Validation.validate(ChatbotValidation.CREATE, req)

        const chatbot = await this.checkChatbot(user.id)
        
        let historyArray = Array.isArray(chatbot.history_chat) ? chatbot.history_chat : JSON.parse(chatbot.history_chat as string);

        const response = await runChatCompletion(historyArray, chatbotRequest.message)

        historyArray.push({
            role: 'user',
            parts: [{ text: chatbotRequest.message }],
        });

        historyArray.push({
            role: 'model',
            parts: [{ text: response }],
        });

        await prismaClient.chatAI.update({
            where: { user_id: user.id },
            data: { 
                history_chat: historyArray as Prisma.InputJsonValue 
            },
        });

        return {message: response}
    }

    static async get(user: User): Promise<ChatbotResponse>{
        const chatbot = await this.checkChatbot(user.id)

        return toChatbotResponse(chatbot)
    }

    static async getResume(user: User): Promise<JsonValue>{
        const chatbot = await await prismaClient.chatAI.findUnique({
            where: {
                user_id: user.id
            }
        })

        if(!chatbot){
            throw new ResponseErorr(404, "Chatbot not found")
        }

        const historyArray = Array.isArray(chatbot.history_chat) ? chatbot.history_chat : JSON.parse(chatbot.history_chat as string);

        const response = await runChatCompletion(historyArray, "Buatkan analisis untuk user dengan format berikut:\n\npenjelasan keseluruhan hasil percakapan, buat 1 paragraf saja\nKegiatan yang perlu dilakukan :\n- kegiatan 1\n- kegiatan 2\n- seterusnya jika ada\nHal yang perlu dihindari :\n- hindari 1\n hindari 2\n dan seterusnya jika ada")

        await prismaClient.chatAI.update({
            where: { user_id: user.id },
            data: { 
                history_chat: [],
                ai_analisis: response
            },
        });

        return {resume: response}
    }
}