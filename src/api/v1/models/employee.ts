export interface Employee {
    id?: number | string;
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: number;
  }
  
  
  export interface DepartmentEmployeeResponse {
    department: string;
    employees: Employee[];
  }
  
  export interface BranchEmployeeResponse {
    branchId: number | string;
    employees: Employee[];
  }