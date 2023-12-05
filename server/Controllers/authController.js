import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../Models/usersModel.js'



//--------------------------------------------
//-------------Register User -----------------
//--------------------------------------------
export const registerController = async (req, res) => {
    const { username, image, email, password, confirmPassword } = req.body
    if (!username && !image && !email && !password && !confirmPassword) {
        return res.status(401).json({ err: "Please fill all fields" })
    }
    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(401).json({ err: 'User already exist' })
        }

        if (password !== confirmPassword) {
            return res.status(401).json({ err: 'Password doesn not match' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            username,
            image,
            email,
            password: hashPassword,
        })

        const addedUser = await newUser.save()
        res.json(addedUser)
    }
    catch (err) {
        return res.status(500).json({ err: 'Something went wrong' })
    }
}


//--------------------------------------------
//----------------Login User -----------------
//--------------------------------------------
export const loginController = async (req, res) => {
    const { email, password } = req.body
    if (!email && !password) {
        return res.status(401).json({ err: "Please fill all fields" })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ err: 'User does not found' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ err: 'Password doesn not match' })
        }
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '3d' })

        res.cookie("token", token).status(200)
        res.status(200).json(user._id)
    }
    catch (err) {
        return res.status(500).json({ err: 'Something went wrong' })
    }
}


//--------------------------------------------
//----------------Logout User-----------------
//--------------------------------------------

export const logoutController = (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" })
}


//--------------------------------------------
//----------------Get token-------------------
//--------------------------------------------

export const verifyUser = (req, res) => {
    try {
        res.json({
            id: req.id,
            username: req.username
        })
    }
    catch (err) {
        res.status(401).json('please login to your account')
    }
}