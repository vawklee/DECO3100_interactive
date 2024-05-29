const unpack = (data, key) => data.map(row => row[key]);

// setting up colour variables so you don't have to find them in all the layout groups
const backgroundColor = "#eeeeee";
const lineBlue = "#80AAC6";
// const lineBlue = "#5ca9a4";
const lineRed = "#e35840";
const barLow = "#7aab49";
const barMid = "#ffcb3d";
const barHigh = "#e35840";

// Chart for the number of social media users worldwide from 2017 to 2022
Plotly.d3.csv("datasets/num_users_worldwide_predictions.csv", userData => {
    var officialData = {
        x: unpack(userData, "Year"),
        y: unpack(userData, "Number of social media users worldwide from 2017 to 2022 (in billions)"),
        type: "bar",
        marker: {
            color: "#6eb5ae"
        },
        name: "Recorded numbers",
        hovertemplate: "%{y} billions<extra></extra>"
    };

    var predictionData = {
        x: unpack(userData, "Prediction Years"),
        y: unpack(userData, "Predictions"),
        type: "bar",
        marker: {
            color: "#ffb947"
        },
        name: "Predictions",
        hovertemplate: "%{y} billions<extra></extra>"
    };

    var data = [officialData, predictionData];

    var layout = {
        title: "Social media users worldwide from 2017 to 2027",
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
    }

    var config = {
        responsive: true,
        scrollZoom: false,
        displayModeBar: false
    }

    Plotly.newPlot("plotDailyMinutes", data, layout, config);
});

// Chart for comparing average daily hours spent on social media with the frequency of feeling distracted
Plotly.d3.csv("datasets/frequency_distraction.csv", distractionData => {
    const frequency = unpack(distractionData, "Frequency of distraction");
    const lowHours = unpack(distractionData, "< 2 hours");
    const midHours = unpack(distractionData, "3.5 hours");
    const highHours = unpack(distractionData, "> 5 hours");

    var traceLowHours = {
        x: frequency,
        y: lowHours,
        type: "bar",
        // mode: "lines+markers",
        name: "< 2 hours",
        marker: {
            color: barLow
        },
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var traceMidHours = {
        x: frequency,
        y: midHours, 
        type: "bar",
        // mode: "lines+markers",
        name: "3.5 hours",
        marker: {
            color: barMid
        },
        xaxis: 'x2',
        yaxis: 'y2',
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var traceHighHours = {
        x: frequency,
        y: highHours,
        type: "bar",
        // mode: "lines+markers",
        name: "> 5 hours",
        marker: {
            color: barHigh
        },
        xaxis: 'x3',
        yaxis: 'y3',
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var data = [traceLowHours, traceMidHours, traceHighHours];

    var layout = {
        title: "Frequency of distraction by social media sorted by average weekly hours spent",
        paper_bgcolor: backgroundColor,
        xaxis: {
            title: "Distraction frequency"
        },
        yaxis: {
            title: "Amount of people",
            range: [0, 100]
        },
        xaxis2: {
            title: "Distraction frequency"
        },
        yaxis2:{
            range: [0, 100]
        },
        xaxis3: {
            title: "Distraction frequency"
        },
        yaxis3: {
            range: [0, 100]
        },
        grid: { //subplot layout to make the graphs sit in one row
            rows: 1, 
            columns: 3, 
            pattern: 'independent'
        } 
    };

    var config = {
        responsive: true,
        scrollZoom: false,
        displayModeBar: false
    }

    // Plotly.newPlot("plotDistraction", data, layout, config);
    Plotly.newPlot("plotDistractionSeparate", data, layout, config);
});

// Chart comparing the average daily hours spent on social media with different kinds of wellbeing: lifestlye, mental and physical
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
        }
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

// Chart that compares social media hours with the frequency of depression symptoms
Plotly.d3.csv("datasets/frequency_depression.csv", depressionData => {
    const depression = unpack(depressionData, "Frequency of depression");
    const lowHours = unpack(depressionData, "< 2 hours");
    const midHours = unpack(depressionData, "3.5 hours");
    const highHours = unpack(depressionData, "> 5 hours");

    var traceLowHours = {
        x: depression,
        y: lowHours,
        type: "bar",
        name: "< 2 hours",
        marker: {
            color: barLow
        },
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var traceMidHours = {
        x: depression,
        y: midHours, 
        type: "bar",
        name: "3.5 hours",
        marker: {
            color: barMid
        },
        xaxis: 'x2',
        yaxis: 'y2',
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var traceHighHours = {
        x: depression,
        y: highHours,
        type: "bar",
        name: "> 5 hours",
        marker: {
            color: barHigh
        },
        xaxis: 'x3',
        yaxis: 'y3',
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var data = [traceLowHours, traceMidHours, traceHighHours];

    var layout = {
        title: "Average daily hours spent on social media affecting depression rates",
        paper_bgcolor: backgroundColor,
        xaxis: {
            title: "Depression frequency"
        },
        yaxis: {
            title: "Amount of people",
            range: [0, 100]
        },
        xaxis2: {
            title: "Depression frequency"
        },
        yaxis2:{
            range: [0, 100]
        },
        xaxis3: {
            title: "Depression frequency"
        },
        yaxis3: {
            range: [0, 100]
        },
        grid: { //subplot layout to make the graphs sit in one row
            rows: 1, 
            columns: 3, 
            pattern: 'independent'
        }
    };

    var config = {
        responsive: true,
        scrollZoom: false,
        displayModeBar: false
    }

    // Plotly.newPlot("plotDepression", data, layout, config);
    Plotly.newPlot("plotDepressionSeparate", data, layout, config);
});

// Chart comparing social media hours with the amount of people who experience sleeplessness
Plotly.d3.csv("datasets/frequency_sleep.csv", sleepData => {
    const sleep = unpack(sleepData, "Sleeplessness");
    const lowHours = unpack(sleepData, "< 2 hours");
    const midHours = unpack(sleepData, "3.5 hours");
    const highHours = unpack(sleepData, "> 5 hours");

    var traceLowHours = {
        x: sleep,
        y: lowHours,
        type: "bar",
        name: "< 2 hours",
        marker: {
            color: barLow
        },
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var traceMidHours = {
        x: sleep,
        y: midHours, 
        type: "bar",
        name: "3.5 hours",
        marker: {
            color: barMid
        },
        xaxis: 'x2',
        yaxis: 'y2',
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var traceHighHours = {
        x: sleep,
        y: highHours,
        type: "bar",
        name: "> 5 hours",
        marker: {
            color: barHigh
        },
        xaxis: 'x3',
        yaxis: 'y3',
        hovertemplate: "Amount of people: %{y}<extra></extra>"
    };

    var data = [traceLowHours, traceMidHours, traceHighHours];

    var layout = {
        title: "Sleeping habits impacted by average daily hours spent on social media",
        paper_bgcolor: backgroundColor,
        xaxis: {
            title: "Sleeplessness frequency"
        },
        yaxis: {
            title: "Amount of people",
            range: [0, 100]
        },
        xaxis2: {
            title: "Sleeplessness frequency"
        },
        yaxis2:{
            range: [0, 100]
        },
        xaxis3: {
            title: "Sleeplessness frequency"
        },
        yaxis3: {
            range: [0, 100]
        },
        grid: { //subplot layout to make the graphs sit in one row
            rows: 1, 
            columns: 3, 
            pattern: 'independent'
        }
    };

    var config = {
        responsive: true,
        scrollZoom: false,
        displayModeBar: false
    }

    // Plotly.newPlot("plotSleeplessness", data, layout, config);
    Plotly.newPlot("plotSleeplessnessSeparate", data, layout, config);
});