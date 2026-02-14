import BlogController from "./blog.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import express from "express";
import BlogValidation from "./blogValidation.js";
import validate from "../middlewares/validationMiddleware.js";

const blogRouter = express.Router()

blogRouter.get("/",BlogController.getAllBlogs)

// all protected routes
blogRouter.use(authMiddleware)
blogRouter.get("/my-blogs", BlogController.getMyBlogs);
blogRouter.post("/",validate(BlogValidation.createBlogSchema),BlogController.createBlog)
blogRouter.patch("/:id",validate(BlogValidation.updateBlogSchema),BlogController.updateBlog)


export default blogRouter;