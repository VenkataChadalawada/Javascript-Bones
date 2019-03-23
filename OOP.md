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
