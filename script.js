const unpack = (data, key) => data.map(row => row[key]);

// setting up colour variables so you don't have to find them in all the layout groups
const backgroundColor = "#eeeeee";
const lineBlue = "80AAC6";
const lineRed = "f34730";
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
            // color: ["#26a69a","#1da7a7","#159aa8","#0e8aa8","#0679a7","#0067a6"]
            // color: ["#79bd8f","#5fba85","#45b97e","#37ab7a","#2a9b76","#1f8a70"]
            color: "79bd8f"
        },
        name: "Recorded numbers"
    };

    var predictionData = {
        x: unpack(userData, "Prediction Years"),
        y: unpack(userData, "Predictions"),
        type: "bar",
        // mode: "lines+markers",
        marker: {
            // color: ["#f2b705","#f5a704","#f79703","#fa8601","#fd7400"]
            // color: ['#53799d','#48709e','#3d669e','#335b9e','#2a509d']
            color: "#ffb947"
        },
        name: "Predictions"
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
            // color: ["#79bd8f","#75c37f","#77c971","#87cf6e","#9ad56a","#b1db67","#cce063","#e6e160","#ebcb5d","#f0b15a","#f59457","#fa7555","#ff5252"]
            color: ['#7abd8f','#6ebe8f','#61bf91','#54c196','#46c39e','#38c5a9','#31c1b3','#29bdbd','#22abb9','#1c97b4','#1682ae','#116da8','#0c59a1']
        }
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

    // var traceLowHours = {
    //     x: frequency,
    //     y: lowHours,
    //     type: "bar",
    //     // mode: "lines+markers",
    //     name: "< 2 hours",
    //     marker: {
    //         color: barLow
    //     }
    // };

    // var traceMidHours = {
    //     x: frequency,
    //     y: midHours, 
    //     type: "bar",
    //     // mode: "lines+markers",
    //     name: "3.5 hours",
    //     marker: {
    //         color: barMid
    //     }
    // };

    // var traceHighHours = {
    //     x: frequency,
    //     y: highHours,
    //     type: "bar",
    //     // mode: "lines+markers",
    //     name: "> 5 hours",
    //     marker: {
    //         color: barHigh
    //     }
    // };

    var traceLowHours = {
        x: frequency,
        y: lowHours,
        type: "bar",
        // mode: "lines+markers",
        name: "< 2 hours",
        marker: {
            color: barLow
        }
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
        yaxis: 'y2'
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
        yaxis: 'y3'
    };

    var data = [traceLowHours, traceMidHours, traceHighHours];

    var layout = {
        title: "Frequency of distraction by social media sorted by average weekly hours spent",
        paper_bgcolor: backgroundColor,
        yaxis: {
            title: "Amount of people"
        },
        xaxis: {
            title: "Distraction frequency"
        },
        xaxis2: {
            title: "Distraction frequency"
        },
        xaxis3: {
            title: "Distraction frequency"
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
Plotly.d3.csv("datasets/colorado_avg_wellbeing.csv", coloradoData => {
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
    };

    var traceImpact = {
        x: age,
        y: impact,
        // type: "bar",
        mode: "lines",
        name: "Impact %",
        line: {
            color: lineRed
        },
        yaxis: 'y2'
    };

    var dataImpact = [traceWeeklyHours, traceImpact];
    var layoutImpact = {
        title: "Social media's impact on behaviour & lifestyle 2021",
        xaxis: {
            title: "Age"
        },
        yaxis: {
            title: "Average weekly hours spent on social media",
            range: [0, 35],
            color: lineBlue
        },
        yaxis2: {
            title: "Impact on behaviour & lifestyle (%)",
            range: [0, 1],
            overlaying: "y",
            side: "right",
            color: lineRed
        },
        paper_bgcolor: backgroundColor,
    };

    var config = {
        responsive: true,
        scrollZoom: false,
        displayModeBar: false
    }

    // Charting the impact of social media hours on behaviour and lifestyle
    Plotly.newPlot("plotBehaviourImpact", dataImpact, layoutImpact, config);

    var traceEmotional = {
        x: age,
        y: emotional,
        mode: "lines",
        name: "Emotional wellbeing %",
        line: {
            color: lineRed
        },
        yaxis: "y2"
    };

    var dataEmotional = [traceWeeklyHours, traceEmotional];
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
            range: [0, 1],
            overlaying: "y",
            side: "right",
        },
        paper_bgcolor: backgroundColor,
    };
    // Chart comparing social media usage with emotional wellbeing
    Plotly.newPlot("plotEmotionalWellbeing", dataEmotional, layoutEmotional, config);

    var tracePhysical = {
        x: age,
        y: physical,
        mode: "lines",
        name: "Physical wellbeing %",
        line: {
            color: lineRed
        },
        yaxis: "y2"
    };

    var dataPhysical = [traceWeeklyHours, tracePhysical];
    var layoutPhysical = {
        title: "Social media's impact on physical wellbeing",
        xaxis: {
            title: "Age"
        },
        yaxis: {
            title: "Average weekly hours spent on social media",
            range: [0, 35]
        },
        yaxis2: {
            title: "Impact on physical wellbeing (%)",
            range: [0, 1],
            overlaying: "y",
            side: "right"
        },
        paper_bgcolor: backgroundColor,
    };
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
        }
    };

    var traceMidHours = {
        x: depression,
        y: midHours, 
        type: "bar",
        name: "3.5 hours",
        marker: {
            color: barMid
        }
    };

    var traceHighHours = {
        x: depression,
        y: highHours,
        type: "bar",
        name: "> 5 hours",
        marker: {
            color: barHigh
        }
    };

    var data = [traceLowHours, traceMidHours, traceHighHours];

    var layout = {
        title: "Average daily hours spent on social media affecting depression rates",
        paper_bgcolor: backgroundColor,
    };

    var config = {
        responsive: true,
        scrollZoom: false,
        displayModeBar: false
    }

    Plotly.newPlot("plotDepression", data, layout, config);
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
        }
    };

    var traceMidHours = {
        x: sleep,
        y: midHours, 
        type: "bar",
        name: "3.5 hours",
        marker: {
            color: barMid
        }
    };

    var traceHighHours = {
        x: sleep,
        y: highHours,
        type: "bar",
        name: "> 5 hours",
        marker: {
            color: barHigh
        }
    };

    var data = [traceLowHours, traceMidHours, traceHighHours];

    var layout = {
        title: "Sleeping habits impacted by average daily hours spent on social media",
        paper_bgcolor: backgroundColor,
    };

    var config = {
        responsive: true,
        scrollZoom: false,
        displayModeBar: false
    }

    Plotly.newPlot("plotSleeplessness", data, layout, config);
});