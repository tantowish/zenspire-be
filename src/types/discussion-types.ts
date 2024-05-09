import { Discussion } from "@prisma/client";
import { CommentWithUser } from "./comment-types";

export type DiscussionWithCount = Discussion & {
    _count: {
        comment: number;
        discussionLike: number;
    },
    user: {
        first_name: string;
        last_name: string | null;
        isAnonymous: boolean;
    };
};

export type DiscussionPopular = Discussion & {
    first_name: string,
    last_name: string | null
    isAnonymous: boolean
    comment: number,
    discussionLike: number;
}

export type DiscussionDetail = Discussion & {
    _count: {
        comment: number;
        discussionLike: number;
    },
    user: {
        first_name: string;
        last_name: string | null;
        isAnonymous: boolean;
    };
    comment: CommentWithUser[]
};
