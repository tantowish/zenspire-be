import { Discussion } from "@prisma/client";

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