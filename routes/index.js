const express = require('express')
const router = express.Router()
const usersRouter = require('./users')
const genresRouter = require('./genres')
const studiosRouter = require('./studios')

router.use('/users', usersRouter)
router.use('/genres', genresRouter)
router.use('/studios', studiosRouter)

module.exports = router