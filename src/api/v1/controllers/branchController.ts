import { Request, Response } from "express";
import { 
    fetchAllBranches,
    fetchBranchById,
    addBranch,
    modifyBranch,
    removeBranch
} from "../services/branchService";
import { Branch } from "../interfaces/branch"