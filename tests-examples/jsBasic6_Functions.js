//Functions
//Block of code can be wrap around by Function
//function(declare) + name (to makesense) + parameter (inputs)
//Inside the function
//return, the results
//call function(call name)
//call with a variable and printit

function add(a,b){
    
    return a+b

}

//call it and assign variable
let sum = add(2,3)
//print it
console.log("---old way function print---")
console.log(sum)

//Another way Annonymous Function aka Function expression
//assign a variable with the Annonymous Function, without a name!
//Just use the fatpipe 
//remove function name
//remove {}
//remove return

let sumOfNumbers = (c,d)=> c+d
//print it
console.log("---new way function print---")
console.log(sumOfNumbers(1,2));
