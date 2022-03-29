const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habits')

router.post('/', habitController.send)
router.get('/:username', habitController.show)
router.delete('/:username/:habitname', habitController.remove)

module.exports = router