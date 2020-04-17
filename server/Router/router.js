const express = require('express')
const router = express.Router()
const controller = require('../Controller/controller')

router.get('/user',controller.view)
router.post('/user',controller.add)

module.exports = router