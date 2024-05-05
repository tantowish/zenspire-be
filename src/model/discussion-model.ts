import { Discussion } from "@prisma/client"
import moment from "moment-timezone";
import { timezone } from "../util/timezone";
import { DiscussionWithCount } from "../types/discussion-types";

export type DiscussionResponse = {
    id: number,
    user_id: number,
    title: string,
    body: string,
    image?: string,
    created_at: string,
    updated_at: string,
}

export type DiscussionFullResponse = {
    id: number,
    user_id: number,
    title: string,
    body: string,
    image?: string,
    created_at: string,
    updated_at: string,
    _count: {
        comment: number;
        discussionLike: number;
    }
    user: {
        first_name: string;
        last_name?: string;
        isAnonymous: boolean;
    }
}

export type CreateDiscussionRequest = {
    title: string,
    body: string,
    image?: string
}

export type UpdateDiscussionRequest = {
    id: number
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

export function toDiscussionArrayFullResponse(discussions: DiscussionWithCount[]): DiscussionFullResponse[] {
    return discussions.map((discussion) => ({
        id: discussion.id,
        user_id: discussion.user_id,
        title: discussion.title,
        body: discussion.body,
        image: discussion.image!, // Handle optional image
        created_at: moment(discussion.created_at).tz(timezone).format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment(discussion.updated_at).tz(timezone).format("YYYY-MM-DD HH:mm:ss"),
        _count: discussion._count,
        user: {
            first_name: discussion.user.first_name,
            last_name: discussion.user.last_name!,
            isAnonymous: discussion.user.isAnonymous
        }
    }));
}