$(document).ready(function(){
  $("h1").click(function(){
    var city = $("input.city").val()
    var state = $(".state").val()
    var url ="http://api.wunderground.com/api/f28a93cae85945b6/conditions/q/" + state + "/" + city + ".json"
    $.getJSON(url)
    .done(function(response){
      var body = $("body")
      renderForecast(response, body)
    }).fail(function(){
      console.log("ajax request failed!")
    }).always(function(){
      console.log("this always happens")
    })
  })
  function renderForecast(response, parentElement){
    var container = $("<div class='forecast'></div>")
    var tempF = response.current_observation.temp_f
    var tempFDiv = $("<div class='tempF'></div>")
    tempFDiv.text(tempF)
    var iconUrl = response.current_observation.icon_url
    var iconImg = $("<img src='" + iconUrl + "'>")
    container.append(tempFDiv)
    container.append(iconImg)
    parentElement.append(container)
  }



})
 
