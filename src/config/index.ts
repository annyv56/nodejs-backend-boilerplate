import "dotenv/config"


const requiredEnvVariables = ["JWT_SECRET", "REFRESH_SECRET"];

requiredEnvVariables.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required enviorment variable: ${envVar}`);
  }
});

export const config = {
  port: Number(process.env.PORT) || 4001,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET as string,
  refreshSecret: process.env.REFRESH_SECRET as string,
};
