import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    author: { type: String, required: true },
    userId: { type: String, required: true},
    postId: { type: String, required: true },
}, { timestamps: true })

const commentsModel = mongoose.model('comments', commentsSchema)

export default commentsModel