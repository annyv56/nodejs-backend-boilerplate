import {Router} from "express";
import {registerSchema} from "./validations";
import {register} from './controller'
import {validate} from "../../common/middleware/validate.middleware"

const router = Router();

router.post("/register", validate(registerSchema), register)

export default router;