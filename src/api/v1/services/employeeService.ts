import { Employee } from "../interfaces/Employee";

let employees: Employee[] = []; // Mock database

export const createEmployee = (employee: Employee): Employee => {
  employee.id = (employees.length + 1).toString();
  employees.push(employee);
  return employee;
};

export const getAllEmployees = (): Employee[] => {
  return employees;
};

export const getEmployeeById = (id: string): Employee | null => {
  return employees.find((emp) => emp.id === id) || null;
};

export const updateEmployee = (id: string, updates: Partial<Employee>): Employee | null => {
  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) return null;

  employees[index] = { ...employees[index], ...updates };
  return employees[index];
};

export const deleteEmployee = (id: string): boolean => {
  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) return false;

  employees.splice(index, 1);
  return true;
};
