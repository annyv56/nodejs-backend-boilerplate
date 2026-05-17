import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  return res.json({
    success: true,
    message: "Server running",
  });
});

export default app;