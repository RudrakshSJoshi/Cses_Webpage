const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwt_secret = process.env.JWT_SECRET

const generateToken = (id) => {
    return jwt.sign({ id }, jwt_secret, {
        expiresIn: '3h'
    })
}

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, jwt_secret)
        return decoded
    } catch (err) {
        console.log(err)
    }
}

module.exports = { generateToken, verifyToken }