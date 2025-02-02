import { Employee } from "../interfaces/Employee";

let employees: Employee[] = [];

export const fetchAllEmployees = (): Employee[] => {
  return employees;
};

export const fetchEmployeeById = (id: string): Employee | null => {
  return employees.find((employee) => employee.id === id) || null;
};

export const addEmployee = (employee: Employee): Employee => {
  employee.id = (employees.length + 1).toString(); // Generate a simple ID for each employee
  employees.push(employee);
  return employee;
};

export const modifyEmployee = (id: string, updates: Partial<Employee>): Employee | null => {
  const employeeIndex = employees.findIndex((employee) => employee.id === id);

  if (employeeIndex === -1) return null;

  const updatedEmployee = { ...employees[employeeIndex], ...updates };
  employees[employeeIndex] = updatedEmployee;
  return updatedEmployee;
};

export const removeEmployee = (id: string): boolean => {
  const employeeIndex = employees.findIndex((employee) => employee.id === id);
  
  if (employeeIndex === -1) return false;

  employees.splice(employeeIndex, 1);
  return true;
};
