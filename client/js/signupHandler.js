const signupFormSubmit = document.getElementById('signupForm').addEventListener('submit', registerNewUser)

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
