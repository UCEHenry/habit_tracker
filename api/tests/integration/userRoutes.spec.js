const request = require('supertest');
const app = require('../../server.js');
const { default: TestDBHelper } = require('./config.js');
const dbHelper = new TestDBHelper()
describe('user endpoints', () => {
    let api;
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
    // Should post new user.
    it('Should post new user.', async () => {
        const res = await request(api)
        .post('/users')
        .send({
            username: "john",
            password: "abc"
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty("username")

        const userRes = await request(api).get('/users/john')
        expect(userRes.statusCode).toEqual(200);
        // expect(userRes.body.length).toEqual(1);
    })
    // Should get a user.
    it('Should get user.', async () => {
        const res = await request(api).get('/users/phil')
        // console.log("get user", res.body)
        expect(res.statusCode).toEqual(200)
    })

})


