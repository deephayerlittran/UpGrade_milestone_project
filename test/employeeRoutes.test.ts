import request from "supertest";
import express from "express";
import routes from "../src/api/v1/routes/employeeRoutes";
import * as controller from "../src/api/v1/controllers/employeeController";

jest.mock("../src/api/v1/controllers/employeeController");

const app = express();
app.use(express.json());
app.use("/api/v1", routes);

describe("Employee API Endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/v1/employees", () => {
    it("should call create controller", async () => {
      const mockEmployee = { name: "John Doe", position: "Software Engineer" };

      (controller.createEmployee as jest.Mock).mockImplementationOnce((req, res) => {
        res.status(201).json({ message: "Employee created", data: { id: "1", ...mockEmployee } });
      });

      const response = await request(app).post("/api/v1/employees").send(mockEmployee);
      expect(controller.createEmployee).toHaveBeenCalled();
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Employee created");
      expect(response.body.data).toHaveProperty("id");
    });
  });

  describe("GET /api/v1/employees", () => {
    it("should call getAll controller", async () => {
      (controller.getAllEmployees as jest.Mock).mockImplementationOnce((req, res) => {
        res.status(200).json({ message: "Fetched all employees", data: [] });
      });

      const response = await request(app).get("/api/v1/employees");
      expect(controller.getAllEmployees).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe("GET /api/v1/employees/:id", () => {
    it("should call getEmployeeById controller", async () => {
      const mockEmployee = { id: "1", name: "John Doe", position: "Software Engineer" };

      (controller.getEmployeeById as jest.Mock).mockImplementationOnce((req, res) => {
        res.status(200).json({ message: "Fetched employee", data: mockEmployee });
      });

      const response = await request(app).get("/api/v1/employees/1");
      expect(controller.getEmployeeById).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe("1");
    });
  });

  describe("PUT /api/v1/employees/:id", () => {
    it("should call update controller", async () => {
      const mockUpdate = { position: "Senior Engineer" };

      (controller.updateEmployee as jest.Mock).mockImplementationOnce((req, res) => {
        res.status(200).json({ message: "Employee updated", data: { id: "1", ...mockUpdate } });
      });

      const response = await request(app).put("/api/v1/employees/1").send(mockUpdate);
      expect(controller.updateEmployee).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body.data.position).toBe("Senior Engineer");
    });
  });

  describe("DELETE /api/v1/employees/:id", () => {
    it("should call delete controller", async () => {
      (controller.deleteEmployee as jest.Mock).mockImplementationOnce((req, res) => {
        res.status(200).json({ message: "Employee deleted" });
      });

      const response = await request(app).delete("/api/v1/employees/1");
      expect(controller.deleteEmployee).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Employee deleted");
    });
  });
});