import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, 'Title is required'],
      trim: true
    },
    description: { 
      type: String, 
      required: [true, 'Description is required'],
      trim: true
    },
    body: { 
      type: String, 
      required: [true, 'Blog body is required']
    },
    tags: { 
      type: [String], 
      default: []
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, 'Author is required']
    },
    state: { 
      type: String, 
      enum: ["draft", "published"],
      default: "draft" 
    },
    readCount: {        
      type: Number, 
      default: 0
    },
    readingTime: {      
      type: Number
    }
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);