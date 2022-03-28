// const request = require('supertest');
// const { MongoClient } = require('mongodb');
// const connectionUrl = process.env.DB_CONNECTION;

// const dbName = process.env.DB_NAME;

// // const init = async () => {
// //   let client = await MongoClient.connect(connectionUrl);
// //   console.log('connected to database!', dbName);
// //   return client.db(dbName);
// // }

// // module.exports = { init };

// const db = connect("mongodb://localhost:5000/habits")


// const resetTestDB = () => {
//   return new Promise(async (resolve, reject) => {
//   try {
//     // add data into  db
//     let client = await MongoClient.connect(connectionUrl);
//     db.blogPosts.drop()
//     db.blogPosts.insertMany([
//       { title: 'also first', author: "Anh", message: "I also love lamp", date: "test" },
//       { title: 'first', author: 'idris', message: 'I love lamp', date: 'test' }
//     ])
//     resolve('Test DB reset')
//   } catch (err) {
//     reject(`Test DB could not be reset: ${err} in ${err.file}`)
//   }})
// }
// global.request = request;
// global.app = app;
// global.resetTestDB = resetTestDB;
// global.port = process.env.PORT || 5000;


const {MongoClient} = require('mongodb')


