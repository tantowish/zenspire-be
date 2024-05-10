import { Comment } from "@prisma/client";

export type CommentWithUser = Comment & {
    user: {
        experience_points: number
        first_name: string;
        last_name: string | null;
        isAnonymous: boolean;
    };
};