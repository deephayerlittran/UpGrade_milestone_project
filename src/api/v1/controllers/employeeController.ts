import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "../interfaces/Employee";

// Helper function to handle unknown errors
const handleError = (error: unknown, res: Response, message: string) => {
  if (error instanceof Error) {
    res.status(500).json({ message, error: error.message });
  } else {
    res.status(500).json({ message, error: "An unknown error occurred" });
  }
};

// Create a new employee
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeData: Employee = req.body;
    const newEmployee = await employeeService.createEmployee(employeeData);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
    handleError(error, res, "Error creating employee");
  }
};

// Get all employees
export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    handleError(error, res, "Error fetching employees");
  }
};

// Get employee by ID
export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeId = parseInt(req.params.id, 10);
    const employee = await employeeService.getEmployeeById(employeeId);
    
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    handleError(error, res, "Error fetching employee");
  }
};

// Update employee details
export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeId = parseInt(req.params.id, 10);
    const updatedData: Partial<Employee> = req.body;
    const updatedEmployee = await employeeService.updateEmployee(employeeId, updatedData);

    if (updatedEmployee) {
      res.status(200).json(updatedEmployee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    handleError(error, res, "Error updating employee");
  }
};

// Delete employee
export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeId = parseInt(req.params.id, 10);
    const result = await employeeService.deleteEmployee(employeeId);

    if (result) {
      res.status(200).json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    handleError(error, res, "Error deleting employee");
  }
};

// Get employees by branch ID
export const getEmployeesByBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const branchId = parseInt(req.params.branchId, 10);
    const employees = await employeeService.getEmployeesByBranch(branchId);
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    handleError(error, res, "Error fetching employees by branch");
  }
};

// Get employees by department
export const getEmployeesByDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const department = req.params.department;
    const employees = await employeeService.getEmployeesByDepartment(department);
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    handleError(error, res, "Error fetching employees by department");
  }
};
