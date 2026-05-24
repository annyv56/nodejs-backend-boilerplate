import express from "express";
import authRoutes from "../src/modules/auth/routes";
import { errorHandler } from "./common/middleware/error.middleware";
import { requestLogger } from "./common/middleware/logger.middleware";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/health", (_req, res) => {
  return res.json({
    success: true,
    message: "Server running",
  });
});

app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
