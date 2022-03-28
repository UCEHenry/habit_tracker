const { init } = require('../dbConfig/dbConfig')
const { ObjectId } = require('mongodb')

class User {
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.password = data.password;
    }

    static get all(){
        
    }

    static findByUsername(username) {
        return new Promise(async (resolve, reject) => {
            try{
                const db = await init();
                let userData = await db.collection('users').find({username:username}).toArray()
                let user = new User({...userData[0], username: userData[0].username});
                resolve(user)
            } catch (err) {
                reject(`User: ${username} not found.`)
            }
        })
    }
    static createUser(username, password) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let userData = await db.collection('users').insertOne({ username, password })
                let newUser = new User(userData.ops[0]);
                resolve (newUser);
            } catch (err) {
                reject(`Error creating user: ${username}`);
            }
        });
    }
    updateUser(username) {

    }
    destroy(username) {

    }
}


module.exports = User
