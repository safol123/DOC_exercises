var url = "http://api.census.gov/data/timeseries/asm/industry?get=NAICS_TTL,EMP,GEO_TTL&for=us:*&YEAR=2005,2006,2007,2008,2009,2010,2011,2012,2013,2014&NAICS=31-33&key=81cdc733d3ac0f3496a88eebbed0a31478c403c6"

$.getJSON(url)
.then(convertResultsToObjects) // convert from an array of arrays, to objects
.then(drawLineChart)


function drawLineChart(data) {
  console.log(data);
  // build two arrays, one for years, and one for Employment
  var employment = _.pluck(data, "EMP");
  var indYear = _.pluck(data, "YEAR");

  employment  = employment.map( function(num) { return parseInt(num); });
  //employment  = _.map(employment, function(currentVal) { return parseInt(currentVal); });
  indYear = indYear.map(function(num){ return parseInt(num);})

  console.log(employment)
  console.log(indYear)

  // $("#employment-by-category").highchart

  $('#employment-by-category').highcharts({
    title: {
      text: 'Employment in Manufacturing Sector',
      x: -20 //center
    },
    subtitle: {
      text: 'DoC.gov',
      x: -20
    },
    xAxis: {
      categories: indYear
    },
    yAxis: {
      title: {
        text: 'Employment'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: {
      valueSuffix: 'K'
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
    },
    series: [{
      name: 'Year',
      data: employment
    }]
  });
};



function convertResultsToObjects(response) {
  // grab the header row, since it's always the first row
  var headers = response[0];

  var results = []; // empty array which will store our converted objects

  // for each row, skipping the first (header) row
  for(var row=1; row < response.length; row++) {
    var currentRow = response[row]; // get the current row
    var newRowObj = {}; // make a new object to hold the converted data

    // for each column in the current row, move the data into the object
    // using the headers as the key, and the value from the current row as the
    // value
    for(var col=0; col < currentRow.length; col++) {
      var key  = headers[col];
      var value = currentRow[col];

      // we have to use the bracket notation here instead of the 'dot' notation
      // because the key is a variable (i.e. we don't know what it is until
      // the code runs)
      newRowObj[key] = value;
    }

    results.push(newRowObj);
  }

  // return the results so they can be used by the next function
  return results;
}
