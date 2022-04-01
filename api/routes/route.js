const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const userController = require('../controllers/controller');

router.get('/', userController.getAll)
router.post('/createuser', userController.createNewUser)
router.get('/:username', userController.getUser)
router.patch('/updateuser/:username', userController.updateUser)
router.post('/login', verifyToken, userController.authLogin)
router.delete('/:username', userController.removeUser)
router.post('/createhabit', userController.createHabit)
router.delete('/:username/:habitname', userController.removeHabit)
router.post('/updatehabit', userController.updateHabit)



module.exports = router
