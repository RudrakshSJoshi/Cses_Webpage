const User = require('../models/user')
const { verifyToken } = require('../config/generateToken')

const protect = async (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = verifyToken(token)
            req.user = await User.findById(decoded.id)
            next()
        } catch {
            return res
                .status(401)
                .json({ status: 401, message: 'Not authorized, Token failed' })
        }
    } else {
        return res
            .status(401)
            .json({ status: 401, message: 'Not authorized, Token failed' })
    }
}

module.exports = { protect }
