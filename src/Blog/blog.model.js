import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    tags: { type: [String], default: [] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    state: { type: String, enum: ["draft", "published"], default: "draft" },
    readCount: { type: Number, default: 0 },
    readingTime: { type: Number },
    deletedAt:{type:Date,default:null},
    isDeleted:{type:Boolean,default:false}
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
