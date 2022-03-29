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
    
    // Should get a habit.
    it('Should get habit.', async () => {
        const res = await request(api).get('/habits/phil')
        //console.log("get habit", res.body)
        expect(res.statusCode).toEqual(200)
    })

    // // Should create new habit.
    it('Should post new habit to a user with no habits.', async () => {
        const res = await request(api)
        .post('/habits/carlton')
        .send({
            username: "carlton",
            habit:{habitName:"wondering",schedule:'weekly',completed:'true', dates:[], currentStreak:1, longestStreak:3}
        })
        //console.log("post habit", res.body)
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty("habit")

        const userRes = await request(api).get('/habits/carlton')
        //console.log("post habit", userRes.body)
        expect(userRes.statusCode).toEqual(200);
        // expect(userRes.body.length).toEqual(1);
    })


    it('Should post new habit to a user with existing habits.', async () => {
        const res = await request(api)
        .post('/habits/phil')
        .send({
            username: "phil",
            habit:{habitName:"flying",schedule:'monthly',completed:'true', dates:[], currentStreak:0, longestStreak:1}
        })
        //console.log("post habit", res.body)
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty("habit")

        const userRes = await request(api).get('/habits/phil')
        //console.log("post habit", userRes.body)
        expect(userRes.statusCode).toEqual(200);
        // expect(userRes.body.length).toEqual(1);
    })

    //Should delete selected user.
    it('Should delete selected habit from a user.', async () => {
        const res = await request(api)
            .delete('/habits/phil/sleep')
        expect(res.statusCode).toEqual(204);

        const userRes = await request(api).get('/habits/phil/sleep');
        expect(userRes.statusCode).toEqual(404);
        //expect(userRes.body).toHaveProperty('err');
    })

})


