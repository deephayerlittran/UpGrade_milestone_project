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

    async getBranchById(id: string | number): Promise<Branch | undefined> {
        try {
            let branchRef;
            if (typeof id === 'string') {
                branchRef = this.branchesCollection.doc(id);
            } else {
                const querySnapshot = await this.branchesCollection.where("id", "==", id.toString()).get();
                if (querySnapshot.empty) return undefined;
                branchRef = querySnapshot.docs[0].ref;
            }
            const branchDoc = await branchRef.get();
            if (branchDoc.exists) {
                const branchData = branchDoc.data() as Branch;
                return branchData;
            }
            return undefined;
        } catch (error) {
            console.error("Error getting branch by ID:", error);
            return undefined;
        }
    }

    async updateBranch(id: string | number, updateData: Partial<Branch>): Promise<Branch | null> {
        try {
            const branch = await this.getBranchById(id);
            if (!branch) return null;

            let branchRef;
            if (typeof id === 'string') {
                branchRef = this.branchesCollection.doc(id);
            } else {
                const querySnapshot = await this.branchesCollection.where("id", "==", id.toString()).get();
                if (querySnapshot.empty) return null;
                branchRef = querySnapshot.docs[0].ref;
            }

            await branchRef.update(updateData);
            return { ...branch, ...updateData };
        } catch (error) {
            console.error("Error updating branch:", error);
            return null;
        }
    }
