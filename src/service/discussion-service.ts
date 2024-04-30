import { User } from "@prisma/client";
import { CreateDiscussionRequest, DiscussionResponse, toDiscussionResponse } from "../model/discussion-model";
import { Validation } from "../validation/validation";
import { DiscussionValidation } from "../validation/discussion-validation";
import { prismaClient } from "../app/database";

export class DiscussionService {
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
}