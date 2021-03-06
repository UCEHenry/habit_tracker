const hform = document.querySelector('.createHabitForm')
hform.addEventListener('submit', createHabit);

const API_URL = "https://fphabitapp.herokuapp.com/users"
// const API_URL = "http://localhost:3000/users"

window.onload = async (event) => {
    localStorage.removeItem('habitData')
    let data = await getAllUserHabits()
    if (Object.keys(data).length != 0) {
        let id = 1;
        for (const element of data) {
            element.id = id
            id++
        }
        localStorage.setItem('habitData', JSON.stringify(data))
        
        let template = Handlebars.compile(document.querySelector('#template').innerHTML);
        let filled = template(data, {
            noEscape: true
        })
        document.querySelector('#habitsSection').innerHTML = filled;
        loadHeroStats()
        completedButtonEventHandler(data)
        deleteButtonEventHandler(data)
    } else {
        localStorage.setItem('habitData', "[]")
        loadHeroStats()
    }
}

function closeModalOnSuccess() {
    const modalElement = document.getElementById('createHabitModalLabel')
    const modal = bootstrap.Modal.getInstance(modalElement)
    modal.hide()
}

function loadCards() {
    const habitData = JSON.parse(localStorage.getItem('habitData'))
    let template = Handlebars.compile(document.querySelector('#template').innerHTML);
    let filled = template(habitData)
    document.querySelector('#habitsSection').innerHTML = filled;
    loadHeroStats()
    completedButtonEventHandler(habitData)
    deleteButtonEventHandler(habitData)
    
}

function loadHeroStats() {
    const username = localStorage.getItem('username')
    const habitData = JSON.parse(localStorage.getItem('habitData'))
    const data = {
        username: username,
        bestHabitStats: bestWorstStats(habitData)[0],
        worstHabitStats: bestWorstStats(habitData)[0]
    }
    console.log(data)
    let template = Handlebars.compile(document.querySelector('#heroTemplate').innerHTML);
    let filled = template(data)
    document.querySelector('#heroStats').innerHTML = filled;
}

function completedButtonEventHandler(data) {
    const completionButtons = document.querySelectorAll('[id^="completionButton_"]')
    for (i = 0; i < completionButtons.length; i++) {
        completionButtons[i].addEventListener('click', (e) => {
            let habitData = data.filter(habit => habit.id == e.target.value)[0]
            completionHabit(habitData)
        })
    }
}

function deleteButtonEventHandler(data) {
    const deleteButtons = document.querySelectorAll('[id^="deleteHabit"]')
    for (i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', (e) => {
            let habitName = data.filter(habit => habit.id == e.target.value)[0]['habitName']
            deleteHabit(habitName)
        })
    }
}

async function getAllUserHabits() {
    try {

        const options = {
            headers: new Headers({
                'Authorization': localStorage.getItem('token')
            })
        }
        const username = localStorage.getItem('username');
        const response = await fetch(`${API_URL}/${username}`, options);
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

    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(habitData),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(`${API_URL}/createhabit`, options);
        let data = await response.json();

        let localHabitData = JSON.parse(localStorage.getItem('habitData'))

        habit['id'] = localHabitData.length + 1
        localHabitData.push(habit)
        localStorage.setItem('habitData', JSON.stringify(localHabitData))
        closeModalOnSuccess()
        loadCards()

    } catch (err) {
        alert(`Unable to create Habit: ${err}`);
        console.log(`Failed to create Habit: ${err}`);
    }
}

async function deleteHabit(habitName) {

    const username = localStorage.getItem("username");

    habitName.replace(/%20/g, " ");

    try {
        const options = {
            method: 'DELETE'
        }
        await fetch(`${API_URL}/${username}/${habitName}`, options);

        let localHabitData = JSON.parse(localStorage.getItem('habitData'))
        localHabitData = localHabitData.filter(habit => habit.habitName !== habitName)
        localStorage.setItem('habitData', JSON.stringify(localHabitData))
        loadCards()
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

function streakCheck(userDates) {
    let currentStreak = 0;
    let longestStreak = 0;
    for (array of userDates) {
        currentStreak = array.length;
        if (currentStreak > longestStreak) {
            longestStreak = currentStreak
        }
    }
    return [currentStreak, longestStreak]
}

function dateStreaksMaker(userDates) {

    const todaysDate = new Date()
    const todaysDateFormatted = todaysDate.toLocaleDateString(
        'en-gb', {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    }
    )
    if (userDates == '') {
        userDates.push([todaysDateFormatted])
    } else {
        const previousDate = new Date(new Date(todaysDate).setDate(new Date(todaysDate).getDate() - 1)).toLocaleDateString(
            'en-gb', {
            day: "numeric",
            month: "numeric",
            year: "numeric"
        }
        )
        for (dates of userDates) {
            if (dates[dates.length - 1] != previousDate) {
                userDates.push([todaysDateFormatted])
                break
            } else {
                dates.push(todaysDateFormatted)
                break
            }
        }
    }
    return userDates
}

async function completionHabit(habit) {
    try {
        const todaysDate = new Date().toLocaleDateString('en-gb', { day: "numeric", month: "numeric", year: "numeric" })
        const username = localStorage.getItem('username')
        if (habit['dates'][habit['dates'].length - 1] != todaysDate) {
            newHabitDates = dateStreaksMaker(habit['dates'])
            newHabitStreaks = streakCheck(newHabitDates)
            habit['dates'] = newHabitDates
            habit['currentStreak'] = newHabitStreaks[0]
            habit['longestStreak'] = newHabitStreaks[1]
        }
        console.log(habit)
        const data = {
            username: username,
            habit: habit
        }

        const options = {
            method: "POST",
            headers: new Headers({
                'Authorization': localStorage.getItem('token'),
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(data),
        }

        const response = await fetch(`${API_URL}/updatehabit`, options)
        // const respData = await response.json()
        let localHabitData = JSON.parse(localStorage.getItem('habitData'))
        localHabitData = localHabitData.filter(habitd => habitd.habitName !== habit.habitName)
        console.log(localHabitData)
        localHabitData.push(habit)
        localStorage.removeItem('habitData')

        localStorage.setItem('habitData', JSON.stringify(localHabitData))
        loadCards()
    } catch (err) {
        console.log(err)
    }
}


function bestWorstStats(allHabitsData) {
    let bestStats ={
        habitName:'',
        longestStreak: 0
    }
    let worstStats = {
        habitName:'',
        longestStreak: 0
    }
    console.log(allHabitsData)
    for(habit of allHabitsData) {
        // console.log(habit)
        newHabitStreaks = streakCheck(habit['dates'])
        console.log(bestStats['longestStreak'])
        console.log(typeof newHabitStreaks[1])
        if(newHabitStreaks[1] > bestStats['longestStreak']) {
            console.log('best')
            bestStats['habitName'] = habit['habitName']
            bestStats['longestStreak'] = newHabitStreaks[1]
        } else if (newHabitStreaks[1] < worstStats['longestStreak']) {
            console.log('worst')
            worstStats['habitName'] = habit['habitName']
            worstStats['longestStreak'] = newHabitStreaks[1]
        } else {
            bestStats['habitName'] = 'lets get one done!'
            worstStats['habitName'] = 'lets get one done!'
        }
    }

    return [bestStats, worstStats]
}
