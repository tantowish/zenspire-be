import { User } from "@prisma/client";
import { CreateDiscussionRequest, DiscussionResponse, UpdateDiscussionRequest, toDiscussionArrayFullResponse, toDiscussionResponse } from "../model/discussion-model";
import { Validation } from "../validation/validation";
import { DiscussionValidation } from "../validation/discussion-validation";
import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { UserService } from "./user-service";

export class DiscussionService {
    static async checkExistingDiscussion(user_id: number, id: number) {
        const existingDisscusion = await prismaClient.discussion.findUnique({
            where: {
                id: id,
            },
        });

        if (!existingDisscusion) {
            throw new ResponseErorr(404, "Discussion not found");
        }

        if (existingDisscusion.user_id != user_id) {
            throw new ResponseErorr(401, "Unauthorized")
        }
    }

    static async create(user: User, req: CreateDiscussionRequest): Promise<DiscussionResponse> {
        const discussionResponse = Validation.validate(DiscussionValidation.CREATE, req)

        const data = {
            ...discussionResponse,
            user_id: user.id
        }

        const discussion = await prismaClient.discussion.create({
            data: data
        })

        return toDiscussionResponse(discussion)
    }

    static async list(): Promise<DiscussionResponse[]> {
        const discussions = await prismaClient.discussion.findMany({
            select: {
                id: true,
                user_id: true,
                title: true,
                body: true,
                image: true,
                created_at: true,
                updated_at: true,
                _count: {
                    select: {
                        comment: true,
                        discussionLike: true,
                    },
                },
                user: {
                    select: {
                        first_name: true,
                        last_name: true,
                        isAnonymous: true,
                    },
                },
            },
            orderBy: {
                created_at: 'asc',
            },
        });

        return toDiscussionArrayFullResponse(discussions)
    }

    static async listByUser(user: User): Promise<DiscussionResponse[]> {
        await UserService.checkUserExist(user.email)

        const discussions = await prismaClient.discussion.findMany({
            select: {
                id: true,
                user_id: true,
                title: true,
                body: true,
                image: true,
                created_at: true,
                updated_at: true,
                _count: {
                    select: {
                        comment: true,
                        discussionLike: true,
                    },
                },
                user: {
                    select: {
                        first_name: true,
                        last_name: true,
                        isAnonymous: true,
                    },
                },
            },
            orderBy: {
                created_at: 'asc',
            },
            where: {
                user_id: user.id
            }
        });

        return toDiscussionArrayFullResponse(discussions)
    }

    static async update(user: User, req: UpdateDiscussionRequest): Promise<DiscussionResponse> {
        if (!req.id) {
            throw new ResponseErorr(500, "id is invalid")
        }

        const updateRequest = Validation.validate(DiscussionValidation.UPDATE, req)

        await this.checkExistingDiscussion(user.id, updateRequest.id)

        const discussion = await prismaClient.discussion.update({
            where: {
                id: updateRequest.id
            },
            data: updateRequest
        })

        return toDiscussionResponse(discussion)
    }

    static async delete(user: User, id: number): Promise<DiscussionResponse> {
        if (!id) {
            throw new ResponseErorr(500, "id is invalid")
        }

        await this.checkExistingDiscussion(user.id, id)

        const discussion = await prismaClient.discussion.delete({
            where: {
                id: id
            }
        })

        return toDiscussionResponse(discussion)
    }}