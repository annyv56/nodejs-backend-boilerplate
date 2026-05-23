import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  return res.status(400).json({
    success: false,
    message: error.message || "Something went Wrong",
  });
};
