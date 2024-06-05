import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../types/user-request";
import { User } from "@prisma/client";
import { CreateChatbotRequest } from "../model/chatbot-model";
import { ChatbotService } from "../service/chatbot-service";

export class ChatbotController {
    static async createResponse(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateChatbotRequest = req.body as CreateChatbotRequest
            const response = await ChatbotService.createResponse(req.user as User, request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await ChatbotService.get(req.user as User)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async getResume(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await ChatbotService.getResume(req.user as User)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
    static async reset(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await ChatbotService.reset(req.user as User)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
}