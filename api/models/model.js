const { init } = require('../dbConfig/dbConfig')
const { ObjectId } = require('mongodb')

class User {
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.password = data.password;
        this.habit = new Object(data.habit);
        this.habitname = data.habitname;
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                const usersData = await db.collection('users').find().toArray()
                const users = usersData.map(d => new User({ ...d, id: d._id }))
                resolve(users);
            } catch (err) {
                // console.log(err);
                reject("Error retrieving users")
            }
        })
    }

    static findByUsername(username) {
        return new Promise(async (resolve, reject) => {
            // console.log(username)
            try{
                const db = await init();
                let userData = await db.collection('users').find({ username: username }).toArray()
                let user = new User({...userData[0], username: userData[0].username, password: userData[0].password})
                resolve(user)
            } catch (err) {
                reject(`User: ${username} not found.`)
            }
        })
    }

    static createUser(username, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let userData = await db.collection('users').insertOne({ username: username, password: password })
                let newUser = new User(userData.ops[0]);
                resolve(newUser);
            } catch (err) {
                reject(`Error creating user: ${username}`);
            }
        });
    }
    static updateAUser(oldUsername, newUsername) {
        return new Promise(async (resolve, reject) => {
            try{
                let updatedUserData = await db.collection('users').updateOne({usename:oldUsername}, {$set:{username:newUsername}})
                resolve(`Username ${oldUsername} changed to ${newUsername}`)
            } catch (err) {
                reject(`Error: ${err}`)
            }
        })
    }
    RemoveAUser() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                await db.collection('users').deleteOne({ username: this.username })
                resolve(`${this.username} deleted`)
            } catch (err) {
                reject(`${this.username} could not be deleted`)
            }
        })
    }

    static createHabit(username, habit) {
        console.log("creating habit ", username, habit)
        return new Promise(async (resolve, reject) => {
            try {
     
                const db = await init();
                let habitData = await db.collection('users').updateOne({username:username}, {$addToSet:{habit:habit}})
                let updatedhabitData = await db.collection('users').find({ username: username }).toArray()
                updatedhabitData.map(h => {new User({...h}) 
                resolve(h)})
            } catch (err) {
                reject(`Error creating habit: ${habit}. Error ${err}`);
            }
        });
    }

    static updateAHabit(username, habit) {
        return new Promise(async (resolve, reject) => {
            try{
                console.log('in model update habit', habit.habitName)
                const db = await init();
                await db.collection('users').updateOne({username: username, habit:{$elemMatch: {habitName: habit.habitName}}}, {$set:{'habit.$': habit}})
                resolve(`Updated the habit: ${habit} for ${username}`)
            } catch (err) {
                reject(`Habit: ${habit} not found.`)
            }
        })
    }

    static removeHabit(username, habitname) {
        //console.log("in models", username, habitname)
        return new Promise(async(resolve, reject) => {
            try {
                const db = await init();
                await db.collection('users').update(
                    {username: username},{$pull: {habit:{habitName: habitname}}})
                resolve(`${habitname} deleted`)
            } catch (err) {
                reject(`${habitname} could not be deleted`)
            }
        })
    }

}


//db.users.updateOne({username: 'phil', habit: {$elemMatch: {habitName:'sleep'}}},{$set:{'habit.$.completed': true}})
//db.users.updateOne({username: 'phil', habit: {$elemMatch: {habitName:'sleep'}}}, {$push: {'habit.$.dates': '1/1/2022'}})

module.exports = User
