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
                console.log(err);
                reject("Error retrieving users")
            }
        })
    }

    static findByUsername(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let habitData = await db.collection('users').find({ username: username }).toArray()
                habitData.map(h => {
                    new Habit({ ...h })
                    resolve(h)
                })
            } catch (err) {
                reject(`Habit: ${username} not found.`)
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
    updateUser(oldUsername, newUsername) {
        return new Promise(async (resolve, rejecct) => {
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
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                let habitData = await db.collection('users').update({ username: username }, { $addToSet: { habit: habit } })
                //console.log("In models in try", habitData)
                let updatedhabitData = await db.collection('users').find({ username: username }).toArray()
                updatedhabitData.map(h => {
                    new Habit({ ...h })
                    resolve(h)
                })
                //let newHabit = new Habit(updatedhabitData.ops[0]);
                //resolve (newHabit);
            } catch (err) {
                reject(`Error creating habit: ${username}`);
            }
        });
    }

    updateHabit(username, habitname) {
        return new Promise(async (resolve, rejecct) => {
            try{
                let habitData = await db.collection('users').find().toArray()

                updatedHabitData
            } catch (err) {
                reject(`Habit: ${habitname} not found.`)
            }
        })
    }

    static findByUsernameAndHabitname(username, habitname) {
        return new Promise(async (resolve, reject) => {
            try{
                const db = await init();
                let habitData = await db.collection('users').find({ username: username, 'habit.habitName': habitname }).toArray()
                let habit = new Habit({...habitData[0], username: habitData[0].username, habit: habitData[0].habit[habitname]});
                resolve(habit)
            } catch (err) {
                reject(`Habit: ${username} not found.`)
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
