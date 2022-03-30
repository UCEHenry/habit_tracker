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
            it("Should be able to make new habit /habit url", async () => {
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        username: {value: username},
                        habitname: {value: habitName},
                        frequency: {value: habitFrequency}
                    }
                }
                const response = await app.createNewHabit(fakeSubmitEvent)
                expect(fetch.mock.calls[0][1]).toHaveProperty("method", "POST")
                expect(fetch.mock.calls[0][1]).toHaveProperty("body", JSON.stringify({ username: username, password: password }))
            })
            // Should be able to edit existing habit
            it("Should be able to edit existing habit", async () => {
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        habitName: {value: habitName},
                        habitFrequency: {value: habitFrequency}
                    }
                }
                const response = await app.editHabit(fakeSubmitEvent)
                expect(fetch.mock.calls[0][1]).toHaveProperty("method", "PATCH")
                expect(fetch.mock.calls[0][1]).toHaveProperty("body", JSON.stringify({ habitName: habitName, habitFrequency: habitFrequency }))
            })
            // Should delete habit
            it("Should delete habit", async () => {
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        username: {value: username},
                        habitname: {value: habitName},
                    }
                }
                const response = await app.deleteHabit(fakeSubmitEvent)
                expect(fetch.mock.calls[0][1]).toHaveProperty("method", "DELETE")
                expect(fetch.mock.calls[0][1]).toHaveProperty("body", JSON.stringify({ username: username, habitname: habitname }))
            })
            // Should delete user
            it("Should delete habit", async () => {
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: {
                        username: {value: username},
                    }
                }
                const response = await app.deleteUser(fakeSubmitEvent)
                expect(fetch.mock.calls[0][1]).toHaveProperty("method", "DELETE")
                expect(fetch.mock.calls[0][1]).toHaveProperty("body", JSON.stringify({ username: username, habitname: habitname }))
            })

        })
    })
})

