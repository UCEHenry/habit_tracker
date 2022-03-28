const db = connect("mongodb://localhost:27017/habits")

db.users.drop()

db.users.insertMany([
    {username:"phil", password: "fresh"},
    {username:"carlton", password: "prince"}
])
