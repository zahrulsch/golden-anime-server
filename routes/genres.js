const express = require('express')
const router = express.Router()
const { authentication } = require('../middlewares/auth')
const { genresController: Controller } = require('../controllers')

router.use(authentication)
router.get('/', Controller.getGenres)
router.post('/', Controller.addGenres)
router.delete('/:id', Controller.deleteGenres)

module.exports = router