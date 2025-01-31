import { Router } from "express";
import { healthCheck } from "../../v1/controllers/healthController";

const router = Router();

router.get("/health", healthCheck);

export default router;
