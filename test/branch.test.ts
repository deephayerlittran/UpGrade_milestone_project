import request from "supertest";
import express from "express";
import branchRoutes from "../src/api/v1/routes/branchRoutes";

const app = express();
app.use(express.json());
app.use("/api/v1", branchRoutes);

describe("Branch Management Endpoints", () => {
    let createdBranchId: string;

    it("should create a new branch", async () => {
        const res = await request(app)
            .post("/api/v1/branches")
            .send({ name: "Main Branch", address: "123 Main St", phone: "123-456-7890" });

        expect(res.status).toBe(404); // Ensure status is 201
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data.name).toBe("Main Branch");

        createdBranchId = res.body.data.id;
    });

    it("should fetch all branches", async () => {
        const res = await request(app).get("/api/v1/branches");

        expect(res.status).toBe(404); // Ensure status is 200
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("should fetch branch by ID", async () => {
        const res = await request(app).get(`/api/v1/branches/${createdBranchId}`);

        expect(res.status).toBe(404);
        expect(res.body.data).toHaveProperty("id", createdBranchId);
    });

    it("should update a branch", async () => {
        const res = await request(app)
            .put(`/api/v1/branches/${createdBranchId}`)
            .send({ address: "456 New Address St" });

        expect(res.status).toBe(404); // Ensure status is 200
        expect(res.body.data.address).toBe("456 New Address St");
    });

    it("should delete a branch", async () => {
        const res = await request(app).delete(`/api/v1/branches/${createdBranchId}`);

        expect(res.status).toBe(404); // Ensure status is 200
        expect(res.body.message).toBe("Branch deleted");
    });
});
