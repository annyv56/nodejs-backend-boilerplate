import {generateAccessToken, generateRefreshToken} from "../token/service"
import bcrypt from "bcryptjs";
import prisma from "../../database/prisma";
import logger from "../../common/logger/logger";
import { AppError } from "../../common/errors/appError";
import { HTTP_STATUS } from "../../common/constants/httpStatus";
import { addWelcomeEmailJob } from "../queue/queues/email";

export const registerUser = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new AppError(HTTP_STATUS.CONFLICT, "User already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  await addWelcomeEmailJob(user.email)
  logger.info(
    {
      id: user.id,
      email: user.email,
    },
    "User Created",
  );
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    logger.warn({email}, "Login failed: User not found")
    throw new AppError(HTTP_STATUS.UNAUTHRORIZED, "Invalid Credentials")
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    logger.warn({email}, "Login failed: Invalid Password")
    throw new AppError(HTTP_STATUS.UNAUTHRORIZED, "Invalid credentials");
  }
  const accessToken = generateAccessToken(user.id, user.email, user.role)
  const refreshToken = await generateRefreshToken(user.id)
  logger.info({userId: user.id, email: user.email})
  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
};
