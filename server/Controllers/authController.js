import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../Models/usersModel.js'

export const registerController = async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body
    if (!firstname && !lastname && !email && !password && !confirmPassword) {
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
            firstname,
            lastname,
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
        const token = jwt.sign({ id: user._id, email: user.email, firstname: user.firstname, lastname: user.lastname }, process.env.SECRET_KEY, { expiresIn: '3d' })

        res.cookie("token", token).status(200)
        res.send('Login Successfully')
    }
    catch (err) {
        return res.status(500).json({ err: 'Something went wrong' })
    }
}