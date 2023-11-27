import express from 'express'
import { PreviewUser, updateUser, deleteUser } from '../Controllers/userController.js'
import { verifyToken } from '../verifyToken.js'


const userRouter = express.Router()

userRouter.get('/:id', PreviewUser)
userRouter.patch('/:id', verifyToken, updateUser)
userRouter.delete('/:id', verifyToken, deleteUser)


export default userRouter