const MongoClient = require("mongodb/lib/mongo_client");

let db;
let connection;

const resetTestDB = () => {
    return new Promise (async (resolve, reject) => {
        try {
            connection = await MongoClient.connect(process.env.DB_CONNECTION);
            db = await connection.db(process.env.DB_NAME)
            await db.collection('users').deleteMany({});
            await db.collection('users').insertMany([
                {username:"phil", password: "fresh", habit:[{habitName:'sleep', schedule:'weekly',completed:'true', dates:[], currentStreak:1, longestStreak:2} , {habitName:'walking',schedule:'daily',completed:'true', dates:[], currentStreak:1, longestStreak:2}]},
                {username:"carlton", password: "prince"},
                {username:"new", password: "reset"}
            ])
            resolve('Test DB reset');
        } catch (err) {
            reject(`Test DB could not be reset: ${err} in ${err.file}`);
        };
    });
}

module.exports = { resetTestDB }
