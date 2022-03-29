const fs = required('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');
global.fetch = require('jest-fetch-mock');
let app;

describe("Checks JS files", () => {
    describe("loginHandler.js", () => {
        beforeEach(()=>{
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
                target:[{value: "username"}, {value: "password"}]
            }
            app.submitLogin(fakeSubmitEvent)
            expect(fetch.mock.calls[0][1]).toHaveProperty("method", "POST")
            expect(fetch.mock.calls[0][1]).toHaveProperty("body", JSON.stringify({username: "username", password: "password"}))
        })
        // Should send success of submission
        // Should send failed submission
        // Should load modal.
    })
    describe("signupHandler.js", ()=> {
        beforeEach(()=>{
            app = require("../js/signupHandler")
            document.documentElement.innerHTML = html.toString();
        })
        afterEach(() => {
            fetch.resetMocks();
        })
        // Should send signup data to backend
        // Should send success of submission
        // Should send failed submission
        
    })
})
