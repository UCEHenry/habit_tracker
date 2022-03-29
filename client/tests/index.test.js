const fs = required('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');
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
            it("Should send login data to backend", () => {
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: [{ value: username }, { value: password }]
                }
                app.submitLogin(fakeSubmitEvent)
                expect(fetch.mock.calls[0][1]).toHaveProperty("method", "POST")
                expect(fetch.mock.calls[0][1]).toHaveProperty("body", JSON.stringify({ username: username, password: password }))
            })
            // Should send success of submission
            it("Should send success of submission", async () => {
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: [{ value: username }, { value: password }]
                }
                const response = await app.submitLogin(fakeSubmitEvent)
                expect(response).toStrictEqual({ "status": 200 })
            })
            // Should send failed submission 
            it("Should send error due to user not existsing", async () => {
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: [{ value: "tesyMcTestface" }, { value: "test1234" }]
                }
                const response = await app.submitLogin(fakeSubmitEvent)
                expect(response).toStrictEqual({ "status": 404 })
            })
        })
        describe("signupHandler.js", () => {
            beforeEach(() => {
                app = require("../js/signupHandler")
                document.documentElement.innerHTML = html.toString();
            })
            afterEach(() => {
                fetch.resetMocks();
            })
            // Should send signup data to backend
            it("Should send signup data to backend", () => {
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: [{ value: username }, { value: password }]
                }
                app.registerNewUser(fakeSubmitEvent)
                expect(fetch.mock.calls[0][1]).toHaveProperty("method", "POST")
                expect(fetch.mock.calls[0][1]).toHaveProperty("body", JSON.stringify({ username: username, password: password }))
            })
            // Should send success of submission
            it("Should send success of submission", async () => {
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: [{ value: username }, { value: password }]
                }
                const response = await app.submitLogin(fakeSubmitEvent)
                expect(response).toStrictEqual({ "status": 200 })


            })
            // Should send failed submission
            it("Should send error duruing creation", async () => {
                const fakeSubmitEvent = {
                    preventDefault: jest.fn(),
                    target: [{ value: "tesyMcTestface" }, { value: "test1234" }]
                }
                const response = await app.submitLogin(fakeSubmitEvent)
                expect(response).toStrictEqual({ "status": 422 })
            })
        })

    })
})

