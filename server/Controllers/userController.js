import User from '../Models/usersModel.js'
import Post from '../Models/postsModel.js'
import Comment from '../Models/commentsModel.js'
import bcrypt from 'bcrypt'


//--------------------------------------------
//-------------- Review User -----------------
//--------------------------------------------
export const PreviewUser = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ err: "No user found" })
        }
        res.status(200).json({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        })
    }
    catch (err) {
        return res.status(500).json({ err: 'Something went wrong' })
    }
}



//--------------------------------------------
//-------------- Update User -----------------
//--------------------------------------------
export const updateUser = async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body
    const userId = req.params.id
    if (!firstname && !lastname && !email && !password && !confirmPassword) {
        return res.status(401).json({ err: "Please fill all fields" })
    }
    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ err: "Password does not match" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        const updatedUser = await User.findByIdAndUpdate(userId,
            {

                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hashPassword

            },
            { new: true }
        )
        res.status(200).json({
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            email: updatedUser.email
        })
    }
    catch (err) {
        return res.status(500).json({ err: 'Something went wrong' })
    }
}


//--------------------------------------------
//-------------- Delete User -----------------
//--------------------------------------------
export const deleteUser = async (req, res) => {
    const userId = req.params.id
    try {
        await User.findByIdAndDelete(userId)
        await Post.deleteMany({ userId: userId })
        await Comment.deleteMany({ userId: userId })
        res.status(200).json('User deleted successfully')
    }
    catch (err) {
        return res.status(500).json("Something went wrong")
    }
} 