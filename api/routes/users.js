const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')


router.post('/', userController.send)
router.get('/:username', userController.show)

module.exports = router
