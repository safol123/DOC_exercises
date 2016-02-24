$(document).ready(function(){
  buildStateSelect()

  function buildStateSelect(){
    var states = fipsCodes()
    states.forEach(function(state){

    //for(var i = 0; i < states.length; i++){
      //var currentState = states[i]
      var optionTag = $("<option value = '"+ currentState.fipsCode + "'>" + currentState.stateName + "</option>");
      //review use of >
      $(".states").append(optionTag);
    })
      $('.states').on("change", function (){
        //console.log($(this).val())
        buildGraph()
})
}

        function buildGraph(id){
          //

          $.getJSON(url)

          .then
          //console.log(id)
          //console.log("state has been changed")
        //build a graph
      })
}
})
