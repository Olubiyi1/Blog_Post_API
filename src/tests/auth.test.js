import request from "supertest";
import app from "../app.js";
import { describe, it, expect, beforeEach } from "@jest/globals";
import userSchema from "../User/user.model.js";

describe("User Authentication",()=>{
    // clean db before each test

    beforeEach(async()=>{
        await userSchema.deleteMany({})
    },30000)
})


describe("User Registration", () => {

  it("should register a new user successfuly", async () => {
    const userData = {
      firstName: "jide",
      lastName: "daniel",
      email: "jide@gmail.com",
      password: "12345678901",
    };

    // register user first time
    const res = await request(app).post("/api/users/register").send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("firstName", userData.firstName);
    expect(res.body).toHaveProperty("lastName", userData.lastName);
    expect(res.body).toHaveProperty("email", userData.email);
    expect(res.body).not.toHaveProperty("password");
  }, 30000);


  it("should not register user with existing email", async () => {
    const userData = {
      firstName: "jide",
      lastName: "daniel",
      email: "jide@gmail.com",
      password: "12345678901",
    };

    // trying to register same user again
    const res = await request(app).post("/api/users/register").send(userData);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  }, 30000);
});

describe("User Login", () => {

    //user login with right details
  it("should login user successfully", async () => {
    const loginData = {
      email: "jide@gmail.com",
      password: "12345678901",
    };
    const res = (await request(app).post("/api/users/login")).send(loginData)
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email",loginData.email)
    expect(res.body).toHaveProperty("token")
  },30000);


  it("should not login non existent email",async()=>{
    const loginData={
        email:"nonexistentemail@gmail.com",
        password:"123456789"
    };
    const res = (await request(app).post("/api/users/login")).send(loginData)
    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty("message")
  },30000);
  
  it("should not login with invalid password", async () => {
      const loginData = {
        email: "jide@gmail.com",
        password: "wrongpassword",
      };
      
      const res = await request(app)
        .post("/api/users/login")
        .send(loginData);
        
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message");
    }, 30000);
});

