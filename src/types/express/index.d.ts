import {JwtPayload} from "../../common/middleware/auth.middleware"

declare global{
    namespace Express{
        interface Request {
            user?:JwtPayload;
        }
    }
}

export{}