
import express from 'express'
import { loginController, registerController } from '../Controllers/authController.js'


const authRouter = express.Router()

authRouter.post('/Register', registerController)


authRouter.post('/login', loginController)



export default authRouter
