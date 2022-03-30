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
                habitData.map(h => {new Habit({...h}) 
                 resolve(h)})
            } catch (err) {
                reject(`Habit: ${username} not found.`)
            }
        })
    }

    static createHabit(username, habit) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let habitData = await db.collection('users').update({username: username}, {$addToSet:{habit: habit}})
                //console.log("In models in try", habitData)
                let updatedhabitData = await db.collection('users').find({ username: username }).toArray()
                updatedhabitData.map(h => {new Habit({...h}) 
                resolve(h)})
                //let newHabit = new Habit(updatedhabitData.ops[0]);
                //resolve (newHabit);
            } catch (err) {
                reject(`Error creating habit: ${username}`);
            }
        });
    }

    // static findByIdAndHabitname(username, habitname) {
    //     return new Promise(async (resolve, reject) => {
    //         try{
    //             const db = await init();
    //             let habitData = await db.collection('users').find({ username: username},{habit:{$elemMatch:{habitName: habitname}}}).toArray();
    //             let habit = new Habit({...habitData[0], habit: habitData[0].habit});
    //             resolve(habit)
    //         } catch (err) {
    //             reject(`Habit: ${username} not found.`)
    //         }
    //     })
    // }

    static Remove(username, habitname) {
        return new Promise(async(resolve, reject) => {
            try {
                const db = await init();
                await db.collection('users').update(
                    {'username': username},{$pull: {habit:{habitName: habitname}}})
                resolve(`${habitname} deleted`)
            } catch (err) {
                reject(`${habitname} could not be deleted`)
            }
        })
    }
}

module.exports = Habit
