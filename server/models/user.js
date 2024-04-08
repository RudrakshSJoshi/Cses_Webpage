const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    adm_no: {
        type: String,
        required: true,
        unique: true,
        collation: { locale: 'en', strength: 2 }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        collation: { locale: 'en', strength: 2 }
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['CSES', 'ADMIN', 'ALUMNI'],
        required: true
    },
    grad_year: {
        type: Number,
        required: true
    },
    dept_id: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' })

const User = mongoose.model('user', userSchema) // User is model

module.exports = User
