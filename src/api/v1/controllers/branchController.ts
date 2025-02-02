import { Request, Response } from "express";
import { 
    fetchAllBranches,
    fetchBranchById,
    addBranch,
    modifyBranch,
    removeBranch
} from "../services/branchService";
import { Branch } from "../interfaces/branch"

export const getAllBranches = (req: Request, res: Response): void => {
    const branches: Branch[] = fetchAllBranches();
    res.status(200).json({ message: "Fetched all branches", data: branches });
};

export const getBranchById = (req: Request, res: Response): void => {
    const { id } = req.params;
    const branch: Branch | null = fetchBranchById(id);
  
    if (!branch) {
        res.status(404).json({ message: "Branch not found" });
        return;
    }
  
    res.status(200).json({ message: "Fetched branch", data: branch });
};

export const createBranch = (req: Request, res: Response): void => {
    const { name, address, phone } = req.body;
  
    if (!name || !address || !phone) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
  
    const newBranch: Branch = addBranch({ id: "", name, address, phone });
    res.status(201).json({ message: "Branch created", data: newBranch });
};

export const updateBranch = (req: Request, res: Response): void => {
    const { id } = req.params;
    const updates: Partial<Branch> = req.body;
  
    if (Object.keys(updates).length === 0) {
        res.status(400).json({ message: "No updates provided" });
        return;
    }
  
    const updatedBranch = modifyBranch(id, updates);
    if (!updatedBranch) {
        res.status(404).json({ message: "Branch not found" });
        return;
    }
  
    res.status(200).json({ message: "Branch updated", data: updatedBranch });
};

export const deleteBranch = (req: Request, res: Response): void => {
    const { id } = req.params;
    const success = removeBranch(id);
  
    if (!success) {
        res.status(404).json({ message: "Branch not found" });
        return;
    }
  
    res.status(200).json({ message: "Branch deleted" });
};