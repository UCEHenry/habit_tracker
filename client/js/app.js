const { userLogIn } = require("./loginHandler")
const { passwordValidation, registerNewUser } = require("./signupHandler")

// Event listeners
const logInForm = document.querySelector(".logInForm")

logInForm.addEventListener('submit', userLogIn)
const signupFormSubmit = document.getElementById('signUpForm').addEventListener('submit', registerNewUser)

// Handler functions
passwordValidation()
