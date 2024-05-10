import { Comment } from "@prisma/client"
import moment from "moment-timezone"
import { timezone } from "../util/timezone"
import { CommentWithUser } from "../types/comment-types"

export type CommentResponse = {
    id: number
    user_id: number
    discussion_id: number
    body: string,
    created_at: string,
    updated_at: string,
}

export type CommentFullResponse = {
    id: number
    user_id: number
    discussion_id: number
    body: string,
    created_at: string,
    updated_at: string,
    user: {
        experience_points: number
        first_name: string;
        last_name?: string;
        isAnonymous: boolean;
    }
}

export type CreateCommentRequest = {
    body: string
}

export type UpdateCommentRequest = {
    id: number
    discussion_id: number
    body: string
}

export function toCommentResponse(comment: Comment): CommentResponse {
    return {
        id: comment.id,
        user_id: comment.user_id,
        discussion_id: comment.discussion_id,
        body: comment.body,
        created_at: moment(comment.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment(comment.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
    }
}

export function toCommentArrayFullResponse(comments: CommentWithUser[]): CommentFullResponse[] {
    return comments.map((comment) => ({
        id: comment.id,
        user_id: comment.user_id,
        discussion_id: comment.discussion_id,
        body: comment.body,
        created_at: moment(comment.created_at).tz(timezone).format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment(comment.updated_at).tz(timezone).format("YYYY-MM-DD HH:mm:ss"),
        user: {
            experience_points: comment.user.experience_points,
            first_name: comment.user.first_name,
            last_name: comment.user.last_name!,
            isAnonymous: comment.user.isAnonymous
        }
    }));
}