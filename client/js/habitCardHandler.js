window.onload = event => {
    let data = {
        
        habitList: [
            { habitName: "Exercise", id:"1",  longestStreak:"1", currentStreak:"1", frequency: "daily" },
            { habitName: "Drink Water", id:"2" },
            { habitName: "Sleep", id:"3" }
        ],
    };
    
    let template = Handlebars.compile(document.querySelector('#template').innerHTML);
    let filled = template(data, {
        noEscape: true
    })
    document.querySelector('#habitsSection').innerHTML = filled;
}
