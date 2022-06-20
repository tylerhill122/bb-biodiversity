const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then((data) => { 
    console.log(data);
    let names = data.names;
    names.forEach((name) => {
        d3.select("#selDataset").append("option").text(name);
    })
});

d3.selectAll("#selDataset").on("change", getData);

function getData() {
    
}