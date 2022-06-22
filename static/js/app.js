const url = "samples.json";

d3.json(url).then((data) => { 
    console.log(data);
    let names = data.names;
    d3.select("#selDataset")
        .selectAll("option")
        .data(names)
        .enter()
        .append("option")
        .text(d=>d)
        .attr("val", d=>d);

    optionChanged(d3.select("#selDataset").property("val"));
});

function optionChanged(val) {
    d3.json(url).then((data) => {
        let metadata = data.metadata.filter(data => data.id == val);
        console.log(metadata);

        let sample = data.samples.filter(data => data.id == val);
        console.log(sample);

        // pinpointing info needed for hBar graph
        let sampleValues = sample[0].sample_values.slice(0,10).reverse();
        let otuIds = sample[0].otu_ids.slice(0,10).reverse().map(a=>"OTU: "+ a);
        let labels = sample[0].otu_labels.slice(0,10).reverse();

        // pinpointing info needed for gauge graph
        let wFreq = metadata[0].wfreq;

        // Demographics input
        demographic(metadata[0]);

        // horizontal bar graph
        hBar(sampleValues, otuIds, labels);

        // gauge bar
        gauge(wFreq);
    });
};

function hBar(s, o, l) {
    var data = [{
        type: 'bar',
        orientation: 'h',
        x: s,
        y: o,
        text: l,
        marker: {
            color: '#ac7d75',
            width: 1
          }
    }];

    var layout = {
        plot_bgcolor:"#c2d2d2",
        paper_bgcolor:"#8dabc3",
      };

    Plotly.newPlot('bar-body', data, layout);
};

function gauge(values) {
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: values,
            title: "Washing Frequency",
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 10] },
                bar: { color: "#c2d2d2" },
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
                  { range: [9, 10], color: "#fbbd8d" },
                ],
              }
        }];
    
    var layout = { width: 400, height: 400, margin: { t: 0, b: 0 } };

    Plotly.newPlot('gauge', data, layout);
};

function demographic(data) {
    let div = d3.select("#sample-metadata");
    let table = div.select("table");
    table.html("");

    Object.entries(data).forEach(([k, v]) => {
        let row = table.append("tr");
        row.append("td").text(k + ":").attr("class", "key");
        row.append("td").text(v).attr("class", "value");
    });
}

// display first value (sample ID 940)
optionChanged(940);