import request from "supertest";
import app from "../src/app";

describe("Employee API Endpoints", () => {
    let employeeId: string;

    it("should create a new employee", async () => {
        const response = await request(app)
          .post("/api/v1/employees")
          .send({
            name: "John Doe",
            position: "Software Engineer",
            department: "IT",
            email: "john.doe@example.com",
            phone: "1234567890",
            branchId: "101",
          });
    
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        employeeId = response.body.id;
      });

      it("should get all employees", async () => {
        const response = await request(app).get("/api/v1/employees");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
      });

      it("should get an employee by ID", async () => {
        const response = await request(app).get(`/api/v1/employees/${employeeId}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(employeeId);
      });

      it("should update an employee", async () => {
        const response = await request(app)
          .put(`/api/v1/employees/${employeeId}`)
          .send({ position: "Senior Engineer" });
    
        expect(response.status).toBe(200);
        expect(response.body.position).toBe("Senior Engineer");
      });

      it("should delete an employee", async () => {
        const response = await request(app).delete(`/api/v1/employees/${employeeId}`);
        expect(response.status).toBe(200);
      });

      it("should return 404 for a deleted employee", async () => {
        const response = await request(app).get(`/api/v1/employees/${employeeId}`);
        expect(response.status).toBe(404);
      });
});