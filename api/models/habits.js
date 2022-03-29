const { init } = require('../dbConfig/dbConfig')

class Habit {
    constructor(data){
        this.id = data.id;
        this.username = data.username;
        this.password = data.password;
        this.habit = new Object(data.habit);
        //this.habitname = data.habitname;
        //this.schedule = data.schedule;
        //this.completed =  data.completed;
        //this.dates = data.dates;
        //this.currentStreak =  data.currentStreak;
        //this.longestStreak = data.longestStreak;
    }

    static get all(){}

    static findByUsername(username) {
        return new Promise(async (resolve, reject) => {
            try{
                const db = await init();
                let habitData = await db.collection('users').find({ username: username }).toArray()
                let habit = new Habit({...habitData[0], username: habitData[0].username, password: habitData[0].password, habit:habitData[0].habit});
                console.log(habit);
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
                let habitData = await db.collection('users').find({ username: username, 'habit.habitName': habitname }).toArray()
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

module.exports = Habit
