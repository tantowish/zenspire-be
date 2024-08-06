import { Discussion, DiscussionLike } from "@prisma/client";
import { CommentWithUser } from "./comment-types";

export type DiscussionWithCount = Discussion & {
    _count: {
        comment: number;
        discussionLike: number;
    },
    user: {
        experience_points: number
        first_name: string;
        last_name: string | null;
        isAnonymous: boolean;
    };
    discussionLike: DiscussionLike[]
};

export type DiscussionPopular = Discussion & {
    experience_points: number,
    first_name: string,
    last_name: string | null
    isAnonymous: boolean
    comment: number,
    discussionLike: number,
    isLiked: boolean
}

export type DiscussionDetail = Discussion & {
    _count: {
        comment: number;
        discussionLike: number;
    },
    user: {
        experience_points: number
        first_name: string;
        last_name: string | null;
        isAnonymous: boolean;
    };
    comment: CommentWithUser[],
    discussionLike: DiscussionLike[]
};
