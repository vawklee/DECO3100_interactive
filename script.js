// SCREEN RESOLUTION USED FOR TESTING: 1805 x 1203
// Browser viewport resolution used for testing: 1805 x 1060

const unpack = (data, key) => data.map(row => row[key]);

// setting up colour variables so you don't have to find them in all the layout groups
const backgroundColor = "#eeeeee";
const lineBlue = "#80AAC6";
const lineRed = "#d15252";
const barLow = "#8ab063";
const barMid = "#ffb947";
const barHigh = "#d15252";

// Chart for the number of social media users worldwide from 2017 to 2022
Plotly.d3.csv("datasets/num_users_worldwide_predictions.csv", userData => {
    var officialData = {
        x: unpack(userData, "Year"),
        y: unpack(userData, "Number of social media users worldwide from 2017 to 2022 (in billions)"),
        // type: "bar",
        // mode: "lines+markers",
        type: "scatter",
        fill: "tozeroy",
        marker: {
            color: "#6eb5ae"
        },
        name: "Recorded numbers",
        hovertemplate: "%{y} billions<extra></extra>",
    };

    var predictionData = {
        x: unpack(userData, "Prediction Years"),
        y: unpack(userData, "Predictions"),
        // type: "bar",
        // mode: "lines+markers",
        type: "scatter",
        fill: "tozeroy",
        marker: {
            color: "#ffb947"
        },
        name: "Predictions",
        hovertemplate: "%{y} billions<extra></extra>",
    };

    var data = [officialData, predictionData];

    var layout = {
        title: "Social Media Users Worldwide Over 10 Years",
        yaxis: {
            title: "Amount of users (billions)",
            range: [0, 6],
        },
        xaxis: {
            tickmode: 'linear',
            tick0: 1,
            dtick: 1
        },
        paper_bgcolor: backgroundColor,
        showlegend: false,
        annotations: [
            {
                x: 2023,
                y: 4.89,
                xref: "x",
                yref: "y",
                text: "Usage predictions",
                showarrow: true,
                arrowhead: 7,
                ax: 0, 
                ay: -40
            }
        ]
    };

    var config = {
        responsive: true,
        scrollZoom: false,
        displayModeBar: false
    }

    Plotly.newPlot("plotUsersWorldwide", data, layout, config);
})

// Chart for the average time spent on social media daily, worldwide from 2012 to 2024
Plotly.d3.csv("datasets/avg_dailytime_worldwide.csv", dailyData => {
    const year = unpack(dailyData, "Year");
    const time = unpack(dailyData, "Average daily time spent on social networking by internet users worldwide from 2012 to 2024 (in minutes)");

    var data = [{
        x: year,
        y: time,
        type: "bar",
        marker: {
            color: ['#7abdb5','#74b9b1','#6eb5ae','#68b1ab','#62ada7','#5ca9a4','#55a5a0','#4fa19d','#489d9a','#419997','#3a9593','#329190','#2a8d8d']
        },
        hovertemplate: "%{y} minutes<extra></extra>"
    }];

    var layout = {
        title: "Average time spent on social media daily worldwide from 2012 to 2024",
        xaxis: {
            tickmode: "linear"
        },
        yaxis: {
            title: "Time spent (minutes)",
            range: [0, 180],
            tickmode: "linear",
            tick0: 0,
            dtick: 60
        },
        paper_bgcolor: backgroundColor,
        annotations: [
            {
                x: 2023,
                y: 151,
                xref: "x",
                yref: "y",
                text: "Longest record",
                showarrow: true,
                arrowhead: 7,
                ax: 0, 
                ay: -33
            }
        ]
        
    };

    var config = {
        responsive: true,
        scrollZoom: false,
        displayModeBar: false
    }

    Plotly.newPlot("plotDailyMinutes", data, layout, config);
});

// NEW: Chart for comparing average daily hours spent on social media with the frequency of feeling distracted
Plotly.d3.csv("datasets/frequency_distraction_percentages.csv", distractionData => {
    const frequency = unpack(distractionData, "Frequency of distraction");
    const lowHours = unpack(distractionData, "< 2 hours");
    const midHours = unpack(distractionData, "3.5 hours");
    const highHours = unpack(distractionData, "> 5 hours");

    var traceLowHours = {
        x: frequency,
        y: lowHours,
        name: "< 2 hours",
        type: "bar",
        marker: {
            color: barLow
        },
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var traceMidHours = {
        x: frequency,
        y: midHours, 
        name: "3.5 hours",
        type: "bar",
        marker: {
            color: barMid
        },
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var traceHighHours = {
        x: frequency,
        y: highHours,
        name: "> 5 hours",
        type: "bar",
        marker: {
            color: barHigh
        },
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var data = [traceLowHours, traceMidHours, traceHighHours];

    var layout = {
        title: "Daily social media hours influencing frequency of distraction",
        barmode: "stack",
        paper_bgcolor: backgroundColor,
        xaxis: {
            title: "Distraction frequency"
        },
        yaxis: {
            title: "Number of people (%)",
            ticksuffix: "%",
            range: [0, 100]
        },
    };

    var config = {
        responsive: true,
        scrollZoom: false,
        displayModeBar: false
    };

    Plotly.newPlot("plotDistraction", data, layout, config);
});

// NEW: Chart that compares social media hours with the frequency of depression symptoms
Plotly.d3.csv("datasets/frequency_depression_percentages.csv", depressionData => {
    const depression = unpack(depressionData, "Frequency of depression");
    const lowHours = unpack(depressionData, "< 2 hours");
    const midHours = unpack(depressionData, "3.5 hours");
    const highHours = unpack(depressionData, "> 5 hours");

    var traceLowHours = {
        x: depression,
        y: lowHours,
        name: "< 2 hours",
        type: "bar",
        marker: {
            color: barLow
        },
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var traceMidHours = {
        x: depression,
        y: midHours, 
        name: "3.5 hours",
        type: "bar",
        marker: {
            color: barMid
        },
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var traceHighHours = {
        x: depression,
        y: highHours,
        name: "> 5 hours",
        type: "bar",
        marker: {
            color: barHigh
        },
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var data = [traceLowHours, traceMidHours, traceHighHours];

    var layout = {
        title: "Daily social media hours influencing frequency of depression",
        barmode: "stack",
        paper_bgcolor: backgroundColor,
        xaxis: {
            title: "Depression frequency"
        },
        yaxis: {
            title: "Number of people (%)",
            ticksuffix: "%",
            range: [0, 100]
        },
    };

    var config = {
        responsive: true,
        scrollZoom: false,
        displayModeBar: false
    };

    Plotly.newPlot("plotDepression", data, layout, config);
});

Plotly.d3.csv("datasets/frequency_sleep_percentages.csv", sleepData => {
    const sleep = unpack(sleepData, "Sleeplessness");
    const lowHours = unpack(sleepData, "< 2 hours");
    const midHours = unpack(sleepData, "3.5 hours");
    const highHours = unpack(sleepData, "> 5 hours");

    var traceLowHours = {
        x: sleep,
        y: lowHours,
        name: "< 2 hours",
        type: "bar",
        marker: {
            color: barLow
        },
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var traceMidHours = {
        x: sleep,
        y: midHours, 
        name: "3.5 hours",
        type: "bar",
        marker: {
            color: barMid
        },
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var traceHighHours = {
        x: sleep,
        y: highHours,
        name: "> 5 hours",
        type: "bar",
        marker: {
            color: barHigh
        },
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var data = [traceLowHours, traceMidHours, traceHighHours];

    var layout = {
        title: "Daily social media hours influencing frequency of sleeplessness",
        barmode: "stack",
        paper_bgcolor: backgroundColor,
        xaxis: {
            title: "Sleeplessness frequency"
        },
        yaxis: {
            title: "Number of people (%)",
            ticksuffix: "%",
            range: [0, 100]
        },
    };

    var config = {
        responsive: true,
        scrollZoom: false,
        displayModeBar: false
    };

    Plotly.newPlot("plotSleeplessness", data, layout, config);
});

// 3 charts comparing the average daily hours spent on social media with different kinds of wellbeing: lifestlye, mental and physical
Plotly.d3.csv("datasets/colorado_wellbeing_percentages.csv", coloradoData => { //"datasets/colorado_avg_wellbeing.csv"
    const age = unpack(coloradoData, "Age");
    const hours = unpack(coloradoData, "Avg weekly hours spent on social media");
    const impact = unpack(coloradoData, "Avg Social Media Percentage");
    const emotional = unpack(coloradoData, "Avg Emotional Wellbeing Percentage");
    const physical = unpack(coloradoData, "Avg Physical Health Percentage");

    var traceWeeklyHours = {
        x: age,
        y: hours,
        // type: "bar",
        mode: "lines",
        name: "Avg. hours",
        line: {
            color: lineBlue
        },
        hovertemplate: "Avg. weekly hours: %{y:.2f}<extra></extra>"
    };

    var traceImpact = {
        x: age,
        y: impact,
        yaxis: 'y2',
        // type: "bar",
        mode: "lines",
        name: "Neg. Impact %",
        line: {
            color: lineRed
        },
        hovertemplate: "%{y:.2f}%<extra></extra>"
    };

    var traceEmotional = {
        x: age,
        y: emotional,
        mode: "lines",
        name: "Emotional wellbeing %",
        line: {
            color: lineRed
        },
        yaxis: "y2",
        hovertemplate: "%{y:.2f}%<extra></extra>"
    };

    var tracePhysical = {
        x: age,
        y: physical,
        mode: "lines",
        name: "Physical wellbeing %",
        line: {
            color: lineRed
        },
        yaxis: "y2",
        hovertemplate: "%{y:.2f}%<extra></extra>"
    };

    var dataImpact = [traceWeeklyHours, traceImpact];
    var dataEmotional = [traceWeeklyHours, traceEmotional];
    var dataPhysical = [traceWeeklyHours, tracePhysical];

    var layoutImpact = {
        title: "Social media's negative impact on behaviour & lifestyle in 2021",
        xaxis: {
            title: "Age",
        },
        yaxis: {
            title: "Average weekly hours spent on social media",
            range: [0, 35],
            color: lineBlue
        },
        yaxis2: {
            title: "Impact on behaviour & lifestyle (%)",
            range: [0, 100],
            overlaying: "y",
            side: "right",
            color: lineRed
        },
        paper_bgcolor: backgroundColor,
        width: 850,
        legend: {
            xref: "container",
            xanchor: "right",
            x: 1.35
        },
        updatemenus: [{
            buttons: [
                {
                    method: "restyle",
                    args: [{"visible": [true, true]}],
                    label: "Both"
                },
                {
                    method: "restyle",
                    args: [{'visible': [true, false]}],
                    label: "Average hours"
                },
                {
                    method: "restyle",
                    args: [{"visible": [false, true]}],
                    label: "Negative Impact"
                }   
            ],
            direction: 'down',
            showactive: true,
            xanchor: 'right',
            x: 1.36,
            yanchor: 'top',
            y: 0.8
        }],
        showlegend: true
    };

    var layoutEmotional = {
        title: "Social media's impact on emotional wellbeing",
        xaxis: {
            title: "Age"
        },
        yaxis: {
            title: "Average weekly hours spent on social media",
            color: lineBlue,
            range: [0, 35]
        },
        yaxis2: {
            title: "Impact on emotional wellbeing (%)",
            color: lineRed,
            range: [0, 100],
            overlaying: "y",
            side: "right",
        },
        paper_bgcolor: backgroundColor,
        width: 850,
        legend: {
            xref: "container",
            xanchor: "right",
            x: 1.5
        }
    };
    
    var layoutPhysical = {
        title: "Social media's impact on physical wellbeing",
        xaxis: {
            title: "Age"
        },
        yaxis: {
            title: "Average weekly hours spent on social media",
            color: lineBlue,
            range: [0, 35]
        },
        yaxis2: {
            title: "Impact on physical wellbeing (%)",
            color: lineRed,
            range: [0, 100],
            overlaying: "y",
            side: "right"
        },
        paper_bgcolor: backgroundColor,
        width: 850,
        legend: {
            xref: "container",
            xanchor: "right",
            x: 1.45
        }
    };

    var config = {
        responsive: true,
        scrollZoom: false,
        displayModeBar: false
    };

    // Charting the impact of social media hours on behaviour and lifestyle
    Plotly.newPlot("plotBehaviourImpact", dataImpact, layoutImpact, config);
    
    // Chart comparing social media usage with emotional wellbeing
    Plotly.newPlot("plotEmotionalWellbeing", dataEmotional, layoutEmotional, config);
    
    // Chart that compares social media hours with physical wellbeing
    Plotly.newPlot("plotPhysicalWellbeing", dataPhysical, layoutPhysical, config);
});