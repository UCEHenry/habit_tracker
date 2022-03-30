


// function getLastThirtyDays() {
//     const currentDate = new Date()
//     const last30DaysList = []
//     for (let d = 0; d < 30; d++) {
//         const counterDate = new Date(currentDate.setDate(currentDate.getDate() - 1)).toLocaleDateString('en-gb', { day: "numeric", month: "numeric", year: "numeric" })
//         last30DaysList.push({"date":counterDate, "status":0})
//     }
//     return last30DaysList
// }

// fetch('./data.json')
//     .then(resp => resp.json())
//     .then((userData) => {
//         let last30Days = getLastThirtyDays()
//         for(lastDate of last30Days) {
//             for(userDate of userData[0]['habit']['date']) {
//                 if (userDate === lastDate['date']) {
//                     lastDate['status'] = 1
//                 }
//             }
//             // console.log(lastDate)
//         }
        
//     })
