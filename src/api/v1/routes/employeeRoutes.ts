import express from "express";
import * as employeeController from "../controllers/employeeController";

const router = express.Router();

router.post("/employees", employeeController.createEmployee);
router.get("/employees", employeeController.getAllEmployees);
router.get("/employees/:id", employeeController.getEmployeeById);
router.put("/employees/:id", employeeController.updateEmployee);
router.delete("/employees/:id", employeeController.deleteEmployee);

// Logical Operation Endpoints
router.get("/employees/branch/:branchId", employeeController.getEmployeesByBranch);
router.get("/employees/department/:department", employeeController.getEmployeesByDepartment);

export default router;
