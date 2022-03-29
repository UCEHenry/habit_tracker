const User = require('../models/model')


async function getAll(req, res) {
    console.log(req)
    try{
        const userData = await User.all
        res.json(userData)
    } catch (err) {
        res.send("Not data found: ", err)
    }
}
module.exports = {getAll}
