$(document).ready(function(){

var url = "http://api.census.gov/data/timeseries/asm/state?get=NAICS_TTL,EMP,PAYANN,GEO_TTL&for=state:*&YEAR=2014&NAICS=31-33&key=68bede2363612f033b098e2864c7dd49a01f97f7"

    $.getJSON(url)
    .done(function(response){
    console.log(response)
    })


})
