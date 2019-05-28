function buildMetadata(sample) {
//  use the provided route to the sample metadata
  const url =`/metadata/${sample}`;
  console.log(url);
// vairable to hold html element
  const metaMeta = d3.select("#sample-metadata");
  
// use d3 to read json file for each sample 
  d3.json(url).then(function(data) {
    // console.log(data);

    metaMeta.html(""); 
// return key value pairs for each object in the metadata
//  append a new paragraph for each
    Object.entries(data).forEach(function([key,value]) {    
      const cell = metaMeta.append("p");
      cell.text(`${key}: ${value}`);
    });

  });


}

function buildCharts(sample) {
// build a pie chart returning the top 10 microbes for a sample
  const url =`/samples/${sample}`;
  // console.log(url);
  
  d3.json(url).then(function(data) {
    // console.log(data);
    var trace1 = {
        labels: data.otu_ids.slice(0,10),
        values: data.sample_values.slice(0,10),
        type: 'pie'
    };

    var dataPie = [trace1];

    var layout = {
      // title: "Pie Chart",
    };
// plot the pie chart
    Plotly.newPlot("pie", dataPie, layout);

// build a bubble chart to show sample values per sample ID
    var trace2 = {
        type: "scatter",
        x:data.otu_ids,
        y:data.sample_values,
        text:data.otu_labels,
        mode:'markers',
        marker: { 
          size:data.sample_values,
          color:data.otu_ids,
          sizeref: 1.5,
          sizemode: 'diameter'
        }
        
    };

    var layout = {
      // title: "Bubble Chart",
      xaxis: {
        title: {
          text: 'OTU ID',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        },
      },
    }
    var dataBubble = [trace2];
//  plot the bubble chart
    Plotly.newPlot("bubble", dataBubble, layout, {scrollZoom: true});        
  });
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
    buildGauge(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  buildGauge(newSample);
}

// Initialize the dashboard
init();
