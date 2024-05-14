import { PHQ9, User } from "@prisma/client";
import { CreateQuisionerRequest, QuisionerResponse, toQuisionerResponseArray } from "../model/quisioner-model";
import { prismaClient } from "../app/database";

export class QuisionerService {
    static async getPHQ9(id: number): Promise<PHQ9[]> {
        const quisioners = await prismaClient.pHQ9.findMany({
            where: {
                user_id: id
            },
            orderBy: {
                id: 'desc'
            },
            take: 9
        })

        return quisioners.reverse()
    }

    static async create(user: User, req: CreateQuisionerRequest[]): Promise<QuisionerResponse[]> {
        const data = req.map(item => ({
            user_id: user.id,
            ...item
        }))

        await prismaClient.pHQ9.createMany({
            data:data
        })

        const quisioners = await this.getPHQ9(user.id)

        return toQuisionerResponseArray(quisioners)
    } 

    static async get(user: User): Promise<QuisionerResponse[]> {
        const quisioners = await this.getPHQ9(user.id)

        return toQuisionerResponseArray(quisioners)
    }

    static async getSeverity(user: User): Promise<{severity: number}> {
        const quisioners = await this.getPHQ9(user.id)

        let total: number = 0;
        quisioners.forEach(quisioners => {
            total += quisioners.severity
        });

        return {
            severity: total
        }
    }
}