const url = "samples.json";

// grab data to build dropdown menu
d3.json(url).then((data) => { 
    console.log(data);
    let names = data.names;
    // providing a list of IDs (names) to be selected from dropdown menu
    d3.select("#selDataset")
        .selectAll("option")
        .data(names)
        .enter()
        .append("option")
        .text(d=>d)
        .attr("val", d=>d);

    optionChanged(d3.select("#selDataset").property("val"));
});

// master function to grab data and display charts based on value input
function optionChanged(val) {
    d3.json(url).then((data) => {
        // grabbing metadata, filtered by dropdown menu
        let metadata = data.metadata.filter(data => data.id == val);
        console.log(metadata);

        // grabbing sample info from data
        let sample = data.samples.filter(data => data.id == val);
        console.log(sample);
        
        // pinpointing info needed for hBar graph and bubble chart
        let sampleValues = sample[0].sample_values;
        let otuIds = sample[0].otu_ids;
        let labels = sample[0].otu_labels;

        // make the above values Top10 and sorted for hBar
        let sV10 = sampleValues.slice(0,10).reverse();
        let otu10 = otuIds.slice(0,10).reverse().map(a=>"OTU: "+ a);
        let labels10 = labels.slice(0,10).reverse();

        // pinpointing info needed for gauge graph
        let wFreq = metadata[0].wfreq;

        // run chart functions //
        // demographics input
        demographic(metadata[0]);

        // horizontal bar graph
        hBar(sV10, otu10, labels10);

        // gauge bar
        gauge(wFreq);

        // bubble chart
        bubble(sampleValues, otuIds, labels);
    });
};

// function to build horizontal bar chart with Top10 OTU for each test subject
function hBar(s, o, l) {
    var data = [{
        type: 'bar',
        orientation: 'h',
        x: s,
        y: o,
        text: l,
        marker: {
            color: '#8dabc3',
            width: 1
          }
    }];

    var layout = {
        plot_bgcolor: "rgba(0,0,0,0)",
        paper_bgcolor: "rgba(0,0,0,0)",
        margin: {
            l: 90,
            r: 30,
            t: 30,
            b: 30,
          },
        font: {
            size: 12,
            color: "#5b565a"
        }
      };

    Plotly.newPlot('bar-body', data, layout);
};

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

// function to build gauge chart with washing frequency
function gauge(values) {
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: values,
            title: "Washing Frequency",
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 9] },
                bar: { color: "#FFF" },
                steps: [
                  { range: [0, 1], color: "#8dabc3" },
                  { range: [1, 2], color: "#9cadbd" },
                  { range: [2, 3], color: "#a8afb8" },
                  { range: [3, 4], color: "#b2b0b4" },
                  { range: [4, 5], color: "#bbb2b0" },
                  { range: [5, 6], color: "#c5b3ab" },
                  { range: [6, 7], color: "#d0b5a5" },
                  { range: [7, 8], color: "#dcb89f" },
                  { range: [8, 9], color: "#eaba97" },
                ],
              }
        }];
    
    var layout = { 
        width: 400,
        height: 400,
        margin: { t: 0, b: 0 },
        plot_bgcolor: "rgba(0,0,0,0)",
        paper_bgcolor: "rgba(0,0,0,0)"
    };

    Plotly.newPlot('gauge', data, layout);
};

// function to build demographic table
function demographic(data) {
    let div = d3.select("#sample-metadata");
    let table = div.select("table");
    table.html("");

    Object.entries(data).forEach(([k, v]) => {
        let row = table.append("tr");
        row.append("td").text(k + ":").attr("class", "key");
        row.append("td").text(v).attr("class", "value");
    });
};

// display first value (sample ID 940)
optionChanged(940);