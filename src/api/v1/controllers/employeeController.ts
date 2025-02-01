import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

export const createEmployee = (req: Request, res: Response) => {
  const employee = employeeService.createEmployee(req.body);
  res.status(201).json(employee);
};

export const getAllEmployees = (req: Request, res: Response) => {
  res.json(employeeService.getAllEmployees());
};

export const getEmployeeById = (req: Request, res: Response) => {
  const employee = employeeService.getEmployeeById(req.params.id);
  if (!employee) return res.status(404).json({ message: "Employee not found" });

  res.json(employee);
};

export const updateEmployee = (req: Request, res: Response) => {
  const employee = employeeService.updateEmployee(req.params.id, req.body);
  if (!employee) return res.status(404).json({ message: "Employee not found" });

  res.json(employee);
};

export const deleteEmployee = (req: Request, res: Response) => {
  const success = employeeService.deleteEmployee(req.params.id);
  if (!success) return res.status(404).json({ message: "Employee not found" });

  res.json({ message: "Employee deleted successfully" });
};
