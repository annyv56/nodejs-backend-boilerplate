import {Request, Response} from "express";

import { sendResponse } from "../../common/responses/sendResponse";
import { HTTP_STATUS } from "../../common/constants/httpStatus";

import {
    getHealthStatus,
    getReadinessStatus
} from "./service"

export const health = async(
    _req: Request,
    res:Response
)=>{
    const result = await getHealthStatus();

    return sendResponse(res,{
        statusCode: HTTP_STATUS.OK,
        message: "Service healthy",
        data:result
    })
}


export const readiness =  async(
    _req: Request,
    res: Response
) =>{
    const result = await getReadinessStatus();

    return sendResponse(res,{
        statusCode: HTTP_STATUS.OK,
        message: "Readiness status",
        data: result
    })
}

