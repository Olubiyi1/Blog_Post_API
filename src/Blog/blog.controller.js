import BlogService from "./blog.service.js";
import ResponseHandler from "../utils/responseHandler.js";

class BlogController{

    static createBlog = async(req,res,next)=>{
        try{

            const blogData = req.body

            const userId = req.user.id

            const blog = await BlogService.createBlog(blogData,userId)

            return ResponseHandler.success(res,"Blog Created Successfully",blog)

        }
        catch(error){
            next(error)
        }
    }
}

export default BlogController;