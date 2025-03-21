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

    async deleteBranch(id: string | number): Promise<boolean> {
        try {
            let branchRef;
            if (typeof id === 'string') {
                branchRef = this.branchesCollection.doc(id);
            } else {
                const querySnapshot = await this.branchesCollection.where("id", "==", id.toString()).get();
                if (querySnapshot.empty) return false;
                branchRef = querySnapshot.docs[0].ref;
            }

            await branchRef.delete();
            return true;
        } catch (error) {
            console.error("Error deleting branch:", error);
            return false;
        }
    }

    async getAllBranches(): Promise<Branch[]> {
        try {
            const snapshot = await this.branchesCollection.get();
            const branches: Branch[] = [];
            snapshot.forEach((doc) => {
                const branchData = doc.data() as Branch;
                if (branchData.id !== undefined) {
                    branches.push({ id: branchData.id.toString(), ...branchData });
                }
            });
            return branches;
        } catch (error) {
            console.error("Error getting all branches:", error);
            throw error;
        }
    }


    // *** Employee Functions ***
    private employeesCollection = db.collection("employees");

    async createEmployee(employeeData: Omit<Employee, 'id'>): Promise<Employee> {
        try {
            const newEmployeeRef = this.employeesCollection.doc();
            const newEmployee: Employee = { ...employeeData, id: newEmployeeRef.id };
            await newEmployeeRef.set(newEmployee);
            return newEmployee;
        } catch (error) {
            console.error("Error creating employee:", error);
            throw new Error("Failed to create employee");
        }
    }

    async getEmployeeById(id: string): Promise<Employee | undefined> {
        try {
            const employeeRef = this.employeesCollection.doc(id);
            const employeeDoc = await employeeRef.get();
            if (employeeDoc.exists) {
                const employeeData = employeeDoc.data() as Employee;
                return employeeData;
            }
            return undefined;
        } catch (error) {
            console.error("Error getting employee by ID:", error);
            return undefined;
        }
    }

    async updateEmployee(id: string, updateData: Partial<Employee>): Promise<Employee | null> {
        try {
            const employee = await this.getEmployeeById(id);
            if (!employee) return null;

            const employeeRef = this.employeesCollection.doc(id);
            await employeeRef.update(updateData);
            return { ...employee, ...updateData };
        } catch (error) {
            console.error("Error updating employee:", error);
            return null;
        }
    }

    async deleteEmployee(id: string): Promise<boolean> {
        try {
            const employeeRef = this.employeesCollection.doc(id);
            await employeeRef.delete();
            return true;
        } catch (error) {
            console.error("Error deleting employee:", error);
            return false;
        }
    }

    async getEmployeesByBranchId(branchId: string | number): Promise<Employee[]> {
        try {
            const querySnapshot = await this.employeesCollection.where("branchId", "==", branchId.toString()).get();
            const employees: Employee[] = [];
            querySnapshot.forEach((doc) => {
                const employeeData = doc.data() as Employee;
                employees.push({ id: doc.id, ...employeeData });
            });
            return employees;
        } catch (error) {
            console.error("Error getting employees by branch ID:", error);
            return []; // Or throw the error if you prefer
        }
    }

    async getEmployeesByDepartment(department: string): Promise<Employee[]> {
        try {
            const querySnapshot = await this.employeesCollection.where("department", "==", department).get();
            const employees: Employee[] = [];
            querySnapshot.forEach((doc) => {
                const employeeData = doc.data() as Employee;
                employees.push({ id: doc.id, ...employeeData });
            });
            return employees;
        } catch (error) {
            console.error("Error getting employees by department:", error);
            return []; // Or throw the error
        }
    }

    async getAllEmployees(): Promise<Employee[]> {
        try {
            const snapshot = await this.employeesCollection.get();
            const employees: Employee[] = [];
            snapshot.forEach((doc) => {
                const employeeData = doc.data() as Employee;
                employees.push({ id: doc.id, ...employeeData });
            });
            return employees;
        } catch (error) {
            console.error("Error getting all employees:", error);
            throw error;
        }
    }
}