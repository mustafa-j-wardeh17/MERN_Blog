import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({

    image: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
})

const usersModel = mongoose.model('users', usersSchema)

export default usersModel