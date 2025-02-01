import express from "express";
import morgan from "morgan";
import setupSwagger from "./config/swagger";
import employeeRoutes from "./api/v1/routes/employeeRoutes"

const app = express();

// Middleware
app.use(morgan("combined"));
app.use(express.json());

// Integrate Swagger
setupSwagger(app);

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.send("Server is healthy");
});


// Routes
app.use("/api/v1", employeeRoutes)

export default app;
