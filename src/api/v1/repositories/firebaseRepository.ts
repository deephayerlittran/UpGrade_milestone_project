import { Branch } from "../models/branch";
import { Employee } from "../models/employee";
import { db } from "../../../../config/firebaseConfig"; 

export class FirebaseRepository {
    private branchesCollection = db.collection("branches");

    // *** Branch Functions ***
    async createBranch(branchData: Omit<Branch, 'id'>): Promise<Branch> {
        try {
            const newBranchRef = this.branchesCollection.doc();
            const newBranch: Branch = { ...branchData, id: (await this.getNextBranchId()).toString() };
            await newBranchRef.set(newBranch);
            return newBranch;
        } catch (error) {
            console.error("Error creating branch:", error);
            throw new Error("Failed to create branch");
        }
    }

    async getNextBranchId(): Promise<number> {
        try {
            const counterRef = this.branchesCollection.doc('branch_counter');
            const counterDoc = await counterRef.get();
            let nextId = 1;

            if (counterDoc.exists) {
                const data = counterDoc.data();
                if (data && data.count) { // Check if data.count exists
                    nextId = data.count + 1;
                }
            }

            await counterRef.set({ count: nextId });
            return nextId;
        } catch (error) {
            console.error("Error getting next branch id:", error);
            throw error;
        }
    }
