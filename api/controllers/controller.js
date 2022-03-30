const User = require('../models/model')


async function getAll(req, res) {

    try{
        const userData = await User.all
        res.json(userData)
    } catch (err) {
        res.send("Not data found: ", err)
    }
}

async function createNewUser(req, res) {
    try{
        const username = req.body.username
        const password = req.body.password
        const user = await User.createUser(username, password)
        res.status(201).json(user)
    } catch (err) {
        res.status(422).json({err})
    }
}

async function getUser(req, res) {
    try{
        const user = await User.findByUsername(req.params.username)
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({err})
    }
}

async function updateUser(req, res) {
    try{
        const oldUsername = req.params.oldUsername
        const newUsername = req.params.newUsername
        const user = await User.updateUser(oldUsername, newUsername)
        res.status(200).json(user)
    } catch (err) {
        res.status(422).json({err})
    }
}
// TODO Testing and controllers
async function removeUser(req, res) {
    try{
        res.status(201).json(user)
    } catch (err) {
        res.status(422).json({err})
    }
}

async function createHabit(req, res) {
    try{
        const username = req.body.username
        const habit = req.body.habit
        const user = await User.createHabit(username, habit)
        res.status(201).json(user)
    } catch (err) {
        res.status(422).json({err})
    }
}

async function updateHabit(req, res) {
    try{
        res.status(200).json(user)
    } catch (err) {
        res.status(422).json({err})
    }
}

// TODO Testing and controllers
async function removeHabit(req, res) {
    try{
        res.status(201).json(user)
    } catch (err) {
        res.status(422).json({err})
    }
}

module.exports = {getAll, getUser, createNewUser, updateUser, createHabit, updateHabit}
