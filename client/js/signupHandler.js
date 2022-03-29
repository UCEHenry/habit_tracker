
const signupFormSubmit = document.getElementById('signupForm').addEventListener('submit', registerNewUser)

function registerNewUser(event) {
    event.preventDefault()
    console.log('registration form submitted')
    try{
        const userData = {
            username: event.target['registerUsername'].value,
            password: event.target['registerPassword'].value
        }
        console.log(userData)
        const options = {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(`${API_URL}/users`, options)
        .then(resp = resp.json())
        .then(data => {
            // if (response is positive) {redirect to dashboard} else {show error to user}
        })
    } catch (err) {
        alert(`Account creation failed: ${err}`)
    }
}
