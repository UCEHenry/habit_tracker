/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
global.fetch = require('jest-fetch-mock');
let app;

describe("Checks JS files", () => {
    describe("User account interaction", () => {
        let username = "testUser"
        let password = "test123"
        describe("loginHandler.js", () => {

            beforeEach(() => {
                app = require("../js/loginHandler")
                document.documentElement.innerHTML = html.toString();
            })
            afterEach(() => {
                fetch.resetMocks();
            })

            // Should send login data to backend
            it("Should send login data to backend", async () => {
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        logInUsername: {value: username},
                        logInPassword: {value: password}
                    } 
                }

                await app.userLogIn(fakeSubmitEvent)
                expect(fetch.mock.calls[0][1]).toHaveProperty("method", "POST")
                expect(fetch.mock.calls[0][1]).toHaveProperty("body", JSON.stringify({ username: username, password: password }))
            })

            // Should send success of submission
            it("Should send success of submission", async () => {
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        logInUsername: {value: username},
                        logInPassword: {value: password}
                    } 
                }
                const response = await app.userLogIn(fakeSubmitEvent)
                expect(response).toStrictEqual({ "status": 200 })
            })
            
            // Should send failed submission 
            it("Should send error due to user not existsing", async () => {
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        logInUsername: {value: 'testmctestface'},
                        logInPassword: {value: 'test123'}
                    } 
                }
                const response = await app.userLogIn(fakeSubmitEvent)
                expect(response).toStrictEqual({ "status": 404 })
            })
        })
        // describe("signupHandler.js", () => {
        //     beforeEach(() => {
        //         app = require("../js/signupHandler")
        //         document.documentElement.innerHTML = html.toString();
        //     })
        //     afterEach(() => {
        //         fetch.resetMocks();
        //     })
        //     // Should send signup data to backend
        //     it("Should send signup data to backend", () => {
        //         const fakeSubmitEvent = {
        //             preventDefault: jest.fn(),
        //             target: [{ value: username }, { value: password }]
        //         }
        //         app.registerNewUser(fakeSubmitEvent)
        //         expect(fetch.mock.calls[0][1]).toHaveProperty("method", "POST")
        //         expect(fetch.mock.calls[0][1]).toHaveProperty("body", JSON.stringify({ username: username, password: password }))
        //     })
        //     // Should send success of submission
        //     it("Should send success of submission", async () => {
        //         const fakeSubmitEvent = {
        //             preventDefault: jest.fn(),
        //             target: [{ value: username }, { value: password }]
        //         }
        //         const response = await app.submitLogin(fakeSubmitEvent)
        //         expect(response).toStrictEqual({ "status": 200 })


        //     })
        //     // Should send failed submission
        //     it("Should send error during creation", async () => {
        //         const fakeSubmitEvent = {
        //             preventDefault: jest.fn(),
        //             target: [{ value: "tesyMcTestface" }, { value: "test1234" }]
        //         }
        //         const response = await app.submitLogin(fakeSubmitEvent)
        //         expect(response).toStrictEqual({ "status": 422 })
        //     })
        // })

    })
    describe("dashboard js files", () => {
        describe("habitCardHandler.js", () => {
            beforeEach(() => {
                app = require("../js/habitCardHandler")
                document.documentElement.innerHTML = html.toString();
            })
            afterEach(() => {
                fetch.resetMocks();
            })
            // Should receive correct username 
            
            // Should make successful request for habits
            it("Should make successful request for habits to /habit url", async () => {
                let habit = await getAllHabits()
                expect(fetch.mock.calls[0][0]).toMatch("/articles$/")
            })

            // Should be able to make new habit

            // Should be able to edit existing habit
            // Should delete habit
            // Should delete user
            // it('Should have x number of habits', async () => {
            //     await getAllHabits()
            //     expect()
            // })
            // 

        })
    })
})

