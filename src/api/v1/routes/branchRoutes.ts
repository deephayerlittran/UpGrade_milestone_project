import { Router } from "express";
import { createBranch, getAllBranches, getBranchById, updateBranch, deleteBranch } from "../controllers/branchController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Branch Management
 *   description: API endpoints for managing branches
 */

/**
 * @swagger
 * /api/v1/branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branch Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Branch created successfully
 */
router.post("/", createBranch);

/**
 * @swagger
 * /api/v1/branches:
 *   get:
 *     summary: Get all branches
 *     tags: [Branch Management]
 *     responses:
 *       200:
 *         description: List of branches
 */
router.get("/", getAllBranches);

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Get branch by ID
 *     tags: [Branch Management]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Branch found
 *       404:
 *         description: Branch not found
 */
router.get("/:id", getBranchById);

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Update a branch
 *     tags: [Branch Management]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Branch updated successfully
 */
router.put("/:id", updateBranch);

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   delete:
 *     summary: Delete a branch
 *     tags: [Branch Management]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 */
router.delete("/:id", deleteBranch);

export default router;