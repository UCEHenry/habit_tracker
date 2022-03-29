
function registerNewUser(event) {
    console.log('registration form submitted')
    try{
        const userData = {
            username: event.target['username'].value,
            password: event.target['password'].value
        }
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
