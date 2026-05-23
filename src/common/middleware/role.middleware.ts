import {Response, NextFunction} from "express";

import {AuthRequest} from "./auth.middleware";

export const authorize = (...allowedRoles: string[]) =>(req:AuthRequest, res: Response, next: NextFunction) =>{
    const userRole = req.user?.role;

    if(!userRole || !allowedRoles.includes(userRole)){
        return res.status(403).json({
            success:false,
            message: "Access Denied"
        })
    }
    next()
}
