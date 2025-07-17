//block of code
//var - it is declare global level and 'function' level ONLY accessiable inside. <---------------------------------
//example

//var in glbal level
var greet = "Good Morning" //<------- This is global scope.

function add(a,b){
    return a+b
    //var in function level
    var greet = 'Hello' //<--------This is a funtion scope.

}

let sum = add(1,2);
console.log(sum);
//#1.
//trying to call this greet 'Hello' which is in the function, Note: Remove Global level greet.
//Notice! This will throw an error
//ReferenceError: greet is not defined

//#2.
//But if greet is in the Glbal level "Good Morning" will print.

//#3.
//if greet is in block scope , not function

if(1==1){
    var greet = "Afternoon" //<---------This is block scope.
                            //it will call global level "Good Morning", then replace with block level "Afternoon"
}
console.log('---calling var----')
console.log(greet);

//#4.let -- global level and 'block' level{} <-------------------------------------------------------------------------

let greeting = "Good Evening" //<----This is global level

if(1==1){
    let greeting = "Good Morning" //<---This is block level. Note it can't be redeclared! 
}
console.log('---calling let----')
console.log(greeting); //<---------------it will get ONLY global level //"Good Evening"

//#5. both var and let can be re-initialize

let sayHello = "Day";
sayHello = "Night";
console.log('---re-initialize from Day to Night----')
console.log(sayHello);

//#6. const - global and 'block' level , except CAN'T be re-initialized

const sayGreed = "Day";
//sayGreed = "Night"; //we can't be reassign it!
console.log('---calling const----')
console.log(sayGreed); //TypeError: Assignment to constant variable.