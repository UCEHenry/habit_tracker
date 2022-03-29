const signupFormSubmit = document.getElementById('signUpForm').addEventListener('submit', registerNewUser)
passwordValidation()
async function registerNewUser(event) {
    event.preventDefault()
    const userData = {
        username: event.target['registerUsername'].value,
        password: event.target['registerPassword'].value
    }

    try{
        const options = {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await fetch(`${API_URL}/users`, options);
        const data = await response.json()

    } catch (err) {
        alert(`Account creation failed: ${err}`)
        console.log(`Account not created: ${err}`);
    }
}

function passwordValidation() {
    const password = document.getElementById('registerPassword')
    const repeatPassword = document.getElementById('repeatPass')
    
    repeatPassword.onkeyup = () => {
        if (password === repeatPassword) {
            repeatPassword.setAttribute('class', ' form-control border-success')

        }  else {
            repeatPassword.setAttribute('class', ' form-control border-danger')

        }
    }
}
