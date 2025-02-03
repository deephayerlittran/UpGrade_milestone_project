import { Request, Response } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "../interfaces/branch";

const handleError = (error: unknown, res: Response, message: string) => {
  if (error instanceof Error) {
    res.status(500).json({ message, error: error.message });
  } else {
    res.status(500).json({ message, error: "An unknown error occurred" });
  }
};

export const createBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const branchData: Branch = req.body;
    const newBranch = await branchService.createBranch(branchData);
    res.status(201).json(newBranch);
  } catch (error) {
    console.error(error);
    handleError(error, res, "Error creating branch");
  }
};

export const getAllBranches = async (_req: Request, res: Response): Promise<void> => {
  try {
    const branches = await branchService.getAllBranches();
    res.status(200).json(branches);
  } catch (error) {
    console.error(error);
    handleError(error, res, "Error fetching branches");
  }
};

export const getBranchById = async (req: Request, res: Response): Promise<void> => {
  try {
    const branchId = parseInt(req.params.id);
    const branch = await branchService.getBranchById(branchId);
    if (branch) {
      res.status(200).json(branch);
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error) {
    console.error(error);
    handleError(error, res, "Error fetching branch");
  }
};

export const updateBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const branchId = parseInt(req.params.id);
    const updatedData: Partial<Branch> = req.body;
    const updatedBranch = await branchService.updateBranch(branchId, updatedData);
    if (updatedBranch) {
      res.status(200).json(updatedBranch);
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error) {
    console.error(error);
    handleError(error, res, "Error updating branch");
  }
};

export const deleteBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const branchId = parseInt(req.params.id);
    const result = await branchService.deleteBranch(branchId);
    if (result) {
      res.status(200).json({ message: "Branch deleted successfully" });
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error) {
    console.error(error);
    handleError(error, res, "Error deleting branch");
  }
};
