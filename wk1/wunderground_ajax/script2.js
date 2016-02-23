$(document).ready(function(){
  $("h1").click(getWeather)
})


function getWeather(){
  var city = $(".city").val()
  var state = $(".state").val()
  var url = "http://api.wunderground.com/api/b7362e52cedae489/conditions/q/" + state + "/" + city + ".json"
  //var url = "http://api.wunderground.com/api/b7362e52cedae489/conditions/q/CA/San_Francisco.json"

  //console.log(city)
  //console.log(state)
  //console.log(url)

  $.getJSON(url)
  .done(function(response){
    var windMph = response.current_observation.wind_mph
    var windFDiv = $("<div class='windMph'></div>")
    windFDiv.text("wind mph: " + windMph)
    $("body").append(windFDiv)
    //console.log(windMph)

    var iconUrl = response.current_observation.icon_url
    var iconDiv = $("<div class='iconUrl'></div>")
    //iconDiv.append($("<img src='" + iconUrl + "'>"))
    iconDiv.text("Icon image: ")
    iconDiv.append($("<img src='" + iconUrl + "'>"))
    $("body").append(iconDiv)


  }).fail(function(){
    console.log("ajax request failed")
  }).always(function(){
    console.log("no matter what")
  })
}
