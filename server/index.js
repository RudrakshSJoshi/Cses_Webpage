const express = require('express')
const dotenv = require('dotenv')
const app = express()
const mongoose = require('mongoose')

const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
dotenv.config()

async function connectToMongo() {
    try {
        const MONGO_URL =
            process.env.MONGO_URL || 'mongodb://localhost:27017/cses'
        mongoose.connect(MONGO_URL)
        console.log('Connected to MongoDB')
    } catch (err) {
        console.log('Not connected to MongoDB ' + err)
    }
}

connectToMongo()

app.use('/api/users', require('./routes/userRoute'))
app.use('/api', require('./routes/paymentRoute'))

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('Server Started on Port ' + port)
})
