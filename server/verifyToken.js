import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ err: "You are no authenticated!" })
    }
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(403).json("Token in not valid!")
        }
        req.userId = decoded.id
        next()
    })
}