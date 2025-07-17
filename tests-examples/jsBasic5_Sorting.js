//sorting on Array
//#1. sorting on Strings
//#2. sorting on Numbers


//#1. sort the strings

let fruits = ["Banana","Mango","Pomegrante","Apple"];
console.log('---------------String: Before Sorting-----------------')
console.log(fruits);

//sort method
fruits.sort();
console.log('---------------String: After Sorting-----------------')
console.log(fruits);

//#2. sorting on Numbers
var scores1 = [12,3,20,33,19,16,14];
console.log('---------------Before: After Sorting-----------------')
console.log(scores1);
//Normal sort method
scores1.sort();
console.log('---------------Number: After Sorting !!!Incorrect!!!--')
console.log(scores1);

//Custom sort for Numbers, with a function
scores1.sort(function(a,b){
    return a-b
});
console.log('---------------Number: After Custom Sorting------------')
console.log(scores1);

//Reset
var scores1 = [12,3,20,33,19,16,14];
console.log('---------------Number: Before Sorting-------------------')
console.log(scores1);

//###filter,may,reduce style###
scores1.sort((a,b)=>a-b)
console.log('---------------Number: After mayreduce style Sorting------------')
console.log(scores1);

//Reset
var scores1 = [12,3,20,33,19,16,14];
console.log('---------------Number: Before Reverse Sorting-------------------')
console.log(scores1);

//###filter,may,reduce style###

scores1.sort((a,b)=>b-a) //swtich between a and b
console.log('---------------Number: After mayreduce style Sorting------------')
console.log(scores1);

