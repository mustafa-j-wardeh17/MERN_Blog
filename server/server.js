import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/authRoute.js"
import userRouter from './Routes/userRoute.js'
import dotenv from 'dotenv'
import postRouter from "./Routes/postsRoute.js";
import commentRouter from "./Routes/commentRoute.js";

dotenv.config()

mongoose.connect('mongodb+srv://killswitsh:killswitsh@cluster0.ofgju95.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => { console.log('Connected Successfully to DB') })
    .catch((err) => { console.log('Failed Connection to DB' + err) })



const app = express()

// app.use(cors({ origin: 'http://localhost:5173/', credentials: true }))
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/comment', commentRouter)


app.listen(8016, () => {
    console.log('Connected Successfully to server ')
})