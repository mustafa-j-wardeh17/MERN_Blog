import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    desc: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    categories: { type: Array },
}, { timestamps: true })

const postsModel = mongoose.model('users', postsSchema)

export default postsModel