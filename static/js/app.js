const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

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

        console.log(sample[0].otu_ids)

        // Demographics input
        demographic(metadata[0]);

        // Build graphs?
    });
}

function demographic(data) {
    let div = d3.select("#sample-metadata");
    let table = div.select("table");
    table.html("");

    Object.entries(data).forEach(([k, v]) => {
        let row = table.append("tr");
        row.append("td").text(k);
        row.append("td").text(v);
    });
}
demographic(data);