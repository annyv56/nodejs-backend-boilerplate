import { Router } from "express";
import {health, readiness} from "./controller"


const router = Router();

router.get("/", health)

router.get("/ready", readiness)

export default router;