const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const userController = require('../controllers/controller');

router.get('/', userController.getAll)
router.post('/createuser', userController.createNewUser)
router.get('/:username', userController.getUser)
router.post('/login', verifyToken, userController.authALogin)
router.delete('/:username', userController.removeUser)
router.post('/createhabit', userController.createHabit)
router.delete('/:username/:habitname', userController.remove)
router.patch('/:username', userController.updateHabit)



module.exports = router
