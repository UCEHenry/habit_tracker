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
