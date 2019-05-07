# Closures

A closure is a function that makes use of variables defined in outer functions that have previously returned.

```javascript
function outer(){
  const closures = "closures are ";
  return function inner(){
    return closures+"awesome";
  }
}
  console.log(outer()());
```
another example
``` javascript
function outer(a){
  
  return function inner(b){
    return a+b;
  }
}

console.log(outer(5));
console.log(outer(5)(4));
```

**** ONLY the values that has been used by innerfunction will be remembered not every one that outer function declares.

eg:
```javascript
function outerFn(){
  var data = "Something from Outer fn";
  var fact = "Remember Me!";
  
  return function innerFn(){
    debugger;
    return fact;
  }
}

console.log(outerFn()());
```
you can observe `data` is not there, `fact` is there - because fact is being used by innerFn.

#### why ??
##### when a function returns , it first checks if there are any values that are being used and need to remember if so, it remembers just them. This is how closure works.

In other languages like Java, there is this concept of private variables, But in javascript we have closures.

### Additional privacy with closures (modular approach)
```javascript
function classRoom(){
  var instructors = ['Elie','Colt'];
  return {
    getInstructors: function(){
      return instructors;
    },
    addInstructor: function(instructor){
      instructors.push(instructor);
      return instructors;
    }
  }
}

var course1 = classRoom();
console.log(course1.getInstructors().pop(),
course1.getInstructors().pop(),
course1.getInstructors());
//output
/*
Colt
Elie
[ ]
*/

### Additional exercises with closures


```
But there is a flaw in this we are modifying the actual instructors.
Lets use Slice to make a newone and send it.
```javascript
function classRoom(){
  var instructors = ['Elie','Colt'];
  return {
    getInstructors: function(){
      return instructors.slice();
    },
    addInstructor: function(instructor){
      instructors.push(instructor);
      return instructors.slice();
    }
  }
}

var course1 = classRoom();
console.log(course1.getInstructors().pop(),
course1.getInstructors().pop(),
course1.getInstructors());
//output
/*
Colt
Colt
[ 'Elie', 'Colt' ]
*/
```

## EXERCISES
```javascript

/* 
Write a function called specialMultiply which accepts two parameters. If the function is passed both parameters, it should return the product of the two. If the function is only passed one parameter - it should return a function which can later be passed another parameter to return the product. You will have to use closure and arguments to solve this.

Examples: 

    specialMultiply(3,4); // 12
    specialMultiply(3)(4); // 12
    specialMultiply(3); // function(){}....
*/

function specialMultiply(a,b){
  var a = a;
  if(b){
    return a*b;
  }
  return function(b){
    return a*b;
  }
}
/*
O/p
>  specialMultiply(5,6)
30
>  specialMultiply(5)
[Function]
>  specialMultiply(5)(6)
30

*/
/* 
Write a function called guessingGame which takes in one parameter amount. The function should return another function that takes in a parameter called guess. In the outer function, you should create a variable called answer which is the result of a random number between 0 and 10 as well as a variable called guesses which should be set to 0.

In the inner function, if the guess passed in is the same as the random number (defined in the outer function) - you should return the string "You got it!". If the guess is too high return "Your guess is too high!" and if it is too low, return "Your guess is too low!". You should stop the user from guessing if the amount of guesses they have made is greater than the initial amount passed to the outer function.

You will have to make use of closure to solve this problem.

Examples (yours might not be like this, since the answer is random every time):

    var game = guessingGame(5)
    game(1) // "You're too low!"
    game(8) // "You're too high!"
    game(5) // "You're too low!"
    game(7) // "You got it!"
    game(1) // "You are all done playing!"

    var game2 = guessingGame(3)
    game2(5) // "You're too low!"
    game2(3) // "You're too low!"
    game2(1) // "No more guesses the answer was 0"
    game2(1) // "You are all done playing!"
*/

function guessingGame(amount){
  var answer = Math.floor(Math.random()*10);
  var guesses = 0;
  var success = false;
    return function rando(guess){
      guesses++;
      if(success){
        return "You are all done playing!";
      }
      if(guesses >= amount) return "No more guesses the answer was "+answer;
      
      if(guess === answer){
        success = true;
        return "You got it!";
      } else if(guess < answer) {
        return "You're too low!";
      } else {
        return "You're too high!";
      }
      
    }
}
```

## What is 'this' ?
- reserved keyword
- usually determined by how a function is called - what we call 'execution context'
- can be determined using four rules `(global, object/implicit, explicit, new)`

#### 1 Global Context
if its outside, not inside a declared object - no call, apply, bind, new then its window
console.log(this); //window

var data = {};
data.instructor = 'Ellie';
data // {instructor: 'Ellie'}

###### some dangers
``` javascript
function whatisThis(){
return this;
}
whatisThis(); //window

function variablesInThis(){
this.person = "Elie";
}
variablesInThis()

console.log(person); //Elie
```
// Even though there is no person declared as a global variable on window. This happend the same because 'this' inside variablesInThis function is window

``` javascript
var dog = "Rusty";
function makePerson(){
var person = "Colt";
}
console.log(dog) //Rusty
console.log(person) // undefined error 
```
// to avoid undefined error define `var person` on top - then you dont get error but "colt"

If we use Strict Mode - It protects this too!
```javascript
"use strict"
console.log(this) //window
function whatIsThis(){
  return this;
}
whatIsThis(); //undefined
```

```javascript
"use strict"
function variablesInThis() {
   this.person = "Elie";
}
variablesInThis(); //TypeError cant set person on undefined!
```
  
#### 2 Implicit/Object
when the keyword 'this' is inside of a declared object
```javascript
var person = {
  firstName: "Elie",
  sayHi: function(){
    return "Hi "+this.firstName; // closes Parent object = Person
  },
  determineContext: function(){
    return this === person; // this will evaluate to true
  }
}
/*
>  person.sayHi();
'Hi Elie'
>  person.determineContext();
true
>  
*/
```
##### How about this example?
```javascript
var person = {
  firstName: 'Elie',
  determineContext: this;
}
person.determineContext; //window
```

Why??

###### A keyword 'this' is defined when a function is run! There is not a function being run here to create a new value of the keyword 'this' so the value of 'this' is still the window

##### what happens if we have a nested object?
``` javascript
var person = {
  firstName: "Elie",
  sayHi: function(){
    return "Hi "+this.firstName; // closes Parent object = Person
  },
  determineContext: function(){
    return this === person; // this will evaluate to true
  },
  dog: {
    sayHello: function(){
      return "Hello "+ this.firstName;
    },
    determineContext: function(){
      return this===person;
    }
  }
}

console.log(person.sayHi(), // Hi Colt
person.determineContext(), //true

person.dog.sayHello(), // Hello undefined
person.dog.determineContext()); //false
```
As we observed `person.dog.sayHello(), // Hello undefined`
how to rectify this ? 
Using call , apply & bind

#### 3 Explicit Binding
Call Apply Bind = choose what we want the context of this to be using call apply bind

- Call(thisArg, a,b,c,....)
- It is immediately invoked

- Apply
- It is immediately invoked

- bind
- Not immediately invoked => it returns the function with this applied. it is powerful you can use it for later especially in async functions


##### Call
1) You can change above function call as below:
``` javascript
person.dog.sayHello(), // Hello undefined
person.dog.sayHello.call(person), // Hello Elie
```

2) Another usecase
``` javascript
var elie = {
  firstName: "Elie",
  sayHi: function(){
    return "Hi "+this.firstName; // closest Parent object = elie
  }
}
var colt = {
  firstName: "Colt",
  sayHi: function(){
    return "Hi "+this.firstName; // closest Parent object = colt
  }
}
  

console.log(elie.sayHi()) // Hi Elie
console.log(colt.sayHi()) // Hi Colt


// Can we use "call" here to avoid duplicate code - like sayHi() function
var elie = {
  firstName: "Elie",
  sayHi: function(){
    return "Hi "+this.firstName; // closes Parent object = elie
  }
}
var colt = {
  firstName: "Colt",
}

console.log(elie.sayHi()) // Hi Elie
console.log(elie.sayHi.call(colt)) // Hi Colt
```
###### One step further - lets make sayHi function for anyone!
function sayHi(){
  return "Hi "+this.firstName;
}
var colt = {
   firstName: "Colt"
}
var elie = {
   firstName: "elie"
}
sayHi.call(colt); // Hi Colt
sayHi.call(elie); // Hi Elie

###### Another Use Case For Call
Lets imagine we want to select all the 'divs' on a page
`var divs = document.getElementByTagName('div');`
How can we find all the divs that have the text "Hello". Using filter would be nice!
`div.filter //undefined`
unfortunately, divs is not an array, it's an array like object so filter wont work.
so how can we convert an array-like-object into an array?
very similar to the way we make copies of arrays - Using slice!

How can we do this?

"call" to the rescue!

Let's use SLICE method on arrays, but instead of the target of slice (the keyword this) being that array, lets set the target of the keyword 'this' to be our divs array-like-object
``` javascript
var divsArray = [].slice.call(divs);
divsArray.filter(function(val){
  return val.innerText === "Hello";
}
```
what we are doing is trying to clice something that is not actually an array! In Javascript , SLICE will not work on all data types, but it works very well on arry-like-objects

##### Apply
``` javascript
function sayHi(){
  return "Hi "+this.firstName;
}
var colt = {
   firstName: "Colt"
}
var elie = {
   firstName: "elie"
}
console.log(
sayHi.call(colt),
sayHi.apply(elie));

// Hi Colt 
// Hi elie
```
It seems like there is no diff between call and apply. But things get complicated if there are mor enumber of arguments
```javascript


function addNumbers(a,b,c,d){
  return this.firstName+" just calculated "+ (a+b+c+d);
}
var colt = {
   firstName: "Colt"
}
var elie = {
   firstName: "elie"
}
console.log(
addNumbers.apply(elie,[1,2,3,4]),
addNumbers.call(colt,1,2,3,4));

//elie just calculated 10 
//Colt just calculated 10

```
##### Another use case of apply
When a function does not accept an array, apply will spread out values in an array for us!

```javascript
var nums = [5,7,1,4,2];
Math.max(nums) // NaN
//to solve this in ES5
Math.max.apply(this,nums) // 7
```
similar example
``` javascript
function sumValues(a,b,c){
  return a+b+c;
}
var values = [4,1,2];
sumValues(values); // "4,1,2undefinedundefined"

sumValues.apply(this, [4,1,2]); //7
```

#### Bind
``` javascript
function addNumbers(a,b,c,d){
  return this.firstName+" just calculated "+ (a+b+c+d);
}
var colt = {
   firstName: "Colt"
}
var elie = {
   firstName: "elie"
}

var elieCalc = addNumbers.bind(elie,1,2,3,4); 
console.log(elieCalc);
//returns a new applied function with elie as object binded

console.log(elieCalc());
//elie just calculated 10 

```
*** with bind - we do not need to know all the arguments upfront!
```
var elieCalc = addNumbers.bind(elie,1,2);
elieCalc(3,4); //elie just calculated 10 
```

###### Set the context of keyword this for a function that happens in later point of time.
setTimeout is a method on window object that is used to execute after a specified amount of time
```javascript
//recap on setTimeOut
//setTimeout(Fn, timeinMillisecs)

setTimeout(function(){
  console.log('Hello World!')
}, 20000)

we can do other things while we wait
```
problem example: -
in this case, the keyword this is inside the declared object - since setTimeout will be called in later point of time the object it is attached to is actually WINDOW

```javascript
var colt = {
  firstName: "Colt",
  sayHi: function(){
    setTimeout(function(){
      console.log('Hi '+this.firstName);
    }, 1000);
  }
}

// in this case, the keyword this is inside the declared object - since setTimeout will be called in later point of time the object it is attached to is actually WINDOW

colt.sayHi(); //Hi undefined (1000 millisecs later)
```
Use bind to set the correct context of 'this'

```javascript

var colt = {
  firstName: "Colt",
  sayHi: function(){
    setTimeout(function(){
      console.log('Hi '+this.firstName);
    }.bind(this), 1000);
  }
}

colt.sayHi(); //Hi Colt (1000 millisecs later)
```
### EXERCISES
```javascript
/*
Write a function called arrayFrom which converts an array-like-object into an array.

Examples:
    var divs = document.getElementsByTagName('divs');
    divs.reduce // undefined
    var converted = arrayFrom(divs);
    converted.reduce // function(){}....
*/

function arrayFrom(arrayLikeObject){
    return [].slice.call(arrayLikeObject);
}

/* 
// Write a function called sumEvenArguments which takes all of the arguments passed to a function and returns the sum of the even ones.

Examples:
    sumEvenArguments(1,2,3,4) // 6
    sumEvenArguments(1,2,6) // 8
    sumEvenArguments(1,2) // 2
*/

function sumEvenArguments(){
  var newArgs = [].slice.call(arguments);
  return newArgs.reduce(function(acc, next){
    if(next%2 === 0){
      return acc+next;
    }
    return acc;
  },0);
}

/* 
Write a function called invokeMax which accepts a function and a maximum amount. invokeMax should return a function that when called increments a counter. If the counter is greater than the maximum amount, the inner function should return "Maxed Out"

Examples:

    function add(a,b){
        return a+b
    }

    var addOnlyThreeTimes = invokeMax(add,3);
    addOnlyThreeTimes(1,2) // 3
    addOnlyThreeTimes(2,2) // 4
    addOnlyThreeTimes(1,2) // 3
    addOnlyThreeTimes(1,2) // "Maxed Out!"

*/

function invokeMax(fn, num){
  var max = 0;
  return function(){
    if(max>=num) return 'Maxed out';
    max++;
    return fn.apply(this, arguments);
  }
}

/* 
Write a function called once which accepts two parameters, a function and a value for the keyword 'this'. Once should return a new function that can only be invoked once, with the value of the keyword this in the function set to be the second parameter.

Examples:

    function add(a,b){
        return a+b
    }

    var addOnce = once(add, this);
    addOnce(2,2) // 4
    addOnce(2,2) // undefined
    addOnce(2,2) // undefined
    
    function doMath(a,b,c){
        return this.firstName + " adds " + (a+b+c)
    }
    
    var instructor = {firstName: "Elie"}
    var doMathOnce = once(doMath, instructor);
    doMathOnce(1,2,3) // "Elie adds 6"
    doMathOnce(1,2,3) // undefined
    

*/

function once(fn, thisArg){
  var acc = false;
  return function(){
    if(!acc){
      acc = true;
      return fn.apply(thisArg, arguments);
    }
  }
    
}

// BONUSES! 

/* 
Write a function called bind which accepts a function and a value for the keyword this. Bind should return a new function that when invoked, will invoke the function passed to bind with the correct value of the keyword this. HINT - if you pass more than two parameters to bind, those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure!

Examples:

    function firstNameFavoriteColor(favoriteColor){
        return this.firstName + "'s favorite color is " + favoriteColor
    }
    
    var person = {
        firstName: 'Elie'
    }
    
    var bindFn = bind(firstNameFavoriteColor, person);
    bindFn('green') // "Elie's favorite color is green"
    
    var bindFn2 = bind(firstNameFavoriteColor, person, 'blue');
    bindFn2('green') // "Elie's favorite color is blue" 
    
    function addFourNumbers(a,b,c,d){
        return a+b+c+d;
    }

    bind(addFourNumbers,this,1)(2,3,4) // 10
    bind(addFourNumbers,this,1,2)(3,4) // 10
    bind(addFourNumbers,this,1,2,3)(4) // 10
    bind(addFourNumbers,this,1,2,3,4)() // 10
    bind(addFourNumbers,this)(1,2,3,4) // 10
    bind(addFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // 10

*/

function bind(fn, thisArg){
    var outerArgs = [].slice.call(arguments,2)
    return function(){
        var innerArgs = [].slice.call(arguments)
        var allArgs = outerArgs.concat(innerArgs)
        return fn.apply(thisArg, allArgs)
    }
}

/* 
Write a function called flip which accepts a function and a value for the keyword this. Flip should return a new function that when invoked, will invoke the function passed to flip with the correct value of the keyword this and all of the arguments passed to the function REVERSED. HINT - if you pass more than two parameters to flip, those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure! 

Flip should return a new function that when invoked takes the correct number of required arguments to that function which are then reversed. HINT - you will need to use the .length property on functions to figure out the correct amount of arguments. For example:

flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10) 




Examples:

    function personSubtract(a,b,c){
        return this.firstName + " subtracts " + (a-b-c);
    }
    
    var person = {
        firstName: 'Elie'
    }
    
    var flipFn = flip(personSubtract, person);
    flipFn(3,2,1) // "Elie subtracts -4"
    
    var flipFn2 = flip(personSubtract, person, 5,6);
    flipFn2(7,8). // "Elie subtracts -4"
    
    function subtractFourNumbers(a,b,c,d){
        return a-b-c-d;
    }

    flip(subtractFourNumbers,this,1)(2,3,4) // -2
    flip(subtractFourNumbers,this,1,2)(3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4) // -2
    flip(subtractFourNumbers,this,1,2,3,4)() // -2
    flip(subtractFourNumbers,this)(1,2,3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4,5,6,7) // -2
    flip(subtractFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // -2
    flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10) // -22

*/


function flip(fn, thisArg){
    var outerArgs = [].slice.call(arguments,2)
    return function(){
        var innerArgs = [].slice.call(arguments)
        var allArgs = outerArgs.concat(innerArgs).slice(0, fn.length)
        return fn.apply(thisArg, allArgs.reverse())
    }
}
```
#### 4) The new keyword
we can set the context of the keyword 'this' using the 'new' keyword - it does quite a bit more as well which we will discuss further when we talk about OOP
``` javascript
function Person(fname, lname){
  this.fname = fname;
  this.lname = lname;
}
var elie = new Person('Elie', 'Schoppik');
elie.fname
elie.lname

```

#Summary
- The keyword 'this' is a reserved keyword in javascript and its value is determined at execution
- it is either set using the global context, object binding, explicit binding or the new keyword
- when set in the global context in a function , it is either the global object or undefined if we use strict mode
- To explicitly set the value of the keyword 'this' we use call, apply, bind
- we can also use the new keyword to set the context of 'this'
