import express from "express";
import morgan from "morgan";
import setupSwagger from "./config/swagger";

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});

export default app;
