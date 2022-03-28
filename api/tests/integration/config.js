// const MongoClient = require("mongodb/lib/mongo_client");

// let connection = await MongoClient.connect(global.__MONGO_URI__, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

// let db = await connection.db(global.__MONGO_DB_NAME__)

// const resetTestDB = () => {
//     return new Promise (async (resolve, reject) => {
//         try {


//             await db.collection('users').deleteMany({});
//             console.log('resetting db')
//             await db.load('test_seeds.js')
//             resolve('Test DB reset');
//         } catch (err) {
//             reject(`Test DB could not be reset: ${err} in ${err.file}`);
//         };
//     });
// }

// global.resetTestDB = resetTestDB;