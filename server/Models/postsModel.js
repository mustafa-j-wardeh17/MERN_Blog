import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    username: { type: String, required: true },
    userId: { type: String, required: true },
    categories: { type: Array },
    image: { type: String },
}, { timestamps: true })

const postsModel = mongoose.model('posts', postsSchema)

export default postsModel