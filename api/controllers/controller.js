const User = require('../models/model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function getAll(req, res) {
    try{
        const userData = await User.getall(); 
        res.status(200).json(userData)
    } catch (err) {
        res.status(404).json({err})    
    }
}

async function createNewUser(req, res) {
    try{
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt)
        const username = req.body.username
        const password = hashed
        const user = await User.createUser(username, password)
        res.status(201).json(user)
    } catch (err) {
        res.status(422).json({err})
    }
}

async function authLogin(req, res){
    try {
        const user = await User.findByUsername(req.body.username)
        if (!user) { 
            throw new Error('No user with this username') 
        }
        const authed = await bcrypt.compare(req.body.password, user.password)
        if (!!authed){
            const payload = { username: user.username }
            const sendToken = (err, token) => {
                if(err){ 
                    throw new Error('Error in token generation') 
                }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            }
            // should be added process.env.SECRET
            jwt.sign(payload, "secret", { expiresIn: 3600 }, sendToken);
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        res.status(401).json({ err });
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

        const oldUsername = req.body.oldUsername
        const newUsername = req.body.newUsername
        //console.log('in the updateuserController', req.body,"checking newUsername: ", newUsername)
        await User.updateAUser(oldUsername, newUsername)
        res.status(200).json("updated the user")
    } catch (err) {
        res.status(422).json({err})
    }
}

// TODO Testing and controllers
async function removeUser(req, res) {
    try{
        const user = await User.findByUsername(req.params.username)
        //console.log("in controller/controllers", user);
        await user.RemoveAUser();
        res.status(204).json('User deleted')
    } catch (err) {
        res.status(500).json({err})
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
        const username = req.body.username
        const habit = req.body.habit

        //console.log('in controller in updateHabit', username, habit)
        await User.updateAHabit(username, habit)
        res.status(201).json('updated habit')

    } catch (err) {
        res.status(422).json({err})
    }
}

// TODO Testing and controllers
async function removeHabit(req, res) {
    try{
        //console.log('in remove habit in controllers', req.params.username, req.params.habitname)
        await User.removeHabit(req.params.username, req.params.habitname)
        res.status(204).json('habit deleted')
    } catch (err) {
        res.status(422).json({err})
    }
}

module.exports = { getAll, getUser, createNewUser, updateUser, createHabit, updateHabit, removeHabit, removeUser, authLogin }
