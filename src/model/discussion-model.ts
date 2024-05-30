import { Discussion, DiscussionLike } from "@prisma/client"
import moment from "moment-timezone";
import { timezone } from "../util/timezone";
import { DiscussionDetail, DiscussionPopular, DiscussionWithCount } from "../types/discussion-types";
import { CommentWithUser } from "../types/comment-types";
import { CommentFullResponse } from "./comment-model";

export type DiscussionResponse = {
    id: number,
    user_id: number,
    title: string,
    category: string[],
    body: string,
    image?: string,
    created_at: string,
    updated_at: string,
}

export type DiscussionLikeResponse = {
    user_id: number
    discussion_id: number
}

export type DiscussionFullResponse = {
    id: number,
    user_id: number,
    title: string,
    category: string[],
    body: string,
    image?: string,
    created_at: string,
    updated_at: string,
    _count: {
        comment: number;
        discussionLike: number;
    }
    user: {
        experience_points: number
        first_name: string;
        last_name?: string;
        isAnonymous: boolean;
    }
}

export type DiscussionDetailResponse = {
    id: number,
    user_id: number,
    title: string,
    category: string[],
    body: string,
    image?: string,
    created_at: string,
    updated_at: string,
    _count: {
        comment: number;
        discussionLike: number;
    }
    user: {
        experience_points: number
        first_name: string;
        last_name?: string;
        isAnonymous: boolean;
    }
    comment: CommentFullResponse[]
}

export type CreateDiscussionRequest = {
    title: string,
    body: string,
    category: string[],
    image?: string
}

export type UpdateDiscussionRequest = {
    id: number
    title: string,
    category: string[],
    body: string,
    image?: string
}

export function toDiscussionResponse(discussion: Discussion): DiscussionResponse {
    return {
        id: discussion.id,
        user_id: discussion.user_id,
        title: discussion.title,
        category: discussion.category,
        body: discussion.body,
        image: discussion.image!,
        created_at: moment(discussion.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment(discussion.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
    }
}

export function toDiscussionLikeResponse(discussionLike: DiscussionLike): DiscussionLikeResponse {
    return {
        user_id: discussionLike.user_id,
        discussion_id: discussionLike.discussion_id 
    }
}

export function toDiscussionArrayFullResponse(discussions: DiscussionWithCount[]): DiscussionFullResponse[] {
    return discussions.map((discussion) => ({
        id: discussion.id,
        user_id: discussion.user_id,
        category: discussion.category,
        title: discussion.title,
        body: discussion.body,
        image: discussion.image!, // Handle optional image
        created_at: moment(discussion.created_at).tz(timezone).format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment(discussion.updated_at).tz(timezone).format("YYYY-MM-DD HH:mm:ss"),
        _count: discussion._count,
        user: {
            experience_points: discussion.user.experience_points,
            first_name: discussion.user.first_name,
            last_name: discussion.user.last_name!,
            isAnonymous: discussion.user.isAnonymous
        }
    }));
}

export function toDiscussionArrayFullResponsePopular(discussions: DiscussionPopular[]): DiscussionFullResponse[] {
    return discussions.map((discussion) => ({
        id: discussion.id,
        user_id: discussion.user_id,
        title: discussion.title,
        category: discussion.category,
        body: discussion.body,
        image: discussion.image!, // Handle optional image
        created_at: moment(discussion.created_at).tz(timezone).format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment(discussion.updated_at).tz(timezone).format("YYYY-MM-DD HH:mm:ss"),
        _count: {
            comment: discussion.comment,
            discussionLike: discussion.discussionLike
        },
        user: {
            experience_points: discussion.experience_points,
            first_name: discussion.first_name,
            last_name: discussion.last_name!,
            isAnonymous: discussion.isAnonymous
        }
    }));
}

export function toDiscussionDetailResponse(discussion: DiscussionDetail): DiscussionDetailResponse {
    return {
        id: discussion.id,
        user_id: discussion.user_id,
        title: discussion.title,
        category: discussion.category,
        body: discussion.body,
        image: discussion.image!,
        created_at: moment(discussion.created_at).tz(timezone).format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment(discussion.updated_at).tz(timezone).format("YYYY-MM-DD HH:mm:ss"),
        _count: {
            comment: discussion._count.comment,
            discussionLike: discussion._count.discussionLike
        },
        user: {
            experience_points: discussion.user.experience_points,
            first_name: discussion.user.first_name,
            last_name: discussion.user.last_name!,
            isAnonymous: discussion.user.isAnonymous
        },
        comment: discussion.comment.map(comment => ({
            id: comment.id,
            user_id: comment.user_id,
            discussion_id: comment.discussion_id,
            body: comment.body,
            updated_at: moment(comment.updated_at).tz(timezone).format("YYYY-MM-DD HH:mm:ss"),
            created_at: moment(comment.created_at).tz(timezone).format("YYYY-MM-DD HH:mm:ss"),
            user: {
                experience_points: comment.user.experience_points,
                first_name: comment.user.first_name,
                last_name: comment.user.last_name!,
                isAnonymous: comment.user.isAnonymous,
            }
        }))
    };
}