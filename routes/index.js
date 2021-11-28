const express = require('express')
const router = express.Router()
const usersRouter = require('./users')
const genresRouter = require('./genres')

router.use('/users', usersRouter)
router.use('/genres', genresRouter)

module.exports = router