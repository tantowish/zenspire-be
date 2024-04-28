import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CreateJournalRequest } from "../model/journal-model";
import { JournalService } from "../service/journal-service";
import { User } from "@prisma/client";

export class JournalController {
    static async create(req: UserRequest, res: Response, next: NextFunction){
        try {
            const request: CreateJournalRequest = req.body as CreateJournalRequest
            const response = await JournalService.create(req.user as User, request)
            res.status(200).json({
                data: response
            })
        } catch (e){
            next(e)
        }
    }
}