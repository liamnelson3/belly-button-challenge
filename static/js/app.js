const endpoint = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(endpoint).then(function(data) {
  console.log(data);

  let patients = Object.values(data.samples);
  console.log(patients);

  //dropdown for loop
  let dropdown_init = d3.selectAll("#selDataset");
  let patient_id = Object.values(data.names);

  for (let k = 0; k < patient_id.length; k++){
    row = dropdown_init.append("option").text(`${patient_id[k]}`);
  }

  CreateBar(patients[0])
});

function CreateBar(data){

  console.log(data);

  ids = createLabels(data);
  console.log(ids);
  
  labels = createHoverText(data);
  
  values = setX(data);

  ticks = setTickValues(data);

  let barData = {
    x: values,
    y: ids,
    text: labels,
    type: "bar",
    orientation: "h"
  }

  let layout = {
    title: `Top 10 OTUs`,
    tickvals: ticks,
    height: 600,
    width: 400
  };

  Plotly.newPlot("bar", barData, layout);
}

//custom functions
function createLabels (subjectData) {
  let sampleOTUIDs = Object.values(subjectData.otu_ids).slice(0, 10).reverse();

  let sampleOTUIDArray = []

  for (let i = 0; i < sampleOTUIDs.length; i++) {
    otu = `OSU ${sampleOTUIDs[i]}`;
    console.log(otu);
    sampleOTUIDArray.push(otu);
  }
  return sampleOTUIDArray;
}

function createHoverText (subjectData) {
  let sampleOTULabels = Object.values(subjectData.otu_labels).slice(0, 10).reverse();

  let sampleOTUNames = []

  for (let j = 0; j < sampleOTULabels.length; j++) {
    otuLabel = sampleOTULabels[j];
    console.log(otuLabel);
    sampleOTUNames.push(otuLabel);
  }
  return sampleOTUNames;
}

function setX(data) {
  return Object.values(data.sample_values.slice(0, 10)).reverse();
}

function setTickValues(data){
  return Object.values(data.otu_ids.slice(0, 10));
}
//

d3.selectAll("#selDataset").on("change", optionChanged);

//dropdown function
function optionChanged(v) {
  console.log(v);
  
  letdropdownMenu = d3.select("#selDataset");

  let dataset = dropdownMenu.property("value");

  console.log(dataset)

  function selectValue(selectedID) {
    return selectedID.id === dataset;
  }

  function selectInteger(selectedInt) {
    return selectedInt.id
  }

  let patientData = patients.filter(selectValue);
  let updatedMetadata = patientMetadata.filter(selectInteger);

  console.log(updatedMetadata);

  CreateBar(patientData[0], updatedMetadata[0]);
}
