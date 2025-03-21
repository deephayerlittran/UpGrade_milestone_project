import { Branch } from "../models/branch";
import { FirebaseRepository } from "../repositories/firebaseRepository";

export class BranchService {
  private firebaseRepository: FirebaseRepository;

  constructor(firebaseRepository: FirebaseRepository) {
    this.firebaseRepository = firebaseRepository;
  }

  async createBranch(branchData: Branch): Promise<Branch> {
    try {
      console.log("Service: Creating branch:", branchData);
      const newBranch = await this.firebaseRepository.createBranch(branchData);
      console.log("Service: Branch created:", newBranch);
      return newBranch;
    } catch (error) {
      console.error("Service: Error creating branch:", error);
      if (error instanceof Error) {
        console.error("Service: Error message:", error.message);
        console.error("Service: Error stack:", error.stack);
      }
      throw error;
    }
  }

  async getAllBranches(): Promise<Branch[]> {
    try {
      console.log("Service: Getting all branches");
      const branches = await this.firebaseRepository.getAllBranches();
      console.log("Service: Branches retrieved:", branches);
      return branches;
    } catch (error) {
      console.error("Service: Error getting all branches:", error);
      if (error instanceof Error) {
        console.error("Service: Error message:", error.message);
        console.error("Service: Error stack:", error.stack);
      }
      throw error;
    }
  }

  async getBranchById(id: string): Promise<Branch | undefined> {
    try {
      const numericId = parseInt(id, 10); // Convert string id to number
      return await this.firebaseRepository.getBranchById(numericId);
    } catch (error) {
      console.error("Service: Error getting branch by ID:", error);
      throw error;
    }
  }

  async updateBranch(id: string, updateData: Partial<Branch>): Promise<Branch | null> {
    try {
      const numericId = parseInt(id, 10); // Convert string id to number
      return await this.firebaseRepository.updateBranch(numericId, updateData);
    } catch (error) {
      console.error("Service: Error updating branch:", error);
      throw error;
    }
  }

  async deleteBranch(id: string): Promise<boolean> {
    try {
      const numericId = parseInt(id, 10); // Convert string id to number
      return await this.firebaseRepository.deleteBranch(numericId);
    } catch (error) {
      console.error("Service: Error deleting branch:", error);
      throw error;
    }
  }
}