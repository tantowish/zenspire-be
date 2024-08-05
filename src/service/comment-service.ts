import { User } from "@prisma/client";
import { CommentFullResponse, CommentResponse, CreateCommentRequest, UpdateCommentRequest, toCommentArrayFullResponse, toCommentResponse } from "../model/comment-model";
import { ResponseErorr } from "../error/reponse-error";
import { Validation } from "../validation/validation";
import { CommentValidation } from "../validation/comment-validation";
import { prismaClient } from "../app/database";
import { ExpMapping } from "../util/exp-mapping";

export class CommentService {
    static async checkExistingDiscussion(discussionId: number) {
        const existingDisscusion = await prismaClient.discussion.findUnique({
            where: {
                id: discussionId,
            },
        });

        if (!existingDisscusion) {
            throw new ResponseErorr(404, "Discussion not found");
        }
    }

    static async checkExistingComment(user_id: number, commentId: number) {
        const existingComment = await prismaClient.comment.findUnique({
            where: {
                id: commentId,
            },
        });

        if (!existingComment) {
            throw new ResponseErorr(404, "Comment not found");
        }

        if (existingComment.user_id != user_id) {
            throw new ResponseErorr(401, "Unauthorized")
        }

        return existingComment
    }

    static async create(user: User, discussionId: number, req: CreateCommentRequest): Promise<CommentResponse> {
        if (!discussionId) {
            throw new ResponseErorr(500, "discussionId is invalid")
        }

        await this.checkExistingDiscussion(discussionId)

        const commentRequest = Validation.validate(CommentValidation.CREATE, req)

        const data = {
            ...commentRequest,
            user_id: user.id,
            discussion_id: discussionId
        }

        const comment = await prismaClient.comment.create({
            data: data
        })

        await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                experience_points: {
                    increment: ExpMapping.commentDiscussion
                }
            }
        })

        return toCommentResponse(comment)
    }

    static async list(user: User, discussionId: number): Promise<CommentFullResponse[]> {
        if (!discussionId) {
            throw new ResponseErorr(500, "discussionId is invalid")
        }

        await this.checkExistingDiscussion(discussionId)

        const comments = await prismaClient.comment.findMany({
            where: {
                discussion_id: discussionId
            },
            select: {
                id: true,
                user_id: true,
                discussion_id: true,
                body: true,
                created_at: true,
                updated_at: true,
                user: {
                    select : {
                        experience_points: true,
                        first_name: true,
                        last_name: true,
                        isAnonymous: true,
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        return toCommentArrayFullResponse(comments)
    }

    static async get(user: User, discussionId: number, commentId: number): Promise<CommentResponse> {
        if (!discussionId) {
            throw new ResponseErorr(500, "discussionId is invalid")
        }
        if (!commentId) {
            throw new ResponseErorr(500, "commentId is invalid")
        }

        await this.checkExistingDiscussion(discussionId)

        const comment = await this.checkExistingComment(user.id, commentId)

        return toCommentResponse(comment)
    }

    static async update(user: User, req: UpdateCommentRequest): Promise<CommentResponse> {
        if (!req.discussion_id) {
            throw new ResponseErorr(500, "discussionId is invalid")
        }
        
        if (!req.id) {
            throw new ResponseErorr(500, "commentId is invalid")
        }
        

        await this.checkExistingDiscussion(req.discussion_id)

        await this.checkExistingComment(user.id, req.id) 

        const updateRequest = Validation.validate(CommentValidation.UPDATE, req)

        const comment = await prismaClient.comment.update({
            where:{
                id: updateRequest.id
            },
            data: updateRequest
        })

        return toCommentResponse(comment)
    }

    static async delete(user: User, discussionId: number, commentId: number): Promise<CommentResponse> {
        if (!discussionId) {
            throw new ResponseErorr(500, "discussionId is invalid")
        }

        if (!commentId) {
            throw new ResponseErorr(500, "commentId is invalid")
        }

        await this.checkExistingDiscussion(discussionId)

        await this.checkExistingComment(user.id, commentId) 

        const comment = await prismaClient.comment.delete({
            where:{
                id: commentId
            },
        })

        return toCommentResponse(comment)
    }
}