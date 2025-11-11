import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchService";

export const getAllBranches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const branches = await branchService.getAllBranches();
    res.status(200).json(branches);
  } catch (error) {
    next(error);
  }
};

export const createBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newBranch = await branchService.createBranch(req.body);
    res.status(201).json(newBranch);
  } catch (error) {
    next(error);
  }
};
