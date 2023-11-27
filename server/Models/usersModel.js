import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

const usersModel = mongoose.model('users', usersSchema)

export default usersModel