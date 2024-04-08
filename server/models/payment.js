const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    year: {
        type: String,
        required: true
    },
    razorpay_order_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['success', 'pending'],
        default: 'pending'
    },
    amount: {
        type: Number,
        required: true
    },
    razorpay_payment_id: {
        type: String
    },
    razorpay_signature: {
        type: String
    },
    payment_date: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment
