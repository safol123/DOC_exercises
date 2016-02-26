$(document).ready(function(){

  var movies = movieCodes()
  console.log(movies)


  $(".movieData").on("change", function(){
  })

  var movieYears = _.map(movies, function(m) { return parseInt(m.Year) });
  //var strMovieGross = _.map(movies, function(m) { return m["Total gross"].replace(/\$/g, "").replace(/\,/g, "") });
  console.log(refMovieGross)

  var refMovieGross = _.map(movies, function(gross) { return parseInt(gross) });
  var movieAttendance = _.map(movies, function(m) { return parseInt(m.Attendance) });
  var movieTicketPrice = _.map(movies, function(m) { return parseInt(m.Average_ticket_price) });

    console.log(movieYears)
    console.log(refMovieGross)
    console.log(movieAttendance)
    console.log(movieTicketPrice)




})
