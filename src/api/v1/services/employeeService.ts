import { Employee } from "../interfaces/Employee";

// Sample employee data
let employees: Employee[] = [
  { id: 1, name: "Alice Johnson", position: "Branch Manager", department: "Management", email: "alice.johnson@pixell-river.com", phone: "604-555-0148", branchId: 1 },
  { id: 2, name: "Amandeep Singh", position: "Customer Service Representative", department: "Customer Service", email: "amandeep.singh@pixell-river.com", phone: "780-555-0172", branchId: 2 },
  { id: 3, name: "Maria Garcia", position: "Loan Officer", department: "Loans", email: "maria.garcia@pixell-river.com", phone: "204-555-0193", branchId: 3 },
  { id: 4, name: "James Wilson", position: "IT Support Specialist", department: "IT", email: "james.wilson@pixell-river.com", phone: "604-555-0134", branchId: 1 },
  { id: 5, name: "Linda Martinez", position: "Financial Advisor", department: "Advisory", email: "linda.martinez@pixell-river.com", phone: "780-555-0165", branchId: 2 },
  { id: 6, name: "Michael Brown", position: "Teller", department: "Operations", email: "michael.brown@pixell-river.com", phone: "204-555-0187", branchId: 3 },
  { id: 7, name: "Patricia Taylor", position: "Operations Manager", department: "Operations", email: "patricia.taylor@pixell-river.com", phone: "204-555-0204", branchId: 3 },
  { id: 8, name: "Chen Wei", position: "Senior Loan Officer", department: "Loans", email: "chen.wei@pixell-river.com", phone: "204-555-0218", branchId: 5 },
  { id: 9, name: "Charles Thomas", position: "Accountant", department: "Finance", email: "charles.thomas@pixell-river.com", phone: "204-555-0225", branchId: 5 },
  { id: 10, name: "Elizabeth Jackson", position: "Marketing Specialist", department: "Marketing", email: "elizabeth.jackson@pixell-river.com", phone: "204-555-0234", branchId: 5 },
];

// Fetch all employees
export const getAllEmployees = async (): Promise<Employee[]> => {
  return employees;
};

// Get an employee by ID
export const getEmployeeById = async (id: number): Promise<Employee | undefined> => {
  return employees.find(employee => employee.id === id);
};

// Create a new employee
export const createEmployee = async (employeeData: Omit<Employee, "id">): Promise<Employee> => {
  const newEmployee: Employee = { id: employees.length + 1, ...employeeData };
  employees.push(newEmployee);
  return newEmployee;
};

// Update an employee
export const updateEmployee = async (id: number, updatedData: Partial<Employee>): Promise<Employee | null> => {
  const employeeIndex = employees.findIndex(employee => employee.id === id);
  if (employeeIndex === -1) {
    return null;
  }
  employees[employeeIndex] = { ...employees[employeeIndex], ...updatedData };
  return employees[employeeIndex];
};

// Delete an employee
export const deleteEmployee = async (id: number): Promise<boolean> => {
  const employeeIndex = employees.findIndex(employee => employee.id === id);
  if (employeeIndex === -1) {
    return false;
  }
  employees.splice(employeeIndex, 1);
  return true;
};

// Get employees by branch ID
export const getEmployeesByBranch = async (branchId: number): Promise<Employee[]> => {
  return employees.filter(employee => employee.branchId === branchId);
};

// Get employees by department
export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
  return employees.filter(employee => employee.department === department);
};
