//Sample data at URL Below

let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
let dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

function init (){
  // Fetch the JSON data and console log it
  let data = d3.json(url).then(function(data) {
    console.log(data);

    let names = data.names;
    let samples = data.samples;
    let metadata = data.metadata;

    init_dropdown (names);

    console.log("Names: "+ names);
    console.log("Samples: " + samples);
    
    //Invoking functions to plot charts in the html- Initialization is done on the first element (id = 940)
    plotBarChart(samples[0]);

    plotBubbleChart(samples[0]);

    plotMetaData(metadata[0]);

    fillGaugeChart(metadata[0]);



  });
}


//Function to plot the BarCharts

function plotBarChart (samples){
    

    //Top 10 data
    let numSamples = (samples.sample_values.slice(0,10));
    numSamples = numSamples.reverse();
    
    let axis = samples.otu_ids.slice(0,10).map(sample => `OTU ${sample}`);
    axis = axis.reverse();
 

    let labels =  (samples.otu_labels.slice(0,10));
    labels = labels.reverse();
    
    
    // Trace1 for the Top 10 OTUs
    
    let trace = {
        x: numSamples,
        y: axis,
        text: labels,
        name: "OTU",
        type: "bar",
        orientation: "h"
   };
   
   // Data array
   let traceData = [trace];
   
   // Apply a title to the layout
   let layout = {
     title: "<b>Top 10 OTUs</b>",
     margin: {
       l: 100,
       r: 100,
       t: 100,
       b: 100
     }
   };
   
   // Render the plot to the div tag with id "bar"
   Plotly.newPlot("bar", traceData, layout);

}


//Function to plot the BarChart

function plotBubbleChart (samples){
    
    
    //Top 10 data
        
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
      
      // Data array
 
      let traceData = [trace];
      
      // Apply a title to the layout
      let layout = {
        hovermode: "closest",
        xaxis: {title: "<b>OTU ID</b>"}
      };
      
      Plotly.newPlot("bubble", traceData, layout);


}

//Function to plot the MetaData

function plotMetaData (metadata){

    // Create an array of category labels
    let dataLabels = Object.keys(metadata);        
    // Create an array with Metadata Values
    let dataValues = Object.values(metadata);


    console.log("Labels " + dataLabels);
    console.log("values " + dataValues);


    // Clear previous contents
    d3.select("#sample-metadata").html("");


    // There are 7 properties in the metadata. Writing The keys and Values in the HTML

    for (let i=0;i<7;i++){

        console.log(dataLabels[i] + " : " + dataValues[i]);

        d3.select("#sample-metadata").append("h6").text(`${dataLabels[i]}  :  ${dataValues[i]}`);
    }



}

//Function to fill the dropdowns with all the names
function init_dropdown (names){


  // Checking current Test Subject ID
  let dropdownMenu = d3.select("#selDataset");


  //Fill the dropdown with the names and a value that will later match the 
  for (let i = 0; i<names.length;i++){

    dropdownMenu.append("option").text(names[i]).property("value", i);

  }

}


//Function that is run everytime there is a change in teh TEst Subject ID
function optionChanged (){

    // Checking current Test Subject ID
    let dropdownMenu = d3.select("#selDataset");

    // Assign the value of the dropdown menu option to a variable the metadata id and sample id
    let dataset = dropdownMenu.property("value");

    let data = d3.json(url).then(function(data) {
      console.log(data);
   
      let samples = data.samples;
      let metadata = data.metadata;
   

   
      plotBarChart(samples[dataset]);
   
      plotBubbleChart(samples[dataset]);
   
      plotMetaData(metadata[dataset]);

      fillGaugeChart (metadata[dataset]);
   
   });


  }

  init();