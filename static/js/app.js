let endpoint = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let dataPromise = d3.json(endpoint);
console.log("Data Promise: ", dataPromise);

function init (){
  let data = d3.json(url).then(function(data) {
    console.log(data);

    let names = data.names;
    let samples = data.samples;
    let metadata = data.metadata;

    init_dropdown (names);

    console.log("Names: "+ names);
    console.log("Samples: " + samples);
    
    plotBarChart(samples[0]);
    plotBubbleChart(samples[0]);
    plotMetaData(metadata[0]);
  });
}

function plotBarChart (samples){
    
    let numSamples = (samples.sample_values.slice(0,10));
    numSamples = numSamples.reverse();
    
    let axis = samples.otu_ids.slice(0,10).map(sample => `OTU ${sample}`);
    axis = axis.reverse();
 
    let labels =  (samples.otu_labels.slice(0,10));
    labels = labels.reverse();
        
    let trace = {
        x: numSamples,
        y: axis,
        text: labels,
        name: "OTU",
        type: "bar",
        orientation: "h"
   };
   
   let traceData = [trace];
   
   let layout = {
     title: "<b>Top 10 OTUs</b>",
     margin: {
       l: 100,
       r: 100,
       t: 100,
       b: 100
     }
   };
   
   Plotly.newPlot("bar", traceData, layout);
}

function plotBubbleChart (samples){
  
    let numSamples = (samples.sample_values);
    let axis = samples.otu_ids;   
    let labels =  (samples.otu_labels);     

    let trace = {
        x: axis,
        y: numSamples,
        text: labels,
        mode: "markers",
        marker:{
            size:numSamples,
            color:axis,
            colorscale:"Earth"
        }
      };
       
      let traceData = [trace];
      
      let layout2 = {
        hovermode: "closest",
        xaxis: {title: "<b>OTU ID</b>"}
      };
      
      Plotly.newPlot("bubble", traceData, layout2);
}

function plotMetaData (metadata){

  let dataLabels = Object.keys(metadata);        
    let dataValues = Object.values(metadata);

    console.log("Labels " + dataLabels);
    console.log("values " + dataValues);

    d3.select("#sample-metadata").html("");

    for (let i=0;i<7;i++){
        console.log(dataLabels[i] + " : " + dataValues[i]);
        d3.select("#sample-metadata").append("h6").text(`${dataLabels[i]}  :  ${dataValues[i]}`);
    }
}

function init_dropdown (names){

  let dropdownMenu = d3.select("#selDataset");

  for (let i = 0; i<names.length;i++){
    dropdownMenu.append("option").text(names[i]).property("value", i);
  }
}


function optionChanged (){
    let dropdownMenu = d3.select("#selDataset");

    let dataset = dropdownMenu.property("value");

    let data = d3.json(url).then(function(data) {
      console.log(data);
   
      let samples = data.samples;
      let metadata = data.metadata;
   
      plotBarChart(samples[dataset]);
      plotBubbleChart(samples[dataset]);
      plotMetaData(metadata[dataset]);
   
   });
  }

  init();