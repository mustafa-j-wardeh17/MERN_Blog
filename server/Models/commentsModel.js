import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    author: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    postId: { type: String, required: true },
},{timestamps:true})

const commentsModel = mongoose.model('users', commentsSchema)

export default commentsModel