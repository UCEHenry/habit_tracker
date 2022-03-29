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
