import { User } from "@prisma/client"
import moment from "moment-timezone"
import { timezone } from "../types/timezone"

export type UserResponse = {
    id: number
    first_name: string
    last_name?: string
    email: string
    experience_points: number
    isAnonymous: boolean
    role: string
    created_at: string
    updated_at: string
}

export type LoginResponse = {
    data: UserResponse
    token: string
}

export type RegisterRequest = {
    first_name: string
    last_name?: string
    password: string
    email: string
}

export type UpdateUserRequest = {
    first_name?: string
    last_name?: string
    email?: string
    isAnonymous?: boolean
    password?: string
}

export type LoginRequest = {
    email: string
    password: string
}

export function toUserResponse(user: User): UserResponse {
    return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name!,
        email: user.email,
        experience_points: user.experience_points,
        isAnonymous: user.isAnonymous,
        role: user.role,
        created_at: moment(user.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
        updated_at: moment(user.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
    }
}

export function toUserLoginResponse(user: User, token: string): LoginResponse {
    return {
        data: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name!,
            email: user.email,
            experience_points: user.experience_points,
            isAnonymous: user.isAnonymous,
            role: user.role,
            created_at: moment(user.created_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'), 
            updated_at: moment(user.updated_at).tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
        },
        token: token
    }
}