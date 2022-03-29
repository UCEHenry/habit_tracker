const db = connect("mongodb://localhost:27017/habits")

db.users.drop()

db.users.insertMany([
    { username:"phil", password: "fresh", sleep: {habitName:'sleep', schedule:'weekly',completed:'true', dates:[], currentStreak:1, longestStreak:2} , walking:{habitName:'walking', schedule:'daily',completed:'true', dates:[], currentStreak:1, longestStreak:2}},
    { username:"carlton", password: "prince" }
])
