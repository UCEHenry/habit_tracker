const User = require('../models/users')

async function send(req, res) {
    try{
        const user = await User.createUser(req.body)
        res.status(201).json(user)
    } catch (err) {
        res.status(422).json({err})
    }
}

async function show(req, res) {
    try{
        const user = await User.findByUsername(req.param.username)
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({err})
    }
}

module.exports = {send, show}
