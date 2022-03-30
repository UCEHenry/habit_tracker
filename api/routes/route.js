const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller')

router.get('/', userController.getAll)
router.post('/createuser', userController.createNewUser)
router.get('/:username', userController.getUser)
router.post('/createhabit', userController.createHabit)
router.delete('/:username/:habitname', userController.removeHabit)


module.exports = router
