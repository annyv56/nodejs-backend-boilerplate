import { success } from "zod";
import { Response } from "express";

interface SendResponseOptions<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export const sendResponse = <T>(
  res: Response,
  options: SendResponseOptions<T>,
) => {
  const { statusCode, message, data } = options;
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
