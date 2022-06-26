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

        let sampleValues = [];
        let otuIds = [];
        let labels = [];

        gender.forEach(function (gen, index, arr) {
            dS.forEach(function (sample, i, arr) {
                if (gen == sample.id) {
                    sampleValues.push(sample.sample_values)
                    otuIds.push(sample.otu_ids)
                    labels.push(sample.otu_labels)
                }
            });
        });
        console.log(sampleValues);
        console.log(otuIds);
        console.log(labels);

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