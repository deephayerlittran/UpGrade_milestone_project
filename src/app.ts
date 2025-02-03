import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

// Initialize express app
const app: Application = express();

// Middleware
app.use(express.json());
app.use(morgan("combined"));

// // Integrate Swagger
// setupSwagger(app);

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Company API",
      version: "1.0.0",
      description: "API for managing employees and branches in the company",
    },
    servers: [{ url: "http://localhost:3000" }],
    tags: [
      {
        name: "Server Health Check",
        description: "API to check the server's health status",
      },
      {
        name: "Employee Management",
        description: "Operations related to managing employees",
      },
      {
        name: "Branch Management",
        description: "Operations related to managing branches",
      },
    ],
  },
  apis: ["./src/api/v1/routes/*.ts", "./src/app.ts"], 
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Employee routes
app.use("/api/v1/employees", employeeRoutes);

// Branch routes
app.use("/api/v1/branches", branchRoutes);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Server Health Check
 *     description: Check if the server is running.
 *     tags:
 *       - Server Health Check
 *     responses:
 *       200:
 *         description: Server is up and running
 *       500:
 *         description: Server error
 */
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

export default app;
