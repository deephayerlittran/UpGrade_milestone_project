import { Request, Response } from "express";
import {
  fetchAllEmployees, 
  addEmployee, 
  modifyEmployee, 
  removeEmployee, 
  fetchEmployeeById 
} from "../services/employeeService";
import { Employee } from "../interfaces/Employee";

export const getAllEmployees = (req: Request, res: Response): void => {
  const employees: Employee[] = fetchAllEmployees();
  res.status(200).json({ message: "Fetched all employees", data: employees });
};

export const getEmployeeById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const employee: Employee | null = fetchEmployeeById(id);

  if (!employee) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }

  res.status(200).json({ message: "Fetched employee", data: employee });
};

export const createEmployee = (req: Request, res: Response): void => {
  const { name, position } = req.body;

  if (!name || !position) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const newEmployee: Employee = addEmployee({ id: "", name, position, department: "", email: "", phone: "", branchId: "" });
  res.status(201).json({ message: "Employee created", data: newEmployee });
};

export const updateEmployee = (req: Request, res: Response): void => {
  const { id } = req.params;
  const updates: Partial<Employee> = req.body;

  if (Object.keys(updates).length === 0) {
    res.status(400).json({ message: "No updates provided" });
    return;
  }

  const updatedEmployee = modifyEmployee(id, updates);
  if (!updatedEmployee) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }

  res.status(200).json({ message: "Employee updated", data: updatedEmployee });
};

export const deleteEmployee = (req: Request, res: Response): void => {
  const { id } = req.params;
  const success = removeEmployee(id);

  if (!success) {
    res.status(404).json({ message: "Employee not found" });
    return;
  }

  res.status(200).json({ message: "Employee deleted" });
};
