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
