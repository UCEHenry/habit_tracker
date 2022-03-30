window.onload = event => {
    let data = {

        habitList: [
            { habitName: "Exercise", longestStreak: "1", currentStreak: "1", frequency: "daily" },
            { habitName: "Drink Water" },
            { habitName: "Sleep" }
        ]
    };
    let counter = 0
    let dataWithId = {habitList:[]}
    for (item of data['habitList']) {
        item['id'] = counter
        counter ++
        dataWithId['habitList'].push(item)
    }
    let template = Handlebars.compile(document.querySelector('#template').innerHTML);
    let filled = template(dataWithId, {
        noEscape: true
    })
    document.querySelector('#habitsSection').innerHTML = filled;
}

const hform = document.querySelector('.createHabitForm')
hform.addEventListener('submit', createHabit);

async function createHabit(e) {
    e.preventDefault();

    const habitData = {
        habitName: e.target.habitName.value,
        frequency: e.target.habitFrequency.value
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

        const response = await fetch(url, options);
        let data = await response.json();

    } catch(err) {
        alert(`Unable to create Habit: ${err}`);
        console.log(`Failed to create Habit: ${err}`);
    }
}