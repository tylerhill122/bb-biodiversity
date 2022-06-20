const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data){ 
    console.log(data)
    let names = data.names;
    console.log(names)
});

d3.selectAll("#selDataset").on("change", getData);

function getData() {
    
}