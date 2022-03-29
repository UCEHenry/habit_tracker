const { init } = require('../dbConfig/dbConfig')

class Habit {
    constructor(data){
        this.username = data.username
        this.password = data.username
        this.habit = {habitname: data.habitname, schedule: data.schedule, completed: data.completed, dates: data.dates, currentStreak: data.currentStreak, longestStreak: data.longestStreak}
    }

    static get all(){}

    static findByUsername(username) {
        return new Promise(async (resolve, reject) => {
            try{
                const db = await init();
                let habitData = await db.collection('users').find({ username: username }).toArray()
                let habit = new Habit({...habitData[0], username: userData[0].username});
                resolve(habit)
            } catch (err) {
                reject(`Habit: ${username} not found.`)
            }
        })
    }

    static createHabit(username, habit) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                habit = {habitname, schedule, completed, dates, currentStreak, longestStreak}
                let habitData = await db.collection('users').aggregate([ { $match: { username: username}}, { $addFields: { habit: habit }}]).toArray()
                let newHabit = new Habit(habitData.ops[0]);
                resolve (newHabit);
            } catch (err) {
                reject(`Error creating habit: ${username}`);
            }
        });
    }

    static findByUsernameAndHabitname(username, habitname) {
        return new Promise(async (resolve, reject) => {
            try{
                const db = await init();
                let habitData = await db.collection('users').find({ username: username, habit: {habitname: habitname} }).toArray()
                let habit = new Habit({...habitData[0], username: habitData[0].username, habit: habitData[0].habit[habitname]});
                resolve(habit)
            } catch (err) {
                reject(`Habit: ${username} not found.`)
            }
        })
    }

    remove(username, habitname) {
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

