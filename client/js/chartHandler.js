
// // JS 
// var chart; 
// var statuses = ['HEALHTY', 'ISSUE', 'DOWNTIME']; 
// // [OK, NO_WATER, DOWN] 
// var palette = ['#00C853', '#FFEA00', '#ff2a2e']; 
// // fetch(userData) 
// //   .then(function(response) { 
// //     return response.text(); 
// //   }) 
// //   .then((userData) => { 
// //     // var data = JSC.csv2Json(text); 
// //     console.log(userData)
// //     chart = renderChart(makeSeries(data)); 
// //   }); 

// function getLastThirtyDays(dateList) {
// const currentDate = new Date();
// const last30DaysDate = new Date(currentDate.setDate(currentDate.getDate() - 30));
// const last30DaysList = []
// for (let d = 0; d< 30; d++) {
//     if ()
// }

// console.log(last30DaysList)
// }





// fetch('./data.json')
// .then(resp => resp.json())
// .then((userData) => {
//     let status_dict = []
//     getLastThirtyDays(userData[0]['habit']['date'])
//     // for(item of userData[0]['habit']['date']) {
        
//     // }
// })

// function renderChart(series) { 
//   return JSC.chart('chartDiv', { 
//     type: 'heatmap solid', 
//     title_label_text: 'Facebook Status', 
//     debug: true, 
//     legend: { 
//       margin_top: -26, 
//       position: 'inside top right', 
//       defaultEntry: { icon_width: 10 } 
//     }, 
//     palette: { 
//       pointValue: function(p) { 
//         return p.options('z'); 
//       }, 
//       ranges: makePaletteRanges(palette) 
//     }, 
//     yAxis_visible: false, 
//     xAxis_scale_type: 'time', 
//     defaultSeries_shape_innerPadding: 0.05, 
//     defaultPoint: { 
//       outline_width: 0, 
//       tooltip: 
//         '{%xValue:date} <br>Status: <b>%status</b>'
//     }, 
//     series: series 
//   }); 
// } 
  
// function makeSeries(data) { 
//   return JSC.nest() 
//     .key('date') 
//     .pointRollup(function(key, val) { 
//       var values = val[0]; 
//       return { 
//         x: values.date, 
//         y: 'Facebook', 
//         z: values.status, 
//         attributes_status: statuses[values.status] 
//       }; 
//     }) 
//     .series(data); 
// } 
  
// function makePaletteRanges(palette) { 
//   return palette.map(function(item, i) { 
//     return { 
//       value: i, 
//       color: item, 
//       legendEntry_value: statuses[i] 
//     }; 
//   }); 
// } 


