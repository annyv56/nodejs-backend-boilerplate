import { Router } from "express";
import authRoutes from "../modules/auth/routes"
import healthRoutes from "../modules/health/routes"
const router = Router()

router.use("/auth", authRoutes)
router.use("/health", healthRoutes)

export default router