const hform = document.querySelector('.createHabitForm')
hform.addEventListener('submit', createHabit);

window.onload = async (event) => {
    let data = await getAllUserHabits()
    console.log(data)
    let id = 1;
    for (const element of data) {
        element.id = id
        id++
    }

    let template = Handlebars.compile(document.querySelector('#template').innerHTML);
    let filled = template(data, {
        noEscape: true
    })
    document.querySelector('#habitsSection').innerHTML = filled;
}


async function createHabit(e) {
    e.preventDefault();

    const username = localStorage.getItem('username');
    const habit = {
        habitName: e.target.habitName.value,
        schedule: e.target.habitSchedule.value
    }

    const habitData = {
        username: username,
        habit: habit
    }

    console.log(habitData);

    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(habitData),
            headers: {
                "Content-Type": "application/json"
            }
        } 

        const response = await fetch('http://localhost:3000/users/createhabit', options);
        let data = await response.json();

    } catch(err) {
        alert(`Unable to create Habit: ${err}`);
        console.log(`Failed to create Habit: ${err}`);
    }
}

async function getAllUserHabits(){
    try {
        const options = { 
            headers: new Headers({
                'Authorization': localStorage.getItem('token')
            }) 
        }

        const username = localStorage.getItem('username');
        const response = await fetch(`http://localhost:3000/users/${username}`, options);
        const data = await response.json();
        let listOfHabit = data.user.habit;

        if(data.err){
            console.warn(data.err);
            window.location.href = "/";
        }

        return listOfHabit;

    } catch (err) {
        console.warn(err);
    }

}
