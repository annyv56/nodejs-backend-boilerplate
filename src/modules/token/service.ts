import jwt from "jsonwebtoken";
import prisma from "../../database/prisma";
import {config} from "../../config/index"

const JWT_SECRET = config.jwtSecret
const REFRESH_SECRET= config.refreshSecret

export const generateAccessToken = (
  userId: string,
  email: string,
  role: string,
) => {
  return jwt.sign(
    {
      userId,
      email,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );
};

export const generateRefreshToken = async (userId: string) => {
  const token = jwt.sign({ userId }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
  await prisma.refreshToken.create({
    data: {
      token,
      userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
  return token;
};

export const refreshAccessToken = async (refreshToken: string) => {
  const storedToken = await prisma.refreshToken.findUnique({
    where: {
      token: refreshToken,
    },
  });
  if (!storedToken) {
    throw new Error("Invalid refresh token");
  }
  const decoded = jwt.verify(refreshToken, config.refreshSecret) as {
    userId: string;
  };
  const user = await prisma.user.findUnique({
    where: {
      id: decoded.userId,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const accessToken = generateAccessToken(user.id, user.email, user.role);
  return {
    accessToken,
  };
};

export const revokeRefreshToken = async (refreshToken:string) =>{
  const token = await prisma.refreshToken.findUnique({
    where:{
        token: refreshToken,
    }
  })
  if (!token){
    throw new Error("Refresh token not found")
  }
  await prisma.refreshToken.delete({
    where:{
        token:refreshToken,
    }
  });
  return true;
}
