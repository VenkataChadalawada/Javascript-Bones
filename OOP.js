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
