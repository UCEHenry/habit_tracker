const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller')

router.get('/', userController.getAll)
router.post('/', userController.createNewUser)
router.get('/:username', userController.getUser)


module.exports = router
