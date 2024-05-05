import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../types/user-request";
import { CreateCommentRequest, UpdateCommentRequest } from "../model/comment-model";
import { CommentService } from "../service/comment-service";
import { User } from "@prisma/client";

export class CommentController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateCommentRequest = req.body as CreateCommentRequest
            const response = await CommentService.create(req.user as User, parseInt(req.params.discussionId), request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await CommentService.list(req.user as User, parseInt(req.params.discussionId))
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await CommentService.get(req.user as User, parseInt(req.params.discussionId), parseInt(req.params.commentId))
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateCommentRequest = req.body as UpdateCommentRequest
            request.id = parseInt(req.params.commentId)
            request.discussion_id = parseInt(req.params.discussionId)
            const response = await CommentService.update(req.user as User, request)
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async delete(req: UserRequest, res: Response, next: NextFunction) {
        try {
            await CommentService.delete(req.user as User, parseInt(req.params.discussionId), parseInt(req.params.commentId))
            res.status(200).json({
                message: "Berhasil menghapus comment"
            })
        } catch (e) {
            next(e)
        }
    }
}