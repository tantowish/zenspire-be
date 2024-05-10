import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CreateJournalRequest, UpdateJournalRequest } from "../model/journal-model";
import { JournalService } from "../service/journal-service";
import { User } from "@prisma/client";

export class JournalController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateJournalRequest = req.body as CreateJournalRequest
            const response = await JournalService.create(req.user as User, request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const startDate = new Date(req.query.startDate as string);
            const endDate = new Date(req.query.endDate as string);
            const response = await JournalService.list(req.user as User, startDate, endDate)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await JournalService.get(req.user as User, parseInt(req.params.id))
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateJournalRequest = req.body as UpdateJournalRequest
            request.id = parseInt(req.params.id)
            const response = await JournalService.update(req.user as User, request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async delete(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await JournalService.delete(req.user as User, parseInt(req.params.id))
            res.status(200).json({
                message: "Berhasil menghapus journal"
            })
        } catch (e) {
            next(e)
        }
    }

    static async moodCount(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await JournalService.moodCount(req.user as User)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
}