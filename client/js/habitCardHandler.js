const hform = document.querySelector('.createHabitForm')
hform.addEventListener('submit', createHabit);

window.onload = async (event) => {
    let data = await getAllUserHabits()
    // console.log(data)
    localStorage.setItem('habitData', JSON.stringify(data))
    try {
        let id = 1;
        for (const element of data) {
            element.id = id
            id++
        }
    } catch (err) {

    }


    let template = Handlebars.compile(document.querySelector('#template').innerHTML);
    let filled = template(data, {
        noEscape: true
    })
    document.querySelector('#habitsSection').innerHTML = filled;

    completedButtonEventHandler(data)


}

function loadCards() {
    const habitData = localStorage.getItem('habitData')
    let template = Handlebars.compile(document.querySelector('#template').innerHTML);
    let filled = template(habitData, {
        noEscape: true
    })
    document.querySelector('#habitsSection').innerHTML = filled;
}

function completedButtonEventHandler(data) {
    const completionButtons = document.querySelectorAll('[id^="completionButton_"]')
    for (i = 0; i < completionButtons.length; i++) {
        completionButtons[i].addEventListener('click', (e) => {
            habitData = data[e.target.value - 1]
            completionHabit(habitData)
        })
    }
}


async function createHabit(e) {
    e.preventDefault();

    const username = localStorage.getItem('username');
    const habit = {
        habitName: e.target.habitName.value,
        schedule: e.target.habitSchedule.value,
        completed: 'false',
        dates: [],
        currentStreak: 0,
        longestStreak: 0
    }

    const habitData = {
        username: username,
        habit: habit
    }

    // console.log(habitData);

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
        closeModalOnSuccess()
        loadCards()
    } catch (err) {
        alert(`Unable to create Habit: ${err}`);
        console.log(`Failed to create Habit: ${err}`);
    }
}
function closeModalOnSuccess() {
    const modalElement = document.getElementById('createHabitModalLabel')
    const modal = bootstrap.Modal.getInstance(modalElement)
    modal.hide()
}

async function getAllUserHabits() {
    try {

        const options = {
            headers: new Headers({
                'Authorization': localStorage.getItem('token')
            })
        }
        const username = localStorage.getItem('username');
        const response = await fetch(`http://localhost:3000/users/${username}`, options);
        const data = await response.json();
        let listOfHabits = data.habit;
        if (data.err) {
            console.warn(data.err);
            window.location.href = "/";
        }

        return listOfHabits;

    } catch (err) {
        console.warn(err);
    }

}

function getLastThirtyDays() {
    const currentDate = new Date()
    const thirtyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 30))
    const last30DaysList = []
    // last30DaysList.push({ "date": currentDate.toLocaleDateString('en-gb', { day: "numeric", month: "numeric", year: "numeric" }), "status": 0 })
    for (let d = 0; d < 30; d++) {
        // const counterDate = new Date(currentDate.setDate(currentDate.getDate() - 1)).toLocaleDateString('en-gb', { day: "numeric", month: "numeric", year: "numeric" })
        const counterDate = new Date(thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() + 1)).toLocaleDateString('en-gb', { day: "numeric", month: "numeric", year: "numeric" })
        last30DaysList.push({ "date": counterDate, "status": 0 })
    }
    return last30DaysList
}

function streakCheck(habitDate) {
    try {
        let last30Days = getLastThirtyDays()
        for (date of last30Days) {
            for (d of habitDate) {
                if (d === date['date']) {
                    date['status'] = 1
                }
            }
        }
        let currentStreak = 0;
        let longestStreak = 0;
        for (day of last30Days) {
            if (day['status'] === 1) {

                currentStreak++
            } else {

                if (currentStreak > longestStreak) {
                    longestStreak = currentStreak
                }
                currentStreak = 0
            }
        }

        return [currentStreak, longestStreak]
    } catch (err) {
        let currentStreak = 0;
        let longestStreak = 0;
        return [currentStreak, longestStreak]
    }
}



function completionHabit(habit) {
    // event.preventDefault()

    try {

        // const habitData = JSON.parse(localStorage.getItem('habitData'))
        // for (habit of habitData) {
        //     streakData = streakCheck(habit['dates'])
        //     habit['currentStreak'] = streakData[0]
        //     habit['longestStreak'] = streakData[1]
        // }
        const todaysDate = new Date().toLocaleDateString('en-gb', { day: "numeric", month: "numeric", year: "numeric" })
        if (habit['dates'][habit['dates'].length - 1] != todaysDate) {
            habit['dates'].push(todaysDate)
            streakData = streakCheck(habit['dates'])
            habit['currentStreak'] = streakData[0]
            habit['longestStreak'] = streakData[1]
        }

        const data = {
            username: '',
            habit: habitData
        }

        const options = {
            method: "PATCH",
            headers: new Headers({
                'Authorization': localStorage.getItem('token')
            }),
            body: JSON.stringify(data),
        }
        // console.log(options)

        // const response = await fetch(`http://localhost:3000/users/${username}`, options)
    } catch (err) {
        console.log(err)
    }
}








