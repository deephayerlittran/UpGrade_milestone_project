import request from "supertest";
import express from "express";
import employeeRoutes from "../src/api/v1/routes/employeeRoutes";

const app = express();
app.use(express.json());
app.use("/api/v1", employeeRoutes);

describe("Employee Logical Operations", () => {
    beforeAll(async () => {
        // Creating employees
        await request(app).post("/api/v1/employees").send({
            name: "John Doe",
            position: "Developer",
            department: "IT",
            email: "john@example.com",
            phone: "123-456-7890",
            branchId: "1"
        });

        await request(app).post("/api/v1/employees").send({
            name: "Jane Smith",
            position: "Manager",
            department: "HR",
            email: "jane@example.com",
            phone: "987-654-3210",
            branchId: "2"
        });
    });

    it("should fetch employees for a given branch", async () => {
        const res = await request(app).get("/api/v1/employees/branch/1");

        expect(res.status).toBe(200); // Ensure the status code is correct
        expect(res.body.data).toBeInstanceOf(Array); // Ensures data is an array
        if (res.body.data.length > 0) {
            expect(res.body.data[0].branchId).toBe("1");
        }
    });

    it("should return 404 when no employees are found for a branch", async () => {
        const res = await request(app).get("/api/v1/employees/branch/999");
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "No employees found");
    });

    it("should fetch employees for a given department", async () => {
        const res = await request(app).get("/api/v1/employees/department/IT");

        expect(res.status).toBe(200);
        expect(res.body.data).toBeInstanceOf(Array);
        if (res.body.data.length > 0) {
            expect(res.body.data[0].department).toBe("IT");
        }
    });

    it("should return 404 when no employees are found for a department", async () => {
        const res = await request(app).get("/api/v1/employees/department/unknown");
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("message", "No employees found");
    });
});
