const { requestLogin } = require("./loginHandler")
const { passwordValidation, registerNewUser } = require("./signupHandler")

// Event listeners
const logInForm = document.querySelector(".logInForm")
const signUpForm = document.querySelector(".signUpForm")

logInForm.addEventListener('submit', requestLogin)
signUpForm.addEventListener('submit', registerNewUser)

// Handler functions
passwordValidation()
