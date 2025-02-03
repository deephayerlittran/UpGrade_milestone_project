import { Router } from "express";
import { healthCheck } from "../controllers/Controller";

const router = Router();


/**
 * @swagger
 * /health:
 *   get:
 *     description: Returns the health status of the server
 *     responses:
 *       200:
 *         description: Server is healthy
 */

router.get("/health", healthCheck);

export default router;
