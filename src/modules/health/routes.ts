import { Router } from "express";

const app = Router();

app.get("/check", (_req, res) => {
  return res.json({
    success: true,
    message: "Server running",
  });
});

export default app;