var url = "http://api.census.gov/data/timeseries/asm/state?get=NAICS_TTL,EMP,PAYANN,GEO_TTL&for=state:*&YEAR=2014&NAICS=31-33&key=81cdc733d3ac0f3496a88eebbed0a31478c403c6";
//understandinh why we don't have to use document ready
// make an ajax reqeust
$.getJSON(url)
  .then(convertResultsToObjects) // convert from an array of arrays, to objects
  .then(calculateAvgSalary)
  .then(logResults) // for now, log the results of the conversion to objects
  .then(drawBarChart)


function drawBarChart(data) {
  //write code to sort data by averageSalary
  //verify that it works
  //write another line to limit the data set to the
  // first or last 10 after sorting

  var sortedData = _.sortBy(data,"averageSalary");
  //use 'pluck' to get the right data
  //var lastSorteddata = sortedData.slice(-10, -1)
  //var firstSorteddata = sortedData.slice(0, 10)
  var firstSorteddata = _.first(sortedData, 10);
  var stateNames = _.pluck(firstSorteddata, "GEO_TTL");
  //var stateNames = _.pluck(Data, "GEO_TTL"); this was before sorting
  var averageSalaries = _.pluck(firstSorteddata,"averageSalary");
  //var averageSalaries = _.pluck(Data,"averageSalary"); this was before sorting
  console.log(firstSorteddata)
  //console.log(stateNames);
  //console.log (averageSalaries);

    //select the proper div from HTML
    //call the highchart method to make a barchart

    $(function () {
        $('#average-salaries').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Average Manufacturing Salaries by State'
            },
            subtitle: {
                text: 'Source: Doc.gov'
            },
            xAxis: {
                categories: stateNames
                ,
                crosshair: true
            },
            yAxis: {
                //min: 0,
                min: _.min(averageSalaries) * 0.9,
                max: _.max(averageSalaries) * 1.05,
                title: {
                    text: 'Average Salary ($)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'State',
                data: averageSalaries

            }, ]
        });
    });

return data;
}


function logResults(data) {
  console.log(data);

  return data;
}

function calculateAvgSalary(data) {
  //iterate (loop)over data, and for each state object, calculate and add the
  //average salary as a property on that object
  for (var i = 0; i < data.length; i++){
    var currentState = data[i];
    //console.log(currentState)
    var currentAverage = (parseInt(currentState.PAYANN)/parseInt(currentState.EMP)) * 1000
    //key: averageSalary
    //value:
    currentState.averageSalary = currentAverage

    //create a var called currentaverage and pu tthe calculation in that varaiable
    //then console log that varaiable
    //var AvgSalary = PAYANN[i]/EMP[i]
    //data.AvgSalary = "annualPay[i]/numEmployees[i]"
  }
  return data

  sortBy
}

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
