const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller')

router.get('/', userController.getAll)
router.post('/createuser', userController.createNewUser)
router.get('/:username', userController.getUser)
router.delete('/:username', userController.removeUser)
router.post('/createhabit', userController.createHabit)
router.delete('/:username/:habitname', userController.remove)
router.post('/login', userController.authLogin)

module.exports = router
