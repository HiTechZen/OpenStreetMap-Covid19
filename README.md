# OpenStreetMap with Covid-19 information

### Usage
#### Github page
https://hitechzen.github.io/OpenStreetMap-Covid19/

#### File based
Open `index.html` in your browser.

Wait for the Covid-19 data from [disease.sh](https://disease.sh/v3/covid-19/countries) to have been fetched.

The spinning loader will be hidden and a map of the world should be visible.

Click on a country to see its Covid-19 data.

To close the modal with the data, click on the `X`, or click outside the modal, or press the `ESC` key.

The map has been made mobile friendly.

### Note
The country name in the fetched data might not match the country name in the map. See `countryMap` in the file `utils.js` to see the ones currently mapped.

If a mapping is missing, it's possible to update `countryMap` according to the instructions in `utils.js`.
