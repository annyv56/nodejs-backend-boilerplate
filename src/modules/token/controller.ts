import { AuthRequest } from "../../common/middleware/auth.middleware";
import { asyncHandler } from "../../common/utils/asyncHandler";
import { refreshAccessToken } from "../token/service";

export const refreshToken = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new Error("Refresh token is required");
    }
    const result = await refreshAccessToken(refreshToken);
    return res.status(200).json({
      success: true,
      message: "Access token refreshed",
      data: result,
    });
  },
);
