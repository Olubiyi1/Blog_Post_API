import blogSchema from "./blog.model.js"

// simple calculator

const calculateReadingTime = (text)=>{
    if(!text) {
        return "1 min"
    }
    const words = text.split(" ").lenght
    const minutes = Math.ceil(words/200)
    return `${minutes} min read`
}

class BlogService{

    static createBlog = async(blogData,userId)=>{

        // attaching author
        blogAuthor = userId

        // default values
        blogData.this.state = "draft"
        blogData.readCount = 0
        blogData.timestamp = new Date();

        // calculating reading time
        blogData.readingTime = calculateReadingTime(blogData.body)


        // save to Db
        const blog = await blogSchema.create(blogData)

        return blog
    }

}

export default BlogService;