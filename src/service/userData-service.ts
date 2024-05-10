import { User } from "@prisma/client";
import { Validation } from "../validation/validation";
import { UserDataValidation } from "../validation/userData-validation";
import { UserDataRequest, toUserDataResponse } from "../model/userData-model";
import { prismaClient } from "../app/database";
import moment from "moment-timezone";
import { ResponseErorr } from "../error/reponse-error";

export class UserDataService {
    static async create(user: User, req: UserDataRequest): Promise<UserDataService> {
        const checkExistingUserData = await prismaClient.userData.findUnique({
            where:{
                user_id: user.id
            }
        })

        if(checkExistingUserData) {
            throw new ResponseErorr(401,"User already have user data")
        }

        const userDataRequest = Validation.validate(UserDataValidation.REQUEST, req)

        const data = {
            ...userDataRequest,
            birthday: moment(userDataRequest.birthday).utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]'),
            user_id: user.id
        }
        const userData = await prismaClient.userData.create({
            data: data
        })

        return toUserDataResponse(userData)
    }

    static async get(user: User): Promise<UserDataService> {
        const userData = await prismaClient.userData.findUnique({
            where:{
                user_id: user.id
            }
        })

        if(!userData) {
            throw new ResponseErorr(404, "User Data not found")
        }

        return toUserDataResponse(userData)
    }

    static async update(user: User, req: UserDataRequest): Promise<UserDataService> {
        const updateRequest = Validation.validate(UserDataValidation.REQUEST, req)

        const userData = await prismaClient.userData.findUnique({
            where:{
                user_id: user.id
            }
        })

        if(!userData) {
            throw new ResponseErorr(404, "User Data not found")
        }

        const data = {
            ...updateRequest,
            birthday: moment(updateRequest.birthday).utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]'),
        }

        const updatedUserData = await prismaClient.userData.update({
            where:{
                user_id: user.id
            },
            data: data
        })

        return toUserDataResponse(updatedUserData)
    }
}