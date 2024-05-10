import { NextFunction, Response } from "express";
import { UserDataRequest } from "../model/userData-model";
import { UserDataService } from "../service/userData-service";
import { UserRequest } from "../types/user-request";
import { User } from "@prisma/client";

export class UserDataController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UserDataRequest = req.body as UserDataRequest
            const response = await UserDataService.create(req.user as User, request)
            res.status(200).json({
                data: response
            })
        } catch(e) {
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserDataService.get(req.user as User)
            res.status(200).json({
                data: response
            })
        } catch(e) {
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UserDataRequest = req.body as UserDataRequest
            const response = await UserDataService.update(req.user as User, request)
            res.status(200).json({
                data: response
            })
        } catch(e) {
            next(e)
        }
    }
}