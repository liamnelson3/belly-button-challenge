let endpoint = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let dataPromise = d3.json(endpoint);
console.log("Data Promise: ", dataPromise);

function init (){
  let data = d3.json(endpoint).then(function(data) {
    console.log(data);

    // tie values from samples.json to variables we can use
    let names = data.names;
    let samples = data.samples;
    let metadata = data.metadata;

    dropdownNames (names);

    console.log("Names: "+ names);
    console.log("Samples: " + samples);
    
    //use bellow functions to fill plots with data
    CreateBar(samples[0]);

    CreateBubble(samples[0]);

    MetaData(metadata[0]);
  });
}

function CreateBar(samples){
  //Top 10 data
  let values = (samples.sample_values.slice(0,10));
  values = values.reverse();

  let ids = samples.otu_ids.slice(0,10).map(sample => `OTU ${sample}`);
  ids = ids.reverse();

  let labels =  (samples.otu_labels.slice(0,10));
  labels = labels.reverse();

  let barData = {
    x: values,
    y: ids,
    text: labels,
    name: "OTU",
    type: "bar",
    orientation: "h"
  };

  let barTrace = [barData];

  let layout = {
    title: "<b>Top 10 OTUs</b>",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  Plotly.newPlot("bar", barData, layout);
}

function CreateBubble(samples){
  let values2 = (samples.sample_values);

  let ids2 = samples.otu_id;

  let labels2 =  (samples.otu_labels);

  let bubbleData = {
    x: ids2,
    y: values2,
    text: labels2,
    mode: "markers",
    marker: {
      size: values2,
      color: ids2,
      colorscale: "Earth"
    }
  };

  let bubbleTrace = [bubbleData];

  let layout = {
    hovermode: "closest",
    xaxis: {title: "<b>OTU ID</b>"}
  };

  Plotly.newPlot("bubble", bubbleTrace, layout);
}

function MetaData (metadata){
  
  // category labels
  let dataLabels = Object.keys(metadata);        
  // metadata Values
  let dataValues = Object.values(metadata);

  console.log("Labels " + dataLabels);
  console.log("values " + dataValues);

  // Clear previous contents
  d3.select("#sample-metadata").html("");

  for (let i=0; i<7; i++){
      console.log(dataLabels[i] + " : " + dataValues[i]);
      d3.select("#sample-metadata").append("h6").text(`${dataLabels[i]}  :  ${dataValues[i]}`);
  }
}

function dropdownNames (names) {
  let dropdownMenu = d3.select("#selDataset");

  //Fill the dropdown with the names and a value that will later match the 
  for (let i = 0; i<names.length;i++){

    dropdownMenu.append("option").text(names[i]).property("value", i);

  }
}

function optionChanged() {
  
  let dropdownMenu = d3.select("#selDataset");

  let dataset = dropdownMenu.property("value");

  let data = d3.json(url).then(function(data) {
    console.log(data);
 
    let samples = data.samples;
    let metadata = data.metadata;

    CreateBar(samples[dataset]);
 
    CreateBubble(samples[dataset]);
 
    MetaData(metadata[dataset]);
 });
}

init();