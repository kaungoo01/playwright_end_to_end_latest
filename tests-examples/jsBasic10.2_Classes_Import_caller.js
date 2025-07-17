//To Import this call Person
//User require
//And create an Constant
const Person = require('./jsBasic10.1_Classes_export')




//new Person() , Object
let person = new Person("Edward","Oo"); //#2. An Argument to supply (call Instance properties) while creating this constructor, can be accessiable
let person1 = new Person("Kaung","Oo");
console.log("--location property using a normal way--")
console.log(person.age);
console.log("--location property using get Method--")
console.log(person.location);
//Using constructor + Methods
console.log(person.fullName()); // will need () since this is a method, unlike property like age or location, that dont need ().
//#4. Let's create another object with new Instances
console.log(person1.fullName());


/*
you have a class created on _Classes_export, with module.export
call this class by create a constant + reqire('module location') and use it
*/
