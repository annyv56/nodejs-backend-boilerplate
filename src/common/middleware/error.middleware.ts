import { Request, Response, NextFunction } from "express";
import logger from "../logger/logger";

import {AppError} from "../errors/appError"
import {HTTP_STATUS} from "../constants/httpStatus"

export const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error({
    message: error.message,
    stack: error.stack,
  },
  "Unhandled application error"
  )
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message
    })
  }
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message || "Internal Server Error"
  });
};
