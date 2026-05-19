import { Request, Response } from "express";

import { registerUser } from "./service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    if (user) {
      return res.status(201).json({
        success: true,
        message: "User Registered Successfully",
      });
    }
  } catch (err:any) {
    return res.status(400).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};
