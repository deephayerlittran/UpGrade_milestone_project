import request from "supertest";
import app from "../src/app";

describe("API Routes", () => {
    it("should return 200 OK for /health", async () => {
        const response = await request(app).get("/health");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Server is healthy");
    });
});