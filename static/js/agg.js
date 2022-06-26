const url = "samples.json";

// grab data to build dropdown menu
d3.json(url).then((data) => { 
    console.log(data);
    
});

function gender(input) {
    d3.json(url).then((data) => { 

        const gender = data.metadata
            .filter(data => data.gender == input)
            .map(data => data.id);
        console.log(gender);

        let dS = data.samples;

        let men = dS.filter(data => data.id == '940');
        console.log(men);

    });

    // bubble(sampleValues, otuIds, labels);
};

gender("M");

// function to build bubble chart
function bubble(s, o, l) {
    var data = [{
        type: "scatter",
        mode: "markers",
        x: o,
        y: s,
        text: l,
        margin: {
            l: 10,
            r: 10,
            t: 10,
            b: 10
        },
        marker: {
            size: s,
            color: o
        }
    }];

    var layout = {
        plot_bgcolor: "rgba(0,0,0,0)",
        paper_bgcolor: "rgba(0,0,0,0)"
    };

    Plotly.newPlot('bubble', data, layout);
};