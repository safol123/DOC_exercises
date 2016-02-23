//var names = ["tom", "susy", "bob", "mary"]

//for(var i = 0; i < names.length; i++){
  //console.log(names[i])
//}


var states = [
  "Alabama",
  "California",
  "Connecticut",
  "District of Columbia",
  "Maine",
  "Minnesota"
];

var numEmployees = [
  234726,
  1111812,
  157363,
  1275,
  46741,
  288583
];

// annualPay expressed in thousands of dollars
var annualPay = [
  11759599,
  69487378,
  10586486,
  56900,
  2477958,
  16119212
]

var avgPay = []
for(var i = 0; i < numEmployees.length; i++){
  var calc = ((annualPay[i]/numEmployees[i]) * 1000)
  //you have to use annualPay[i] and not annualPay so the program knows
  //what to loop through
  avgPay.push(calc)
}

console.log(avgPay)

//you have to loop through the array to get each as a dollar sign



//var avgPay = []
//for(var i = 0; i < numEmployees.length; i++){
  //avgPay.push(getAverage(annualPay[i], numEmployees[i]))
//}

//console.log("Average pay: " + "$" + avgPay)
