import { Router } from "express";
import { loginSchema, registerSchema } from "./validations";
import { getProfile, login, register } from "./controller";
import { validate } from "../../common/middleware/validate.middleware";
import { authenticate } from "../../common/middleware/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

router.get("/getProfile", authenticate, getProfile)
export default router;
