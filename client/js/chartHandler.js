// const moment = require('moment')
// JS 
var chart;
var statuses = ['missed', 'completed'];
// [OK, NO_WATER, DOWN] 
var palette = [ '#ff2a2e', '#00C853',];
// fetch(userData) 
//   .then(function(response) { 
//     return response.text(); 
//   }) 
//   .then((userData) => { 
//     // var data = JSC.csv2Json(text); 
//     console.log(userData)
//     chart = renderChart(makeSeries(data)); 
//   }); 

function getLastThirtyDays() {
    const currentDate = new Date()
    const last30DaysList = []
    for (let d = 0; d < 30; d++) {
        const counterDate = new Date(currentDate.setDate(currentDate.getDate() - 1)).toLocaleDateString('en-gb', { day: "numeric", month: "numeric", year: "numeric" })
        last30DaysList.push({"date":counterDate, "status":0})
    }
    return last30DaysList
}

fetch('./data.json')
    .then(resp => resp.json())
    .then((userData) => {
        let last30Days = getLastThirtyDays()
        for(lastDate of last30Days) {
            for(userDate of userData[0]['habit']['date']) {
                if (userDate === lastDate['date']) {
                    lastDate['status'] = 1
                }
            }
            console.log(lastDate)
        }
        chart = renderChart(makeSeries(last30Days))
    })

function renderChart(series) {
    return JSC.chart('chartDiv', {
        type: 'heatmap solid',
        title_label_text: 'Your habit',
        debug: true,
        legend: {
            margin_top: -26,
            position: 'inside top right',
            defaultEntry: { icon_width: 10 }
        },
        palette: {
            pointValue: function (p) {
                return p.options('z');
            },
            ranges: makePaletteRanges(palette)
        },
        yAxis_visible: false,
        xAxis_scale_type: 'time',
        defaultSeries_shape_innerPadding: 0.05,
        defaultPoint: {
            outline_width: 0,
            tooltip:
                '{%xValue:date} <br>Status: <b>%status</b>'
        },
        series: series
    });
}

function makeSeries(data) {
    return JSC.nest()
        .key('date')
        .pointRollup(function (key, val) {
            var values = val[0];
            console.log(val)
            return {
                x: values.date,
                y: 'habits',
                z: values.status,
                attributes_status: statuses[values.status]
            };
        })
        .series(data);
}

function makePaletteRanges(palette) {
    return palette.map(function (item, i) {
        return {
            value: i,
            color: item,
            legendEntry_value: statuses[i]
        };
    });
}


