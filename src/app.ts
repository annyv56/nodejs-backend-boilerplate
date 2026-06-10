import express from "express";
import routes from "./routes"
import { errorHandler } from "./common/middleware/error.middleware";
import { requestLogger } from "./common/middleware/logger.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use("/api",routes)
app.use("/docs", swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
)

app.use(errorHandler);

export default app;
