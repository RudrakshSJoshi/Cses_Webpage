const router = require('express').Router()

const {
    loginController,
    registerController,
    changePasswordController, 
    getUserController,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/login', loginController)
router.post('/register', registerController)
router.put('/change_pass', protect, changePasswordController)
router.get('', protect, getUserController)

module.exports = router
