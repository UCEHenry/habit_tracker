const request = require('supertest');
const app = require('../../server.js');
const resetTestDB = require('./config.js')


describe('habit endpoints', () => {
    let api;

    beforeEach(async () => {
        await resetTestDB.resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    it('Should check server up', async () => {
        const res = await request(api).get('/')
        expect(res.statusCode).toEqual(200)
    })
    
    // Should get a habit by username.
    it('Should get habit.', async () => {
        const res = await request(api).get('/habits/phil')
        console.log("get habit", res.body)
        expect(res.statusCode).toEqual(200)
    })

    // should create a new habit
    it('Should post new habit.', async () => {
        const res = await request(api)
        .post('/habits')
        .send({
            username: "john",
            password: "abc",
            habit: {habitname: 'Running', schedule: 'week', completed: 'true', dates: ['29/03/2022'], currentStreak: 1, longestStreak: 2}
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty("habit")

        const userRes = await request(api).get('/habits/john')
        expect(userRes.statusCode).toEqual(200);
        // expect(userRes.body.length).toEqual(1);
    })

    // Should delete selected habit.
    it('Should delete selected habit.', async () => {
        const res = await request(api)
            .delete('/habits/phil/sleep')
        expect(res.statusCode).toEqual(204);

        const habitRes = await request(api).get('/habits/phil/sleep');
        expect(habitRes.statusCode).toEqual(404);
        expect(habitRes.body).toHaveProperty('err');
    })


})

// test server running

// Should not create habit that already exists

// Should update habit name

// Should update habit frequency


