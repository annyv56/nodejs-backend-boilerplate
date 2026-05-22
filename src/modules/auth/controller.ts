import { Request, Response } from "express";

import { registerUser, loginUser } from "./service";
import { Authrequest } from "../../common/middleware/auth.middleware";

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
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    return res.status(200).json({
      sucess: true,
      message: "Login Successful",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getProfile = (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: {},
    });
  } catch (error) {
    return res.status(401).json({
      success: true,
      message: "Internal Server Error",
    });
  }
};

export const adminOnly = async (req: Authrequest, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Welcome Admin!",
    data: req.user,
  });
};
