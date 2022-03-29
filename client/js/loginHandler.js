// const logInForm = document.querySelector(".logInForm")

// logInForm.addEventListener('submit', userLogIn)

async function userLogIn (e) {
    e.preventDefault()
    console.log(e)

    const userData = {
        username: e.target.logInUsername.value,
        password: e.target.logInPassword.value,
    };
    console.log(e.target)
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                "Content-Type" : "application/json"
            }
        };
    
        console.log(options.body)
        
        const response = await fetch(url, options);
        let data = await response.json();

        // if (data.err) {
        //     throw Error(data.err);
        // }
        // else (
        //     // var current = window.location.href;
        //     // window.location.href = current.replace(/#(.*)$/, '') + '#' + id;
        //     window.location.hash = `#${data.id}`
        // )

    } catch (err) {
        alert(`Unable to Log In: ${err}`);
        console.log(`Failed to get Log In, reason: ${err}`);
    }
}

module.exports = {userLogIn}
