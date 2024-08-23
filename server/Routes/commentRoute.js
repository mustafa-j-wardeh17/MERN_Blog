import express from 'express'
import { verifyToken } from '../verifyToken.js'
import { createComment, deleteComment, getAllComments, getComment, updateComment } from '../Controllers/commentController.js'


const commentRouter = express.Router()

commentRouter.post('/create/:postId', verifyToken, createComment)
commentRouter.get('/comments/:postId', getAllComments)
commentRouter.get('/:commentId', getComment)
commentRouter.patch('/update/:commentId', verifyToken, updateComment)
commentRouter.delete('/delete/:commentId', verifyToken, deleteComment)


export default commentRouter