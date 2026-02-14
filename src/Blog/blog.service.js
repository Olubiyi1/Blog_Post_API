import AppError from "../errorHandlers/appError.js";
import blogSchema from "./blog.model.js";
import userschema from "../User/user.model.js"
import mongoose from "mongoose";


// simple reading time calculator
const calculateReadingTime = (text) => {
  if (!text) return "1 min";
  const words = text.split(" ").length; // fixed typo
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

class BlogService {
    // create blogs
  static createBlog = async (blogData, userId) => {

    // attach author
    blogData.author = userId;

    // calculate reading time
    blogData.readingTime = calculateReadingTime(blogData.body);

    // save to DB
    const blog = await blogSchema.create(blogData);

    return blog;
  };

//   update blogs
  static updateBlog = async (blogId, userId, updateData) => {

    //validates the Id's
    if(!mongoose.Types.ObjectId.isValid(blogId)){
      throw new AppError("Invalid blog ID",400)
    }

    const blog = await blogSchema.findById(blogId);
    if (!blog) {
      throw new AppError("Blog not found", 404);
    }

    // check ownership
    if (blog.author.toString() !== userId) {
      throw new AppError("You are not the owner of this blog", 403);
    }

    // recalc readingTime if body changes
    if (updateData.body) {
      updateData.readingTime = calculateReadingTime(updateData.body);
    }

    // update blog
    Object.assign(blog, updateData); // merge updates
    await blog.save(); // save to DB

    return blog;
  };

//   author gets their blogs
  static getMyBlogs = async(page = 1,limit = 10,state)=>{


    // calc skip pages
    const skip = (page - 1) * limit

    // filter bu author id
    const filter = {author :userId}

    // add state
    if(state){
        filter.state = state
    }
     //Count total blogs for pagination metadata
    const totalBlogs = await blogSchema.countDocuments(filter);

       // Calculate total pages
    const totalPages = Math.ceil(totalBlogs / limit);

    //  Fetch blogs with filter, skip, limit, newest first
    const blogs = await blogSchema
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Return blogs + pagination info
    return {
      totalBlogs,
      totalPages,
      currentPage: page,
      blogs,
    };
  };

//   get all published blogs
  static getAllPublishedBlogs = async (query) => {
    let {
      page = 1,
      limit = 20,
      search = "",
      author = "",
      tags = [],
      sortBy = "createdAt",
      order = "desc",
    } = query;

    // convert page and limit to numbers
    page = Number(page);
    limit = Number(limit);

    // calculate number of dic to skip
    const skip = (page - 1) * limit;

    const filter = {state:"published"}

    if (search) {
      // Search in title
      // case-insensitive "i"
      filter.title = { $regex: search, $options: "i" }; 
    }

    if (author) {
      // Search by author mathching with name

      const authors = await userschema.find({
        name:{$regex:author,$options:"i"}
      }).select("_id")

      const authorIds = authors.map(a => a._id)
      filter.author = { $in:authorIds}
      
    }

     if (tags.length) {
      // If tags is a string, convert to array
      if (typeof tags === "string") {
        tags = tags.split(",");
      }
      filter.tags = { $in: tags }; 
    }

        // Build sort object
    const sortOrder = order === "asc" ? 1 : -1;
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder;

    // calc total number of published blogs for metadat
    const totalBlogs = await blogSchema.countDocuments(filter);

    // calc total pages
    const totalPages = Math.ceil(totalBlogs / limit);

    // Fetch only published blogs and sort by latest published
    const blogs = await blogSchema
      .find(filter)
      .sort(sortOptions)
      .limit(limit)
      .skip(skip)
      .populate("author", "name email");

    return {
      totalBlogs,
      totalPages,
      currentPage: page,
      blogs,
    };
  };

  static deleteBlog = async(id)=>{

    // validate id format
      if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid blog ID",400)};

   const blog = await blogSchema.findById(id)
    if(!blog){
      return new AppError("Blog not found",404)
    }

    // author can only their own post
    if(blog.author.toString() !== userId.toString()){
      return new AppError("you can only delete your own blogs",400)
    }

    // soft delete
    blog.isDeleted = true;
    blog.deleteAt = new Date()
    await blog.save()

    return{messge:"Blog deleted successfully", deletedBlog:blog}
}
}

export default BlogService;
