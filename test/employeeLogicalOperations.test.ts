import request from "supertest";
import app from "../src/app"; 

describe("Employee CRUD Operations", () => {
    it("should create a new employee", async () => {
        const response = await request(app)
            .post("/api/v1/employees")
            .send({
                name: "Test Employee",
                position: "Developer",
                department: "IT",
                email: "test.employee@example.com",
                phone: "123-456-7890",
                branchId: 1, 
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Test Employee");
    });

    it("should not create an employee with invalid data", async () => {
        const response = await request(app).post("/api/v1/employees").send({}); 
        expect(response.status).toBe(400); 
    });

    it("should get all employees", async () => {
        const response = await request(app).get("/api/v1/employees");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        
    });

    it("should get a single employee by ID", async () => {
        // First, create an employee to get its ID
        const createResponse = await request(app)
            .post("/api/v1/employees")
            .send({
                name: "Test Employee",
                position: "Developer",
                department: "IT",
                email: "test.employee@example.com",
                phone: "123-456-7890",
                branchId: 1, 
            });

        expect(createResponse.status).toBe(201);
        const createdEmployeeId = createResponse.body.id;

        const getResponse = await request(app).get(`/api/v1/employees/${createdEmployeeId}`);
        expect(getResponse.status).toBe(200);
        expect(getResponse.body).toHaveProperty("id", createdEmployeeId);
        expect(getResponse.body.name).toBe("Test Employee");
    });

    it("should return 404 when employee ID does not exist", async () => {
        const response = await request(app).get(`/api/v1/employees/99999`); 
        expect(response.status).toBe(404);
    });

    it("should update an employee", async () => {
        // First, correctly CREATE an employee to get a valid ID
        const createResponse = await request(app)
            .post("/api/v1/employees") // Correct POST endpoint for creation
            .send({
                name: "Test Employee",
                position: "Developer",
                department: "IT",
                email: "test.employee@example.com",
                phone: "123-456-7890",
                branchId: 1,
            });
    
        expect(createResponse.status).toBe(201); // Expect 201 for successful creation
        const employeeIdToUpdate = createResponse.body.id;
    
        const updatedEmployeeData = {
            position: "Senior Developer",
            phone: "987-654-3210",
        };
    
        const updateResponse = await request(app)
            .put(`/api/v1/employees/${employeeIdToUpdate}`) // Correct PUT endpoint for update with ID
            .send(updatedEmployeeData);
    
        expect(updateResponse.status).toBe(200); // Expect 200 for successful update
        expect(updateResponse.body.position).toBe("Senior Developer");
        expect(updateResponse.body.phone).toBe("987-654-3210");
    });

    it("should delete an employee", async () => {
        const createResponse = await request(app)
            .post("/api/v1/employees")
            .send({
                name: "Test Employee",
                position: "Developer",
                department: "IT",
                email: "test.employee@example.com",
                phone: "123-456-7890",
                branchId: 1, 
            });

        expect(createResponse.status).toBe(201);
        const employeeIdToDelete = createResponse.body.id;


        const deleteResponse = await request(app).delete(`/api/v1/employees/${employeeIdToDelete}`);
        expect(deleteResponse.status).toBe(200); 
        expect(deleteResponse.body.message).toBe("Employee deleted successfully");
    });

    it("should get employees by branch ID", async () => {
        const response = await request(app).get("/api/v1/employees/branch/1"); 
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it("should get employees by department", async () => {
        const response = await request(app).get("/api/v1/employees/department/IT");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        
    });
});