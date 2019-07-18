function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var sampleURL = `/metadata/${sample}`
    // Use d3 to select the panel with id of `#sample-metadata`
  d3.json(sampleURL).then((input_data) => {
    var selector = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    selector.html("")
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    keys = ["sample","ETHNICITY","GENDER","AGE","LOCATION","BBTYPE"];
    keys.forEach(x => {
      selector
          .append("p")
            .text(`${x}: ${input_data[`${x}`]}`);
    });
  });
}

function buildCharts(sample) {
// Create a Bubble Chart that uses data from your samples route (/samples/<sample>) to display each sample.
  var sampleURL = `/samples/${sample}`
  
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(sampleURL).then((input_data) => {
   // Use otu_ids for the x values
    x_values = input_data['otu_ids'];
   // Use sample_values for the y values
    y_values = input_data['sample_values'];
   // Use sample_values for the marker size
    marker_size = input_data['sample_values'];
   // Use otu_ids for the marker colors
    marker_colors = input_data['otu_ids'];
   // Use otu_labels for the text values
    labels = input_data['otu_labels'];

    // @TODO: Build a Bubble Chart using the sample data
    var trace1 = {
      x: x_values,
      y: y_values,
      mode: 'markers',
      marker: {
        size: marker_size,
        color: marker_colors
      },
      labels: labels
    };
    var data = [trace1];
      
    var layout = {
       title: 'Awesome Marker Size Graph Thingy',
       showlegend: false,
       height: 700,
       width: 1000
    }; 
      Plotly.newPlot('bubble', data, layout);
  });
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
