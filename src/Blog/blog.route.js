import BlogController from "./blog.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import express from "express";
import BlogValidation from "./blogValidation.js";
import validate from "../middlewares/validationMiddleware.js";

const blogRouter = express.Router()

blogRouter.post("/",authMiddleware,validate(BlogValidation.createBlogSchema),BlogController.createBlog)


export default blogRouter;