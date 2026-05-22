import {Response, NextFunction} from "express";

import {Authrequest} from "./auth.middleware";

export const authorize = (...allowedRoles: string[]) =>(req:Authrequest, res: Response, next: NextFunction) =>{
    const userRole = req.user?.role;

    if(!userRole || !allowedRoles.includes(userRole)){
        return res.status(403).json({
            success:false,
            message: "Access Denied"
        })
    }
    next()
}
