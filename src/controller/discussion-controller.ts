import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../types/user-request"
import { CreateDiscussionRequest } from "../model/discussion-model";
import { DiscussionService } from "../service/discussion-service";
import { User } from "@prisma/client";

export class DiscussionController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateDiscussionRequest = req.body as CreateDiscussionRequest
            const response = await DiscussionService.create(req.user as User, request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
}