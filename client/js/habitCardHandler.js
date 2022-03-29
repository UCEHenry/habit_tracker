function fill_template() {
    let userHabits = [
        {habitName:"drink 2L of water"},
        {habitName:"workout"},
        {habitName:"clean windows"},
        {habitName:"practise speech"},
    ]
    const template = Handlebars.compile(document.querySelector("#template").innerHTML)
    const filled = template(data, {
        noEscape:true
    })
    document.querySelector('#habitsSection').innerHTML = filled
}

window.onload
