import { Prisma, User } from "@prisma/client";
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

    static async list(user: User, category: string[], search?: string): Promise<DiscussionResponse[]> {
        let discussions
        console.log(category)
        if(category?.length>0){
            const orConditions = [];
        
            if (search) {
                orConditions.push(
                    { title: { contains: search } },
                    { body: { contains: search } }
                );
            }
        
            const whereCondition: any = {};
        
            if (orConditions.length > 0) {
                whereCondition.OR = orConditions;
            }
        
            if (category && category.length > 0) {
                whereCondition.category = { hasSome: category };
            }
        
            discussions = await prismaClient.discussion.findMany({
                select: {
                    id: true,
                    user_id: true,
                    title: true,
                    category: true,
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
                where: Object.keys(whereCondition).length > 0 ? whereCondition : undefined,
                orderBy: {
                    created_at: 'desc',
                },
            });
        } else {
            const categoryPreferences = await prismaClient.userData.findUnique({
                select: {
                    preferences: true
                },
                where:{
                    user_id: user.id
                }
            })
            const userPreferences = categoryPreferences?.preferences ? categoryPreferences?.preferences : []
            console.log(categoryPreferences?.preferences)
            const prefCategory = await prismaClient.discussion.findMany({
                select: {
                    id: true,
                    user_id: true,
                    title: true,
                    category: true,
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
                where: {
                    category: {
                        hasSome: userPreferences,
                    },
                },
                orderBy: {
                    created_at: 'desc',
                },
            });

            const notPrefCategory = await prismaClient.discussion.findMany({
                select: {
                    id: true,
                    user_id: true,
                    title: true,
                    category: true,
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
                where: {
                    NOT: {
                        category: {
                            hasSome: userPreferences,
                        },
                    },
                },
                orderBy: {
                    created_at: 'desc',
                },
            });

            discussions = [...prefCategory, ...notPrefCategory]
        }
    
        return toDiscussionArrayFullResponse(discussions);
    }    

    static async listByUser(user: User, search?: string): Promise<DiscussionResponse[]> {
        const discussions = await prismaClient.discussion.findMany({
            select: {
                id: true,
                user_id: true,
                title: true,
                category: true,
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
                created_at: 'desc',
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
                category: true,
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
                created_at: 'desc',
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

    static async listPopular(user: User): Promise<DiscussionResponse[]> {
        const twoWeeksAgo = moment().subtract(2, 'weeks').toDate();
        const categoryPreferences = await prismaClient.userData.findUnique({
            select: {
                preferences: true
            },
            where:{
                user_id: user.id
            }
        })

        let discussions: DiscussionPopular[]
        if(categoryPreferences && categoryPreferences.preferences.length>0){
            discussions = await prismaClient.$queryRaw`
                SELECT d.*, u.first_name, u.last_name, u."isAnonymous",
                    (SELECT CAST(COUNT(*) AS INTEGER) FROM comments c WHERE c.discussion_id = d.id) AS comment,
                    (SELECT CAST(COUNT(*) AS INTEGER) FROM discussion_likes dl WHERE dl.discussion_id = d.id) AS "discussionLike"
                FROM discussions d
                INNER JOIN users u ON d.user_id = u.id
                WHERE d.created_at >= ${twoWeeksAgo} 
                    AND EXISTS (
                        SELECT 1 FROM UNNEST(d.category) AS CATEGORIES
                        WHERE CATEGORIES = ANY(${categoryPreferences.preferences}::text[])
                    ) 
                ORDER BY comment DESC, "discussionLike" DESC, d.created_at DESC
                LIMIT 1;
                `;
        } else {
            discussions = await prismaClient.$queryRaw`
                SELECT d.*, u.first_name, u.last_name, u."isAnonymous",
                    (SELECT CAST(COUNT(*) AS INTEGER) FROM comments c WHERE c.discussion_id = d.id) AS comment,
                    (SELECT CAST(COUNT(*) AS INTEGER) FROM discussion_likes dl WHERE dl.discussion_id = d.id) AS "discussionLike"
                FROM discussions d
                INNER JOIN users u ON d.user_id = u.id
                WHERE d.created_at >= ${twoWeeksAgo}
                ORDER BY comment DESC, "discussionLike" DESC, d.created_at DESC
                LIMIT 1;
                `;
        }

        if (discussions.length === 0) {
            // console.log("masuk")
            discussions = await prismaClient.$queryRaw`
                SELECT d.*, u.first_name, u.last_name, u."isAnonymous",
                    (SELECT CAST(COUNT(*) AS INTEGER) FROM comments c WHERE c.discussion_id = d.id) AS comment,
                    (SELECT CAST(COUNT(*) AS INTEGER) FROM discussion_likes dl WHERE dl.discussion_id = d.id) AS "discussionLike"
                FROM discussions d
                INNER JOIN users u ON d.user_id = u.id
                ORDER BY comment DESC, "discussionLike" DESC, d.created_at DESC
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
                category: true,
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
                    orderBy: {
                        created_at: 'desc'
                    }
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
