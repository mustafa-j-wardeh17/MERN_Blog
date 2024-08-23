
import express from 'express'
import { loginController, logoutController, registerController, verifyUser } from '../Controllers/authController.js'
import { verifyToken } from '../verifyToken.js'


const authRouter = express.Router()

authRouter.post('/register', registerController)


authRouter.post('/login', loginController)
authRouter.get('/logout', logoutController)

authRouter.get('/verify', verifyToken, verifyUser)



export default authRouter
