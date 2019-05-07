# Object Oriented Programming in javascript
- a programming model based around the idea of objects
- these objects are constructed from what we called "classes", which we can think of like a blueprint. we call these objects created from classes "instances"
- we use `functions` and `objects` to design the same pattern.

##### what is the necessity?
Imagine we want to make a few house objects, they will all have bedrooms, bathrooms and numSqft


### Defining a constructor
- usually we set first letter a cap in Constructor function
```javascript
function House(bedrooms, bathrooms, numsqft){
 this.bedrooms = bedrooms;
this.bathrooms = bathrooms;
this.numSqft = numSqft;
}


var firstHouse = House(2,2,1000)
flatHouse // undefined

```
- Problem is our constructor function isn't returning anything. so we need new Keyword

### New Keyword
- 1 creates an empty object
- 2 It sets the values to this
- 3 It adds return this to the constructor function
- 4 It sets the property on the object which is __proto__
```javascript
function Dog(name, age){
  this.name = name;
  this.age = age;
  this.bark = function(){
    return "bow bow";
  }
}

var d = new Dog('stumpy', 10);
// 1. creates an empty object d => Dog{}
// 2. It then sets the keyword 'this' to be that empty object
// 3. It adds an implicit return to the end of the function , which follows it
// 4. It adds a property onto the empty object called "__proto__", which links the "prototype" property on the constructor function to the empty object

/* It looks like below:-
Dog {name: "Rusty", age: 3, bark: ƒ}
age: 3
bark: ƒ ()
name: "Rusty"
__proto__: Object

*/

console.log(d.name);
console.log(d.age);
console.log(d.bark());

```


### Multiple constructors

```javascript

function Car(make, model, year){
  this.make = make;
  this.model = model;
  this.year = year;
  this.numWheels = 4;
}

function Motorcycle(make, model, year){
  this.make = make;
  this.model = model;
  this.year = year;
  this.numWheels = 2;
}

// lot of duplication
// It would be neat if we can borrow some from car for motocycle
// using "call" or "apply"

function Car(make, model, year){
  this.make = make;
  this.model = model;
  this.year = year;
  this.numWheels = 4;
}

// call way
function Motorcycle(make, model, year){
  //using call
  Car.call(this, make, model, year)
  this.numWheels = 2;
}

//apply way
function Motorcycle(make, model, year){
  Car.apply(this, [make, model, year]);
  this.numWheels = 2;
}

// also there is a special keyword - arguments 
function Motorcycle(){
  Car.apply(this, arguments);
  this.numWheels = 2;
}

//execution
var c = new Car('Ford', 'Mustang', '2015');
var m = new Motorcycle('Yamaha', 'Fazer', '2018');
console.log(c);
console.log(m);

```
### EXERCISE on above
``` javascript
// PART 1

// Create a constructor function for a Person, each person should have a firstName, lastName, favoriteColor and favoriteNumber. Your function MUST be named Person. 
function Person(firstName, lastName, favoriteColor, favoriteNumber){
    this.firstName = firstName;
    this.lastName = lastName;
    this.favoriteColor = favoriteColor;
    this.favoriteNumber = favoriteNumber;
    

// Write a method called multiplyFavoriteNumber that takes in a number and returns the product of the number and the object created from the Person functions' favorite number.
    this.multiplyFavoriteNumber = function(number){
       return number*this.favoriteNumber;
    }
    
    
}
// PART 2

// Given the following code - refactor the Child function to remove all the duplication from the Parent function. You should be able to remove 4 lines of code in the Child function and replace it with 1 single line.

function Parent(firstName, lastName, favoriteColor, favoriteFood){
    this.firstName = firstName;
    this.lastName = lastName;
    this.favoriteColor = favoriteColor;
    this.favoriteFood = favoriteFood;
}

function Child(firstName, lastName, favoriteColor, favoriteFood){
    this.firstName = firstName;
    this.lastName = lastName;
    this.favoriteColor = favoriteColor;
    this.favoriteFood = favoriteFood;
}

function Child(){
    Parent.apply(this, arguments);
}
```
### Prototypes
- Every constructor function has a property on it called "prototype" which is an object.
- The prototype object has a property on it called  "constructor", which points back to the constructor function.
- __proto__ is the actual object that is used in the lookup chain to resolve methods, etc.
- prototype is the object that is used to build __proto__ when you create an object with "new"

```
( new Foo ).__proto__ === Foo.prototype;
( new Foo ).prototype === undefined;
```
lets see with an example
```javascript

function Person(name){
  this.name = name;
}
Person.prototype // we get an object that has a constructor method

// Lets create two objects using Person Constructor function
 var colt = new Person('Colt');
 var elie = new Person("Elie");
 
 elie.__proto__ === Person.prototype
 // true
 colt.__proto__ === Person.prototype
//true

Person.prototype.constructor === Person
//true
```
### So what is this prototype
- when new key word is used a property __proto__ will be added to Prototype of constructor function.
- it is an object we can place methods and properties on it. they can be accessed by the objects that are created by this constructor function.
eg:
``` javascript
Person.prototype.isInstructor = true;
elie.isInstructor; //true
colt.isInstructor; //true
```
since these objects elie and colt has link to Person prototype via __proto__ , they can both access anything inside of it.


```javascript
function Car(make, model, year){
  this.make = make;
  this.model = model;
  this.year = year;
  this.numWheels = 4;
}


//execution
var venkicar = new Car('Ford', 'Mustang', '2015');
console.log(venkicar);

//every class has a prototype
console.log(Car.prototype);
// every object gets dunder proto after assigned with new key word
console.log(venkicar.__proto__);
//They tie each other
console.log(venkicar.__proto__ === Car.prototype);
// and it should be equal to its own constructor
console.log(Car.prototype.constructor === Car);
```

### Prototype Chaining
How does Javascript find methods and properties
say,
```
var arr = []
arr.push
arr.__proto__ === Array.prototype
```
In javascript , first it checks if that object has that particular method or property if not found then it checks if that object's __proto__ has it or not
This keeps happening until the property or method is found, if not javascript returns undefined.
More deeper example:
```
arr.hasOwnProperty('length');
actual Array __proto__ doesn't have it. so it checks the next __proto__ (array is derived from Object)

Say we add a property to Car function Prototype We can see them tied to all objects we created out of Car
``` javascript

Car.prototype.isMine = true;
Car.prototype.teddy = 20;

console.log(venkicar.isMine);
console.log(venkicar.teddy);

```
### Restructuring inner methods to be on prototype

``` javascript
function Car(make){
  this.make = make;
  this.sayHi = function(){
    return "Hi " + this.make;
  }
}

var venkicar = new Car("Ford");
console.log(venkicar.sayHi());


// more efficient way to define in prototype and it will be there


function Car(make){
  this.make = make;
}

Car.prototype.sayHi = function(){
    return "Hi " + this.make;
}
var venkicar = new Car("Ford");
console.log(venkicar);
console.log(venkicar.sayHi());
```
### A broader example


``` javascript
function Car(make, model, year){
  this.make = make;
  this.model = model;
  this.year = year;
  this.isRunning = false;
}

Car.prototype.turnOn = function(){
    this.isRunning = true;
}

Car.prototype.turnOff = function(){
    this.isRunning = false;
}

Car.prototype.honk = function(){
    if(this.isRunning){
      return "Beep!";
    }
}

var venkicar = new Car("Ford", "Mustang", "2015");
console.log(venkicar);
console.log(venkicar.turnOn());
console.log(venkicar.honk());
console.log(venkicar.turnOff());
console.log(venkicar.honk());
```
### Exercise
``` javascript

// 1 - Create a constructor function for a Person. Each person should have a firstName, lastName, favoriteColor, favoriteNumber)
function Person(firstName, lastName, favoriteColor, favoriteNumber){
  this.firstName = firstName;
  this.lastName = lastName;
  this.favoriteColor = favoriteColor;
  this.favoriteNumber = favoriteNumber;
  this.family = [];
}
/* 2 - Add a function on the Person.prototype called fullName that returns the firstName and lastName property of an object created by the Person constructor concatenated together.
    
Examples:    
    var person = new Person("Elie", "Schoppik", "purple", 34)
    person.fullName() // "Elie Schoppik"

*/
Person.prototype.fullName = function() {
   return this.firstName+" "+this.lastName;
}

// 3 -  Add a property on the object created from the Person function called family which is an empty array. This will involve you going back and adding an additional line of code to your Person constructor you previously created in exercise 1.


/* 4 - Add a function on the Person.prototype called addToFamily which adds an object constructed from the Person constructor to the family array. To make sure that the object you are adding is an object construced from the Person constructor (HINT - take a look at the instanceof keyword). Make sure that your family array does not include duplicates! This method should return the length of the family array.


Examples: 
    
    var person = new Person("Elie", "Schoppik", "purple", 34)
    var anotherPerson = new Person()
    person.addToFamily(anotherPerson); // 1
    person.addToFamily(anotherPerson); // 1
    person.family.length // 1
    
    person.addToFamily("test"); // 1
    person.addToFamily({}); // 1
    person.addToFamily([]); // 1
    person.addToFamily(false); // 1
    person.family.length // 1
*/
Person.prototype.addToFamily = function(person) {
  if(this.family.indexOf(person)===-1 && person instanceof Person){
    this.family.push(person);
  }
  return this.family.length;
}
// PART II 

// 1 - Implement your own version of Array.prototype.map. The function should accept a callback and return a new array with the result of the callback for each value in the array. 
Array.prototype.map = function(callback){
  var newArray = [];
  for(var i=0;i<this.length;i++){
    newArr.push(callback(this[i], i, this));
  }
  return newArray;
}
/* 2 - Implement a function called reverse that reverses a string and place it on the String.prototype

Examples:
    "test".reverse() // "tset"
    "tacocat".reverse() // "tacocat"
*/

String.prototype.reverse = function(){
  var newStr = '';
  for(var i=this.length-1;i>=0;i--){
    newStr+=this[i];
  }
}
```
### Inheritance
#### Problem - if we use direct assignment
``` javascript
//Problem in inhertiance with directly assign objects
//Person Parent class
function Person1(fname, lname){
   this.fname = fname;
   this.lname = lname;
}

Person1.prototype.sayHi = function() {
  return "I am currently a student!";
}

//Student - Child class
function Student1(fname, lname){
  return Person1.apply(this, arguments);
}
// Inheritance - can we assign ?
Student1.prototype = Person1.prototype;
//what happens??
var ram = new Person1('Venkat', 'Chadalawada');

console.log(ram);
console.log(ram.sayHi()); // you get undefined and thats what you should get
```
#### we cant assign one object to another - It will just create a reference
``` javascript

function Person(fname, lname){
   this.fname = fname;
   this.lname = lname;
}
Person.prototype.sayHi = function() {
  return "I am currently a Person!";
}
function Student(fname, lname){
  return Person.apply(this,arguments);
}

// Inheriting from Person
//Step 1 - use Object.create
Student.prototype = Object.create(Person.prototype);
//Step 2 - reassign constructor to Student
Student.prototype.constructor = Student;

Student.prototype.status = function() {
  return "I am currently a student!";
}
console.log(ram);
console.log(ram.status); // you get undefined and thats what you should get
console.log(sam.status()); 
console.log(sam.sayHi()); 
```

#### why Object.create not new while inherting
Because new creates lot of additional properties which we dont need
``` javascript
// 1 - Create a constructor function for a Vehicle. Each vehicle should have a make, model and year property.
function Vehicle(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;
}
// 2 - Add a function to the Vehicle prototype called start which returns the string "VROOM!"
Vehicle.prototype.start = function(){
    return "VROOM!";
}
// 3 - Add a function to the Vehicle prototype called toString which returns the string "The make, model, and year are" concatenated with the make, model and year property
/* Examples 
    var vehicle = new Vehicle("Tractor", "John Deere", 1999)
    vehicle.toString() // 'The make, model, and year are Tractor John Deere 1999'
*/
Vehicle.prototype.toString = function(){
    return "The make, model, and year are "+this.make+" "+this.model+" "+this.year;
}

// 4 - Create a constructor function for a Car. Each object created from the Car function should also have a make, model, and year and a property called numWheels which should be 4. The Car prototype should inherit all of the methods from the Vehicle prototype
function Car(make, model, year){
    Vehicle.apply(this, [make, model, year]);
    this.numWheels=4;
}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
// 5 - Create a constructor function for a Motorcycle. Each object created from the Motorcycle function should also have a make, model, and year and a property called numWheels which should be 2. The Motorcycle prototype should inherit all of the methods from the Vehicle prototype
function Motorcycle(make, model, year){
    Vehicle.apply(this, [make, model, year]);
    this.numWheels=2;
}
Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;
```
