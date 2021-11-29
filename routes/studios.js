const express = require('express')
const router = express.Router()
const { studiosController: Controller } = require('../controllers')
const { authentication } = require('../middlewares/auth')

router.use(authentication)
router.get('/', Controller.getStudios)
router.post('/', Controller.addStudios)
router.delete('/:id', Controller.delStudios)

module.exports = router