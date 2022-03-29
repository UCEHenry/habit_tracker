function fill_template() {
    const data = {
        title: "this is a title",
        list : [
            {name: "test 1"},
            {name: "test 2"},
            {name: "test 3"},
            {name: "test 4"},
            {name: "test 5"},
            {name: new Date()}
        ]
    }
    const template = Handlebars.compile(document.querySelector("#template").innerHTML)
    const filled = template(data, {
        noEscape:true
    })
    document.querySelector('#output').innerHTML = filled
}
