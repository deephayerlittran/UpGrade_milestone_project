import { Request, Response, NextFunction } from "express"; 
import { BranchService } from "../services/branchService";
import { Branch } from "../models/branch";

export class BranchController {
    private branchService: BranchService;

    constructor(branchService: BranchService) {
        this.branchService = branchService;
        this.createBranch = this.createBranch.bind(this);
        this.getAllBranches = this.getAllBranches.bind(this);
        this.getBranchById = this.getBranchById.bind(this);
        this.updateBranch = this.updateBranch.bind(this);
        this.deleteBranch = this.deleteBranch.bind(this);
    }

    async createBranch(req: Request, res: Response, next: NextFunction): Promise<void> { 
        try {
            console.log("Controller: Request body:", req.body);
            const branchData: Branch = { ...req.body, phone: req.body.phone.toString() };

            if (!branchData.name || !branchData.address || !branchData.phone) {
                res.status(400).json({ message: "Name, address, and phone are required" }); 
                return; 
            }

            const newBranch = await this.branchService.createBranch(branchData);
            res.status(201).json(newBranch);
        } catch (error) {
            console.error("Controller: Error in createBranch:", error);
            next(error); 
        }
    }

    async getAllBranches(req: Request, res: Response, next: NextFunction): Promise<void> { 
        try {
            console.log("Controller: Getting all branches");
            const branches = await this.branchService.getAllBranches();
            res.status(200).json(branches);
        } catch (error) {
            console.error("Controller: Error in getAllBranches:", error);
            next(error); 
        }
    }

    async getBranchById(req: Request, res: Response, next: NextFunction): Promise<void> { 
        try {
            const branchId = req.params.id;
            console.log("Controller: Getting branch by ID:", branchId);
            const branch = await this.branchService.getBranchById(branchId);
            if (branch) {
                res.status(200).json(branch);
            } else {
                res.status(404).json({ message: "Branch not found" });
            }
        } catch (error) {
            console.error("Controller: Error in getBranchById:", error);
            next(error); // Pass error to next
        }
    }

    async updateBranch(req: Request, res: Response, next: NextFunction): Promise<void> { 
        try {
            const branchId = req.params.id;
            const updatedData: Partial<Branch> = req.body;
            console.log("Controller: Updating branch:", branchId, updatedData);

            const updatedBranch = await this.branchService.updateBranch(branchId, updatedData);
            if (updatedBranch) {
                res.status(200).json(updatedBranch);
            } else {
                res.status(404).json({ message: "Branch not found" });
            }
        } catch (error) {
            console.error("Controller: Error in updateBranch:", error);
            next(error); 
        }
    }

    async deleteBranch(req: Request, res: Response, next: NextFunction): Promise<void> { 
        try {
            const branchId = req.params.id;
            console.log("Controller: Deleting branch:", branchId);
            const result = await this.branchService.deleteBranch(branchId);
            if (result) {
                res.status(200).json({ message: "Branch deleted successfully" });
            } else {
                res.status(404).json({ message: "Branch not found" });
            }
        } catch (error) {
            console.error("Controller: Error in deleteBranch:", error);
            next(error); 
        }
    }
}
