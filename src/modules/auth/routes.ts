import { Router } from "express";
import { loginSchema, registerSchema } from "./validations";
import { getProfile, login, register, adminOnly, refreshToken } from "./controller";
import { validate } from "../../common/middleware/validate.middleware";
import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/role.middleware";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

router.get("/getProfile", authenticate, getProfile);
router.get("/deleteUser", authenticate, authorize("ADMIN"), adminOnly);

router.post("/refresh-token", refreshToken )
export default router;
