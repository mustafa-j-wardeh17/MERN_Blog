import mongoose from "mongoose";
import User from '../Models/usersModel.js'
import Post from '../Models/postsModel.js'
import Comment from '../Models/commentsModel.js'


//--------------------------------------------
//-------------Create Comment ----------------
//--------------------------------------------

export const createComment = async (req, res) => {
    const { comment, username, userId } = req.body
    const { postId } = req.params

    if (!comment && !author) {
        return res.status(401).json({ err: "Please fill all fields" })
    }

    try {
        const post = await Post.findById(postId)
        const user = await User.findById(userId)
        if (!post) {
            return res.status(400).json({ err: "You must login to add comment" })
        }
        const newComment = new Comment({
            comment,
            username,
            userId,
            postId,
        })

        await newComment.save()
        res.status(200).json(`${user.username} added comment successfully`)
    }
    catch (err) {
        return res.status(500).json({ err: "Something went wrong" })
    }
}



//-----------------------------------------------
//-------------Get Post Comments ----------------
//-----------------------------------------------
export const getAllComments = async (req, res) => {
    const { postId } = req.params
    try {
        const comments = await Comment.find({ postId })
        if (!comments) {
            return res.status(500).json({ err: "There is no comment to show" })
        }
        res.status(200).json(comments)
    }
    catch (err) {
        return res.status(500).json({ err: "Something went wrong" })
    }
}


//--------------------------------------------
//----------------Get Comment ----------------
//--------------------------------------------
export const getComment = async (req, res) => {
    const { commentId } = req.params
    try {
        const findComment = await Comment.findById(commentId)
        if (!findComment) {
            return res.status(500).json({ err: "Comment Does not found" })
        }
        res.status(200).json(findComment)
    }
    catch (err) {
        return res.status(500).json({ err: "Something went wrong" })
    }
}

//--------------------------------------------
//-------------Update Comment ----------------
//--------------------------------------------
export const updateComment = async (req, res) => {
    const { comment, username, postId } = req.body
    const { commentId } = req.params

    if (!comment && !username && !postId) {
        return res.status(401).json({ err: "Please fill all fields" })
    }

    try {
        const findComment = await Comment.findById(commentId)
        if (!findComment) {
            return res.status(400).json({ err: "Comment does not found" })
        }

        const updatedComment = await Comment.findByIdAndUpdate(commentId, {
            comment,
        })

        res.status(200).json(`${author} updated comment successfully`)
    }
    catch (err) {
        return res.status(500).json({ err: "Something went wrong" })
    }
}



//--------------------------------------------
//-------------Delete Comment ----------------
//--------------------------------------------
export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId)
        if (!deletedComment) {
            return res.status(500).json({ err: "The coment does not found" })
        }
        res.status(200).json("Comment deleted successfully")
    }
    catch (err) {
        return res.status(500).json({ err: "Something went wrong" })
    }
}