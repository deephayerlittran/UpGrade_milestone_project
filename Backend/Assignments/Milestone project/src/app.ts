import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import routes from "./api/v1/routes/routes";
import { errorHandler } from "./api/v1/middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Swagger Docs
const specs = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "UpGrade API", version: "1.0.0" },
  },
  apis: ["./src/api/v1/routes/*.ts"],
});

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/v1", routes);
app.use(errorHandler);

export default app;
