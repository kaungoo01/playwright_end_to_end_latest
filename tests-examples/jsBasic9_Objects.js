//Object is collection of properties
//Properties is First Name, Last Name, Address etc
//Its define in Key:Value pair

//Example
let person = {
                firstName: 'Kaung',
                lastName: 'Oo',
                age: 24,
                fullName: function() { //we can have our own concantenate function, using 'this'
                console.log(this.firstName + this.lastName);
                }
}

//To access
console.log(person.firstName);

//To access as array
//treat it as string
console.log(person['lastName']);

//Change the property
//change the first name
person.firstName = 'Edward'
console.log(person.firstName);

//add Property
person.gender = 'Male'
console.log(person);

//remove Property
delete person.gender
console.log(person);

//Iterate through an Object
//Check if certain property is exist
console.log('gender' in person); //false

//can use forloop to iterate thru obj

for(let key in person) {//key in object
    //print
    console.log(person[key]) //just like person['firstName'], person['firstName']
}
//Print the fullname
console.log(person.fullName());