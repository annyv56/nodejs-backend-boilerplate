import jwt from "jsonwebtoken";
import prisma from "../../database/prisma"

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN = process.env.REFRESH_SECRET as string;

export const generateAccessToken = (
    userId: string,
    email: string,
    role: string,

)=>{
    return jwt.sign({
        userId,
        email,
        role,
    },
    JWT_SECRET,
    {
        expiresIn: "15m",
    }
);
}

export const generateRefreshToken = async (
userId: string
)=>{
    const token = jwt.sign(
        {userId},
        REFRESH_TOKEN,
        {
            expiresIn:"7d",
        }
    );
    await prisma.refreshToken.create({
        data:{
            token,
            userId,
            expiresAt: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            ),
        },
    });
    return token;
}