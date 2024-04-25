import { prismaClient } from "../app/database";
import { ResponseErorr } from "../error/reponse-error";
import { LoginRequest, RegisterRequest, UpdateUserRequest, LoginResponse, UserResponse, toUserLoginResponse, toUserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from "@prisma/client";

export class UserService {
    static async checkUserExist(email: string) {
        const checkUserExist = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        })

        if (!checkUserExist) {
            throw new ResponseErorr(404, "User not found")
        }
    }

    static async checkDuplicateEmail(email: string){
        const duplicateEmail = await prismaClient.user.findMany({
            where: {
                email: email
            }
        })

        if (duplicateEmail.length > 0) {
            throw new ResponseErorr(400, "Email has already taken")
        }
    }

    static async register(req: RegisterRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, req)

        this.checkDuplicateEmail(registerRequest.email)

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

        const user = await prismaClient.user.create({
            data: registerRequest
        })

        return toUserResponse(user)
    }

    static async login(req: LoginRequest): Promise<LoginResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, req)

        const user = await prismaClient.user.findUnique({
            where: {
                email: loginRequest.email,
            }
        })

        if (!user) {
            throw new ResponseErorr(404, "User not found")
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)

        if (!isPasswordValid) {
            throw new ResponseErorr(401, "Email or password is invalid")
        }

        const payload = {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            experience_points: user.experience_points,
            isAnonymous: user.isAnonymous,
            role: user.role
        }
        const secretKey = process.env.SECRET_KEY!
        const expiresIn = 60 * 60
        const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn })

        return toUserLoginResponse(user, token)
    }

    static async get(user: User): Promise<UserResponse> {
        return toUserResponse(user)
    }

    static async update(user: User, req: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, req)

        await this.checkUserExist(user.email)

        if (updateRequest.email && updateRequest.email !== user.email) {
            await this.checkDuplicateEmail(updateRequest.email);
        }

        if (updateRequest.password) {
            updateRequest.password = await bcrypt.hash(updateRequest.password, 10)
        }

        const userUpdate = await prismaClient.user.update({
            where: {
                email: user.email
            },
            data: updateRequest
        })

        return toUserResponse(userUpdate)
    }
}