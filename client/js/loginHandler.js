// const logInForm = document.querySelector(".logInForm")

// logInForm.addEventListener('submit', userLogIn)

async function userLogIn (e) {
    e.preventDefault()
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
    
        // console.log(options.body)
        
        const response = await fetch(url, options);
        let data = await response.json();

        if (data.err) {
            throw Error(data.err);
        }
        else (
            requestLogin(e, options)
        )
    } catch (err) {
        alert(`Unable to Log In: ${err}`);
        console.log(`Failed to get Log In, reason: ${err}`);
    }
}

async function requestLogin(e, userData){
    e.preventDefault();
    options = userData;
    try {
        const response = await fetch(`http://localhost:3000/auth/login`, options)
        const data = await response.json()
        if (data.err){ throw Error(data.err); }
        login(data);
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}

function login(data){
    localStorage.setItem('token', data.token);
    let userInfo = jwt_decode(data.token);
    localStorage.setItem('username', userInfo.username);
    localStorage.setItem('email', userInfo.email);
    window.location.href = "/dashboard.html";
}


function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}
module.exports = {userLogIn}