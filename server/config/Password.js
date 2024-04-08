const bcrypt = require('bcryptjs')

const encrypt = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 10)
        return hash
    } catch {
        console.log(err)
    }
}

const comparePassword = async (password, hash) => {
    try {
        const res = await bcrypt.compare(password, hash)
        return res
    } catch {
        console.log(err)
    }
}

module.exports = { encrypt, comparePassword }
