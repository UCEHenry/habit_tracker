const logInForm = document.querySelector(".logInForm")
const signUpForm = document.querySelector("#signUpForm")

logInForm.addEventListener('submit', requestLogin)
signUpForm.addEventListener('submit', registerNewUser)
passwordValidation()

const API_URL = "https://fphabitapp.herokuapp.com/users"
// const API_URL = "http://localhost:3000/users"


async function registerNewUser(event) {
    event.preventDefault()
    if (event.target.registerPassword.value != event.target.registerCheckPassword.value) {
        alert("Password does not match")
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

            const response = await fetch(`${API_URL}/createuser`, options);
            const data = await response.json()
            console.log(data)
            if (data.err){ 
                throw Error(data.err); 
            } else {
                logInAfterSignUp(event, userData);
            }
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

async function logInAfterSignUp(e, userData){
    e.preventDefault();

    try {
         const options = {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                "Content-Type" : "application/json"
            }
        };
        const response = await fetch(`${API_URL}/login`, options);
        let data = await response.json();

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
            
        const response = await fetch(`${API_URL}/login`, options);
        let data = await response.json();

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

// module.exports = { registerNewUser, passwordValidation, requestLogin, login }
