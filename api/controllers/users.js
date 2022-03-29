const User = require('../models/users')

async function send(req, res) {
    // console.log("This is a test",req.body)
    try{
        const username = req.body.username
        const password = req.body.password
        const user = await User.createUser(username, password)
        res.status(201).json(user)
    } catch (err) {
        // console.log(err)
        res.status(422).json({err})
    }
}

async function show(req, res) {
    try{
        const user = await User.findByUsername(req.params.username)
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({err})
    }
}

module.exports = {send, show}
