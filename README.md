# belly-button-challenge

-- Purpose --
This repo contains documents that creates a webpage. This page displays information on microbes that colonize human navels. On this page, there is a dropdown menu that allows the user to select which navel sample's data to display. 
This webpage is found at: https://donoh160.github.io/belly-button-challenge/ and can also be found in this github repository page


-- Repo Files --
samples.json is a json file that contains all of the data used in creating the site. This file was never referenced in the rest of the repo as the site "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json" was used instead. The site and json file contain the same information. 

index.html is the html file used to create the page. This was given to me for this assignment and it remained unedited by me.

app.js is the javascript file that was used to create all of the visualizations and information on the page. This file was broken up into four functions: buildMetadata, buildCharts, init, optionChanged

    buildMetaData populated information into the 'Demographic Info' section
    buildCharts creates both the bar chart and the bubble chart
    optionChanged updates the Demographic Info and Charts when a new option is selected on the dropdown menu
    init initializes the Demographic Info and Charts when the page is first loaded
    
