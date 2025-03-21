import { Employee } from "../models/employee";
import { FirebaseRepository } from "../repositories/firebaseRepository";

export class EmployeeService {
    constructor(private firebaseRepository: FirebaseRepository) {} 

    async createEmployee(employeeData: Omit<Employee, 'id'>): Promise<Employee> {
        try {
            // 1. Get the Branch from Firebase using the numeric ID.
            const branch = await this.firebaseRepository.getBranchById(employeeData.branchId);

            if (!branch) {
                throw new Error("Branch not found"); 
            }

            // 2. Now, before creating the employee in Firestore, convert the branch ID to a string.
            const employeeDataWithBranchIdString = { ...employeeData, branchId: Number(branch.id) }; 

            // 3. Create the employee using the string branchId.
            const newEmployee = await this.firebaseRepository.createEmployee(employeeDataWithBranchIdString);

            return newEmployee;
        } catch (error) {
            console.error("Error creating employee:", error);
            throw error;
        }
    }

    async getAllEmployees(): Promise<Employee[]> {
        try {
            return await this.firebaseRepository.getAllEmployees();
        } catch (error) {
            console.error("Error getting all employees:", error);
            throw error;
        }
    }

    async getEmployeeById(id: string): Promise<Employee | undefined> { 
        try {
            return await this.firebaseRepository.getEmployeeById(id);
        } catch (error) {
            console.error("Error getting employee by ID:", error);
            throw error;
        }
    }

    async updateEmployee(id: string, updatedData: Partial<Employee>): Promise<Employee | null> { 
        try {
            // 1. If branchId is being updated, fetch the branch and convert its ID
            if (updatedData.branchId) {
              const branch = await this.firebaseRepository.getBranchById(updatedData.branchId);
              if (!branch) {
                throw new Error("Branch not found");
              }
              updatedData.branchId = Number(branch.id);
            }
            return await this.firebaseRepository.updateEmployee(id, updatedData);
        } catch (error) {
            console.error("Error updating employee:", error);
            throw error;
        }
    }

    async deleteEmployee(id: string): Promise<boolean> { 
        try {
            return await this.firebaseRepository.deleteEmployee(id);
        } catch (error) {
            console.error("Error deleting employee:", error);
            throw error;
        }
    }

    async getEmployeesByBranch(branchId: number): Promise<Employee[]> {
        try {
            console.log(`Fetching employees for branchId: ${branchId}`);
    
            const branch = await this.firebaseRepository.getBranchById(branchId);
            if (!branch) {
                console.error(`Branch not found for ID: ${branchId}`);
                throw new Error("Branch not found");
            }
    
            const employees = await this.firebaseRepository.getAllEmployees();
            console.log("All employees from Firestore:", employees);
    
            // Check actual stored branch ID values
            employees.forEach(emp => console.log(`Employee: ${emp.name}, Branch ID: ${emp.branchId}, Expected: ${branch.id}`));
    
            // Convert both values to numbers before filtering
            const filteredEmployees = employees.filter(employee => Number(employee.branchId) === Number(branch.id));
            console.log("Filtered employees:", filteredEmployees);
    
            return filteredEmployees;
        } catch (error) {
            console.error("Error getting employees by branch:", error);
            throw error;
        }
    }
    

    async getEmployeesByDepartment(department: string): Promise<Employee[]> {
        try {
            const employees = await this.firebaseRepository.getAllEmployees();
            return employees.filter(employee => employee.department === department);
        } catch (error) {
            console.error("Error getting employees by department:", error);
            throw error;
        }
    }
}