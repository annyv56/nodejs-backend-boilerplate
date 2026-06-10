import { Router } from "express";
import {health, readiness} from "./controller"


const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Get application health status
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.get("/", health)

/**
 * @swagger
 * /health/ready:
 *   get:
 *     summary: Check readiness of dependencies
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Readiness status
 */
router.get("/ready", readiness)

export default router;