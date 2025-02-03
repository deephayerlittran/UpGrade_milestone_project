import request from "supertest";
import express from "express";
import employeeRoutes from "../src/api/v1/routes/employeeRoutes";

const app = express();
app.use(express.json());
app.use("/api/v1", employeeRoutes);

describe("Employee Logical Operations", () =>{
    beforeAll(async () => {
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
    
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data[0].branchId).toBe("1");
    });

    it("should return 404 if no employees found for a branch", async () => {
        const res = await request(app).get("/api/v1/employees/branch/99");
    
        expect(res.status).toBe(404);
    });

    it("should fetch employees for a given department", async () => {
        const res = await request(app).get("/api/v1/employees/department/IT");
    
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data[0].department).toBe("IT");
    });

    it("should return 404 if no employees found for a department", async () => {
        const res = await request(app).get("/api/v1/employees/department/Finance");
    
        expect(res.status).toBe(404);
    });
});