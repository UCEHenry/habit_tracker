const request = require('supertest');
const app = require('../../server.js');
const resetTestDB = require('./config.js')

describe('habit endpoints', () => {
    let api;
    let username = 'carlton'
    let habit = {
        habitName: "sleep",
        schedule: 'weekly',
        completed: 'false',
        dates: [],
        currentStreak: 0,
        longestStreak: 0
    }

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

    // Should get a habit. // TODO do we need to get a specific habit for anything other than updating?
    it('Should get habit.', async () => {
        const res = await request(api).get('/users/phil')
        expect(res.statusCode).toEqual(200)
        expect(res.body.username).toEqual('phil')
        expect(res.body.habit[0].habitName).toEqual('sleep')
    })

    // Should create new habit.
    it('Should post new habit to a user with no habits.', async () => {

        const res = await request(api)
            .post('/users/createhabit')
            .send({
                username: "will",
                habit: habit
            })

        expect(res.statusCode).toEqual(201)

        expect(res.body).toHaveProperty("username")
        expect(res.body).toHaveProperty("habit")

        const userRes = await request(api).get('/users/will')
        expect(userRes.statusCode).toEqual(200);
        expect(userRes.body.habit[0]).toEqual(habit)
    })


        it('Should post new habit to a user with existing habits.', async () => {
            const res = await request(api)
                .post('/users/createhabit')
                .send({
                    username: "phil",
                    habit: { habitName: "flying", schedule: 'monthly', completed: 'true', dates: [], currentStreak: 0, longestStreak: 0 }
                })

            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty("username")
            expect(res.body).toHaveProperty("habit")

            const userRes = await request(api).get('/users/phil')

            expect(userRes.statusCode).toEqual(200);

        })

        it('Should delete selected habit from a user.', async () => {
            const res = await request(api)
                .delete('/users/phil/sleep')
            expect(res.statusCode).toEqual(204);
    
            const userRes = await request(api).get('/users/phil');
            expect(userRes.statusCode).toEqual(200);
            //console.log("userRes output", userRes.body.habit);
            expect(userRes.body.habit.length).toEqual(1);
        })

        it('Should update a selected habit from a user', async () => {
            const res = await request(api)
                .patch('/users/phil')
                .send({
                    username:'phil',
                    habit: {habitName:'sleep', schedule:'weekly',completed:'true', dates:['1/1/2022', '7/1/2022'], currentStreak:4, longestStreak:2}
                })
            expect(res.statusCode).toEqual(201);
            const userRes = await request(api).get('/users/phil');
            expect(userRes.statusCode).toEqual(200);
            console.log("in the update test", userRes.body.habit[0]);
    
    
    
    
    
        })



})

describe('user endpoints', () => {
    let api;
    let username = 'carlton'
    let password = 'pass'
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

     it('Should post new user.', async () => {
        
        const res = await request(api)
            .post('/users/createuser')
            .send({
                username: username,
                password: password
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty("username")
        console.log(res.body)
        const userRes = await request(api).get('/users/carlton')
        expect(userRes.statusCode).toEqual(200);
    })
    
    it('Should get user.', async () => {
        const res = await request(api).get('/users/phil')
        expect(res.statusCode).toEqual(200)
        expect(res.body.username).toEqual('phil')
        expect(res.body.habit[0].habitName).toEqual('sleep')
    })

   

    // it('Should delete selected user.', async () => {
    //     const res = await request(api)
    //         .delete('/users/phil')
    //     expect(res.statusCode).toEqual(204);
    //     const userRes = await request(api).get('/users/phil');
    //     expect(userRes.statusCode).toEqual(404);
    //     expect(userRes.body).toHaveProperty('err');
    // })



})
