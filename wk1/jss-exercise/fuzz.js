for(var i = 1; i <=100; i = i + 1){

  var num = i

  if (num % 3 == 0 && num % 5 == 0){
    console.log("fizzbuzz")
  }

  if(num % 3 == 0) {
    console.log("fizz")
  }
  else if(num % 5 == 0) {
    console.log("buzz")
  }
  else {
    console.log(num)
  }
}
  //else  if (num % 3 !==0 && num % 5 !==0) {
    //console.log(num)
  //}


//if num div by 3 and by 5
  //print fizzbuzz
//else if div by 3
//  print fizz
//else if div by 5
//  print buzz
//else
  //print number
