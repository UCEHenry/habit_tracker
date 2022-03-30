// const MongoClient = require("mongodb/lib/mongo_client");
// describe('db test', () => {
//     let connection;
//     let db;
//     beforeEach(async () => {
//         await db.collection('user').deleteMany({});
//         console.log('resetting db')
//     })
//     beforeAll(async () => {
//         connection = await MongoClient.connect(global.__MONGO_URI__, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })
//         db = await connection.db(global.__MONGO_DB_NAME__)
//     });
//     afterAll(async () => {
//         console.log('Gracefully stopping test server')
//         await connection.close()
//     })
//     // test server running

//     // should returning all users

//     // should create a new user
//     it('should create a new user', async () => {
//         const user = db.collection('user')
//         const mockUser = { _id: 'some-user-id', username: 'John', password: "abc" };
//         await user.insertOne(mockUser);
//         const insertedUser = await user.findOne({ username: 'John' });
//         expect(insertedUser).toEqual(mockUser);
//     })
//     // Should have password hashed and salted.
//     it('Should have password hashed and salted', async () => {
//         const user = db.collection('user')
//         const mockUser = { _id: 'some-user-id', username: 'John', password: "abc" };
//         await user.insertOne(mockUser);
//         const insertedUser = await user.findOne({ username: 'John' });
//         expect(insertedUser).toEqual(mockUser);
//     })
//     // Should not create user that already exists

//     // Should delelete user

// })
