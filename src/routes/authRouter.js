const { Router } = require('express')
const router = Router()
const { auth, signup, login, logout } = require('../controller/authController.js')

router.get("/", auth)
router.get("/logout", logout)
router.post("/signup", signup)
router.post("/login", login)


module.exports = router