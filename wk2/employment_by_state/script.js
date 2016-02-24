$(document).ready(function(){
    buildStateSelect()

    function buildStateSelect(){
      var states = fipsCodes()
      states.forEach(function(state){
        // state = {fipsCode: "01", stateName: "Alabama" }
        var optionTag = $("<option value='" +  state.fipsCode + "'>" + state.stateName + "</option>")
        //       var optionTag = $("<option value='01'>"Alabama"</option>")
        //       var optionTag = $("<option value='02'>"Alaska"</option>")
        // .... and so on for each state
        $(".states").append(optionTag)
      })
      $('.states').on("change", function(){
        buildGraph($(this).val())
      })
    }

    function buildGraph(id){
      var url = "http://api.census.gov/data/timeseries/asm/state?get=NAICS_TTL,EMP,GEO_TTL&for=state:" + id + "&YEAR=2005,2006,2007,2008,2009,2010,2011,2012,2013,2014&NAICS=31-33&key=81cdc733d3ac0f3496a88eebbed0a31478c403c6"
      $.getJSON(url)
      .then(convertResultsToObjects)
      .then(function(results){
        //var years = _.map(results, function(singleObjects){
        //return parseInt(singleObject.YEAR)
        //})
        var years = _.map(results, function(r) { return parseInt(r.YEAR); })
        var employees = _.map(results, function(r) { return parseInt(r.EMP); })
        var data = {
          title: "Time Series by State: " + results[0].GEO_TTL,
          categories: years,
          series: employees,
          seriesName: results[0].GEO_TTL,
          yAxisTitle: "Employees in Manufacturing Sector",
          xAxisTitle: "Years"
          //console.log(data)
        }
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


  //allows highchart to use commas to seperate thousands
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
  })
