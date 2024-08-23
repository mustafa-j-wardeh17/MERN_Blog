import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/authRoute.js"
import userRouter from './Routes/userRoute.js'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import postRouter from "./Routes/postsRoute.js";
import commentRouter from "./Routes/commentRoute.js";
import { loggerMiddleware } from "./Middlewares/Logger.js";
import { ErrorHandler, PageNotFound } from "./Middlewares/ErrorHandler.js";

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
  .then(() => { console.log('Connected Successfully to DB') })
  .catch((err) => { console.log('Failed Connection to DB' + err) })



const app = express()


app.use(cors({
  origin: 'https://mern-blog-ecru-three.vercel.app',
  credentials: true
}));

app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())

//------------------------------------
//----------Logger Middleware---------
//------------------------------------
app.use(loggerMiddleware)

// Increase the limit to handle larger payloads (adjust the limit as needed)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


//-------------------------------------
//----------Application Routes---------
//-------------------------------------
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/comment', commentRouter)


//-------------------------------------------
//----------Error Handler Middleware---------
//-------------------------------------------

app.use(PageNotFound)
app.use(ErrorHandler)

app.listen(8016, () => {
  console.log('Connected Successfully to server ')
})
