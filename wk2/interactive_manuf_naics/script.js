  $(document).ready(function(){
    buildStateSelect()


    function buildStateSelect(){
      var manufacturingTypes = naicsCodes()
      console.log(manufacturingTypes)
      manufacturingTypes.forEach(function(manufacturingType){

        var optionTag = $("<option value='" +  manufacturingType.code + "'>" + manufacturingType.description + "</option>")
        $(".manufacturingTypes").append(optionTag)
      })
      $(".manufacturingTypes").on("change", function(){
        buildGraph($(this).val())
      })
    }


  })

  function buildGraph(id){
    var url = "http://api.census.gov/data/timeseries/asm/industry?get=NAICS_TTL,EMP,GEO_TTL&for=us:*&YEAR=2005,2006,2007,2008,2009,2010,2011,2012,2013,2014&NAICS=31-33&key=81cdc733d3ac0f3496a88eebbed0a31478c403c6"
    $.getJSON(url)
    //.then(function(response){
    //console.log(response)
    //this gives an array of an array
    .then(convertResultsToObjects)
    .then(function(results) {
      //return results[2]
      //line 26 returns (an array of an object)value for specific 2 object in the array as shown on line 27
      //{NAICS_TTL: "Manufacturing", EMP: "13418569", GEO_TTL: "United States", YEAR: "2007", NAICS: "31-33"…}EMP: "13418569"GEO_TTL: "United States"NAICS: "31-33"NAICS_TTL: "Manufacturing"YEAR: "2007"us: "1"__proto__: Object
      //.then(function(nextVal) {
      //console.log(nextVal)
      //})

      var years = _.map(results, function (r) { return parseInt(r.YEAR); console.log(years)})
      var employees = _.map(results, function (r) {return parseInt(r.EMP); })
      var data = {
        title: "Time Series by Manufacturing Type: " + results[0].GEO_TTL,
        categories: years,
        series: employees,
        seriesName: results[0].GEO_TTL,
        yAxisTitle: "Employees by Manufacturing",
        xAxisTitle: "Years"
      }
      console.log(data)
      //return results
      //we don't need return results anymore because we are feeding the data into the graph
      buildChart(data, $("#employment-by-state"))
      //this line invokes a function
    })
  }

  function buildChart(data, el) {
    el.highcharts({
      title: {
        text: data.title,
        x: -20
      },
      xAxis: {
        title: {
          text: data.xAxisTitle
        },
        categories: data.categories
      },
      yAxis: {
        title: {
          text: data.yAxisTitle
        },
        plotlines: [{
          value: 0,
          width: 1,
          color: '#80800',
        }]
      },
      legend: {
        layout: 'vertical',
        align:'right',
        verticalAlign: 'middle',
        borderWidth: 0,
      },
      series: [{
        name: data.seriesName,
        data: data.series
      }]
    })
  }
  Highcharts.setOptions({
    lang: {
      thousandsSep: ','
    }
  });

  function convertResultsToObjects(response) {
    //console.log(response)
    // grab the header row, since it's always the first row
    var headers = response[0];

    // empty array which will store our converted objects
    var results = [];

    // for each row, skipping the first (header) row
    for(var row=1; row < response.length; row++) {
      // get the current row
      var currentRow = response[row];
      // make a new object to hold the converted data
      var newRowObj = {};

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
