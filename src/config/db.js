import mongoose from "mongoose";
import config from "./config.js";

const connectDb= async()=>{
    try{
        const connect = await mongoose.connect(config.mongo_uri);
        console.log(`Mongo connected:${connect.connection.host}`);
        
        // mongoose event listener
        mongoose.connection.on("error",(err)=>{
            console.error("Error connectin to db",err);
            
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
