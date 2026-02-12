import UserController from "./user.controllers.js";
import express, { urlencoded } from "express"
import UserValidation from "./user.validation.js";
import validate from "../middlewares/validationMiddleware.js";

const userRouter = express.Router()


userRouter.post("/register",validate(UserValidation.registerUser),UserController.createUser)
userRouter.post("/login",validate(UserValidation.loginUser),UserController.userLogin)

export default userRouter;