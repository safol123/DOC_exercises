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

//take baby steps
 //var results = [];

 //var state = {};
 //state.name = state[0];

 //console.log(state);

//step2
 //var results = [];

 //var state = {};
 //state.name = state[0];
 //state.numEmployees = numEmployees[0];
 //state.annualPay = annualPay[0];

 //console.log(state);

 var results = [];
 for (var i = 0; i < states.length; i++){
   var state = {
     name: states[i],
     numEmployees: numEmployees[i],
     annualPay: annualPay[i],
     averagePay: annualPay[i]/numEmployees[i]
   };
   results.push(state);
 }


 //var state = {
   //name: states[0],
   //numEmployees: numEmployees[0],
   //annualPay: annualPay[0]
 //};
 //or
//
// var state = {};
//  state.name = state[i];
//  state.numEmployees = numEmployees[i];
//  state.annualPay = annualPay[i];
//  state.averagePay = averagePay[i];

// results.push(state)
//
 // console.log(state);
  console.log(results);


  
