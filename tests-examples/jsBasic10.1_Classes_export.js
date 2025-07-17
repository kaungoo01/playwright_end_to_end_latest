//Create a Class
//To let this Class accessiable across
//User module.exports

module.exports = class Person {

    age = 25
    //fixed

    //#1. Property using get Method
    get location(){
        return "canada"
    }

    //#2. Constructor
    constructor(firstName,lastName){
        this.firstName = firstName
        this.lastName = lastName
    }
    //#.3 Methods, that access this above #2.constructor
    fullName(){
        console.log(this.firstName+this.lastName);
    }

} //Class end





//Blocked if calling from _Import_caller.js

//new Person() , Object
// let person = new Person("Edward","Oo"); //#2. An Argument to supply (call Instance properties) while creating this constructor, can be accessiable
// let person1 = new Person("Kaung","Oo");
// console.log("--location property using a normal way--")
// console.log(person.age);
// console.log("--location property using get Method--")
// console.log(person.location);
// //Using constructor + Methods
// console.log(person.fullName()); // will need () since this is a method, unlike property like age or location, that dont need ().
// //#4. Let's create another object with new Instances
// console.log(person1.fullName());