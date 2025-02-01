import { Router } from "express";
import * as employeeController from "../controllers/employeeController";

const router = Router();

router.post("/employees", employeeController.createEmployee);
router.get("/employees", employeeController.getAllEmployees);
router.get("/employees", employeeController.getEmployeeById);
router.put("/employees", employeeController.updateEmployee);
router.delete("/employees", employeeController.deleteEmployee);

export default router;