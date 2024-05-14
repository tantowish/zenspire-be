import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../types/user-request"
import { CreateQuisionerRequest } from "../model/quisioner-model"
import { QuisionerService } from "../service/quisioner-service"
import { User } from "@prisma/client"

export class QuisionerController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateQuisionerRequest[] = req.body as CreateQuisionerRequest[]
            const response = await QuisionerService.create(req.user as User, request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await QuisionerService.get(req.user as User)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async getSeverity(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await QuisionerService.getSeverity(req.user as User)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
}