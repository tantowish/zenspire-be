import { Request } from "express";

export interface UserRequest extends Request {
    user?: {
        first_name: string
        last_name?: string
        email: string
        experience_points: number
        isAnonymous: boolean
        role: string
    }
}