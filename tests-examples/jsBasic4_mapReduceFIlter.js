//Array
//Map reduce filter

console.log('-------Reduce----------')

//***reduce***
//Put it all together
//use for SUM total and Mutiplication
var marks = [20,40,35,12,37,100]
//reduce has 2 arguments
//=> that is
//sum is like starting variable
//mark is like adding values
//+ what sum starting ++ with mark one by one
//0 starting point
let Total = marks.reduce((sum,mark) => sum+mark,0)
console.log(Total);

console.log('-------Filter----------')

//***Filter***
//I want a condition
var scores = [12,13,14,16]
//I want to print only even numbers
//filter as 1 argument 
//=> that is
//score like starting variable
//% is remainder of 2 (even num) is 0
let evenNumbers = scores.filter(score=> score%2==0)
console.log(evenNumbers);

//***Map***
//Can be Modify 
//Mapping from one value to another value
//Example Get the evenNumbers array and multiply by 2
console.log('-------Map----------')

let mappedArray=evenNumbers.map(score => score*3)
console.log(mappedArray);

//Lets sum them
let summedArray=mappedArray.reduce((sum,val) => sum+val,0);
console.log('---------------Reduce Again-----------------')
console.log(summedArray);

//Shorter way to do it
//Chains Together into 1 line!
//create new array
var scores1 = [12,13,14,16];

//filter first only even
let newSummedArray=scores1.filter(score=>score%2==0).map(score=>score*3).reduce((sum,val)=>sum+val,0);

console.log('---------------Chained filter,map,reduce-----------------')
console.log(newSummedArray);