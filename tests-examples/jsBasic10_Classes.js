//Classes
//Object Oriented principles
//ES6 engine can represent your enity in a form of class


//Class has
//#1. A Property example age, fixed values.
//#2. A Constructor, using Instances variables, dynamic values.
//#3. A Methods, to handle Constructors.  

//Example
//we have a class

class Person {

    age = 25
    //location = 'canada'

    //#1. Property using get Method
    //###Note This is a Property####
    get location(){
        return "canada"
    }

    //#2. Constructor
    constructor(firstName,lastName){
        this.firstName = firstName
        this.lastName = lastName
    }
    //#.3 Methods, that access this above #2.constructor
    //Depend on Constructor
    fullName(){
        console.log(this.firstName+this.lastName);
    }

}

//To access this age (a property of a class) 
//Have to create an Object of a class
//Object.Property
//with a help of 'new' operator
//new Person() , Object
//can give a name of that Object

let person = new Person("Edward","Oo"); //#2. An Argument to supply (call Instance properties) while creating this constructor, can be accessiable
//Person is an Object!
//to access age
//#4. Create another Object
let person1 = new Person("Kaung","Oo");
console.log("--location property using a normal way--")
console.log(person.age);

//This property age, can also be represent (instead of equal =) by using get Method
//like #1.
console.log("--location property using get Method--")
console.log(person.location);

//#2. We can use a constructor to your class
//Constructor is a method which excute by default when you create a object of a class
//To access this method, fullName() , not bracket.
console.log(person.fullName());


//#4. Let's create another object with new Instances
console.log(person1.fullName());

