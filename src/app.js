import express from "express"
import { globalErrorHandler } from "./errorHandlers/globalErrorHandler.js";
import { notFoundHandler } from "./errorHandlers/notFound.js";
import userRouter from "./User/user.route.js";
import blogRouter from "./Blog/blog.route.js";

const app = express()
app.use(express.json())

// user route
app.get("/homepage",(req,res)=>{
    res.json({
        message:"welcome home",
        status:"server is running successfully"
    })
})
app.use("/api/users",userRouter)
app.use(/api/blog,blogRouter)
app.use(notFoundHandler)
app.use(globalErrorHandler)
export default app;
