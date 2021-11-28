const express = require('express')
const router = express.Router()
const { usersController: Controller } = require('../controllers')
const { authentication } = require('../middlewares/auth')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/login', authentication, Controller.getUserInfo)

module.exports = router