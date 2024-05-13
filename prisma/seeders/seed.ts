import { prismaClient } from "../../src/app/database";
import { comments } from "./comment-seeder";
import { discussions } from "./discussion-seeder";
import { journals } from "./journal-seeder";
import { users } from "./user-seeder";
import { userData } from "./userData-seeder";

async function main() {
    await prismaClient.user.createMany({
        data: users
    })

    await prismaClient.userData.createMany({
        data: userData
    })

    await prismaClient.journal.createMany({
        data: journals
    })

    await prismaClient.discussion.createMany({
        data: discussions
    })

    await prismaClient.comment.createMany({
        data: comments
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prismaClient.$disconnect()
    })