window.onload = event => {
    let data = {
        habitName: [
            { habitName: "Exercise" },
            { habitName: "Drink Water" },
            { habitName: "Sleep" }
        ],
        stats: [
            { stats: "1" },
            { stats: "2" },
            { stats: "3" }
        ]
    };
    
    let template = Handlebars.compile(document.querySelector('#template').innerHTML);
    let filled = template(data, {
        noEscape: true
    })
    document.querySelector('#output').innerHTML = filled;
}