import { Request, Response } from "express";

import { registerUser, loginUser } from "./service";
import { AuthRequest } from "../../common/middleware/auth.middleware";
import { asyncHandler } from "../../common/utils/asyncHandler";

export const register = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    if (user) {
      return res.status(201).json({
        success: true,
        message: "User Registered Successfully",
      });
    }
  },
);

export const login = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  return res.status(200).json({
    sucess: true,
    message: "Login Successful",
    data: result,
  });
});

export const getProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: {},
    });
  },
);

export const adminOnly = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    return res.status(200).json({
      success: true,
      message: "Welcome Admin!",
      data: req.user,
    });
  },
);
