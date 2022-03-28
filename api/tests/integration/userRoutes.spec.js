const MongoClient = require("mongodb/lib/mongo_client");
const { request } = require("../../server");

describe('user endpoints', () => {
    let api;
    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))

    });
    afterAll(async () => {
        console.log('Gracefully stopping test server')
        api.close(done)

    })
    it('should check server up', async () => {
        const res = await request(api).get('/')
        expect(res.statusCode).toEqual(200)
    })
})

describe('db test', () => {
    let connection;
    let db;
    beforeEach(async () => {
        // await resetTestDB()
        await db.collection('user').deleteMany({});
        console.log('resetting db')
    })
    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        db = await connection.db(global.__MONGO_DB_NAME__)
    });
    afterAll(async () => {
        console.log('Gracefully stopping test server')
        // api.close(done)
        await connection.close()
    })
    // test server running

    // should returning all users

    // should create a new user
    it('should create a new user', async () => {
        const user = db.collection('user')
        const mockUser = { _id: 'some-user-id', name: 'John' };
        await user.insertOne(mockUser);
        const insertedUser = await user.findOne({ _id: 'some-user-id' });
        expect(insertedUser).toEqual(mockUser);
    })
    // Should have password hashed and salted.

    // Should not create user that already exists

    // Should delelete user

})

