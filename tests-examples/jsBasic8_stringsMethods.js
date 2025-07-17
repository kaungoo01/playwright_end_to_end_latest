//Stings and Methods

let day = 'Tuesday ' //day is string , no need to day this is string.
                     //String are like array
                     //so that we can get the length,Index,slice,dice, just like array
console.log(day.length); //you will notice it's 8 chars, because of the space

//to get the substring
console.log(day.slice(1,5));

//to split
let splitDay = day.split("s");
console.log('--Before Trim--');
console.log(splitDay);

//get an Index
console.log(splitDay[1]);

//trim that space after 'y '
let splitDayTrim = splitDay[1].trim().length;
console.log('--After Trim--');
console.log(splitDayTrim);

//2 variables date and nextDate, we need to know the differences between them

let date = '23'; //string format
let nextDate = '27'; //string format

//Convertion between formats <----------------------------------IMPORTANT
//we can't subtract between strings!
//we need to convert
//parseInt, string to integer.

let diff = parseInt(nextDate) - (date);
console.log('---after converted to integer---');
console.log(diff);

//convert back to string
updateDiff = diff.toString();
console.log('---after converted to String----');
console.log(typeof updateDiff);


//Concatinated String
//use +
var newQuotes = day+' is the funday! day';
console.log(newQuotes);

//Index of
//locate where the day is
var locateQuote = newQuotes.indexOf("day");
console.log(locateQuote); //I will only able to get 4th, which is "Tues>day<  is the funday!"
                        //But what about the another fun>day< ? ANother one?
var locateUpdateQuote = newQuotes.indexOf("day",5);                        
console.log(locateUpdateQuote);

//How many 'days' does it occurs in  newQuotes 'Tuesday  is the funday!' ?
//we can use while loop to interate

//#1. count
var count = 0;

//val to provide for search the index for count
var value = newQuotes.indexOf("day");

//while that val is no more aka -1
while(value !== -1){

    count++
    value = newQuotes.indexOf("day", value+1)
}
console.log('--How many times day has found--')
console.log(count)


//#If you want to find more than one substring


let day1 = 'Tuesday ';
var newQuotes = day1 + ' is the funday fun fun day!';
console.log(newQuotes);

// Substrings to search for
let substrings = ["day", "fun"];

// Object to store the count of each substring
let counts = {
    day: 0,
  fun: 0
};

// Iterate over each substring
substrings.forEach(substring => {
  let value = newQuotes.indexOf(substring);

  // While the substring is found
  while (value !== -1) {
    counts[substring]++; // Increment the count for that substring
    value = newQuotes.indexOf(substring, value + 1); // Search for the next occurrence
  }
});

// Log the counts for each substring
console.log(counts); // {day: 2, fun: 1}
