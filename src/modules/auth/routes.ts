import { Router } from "express";
import { loginSchema, registerSchema } from "./validations";
import { getProfile, login, register, adminOnly, refreshToken, logout } from "./controller";
import { validate } from "../../common/middleware/validate.middleware";
import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/role.middleware";

const app = Router();

app.post("/register", validate(registerSchema), register);
app.post("/login", validate(loginSchema), login);

app.get("/getProfile", authenticate, getProfile);
app.get("/deleteUser", authenticate, authorize("ADMIN"), adminOnly);

app.post("/refresh-token", refreshToken )

app.post("/logout", logout)

export default app;
