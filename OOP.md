# Object Oriented Programming in javascript

### Defining a constructor
```javascript
constructor function(bedrooms, bathrooms, numsqft){
 this.bedrooms = bedrooms;
this.bathrooms = bathrooms;
this.numSqft = numSqft;
}


var firstHouse = House(2,2,1000)
flatHouse // undefined

```
- Problem is our constructor function isn't returning anything. so we need new Keyword

### New Keyword
- 1 creates an object
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
// using call or apply

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

### Prototypes

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

