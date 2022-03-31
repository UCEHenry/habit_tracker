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
