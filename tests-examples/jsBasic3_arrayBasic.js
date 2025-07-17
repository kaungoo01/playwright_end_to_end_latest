//Arrays
//Declare the length example: marks of 6 subjects
//Old way
//use var to reassign the array
var marks = Array(6);
var marks = new Array(20,40,35,12,37,100)

//New way
//Better way
var marks = [20,40,35,12,37,100]

//Access, Retrieve them
console.log(marks[1]);

//change 12 to 40
//Assign 
marks[3] = 40
console.log(marks);

//get the length
console.log(marks.length);

//Add another element > PUSH > END of an Array
marks.push(65)
console.log(marks);

//Remove the LAST element > POP
marks.pop()
console.log(marks);

//Add another element **BEGINNING of an Array**> unshift
marks.unshift(10)
console.log(marks);

//Value of the Location
console.log(marks.indexOf(100));

//IMPORTANT --Check if there's element in an array
//Is 120 in there? True or False
console.log(marks.includes(120)) //false

//Break Array into subArray
subMarks = marks.slice(2,5) //between 2 to 4th
console.log('----------')
console.log(marks);
console.log(subMarks);

//Iterate this array
//And SUM them all together!
//assign sum variable
var sum = 0;
for(let i =0; i < marks.length; i++){
    //console.log(marks[i]);
    sum = sum + marks[i];
    
}
console.log('SUM of all')
console.log(sum);