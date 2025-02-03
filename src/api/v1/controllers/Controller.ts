import { Request, Response } from "express";

/**
 * @swagger
 * /health:
 *   get:
 *     description: Returns the health status of the server
 *     responses:
 *       200:
 *         description: Server is healthy
 */

export const healthCheck = (req: Request, res: Response) => {
    res.send("Server is healthy");
};
