import express from "express";
import authRoutes from '../src/modules/auth/routes'

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  return res.json({
    success: true,
    message: "Server running",
  });
});

app.use("/api/auth", authRoutes)

export default app;