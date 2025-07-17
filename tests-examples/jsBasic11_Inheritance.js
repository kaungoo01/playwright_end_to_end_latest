//Inheritance is the Main Pillar in Object oriented PRogramming
//One calss can inherit/acquire the properties, Methods of another class
//The class which inherites the properties of other is known as subclass(derived class, child class
//The class whose perperties are inheritance is know as superclass

//Example, we have a super class on _Classes_export
//Person class has age (fixed), location (get Method), Constructor(FName, LName), Method(fullname())

//I want to create a class "Pet", which will be reusing super class "Person"
//#1. Import by using require
//#2. use extends
//#3. user the same constructor

const Person = require("./jsBasic10.1_Classes_export")
class Pet extends Person {

    constructor(firstName,lastName){
        //#4. call parent class constructor, super()
        //#5. use the same parameter first and last name
        super(firstName,lastName)
    }

    //Optinal: get location, normal get method
    get location(){
        return "BlueCross"
    }
}

//Object one
let pet1 =new Pet("sam","beautiful")
console.log(pet1.fullName())
console.log(pet1.location)

//Object two
let pet2 =new Pet("Bob","lovely")
console.log(pet2.fullName())