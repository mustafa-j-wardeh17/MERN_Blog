import mongoose from "mongoose";
import User from '../Models/usersModel.js'
import Post from '../Models/postsModel.js'
import Comment from '../Models/commentsModel.js'


//--------------------------------------------
//---------------Create Post -----------------
//--------------------------------------------
export const createPost = async (req, res) => {
    const { title, desc, username, image, categories } = req.body
    const { userId } = req.params

    if (!title && !desc && !username && image) {
        return res.status(401).json({ err: "Please fill all fields" })
    }

    try {
        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({ err: "You must login to add posts" })
        }
        const newPost = new Post({
            title,
            desc,
            username,
            image,
            categories,
            userId
        })

        await newPost.save()
        res.status(200).json(`${username} added post successfully`)
    }
    catch (err) {
        return res.status(500).json({ err: "Something went wrong" })
    }
}


//--------------------------------------------
//----------------Get Posts ------------------
//--------------------------------------------
export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find()
        if (!posts) {
            return res.status(500).json({ err: "There is no post to show" })
        }
        res.status(200).json(posts)
    }
    catch (err) {
        return res.status(500).json({ err: "Something went wrong" })
    }
}



//--------------------------------------------
//----------------Get Post -------------------
//--------------------------------------------
export const getPost = async (req, res) => {
    const { postId } = req.params
    try {
        const findPost = await Post.findById(postId)
        if (!findPost) {
            return res.status(500).json({ err: "Post Does not found" })
        }
        res.status(200).json(findPost)
    }
    catch (err) {
        return res.status(500).json({ err: "Something went wrong" })
    }
}




//--------------------------------------------
//--------------Update Post ------------------
//--------------------------------------------
export const updatePost = async (req, res) => {
    const { title, desc, username, image, categories } = req.body
    const {postId} = req.params

    if (!title && !desc && !username && image) {
        return res.status(401).json({ err: "Please fill all fields" })
    }

    try {
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(400).json({ err: "Post does not found" })
        }

        const updatedPost = await Post.findByIdAndUpdate(postId,{
            title,
            desc,
            username,
            image,
            categories
        })

        res.status(200).json(`${username} updated post successfully`)
    }
    catch (err) {
        return res.status(500).json({ err: "Something went wrong" })
    }
}



//--------------------------------------------
//---------------Delete Post -----------------
//--------------------------------------------
export const deletePost = async (req, res) => {
    const { postId } = req.params;
    try {
        const deletedPost = await Post.findByIdAndDelete(postId)
        if (!deletedPost) {
            return res.status(500).json({ err: "The post does not found" })
        }
        await Comment.deleteMany({ postId })
        res.status(200).json("Deletion successful")
    }
    catch (err) {
        return res.status(500).json({ err: "Something went wrong" })
    }
}