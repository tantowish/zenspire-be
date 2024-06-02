import { Gender, UserData } from "@prisma/client"
import { timezone } from "../util/timezone"
import moment from "moment-timezone"

export type UserDataResponse = {
    id: number,
    user_id: number,
    gender: Gender,
    birthday: string,
    preferences: string[],
    created_at: string,
    updated_at: string,
}

export type UserDataRequest = {
    gender: Gender,
    birthday: string,
    preferences: string[]
}

export function toUserDataResponse(userData: UserData): UserDataResponse {
    return {
        id: userData.id,
        user_id: userData.user_id,
        gender: userData.gender,
        birthday: moment(userData.birthday).tz(timezone).format('YYYY-MM-DD'),
        preferences: userData.preferences,
        created_at: moment(userData.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment(userData.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
    }
}