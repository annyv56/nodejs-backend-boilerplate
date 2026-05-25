import { Request, Response, NextFunction } from "express";
import logger from "../logger/logger";

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
  );
  return res.status(400).json({
    success: false,
    message: error.message || "Something went Wrong",
  });
};
