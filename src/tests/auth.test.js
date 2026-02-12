import request from "supertest";
import app from "../app.js";
import { describe, it, expect } from '@jest/globals';

console.log("App is:", app);
console.log("Type:", typeof app);
describe("User Registration",()=>{
    it("should register a new user successfuly",async()=>{
        const userData={
            firstName:"jide",
            lastName:"daniel",
            email:"jide@gmail.com",
            password:"Littlerat1#"
        };
        const res = await request(app).post("/api/users/register").send(userData)

            console.log("\n=== DEBUG INFO ===");
        console.log("Status Code:", res.statusCode);
        console.log("Response Body:", JSON.stringify(res.body, null, 2));
        console.log("Response Text:", res.text);
        console.log("==================\n");
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("firstName",userData.firstName);
        expect(res.body).toHaveProperty("lastName",userData.lastName);
        expect(res.body).toHaveProperty("email",userData.email);
        expect(res.body).not.toHaveProperty("password")

    },
30000)
})