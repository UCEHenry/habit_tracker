(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { requestLogin } = require("./loginHandler")
const { passwordValidation, registerNewUser } = require("./signupHandler")

// Event listeners
const logInForm = document.querySelector(".logInForm")
const signUpForm = document.querySelector(".signUpForm")

logInForm.addEventListener('submit', requestLogin)
signUpForm.addEventListener('submit', registerNewUser)

// Handler functions
passwordValidation()

},{"./loginHandler":2,"./signupHandler":3}],2:[function(require,module,exports){
const logInForm = document.querySelector(".logInForm")

logInForm.addEventListener('submit', requestLogin)

async function requestLogin(e){
    e.preventDefault();

    const userData = {
        username: e.target.logInUsername.value,
        password: e.target.logInPassword.value
    };

    try {
         const options = {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                "Content-Type" : "application/json"
            }
        };
    
        console.log(options.body)
        
        const response = await fetch(`http://localhost:3000/users/login`, options);
        let data = await response.json();
        console.log(data);

        if (data.err){ 
            throw Error(data.err); 
        } else {
            login(data);
        }
    } catch (err) {
        alert(`Unable to Log In: Incorrect Details`);
        console.log(`Failed to get Log In, reason: ${err}`);    
    }
}

function login(data){
    localStorage.setItem('token', data.token);
    let userInfo = jwt_decode(data.token);
    localStorage.setItem('username', userInfo.username);
    window.location.href = "/dashboard.html";
}


function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}

// module.exports = {requestLogin, login}

},{}],3:[function(require,module,exports){
const signupFormSubmit = document.getElementById('signUpForm').addEventListener('submit', registerNewUser)
passwordValidation()
async function registerNewUser(event) {
    event.preventDefault()
    console.log("Hello")
    console.log(event.target.registerPassword.value + event.target.registerCheckPassword.value)
    if (event.target.registerPassword.value != event.target.registerCheckPassword.value) {
        // alert("Password does not match")
    } else {
        const userData = {
            username: event.target['registerUsername'].value,
            password: event.target['registerPassword'].value
        }

        try {
            const options = {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json"
                }
            }
            console.log(userData)
            const response = await fetch(`http://localhost:3000/users/createuser`, options);
            const data = await response.json()

        } catch (err) {
            alert(`Account creation failed: ${err}`)
            console.log(`Account not created: ${err}`);
        }
    }
}

function passwordValidation() {
    const password = document.getElementById('registerPassword')
    const repeatPassword = document.getElementById('registerCheckPassword')
    
    repeatPassword.onkeyup = () => {

        if (repeatPassword.value === password.value) {
            repeatPassword.setAttribute('class', ' form-control border-success')
        }  else {
            repeatPassword.setAttribute('class', ' form-control border-danger')
        }
    }
}

// module.exports = { registerNewUser, passwordValidation }

},{}]},{},[1]);
