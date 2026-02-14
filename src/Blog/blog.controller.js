import BlogService from "./blog.service.js";
import ResponseHandler from "../utils/responseHandler.js";

class BlogController {
  // Create a new blog
  static createBlog = async (req, res, next) => {
    try {
      const blogData = req.body;
      const userId = req.user.id;

      const blog = await BlogService.createBlog(blogData, userId);
      return ResponseHandler.success(res, "Blog created successfully", blog); // 201
    } catch (error) {
      next(error);
    }
  };

  // Update an existing blog
  static updateBlog = async (req, res, next) => {
    try {
      const blogId = req.params.id;
      const updatedData = req.body;
      const userId = req.user.id;

      // Check if there is data to update
      if (!Object.keys(updatedData).length) {
        return ResponseHandler.badRequest(
          res,
          "Bad Request: No data provided to update",
        );
      }

      const updatedBlog = await BlogService.updateBlog(
        blogId,
        userId,
        updatedData,
      );

      return ResponseHandler.ok(res, "Blog successfully updated", updatedBlog);
    } catch (error) {
      next(error);
    }
  };

  //   author specific blog
  static getMyBlogs = async (req, res, next) => {
    try {
      const userId = req.user.id; // logged-in user

      //  query params
      const { page, limit, state } = req.query; 

      const result = await BlogService.getMyBlogs(userId, page, limit, state);

      return ResponseHandler.ok(
        res,
        "Your blogs retrieved successfully",
        result,
      );
    } catch (error) {
      next(error);
    }
  };

  //   get all blogs (unprotected)
  static getAllBlogs = async (req, res, next) => {
    try {
      const { query } = req.query;

      // Pass all query params directly to the service
      const result = await BlogService.getAllPublishedBlogs(query);
      return ResponseHandler.ok(
        res,
        "Published blogs retrieved successfully",
        result,
      );
    } catch (error) {
      next(error);
    }
  };
}

export default BlogController;
