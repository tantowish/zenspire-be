import { User } from "@prisma/client";
import { CreateDiscussionRequest, DiscussionDetailResponse, DiscussionLikeResponse, DiscussionResponse, UpdateDiscussionRequest, toDiscussionArrayFullResponse, toDiscussionArrayFullResponsePopular, toDiscussionDetailResponse, toDiscussionLikeResponse, toDiscussionResponse } from "../model/discussion-model";
import { Validation } from "../validation/validation";
import { DiscussionValidation } from "../validation/discussion-validation";
import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { UserService } from "./user-service";
import moment from "moment-timezone";
import { DiscussionPopular } from "../types/discussion-types";
import { ExpMapping } from "../util/exp-mapping";

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
        const discussionRequest = Validation.validate(DiscussionValidation.CREATE, req)

        const data = {
            ...discussionRequest,
            user_id: user.id
        }

        const discussion = await prismaClient.discussion.create({
            data: data
        })

        await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                experience_points: {
                    increment: ExpMapping.createDiscussion
                }
            }
        })

        return toDiscussionResponse(discussion)
    }

    static async list(search?: string): Promise<DiscussionResponse[]> {
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
                        experience_points: true,
                        first_name: true,
                        last_name: true,
                        isAnonymous: true,
                    },
                },
            },
            where: search ? {
                OR: [
                  {
                    title: {
                      contains: search, 
                    },
                  },
                  {
                    body: {
                      contains: search, 
                    },
                  },
                ],
              } : undefined,
            orderBy: {
                created_at: 'asc',
            },
        });

        return toDiscussionArrayFullResponse(discussions)
    }

    static async listByUser(user: User, search?: string): Promise<DiscussionResponse[]> {
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
                        experience_points: true,
                        first_name: true,
                        last_name: true,
                        isAnonymous: true,
                    },
                },
            },
            orderBy: {
                updated_at: 'asc',
            },
            where: {
                user_id: user.id,
                ...(search && {
                    OR: [
                        { title: { contains: search } },
                        { body: { contains: search } },
                    ],
                }),
            }
        });

        return toDiscussionArrayFullResponse(discussions)
    }

    static async listLiked(user: User, search?: string): Promise<DiscussionResponse[]> {
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
                        experience_points: true,
                        first_name: true,
                        last_name: true,
                        isAnonymous: true,
                    },
                },
            },
            orderBy: {
                updated_at: 'asc',
            },
            where: {
                discussionLike: {
                    some: {
                        user_id: user.id
                    }
                },
                ...(search && {
                    OR: [
                        { title: { contains: search } },
                        { body: { contains: search } },
                    ],
                }),
            }
        });

        return toDiscussionArrayFullResponse(discussions)
    }

    static async listPopular(): Promise<DiscussionResponse[]> {
        const twoWeeksAgo = moment().subtract(2, 'weeks').toDate();

        let discussions: DiscussionPopular[] = await prismaClient.$queryRaw`
            SELECT d.*, u.first_name, u.last_name, u."isAnonymous",
                (SELECT CAST(COUNT(*) AS INTEGER) FROM comments c WHERE c.discussion_id = d.id) AS comment,
                (SELECT CAST(COUNT(*) AS INTEGER) FROM discussion_likes dl WHERE dl.discussion_id = d.id) AS "discussionLike"
            FROM discussions d
            INNER JOIN users u ON d.user_id = u.id
            WHERE d.updated_at >= ${twoWeeksAgo}
            ORDER BY comment DESC, "discussionLike" DESC, d.updated_at ASC
            LIMIT 1;
            `;

        if (discussions.length === 0) {
            discussions = await prismaClient.$queryRaw`
                SELECT d.*, u.first_name, u.last_name, u."isAnonymous",
                    (SELECT CAST(COUNT(*) AS INTEGER) FROM comment c WHERE c.discussion_id = d.id) AS comment,
                    (SELECT CAST(COUNT(*) AS INTEGER) FROM discussion_like dl WHERE dl.discussion_id = d.id) AS "discussionLike"
                FROM discussion d
                INNER JOIN users u ON d.user_id = u.id
                ORDER BY comment DESC, "discussionLike" DESC, d.updated_at ASC
                LIMIT 1;
                `;
        }

        return toDiscussionArrayFullResponsePopular(discussions)
    }

    static async get(id: number): Promise<DiscussionDetailResponse> {
        if (!id) {
            throw new ResponseErorr(500, "id is invalid")
        }

        const discussion = await prismaClient.discussion.findUnique({
            where: {
                id: id
            },
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
                        experience_points: true,
                        first_name: true,
                        last_name: true,
                        isAnonymous: true,
                    },
                },
                comment: {
                    select: {
                        id: true,
                        user_id: true,
                        discussion_id: true,
                        body: true,
                        created_at: true,
                        updated_at: true,
                        user: {
                            select: {
                                experience_points: true,
                                first_name: true,
                                last_name: true,
                                isAnonymous: true,
                            },
                        },
                    },
                },
            },
        });

        if(!discussion){
            throw new ResponseErorr(404, "Discussion not found")
        }

        return toDiscussionDetailResponse(discussion)
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
    }

    static async like(user: User, id: number): Promise<string> {
        if (!id) {
            throw new ResponseErorr(500, "id is invalid")
        }

        const existingDisscusion = await prismaClient.discussion.findUnique({
            where: {
                id: id,
            },
        });

        if (!existingDisscusion) {
            throw new ResponseErorr(404, "Discussion not found");
        }

        const checkDiscussionLikeExist = await prismaClient.discussionLike.findFirst({
            where: {
                user_id: user.id,
                discussion_id: id
            }
        })

        if(checkDiscussionLikeExist){
            await prismaClient.discussionLike.deleteMany({
                where: {
                    user_id: user.id,
                    discussion_id: id
                }
            })

            return `Berhasil unlike discussion id ${id}`
        }
        else{
            await prismaClient.discussionLike.create({
                data: {
                    user_id: user.id,
                    discussion_id: id
                }
            })

            return `Berhasil like discussion id ${id}`
        }
    }
}
