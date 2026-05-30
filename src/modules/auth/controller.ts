import { Request, Response } from "express";

import { registerUser, loginUser } from "./service";
import { AuthRequest } from "../../common/middleware/auth.middleware";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { refreshAccessToken, revokeRefreshToken } from "../token/service";
import { HTTP_STATUS } from "../../common/constants/httpStatus";
import { sendResponse } from "../../common/responses/sendResponse";
import { AppError } from "../../common/errors/appError";

export const register = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    if (user) {
      return sendResponse(res,{
        statusCode: HTTP_STATUS.CREATED,
        message: "User Registered Successfully",
        data: user.email
      });
    }
  },
);

export const login = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  return sendResponse(res,{
    statusCode: HTTP_STATUS.OK,
    message: "Login Successful",
    data: result,
  });
});

export const getProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    return sendResponse(res,{
      statusCode: HTTP_STATUS.OK,
      message: "Profile fetched successfully",
      data: {},
    });
  },
);

export const adminOnly = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    return sendResponse(res,{
      statusCode: HTTP_STATUS.OK,
      message: "Welcome Admin!",
      data: req.user,
    });
  },
);

export const refreshToken = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new AppError(HTTP_STATUS.UNAUTHRORIZED,"Refresh token is required");
    }
    const result = await refreshAccessToken(refreshToken);
    return sendResponse(res,{
      statusCode: HTTP_STATUS.OK,
      message: "Access token refreshed",
      data: result,
    });
  },
);

export const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new AppError(HTTP_STATUS.UNAUTHRORIZED, "Refresh token is required");
  }
  await revokeRefreshToken(refreshToken);
  return sendResponse(res,{
    statusCode: HTTP_STATUS.OK,
    message: "Logged out sucessfully",
    data:{}
  });
});
