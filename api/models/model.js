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
                let user = new User({...userData[0], username: userData[0].username});
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
                // console.log(userData)
                resolve(newUser);
            } catch (err) {
                reject(`Error creating user: ${username}`);
            }
        });
    }
    updateUser(oldUsername, newUsername) {
        return new Promise(async (resolve, reject) => {
            try{
                let updatedUserData = await db.collection('users').updateOne({usename:oldUsername}, {$set:{username:newUsername}})
                resolve(`Username ${oldUsername} changed to ${newUsername}`)
            } catch (err) {
                reject(`Error: ${err}`)
            }
        })
    }
    removeUser() {
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
        console.log("creating habit ", habit)
        return new Promise(async (resolve, reject) => {
            try {
     
                const db = await init();

                let habitData = await db.collection('users').updateOne({"username":username, "habit.habitName":{$ne: habit.habitName}}, {$addToSet:{"habit":habit}}, false,true)
                let updatedhabitData = await db.collection('users').find({ username: username }).toArray()
                updatedhabitData.map(h => {new User({...h}) 
                resolve(h)})
            } catch (err) {
                reject(`Error creating habit: ${habit}. Error ${err}`);
            }
        });
    }

    updateHabit(username, habitName) {
        return new Promise(async (resolve, reject) => {
            try{
                let updatedHabitData = await db.collection('users').updateOne({username:username, "habit.habitName":habitName}, {$set:{"habit.$.habitName": habitName}})

                resolve(`Updated the habit: ${habitName} for ${username}`)
            } catch (err) {
                reject(`Habit: ${habitname} not found.`)
            }
        })
    }

    removeHabit(username, habitname) {
        return new Promise(async(resolve, reject) => {
            try {
                const db = await init();
                await db.collection('users').db.example.update(
                    {'username': {'$equals': username}},
                    { $unset: {'habit': {habitname: {'$equals': habitname}}}}
                  )
                resolve(`${habitname} deleted`)
            } catch (err) {
                reject(`${habitname} could not be deleted`)
            }
        })
    }

}


module.exports = User
