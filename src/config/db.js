import mongoose from "mongoose";
import config from "./config.js";
import ResponseHandler from "../utils/responseHandler.js";

const connectDb= async()=>{
    try{
        const connect = await mongoose.connect(config.mongo_uri);
        // const connect = await mongoose.connect(config.test_db);
        console.log(`Mongo connected:${connect.connection.host}`);
        
        // mongoose event listener
        mongoose.connection.on("error",(err)=>{
            // return ResponseHandler.error("Error connecting db")
            console.error("Error connectin to db:",err);
            
            
        })
        mongoose.connection.on("disconnected",()=>{
            console.log("mongoDb disconnected");
        })
    }
    catch(err){
        console.error("error connecting to db",err)
        process.exit(1)
    }
}
export default connectDb;
