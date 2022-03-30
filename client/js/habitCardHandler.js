window.onload = event => {
    let data = {

        habitList: [
            { habitName: "Exercise", longestStreak: "1", currentStreak: "1", frequency: "daily" },
            { habitName: "Drink Water" },
            { habitName: "Sleep" }
        ]
    };

    let id = 1;
    for (const element of data.habitList) {
        element.id = id
        id++
    }
    getAllHabits;

    let template = Handlebars.compile(document.querySelector('#template').innerHTML);
    let filled = template(data, {
        noEscape: true
    })
    document.querySelector('#habitsSection').innerHTML = filled;
}

const hform = document.querySelector('.createHabitForm')
hform.addEventListener('submit', createHabit);

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

async function getAllHabits(){
    try {
        const options = { 
            headers: new Headers({
                'Authorization': localStorage.getItem('token')
            }) 
        }

        const username = localStorage.getItem('username');
        const response = await fetch(`http://localhost:3000/users/${username}`, options);
        const data = await response.json();

        if(data.err){
            console.warn(data.err);
            logout();
        }

        return data;

    } catch (err) {
        console.warn(err);
    }

}