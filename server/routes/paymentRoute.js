const router = require('express').Router()
require('dotenv').config()

const {
    checkoutController,
    paymentVerifyController,
    getAllPayments
} = require('../controllers/paymentController')
const { protect } = require('../middleware/authMiddleware')

router.post('/checkout', protect, checkoutController)
router.post('/paymentVerify', paymentVerifyController)
router.get('/getAllPayments', protect, getAllPayments)
router.get('/getKey', protect, (req, res) => {
    return res.status(200).json({ key: process.env.KEY })
})

module.exports = router
