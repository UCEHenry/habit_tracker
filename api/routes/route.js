const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const userController = require('../controllers/controller');
const { verifyToken } = require('../middleware/auth');

router.get('/', userController.getAll)
router.post('/createuser', userController.createNewUser)
router.get('/:username', verifyToken, userController.getUser)
router.post('/login', userController.authLogin)
router.delete('/:username', userController.removeUser)
router.post('/createhabit', userController.createHabit)
router.delete('/:username/:habitname', userController.remove)
router.patch('/:username', userController.updateHabit)


module.exports = router
