//get user input for a starting temperature
var starttemp = parseInt(prompt("what is the current temperature in (F)?"))
//convert starting temperature into C
var celtemp = Math.round(starttemp - 32) * (5/9)
//convert starting temperature into K
var kevtemp = (5/9) * (starttemp - 32) + 273.15
//display C and K values in the console


console.log("temp in C: " + celtemp)
console.log("temp in K: " + kevtemp)
