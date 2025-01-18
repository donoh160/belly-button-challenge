

// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata

    // Filter the metadata for the object with the desired sample number
    let filteredSample = metadata.filter(i => i.id === sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let sample_metadata = d3.select(`#sample-metadata`);

    // Use `.html("") to clear any existing metadata
    sample_metadata.html("")

    // Set keys to list of keys in the filteredSample object
    const keys = Object.keys(filteredSample);

    // Append key and property of each object to metadata panel
    keys.forEach((k) => {
      let displaySample = sample_metadata.append("li")
      displaySample.text(`${k}: ${filteredSample[k]}`)
    });

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples

    // Filter the samples for the object with the desired sample number
    let filteredSample = samples.filter(i => i.id === sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otuIDs = filteredSample.otu_ids
    let otuLabels = filteredSample.otu_labels
    let sampleValues = filteredSample.sample_values

    // console.log('otuIDs', otuIDs)
    // console.log('otuLabels', otuLabels)
    // console.log('sampleValues', sampleValues)

    // Build a Bubble Chart
    let bubbleData = [{
      x: otuIDs,
      y: sampleValues,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIDs
      },
      text: otuLabels
    }];
    
    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    
    let slicedLabels = otuLabels.slice(0, 10)
    let slicedIDs = otuIDs.slice(0, 10)
    let slicedValues = sampleValues.slice(0, 10)

    slicedIDs = slicedIDs.map(i => `OTU ${i}`);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let barData = [{
      x: slicedValues.reverse(),
      y: slicedIDs.reverse(),
      orientation: 'h',
      text: slicedLabels.reverse(),
      // hovertemplate: slicedLabels.reverse(),
      type: 'bar'
    }];

    var layout = {
      title: {
        text: 'Top 10 Bacteria Cultures Found'
      }
    }

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, layout);

  });
}


// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select(`#selDataset`);

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach((n) => {
      let dropdownOption = dropdown.append("option")
      dropdownOption.text(n)
    });

    // Get the first sample from the list
    let firstName = names[0]

    // Build charts and metadata panel with the first sample
    buildMetadata(parseInt(firstName))
    buildCharts(firstName)

  });
}


// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(parseInt(newSample))
  buildCharts(newSample)
}

// Initialize the dashboard
init();
