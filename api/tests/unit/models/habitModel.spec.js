const MongoClient = require("mongodb/lib/mongo_client");
describe('db test', () => {
    let connection;
    let db;
    beforeEach(async () => {
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
        await connection.close()
    })
    // test server running

    // should returning all user habits

    // should create a new habit
    it('should create a new habit for a user with no habits', async () => {
        const user = db.collection('user')
        const mockHabit = {habitName:'water intake', schedule:'daily',completed:'true', dates:[], currentStreak:0, longestStreak:7};
        const mockHabitandUser = {_id: 'some-user-id', username:"John", password:'abc', habit:[{habitName:'water intake', schedule:'daily',completed:'true', dates:[], currentStreak:0, longestStreak:7}]}
        const mockUser = { _id: 'some-user-id', username: 'John', password: "abc"};
        await user.insertOne(mockUser);
        await user.update({username:'John'}, {$addToSet:{habit: mockHabit}})
        const insertedUser = await user.findOne({ username: 'John' });
        expect(insertedUser).toEqual(mockHabitandUser);
    })

    it('should create a new habit for a user with habits', async () => {
        const user = db.collection('user')
        const mockHabit = {habitName:'water intake', schedule:'daily',completed:'true', dates:[], currentStreak:0, longestStreak:7};
        const mockHabittwo = {habitName:'lamp intake', schedule:'monthly',completed:'true', dates:[], currentStreak:12, longestStreak:12};
        const mockHabitandUser = {_id: 'some-user-id', username:"John", password:'abc', habit:[{habitName:'water intake', schedule:'daily',completed:'true', dates:[], currentStreak:0, longestStreak:7}, {habitName:'lamp intake', schedule:'monthly',completed:'true', dates:[], currentStreak:12, longestStreak:12}]}
        const mockUser = { _id: 'some-user-id', username: 'John', password: "abc"};
        await user.insertOne(mockUser);
        await user.update({username:'John'}, {$addToSet:{habit: mockHabit}})
        await user.update({username:'John'}, {$addToSet:{habit: mockHabittwo}})
        const insertedUser = await user.findOne({ username: 'John' });
        expect(insertedUser).toEqual(mockHabitandUser);
    })
    // // Should have password hashed and salted.
    // it('Should have password hashed and salted', async () => {
    //     const user = db.collection('user')
    //     const mockUser = { _id: 'some-user-id', username: 'John', password: "abc" };
    //     await user.insertOne(mockUser);
    //     const insertedUser = await user.findOne({ username: 'John' });
    //     expect(insertedUser).toEqual(mockUser);
    // })
    // Should not create user that already exists

    // Should delelete user

})