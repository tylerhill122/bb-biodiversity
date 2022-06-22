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

        let sampleValues = sample[0].sample_values.slice(0,10).reverse();
        let otuIds = sample[0].otu_ids.slice(0,10).reverse().map(a=>"OTU: "+ a);
        let labels = sample[0].otu_labels.slice(0,10).reverse();

        // Demographics input
        demographic(metadata[0]);

        // Build graphs?
        hBar(sampleValues, otuIds, labels);
    });
}

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

    let barBody = d3.select("#bar-body");
    barBody.html("");
    Plotly.newPlot('bar-body', data, layout);
}

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