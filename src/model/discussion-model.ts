import { Discussion } from "@prisma/client"
import moment from "moment-timezone";
import { timezone } from "../types/timezone";

export type DiscussionResponse = {
    id: number,
    user_id: number,
    title: string,
    body: string,
    image?: string,
    created_at: string,
    updated_at: string,
}

export type CreateDiscussionRequest = {
    title: string,
    body: string,
    image?: string
}

export function toDiscussionResponse(discussion: Discussion): DiscussionResponse {
    return {
        id: discussion.id,
        user_id: discussion.user_id,
        title: discussion.title,
        body: discussion.body,
        image: discussion.image!,
        created_at: moment(discussion.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
        updated_at: moment(discussion.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
    }
}