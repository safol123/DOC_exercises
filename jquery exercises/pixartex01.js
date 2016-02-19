var paintColor = "green";

for(var i=0; i < 10000; i++) {
  var newDiv = $("<div class='square'></div>");
  $("#paint-area").append(newDiv);
}

$("#set-color").click(function(event){
  // console.log("button is clicked")
    event.preventDefault();
    //line 10 prevents the event lag
    var newColor = $("input:text").val();
});
//add the event listener for clicking

$(".square").on("mouseover", paintSquare);
function paintSquare(event) {
  $(this).css("background-color", paintColor);
}


///fill in the code to change color
