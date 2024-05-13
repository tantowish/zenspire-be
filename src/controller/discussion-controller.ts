import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../types/user-request"
import { CreateDiscussionRequest, UpdateDiscussionRequest } from "../model/discussion-model";
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

    static async list(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await DiscussionService.list(req.query.search as string)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async listByUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await DiscussionService.listByUser(req.user as User, req.query.search as string)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async listPopular(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await DiscussionService.listPopular()
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async listLiked(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await DiscussionService.listLiked(req.user as User, req.query.search as string)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await DiscussionService.get(parseInt(req.params.id))
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateDiscussionRequest = req.body as UpdateDiscussionRequest
            request.id = parseInt(req.params.id)
            const response = await DiscussionService.update(req.user as User, request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async delete(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await DiscussionService.delete(req.user as User, parseInt(req.params.id))
            res.status(200).json({
                message: "Berhasil menghapus diskusi"
            })
        } catch (e) {
            next(e)
        }
    }

    static async like(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await DiscussionService.like(req.user as User, parseInt(req.params.id))
            res.status(200).json({
                message: response
            })
        } catch (e) {
            next(e)
        }
    }
    
}