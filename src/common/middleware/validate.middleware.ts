import { Request, Response, NextFunction, RequestHandler } from "express";

import { ZodType, ZodError } from "zod";

export const validate = (schema: ZodType): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const validatedData = schema.parse(req.body);
            req.body = validatedData;
            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    message: error?.message || "Validation Failed",
                });
                return;
            }
        }
         res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
        return;
    };
};
