$(document).ready(function(){
  movieData = buildmoviedata()
  console.log(movieData);

  // intital chart
  var data = {
    title: "Movie Data from 1998 to 2008",
    categories:  movieData.years,
    series: movieData.ticketPrice ,
    seriesName: "Ticket Price" + " " + "($)",
    yAxisTitle: "Ticket Price" + " " + "($)",
    xAxisTitle: "Years"
  }

  buildchart(data, $("#movies-by-year"))


  $(".movieData").on("change", function(){
    var choice = $(".movieData").val();
    console.log(choice)

    if (choice == "Average Ticket Price") {
          data.series = movieData.ticketPrice;
          data.yAxisTitle = "Ticket Price" + " " + "($)";
          data.seriesName = "Ticket Price" + " " + "($)"
      }

    if (choice == "Total Movie Gross") {
        data.series = movieData.gross;
        data.yAxisTitle = "Movie Gross" + " " + "($)";
        data.seriesName = "Movie Gross" + " " + "($)"
    }

    else if (choice == "Attendance") {
        data.series = movieData.attendance;
        data.yAxisTitle = "Attendance";
        data.seriesName = "Attendance"
    }

    buildchart(data, $("#movies-by-year"))
  })


})

function buildmoviedata() {

  var movies = movieCodes()
  var sortedMovies = _.sortBy(movies, "Year");
  var lastSortedMovies = _.last(sortedMovies, 10)

  var movieYears = _.map(lastSortedMovies, function(m) { return parseInt(m.Year) });
  //var strMovieGross = _.map(movies, function(m) { return m["Total gross"].replace(/\$/g, "").replace(/\,/g, "") });
  var strMovieGross = _.map(lastSortedMovies, function(m) { return m.Totalgross.replace(/\,/g, "") });
  var strMovieAttendance = _.map(lastSortedMovies, function(m) { return m.Attendance.replace(/\,/g, "") });
  var strTicketPrice = _.map(lastSortedMovies, function(m) { return m.Averageticketprice.replace(/\,/g, "") });

  var refMovieGross = _.map(strMovieGross, function(m) {return parseInt(m) });
  var refmovieAttendance = _.map(strMovieAttendance, function(m) { return parseInt(m) });
  var refTicketPrice = _.map(strTicketPrice, function(m) { return parseFloat(m) });

  return {years: movieYears, gross: refMovieGross, attendance: refmovieAttendance, ticketPrice: refTicketPrice}
}

function buildchart(data, elementToPutChartIn) {
  elementToPutChartIn.highcharts({
    title: {
      text: data.title,
      x: -20
    },
    subtitle: {
      text: 'www.infoplease.com',
      x: -20
    },
    xAxis: {
      categories: data.categories
    },
    yAxis: {
      title: {
        text: data.yAxisTitle
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: {
      valueSuffix: ""
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
    },
    series: [{
      name: data.seriesName,
      data: data.series
    },   ]
  });

  Highcharts.setOptions({
    lang: {
      thousandsSep: ','
    }
  });
};
