const Habit = require('../models/habits');

async function send(req, res) {
    try{
        const username = req.body.username
        const habitData = req.body.habit
        const habit = await Habit.createHabit(username, habitData)
        res.status(201).json(habit)
    } catch (err) {
        // console.log(err)
        res.status(422).json({err})
    }
}

async function show(req, res) {
    console.log("inside /controllers/habits")
    try{
        console.log(req.params.username)
        const habit = await Habit.findByUsername(req.params.username)
        res.status(200).json(habit)
    } catch (err) {
        res.status(404).json({err})
        console.log(req.params.username)
    }
}

async function remove(req, res) {
    try {
        const habit = await Habit.findByUsername(req.params.username)
        await habit.remove(req.params.username, req.params.habit)
        res.status(204).json('Habit deleted')
    } catch(err) {
        res.status(500).json({err})
    }
}

module.exports = { send, show, remove }
