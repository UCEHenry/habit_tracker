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
                {username:"phil", password: "fresh"},
                {username:"carlton", password: "prince"},
                {username:"new", password: "reset"}
            ])
            // require('./test_seeds')
            resolve('Test DB reset');
        } catch (err) {
            reject(`Test DB could not be reset: ${err} in ${err.file}`);
        };
    });
}

// global.request = request;
// global.app = app;
// global.resetTestDB = resetTestDB;
// global.port = process.env.PORT || 5000;

module.exports = { resetTestDB }