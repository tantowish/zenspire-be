import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { UserRequest } from "../types/user-request";
import { UserResponse } from "../model/user-model";

export const practitionerMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    if(req.user?.role != 'practitioner'){
        res.status(401).json({
            error: "Unauthorized"
        }).end()
        return
    }
    console.log('practitioner')
    next()
    return
}