import { User } from "@prisma/client";
import { prismaClient } from "../src/app/database";
import bcrypt from 'bcrypt'

class AuthUtil {
    static async createUser(): Promise<User>{
        const hashedPassword = await bcrypt.hash("password", 10)
        const user = await prismaClient.user.create({
            data: {
                email: "test@gmail.com",
                password: hashedPassword,
                first_name: "Tantowi"
            }
        })
        return user
    }
    
    static async deleteUser(): Promise<User>{
        const deleteUser = await prismaClient.user.delete({
            where: {
                email: "test@gmail.com"
            }
        })

        return deleteUser
    }
}

class UserUtil {

}