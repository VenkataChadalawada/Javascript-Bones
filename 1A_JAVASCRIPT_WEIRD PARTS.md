#Javascript - Understanding, Weird parts

## Conceptual Side1:
- Syntax Parser
- Execution Contexts
- Lexical Environments

### 1 Syntax Parser
A program that reads your code determines what it does and if its grammar is valid (compiler)

### 2 Lexical Environment
where something sits physically in the code you write

### 3 Execution Context
A wrapper to help manage the code that is running
There are lots of lexical environments. which one is currently running is managed via execution contexts. It can contain 
things beyond what you have written in your code.


## Conceptual Side2:
- Name/Value Pair - Name which maps to unique value
- Objects - 

### 1 Name/Value Pair
eg
Address = '100 Main St1'

### 2 Objects
a collection of name/value pairs

## Global Environment & the Global Object
whenever code is run it runs inside the execution context
It creates a Global Object and `this`
eg:- Global Object - Window & this at global level they both are equal

In javascript, if you write a global variables and global functions they get attached to the global object
so a === window.a

## The Execution Context: Creation & Hoisting

```javascript
var a = "Hello World!";

function b(){
   console.log('called b!'); 
}

b();
console.log(a);
```

```
O/P:

called b!
app.js:8 Hello World!
```

If we try to call them in beginning lets see what hapens

```javascript
b();
console.log(a);

var a = "Hello World!";

function b(){
   console.log('called b!'); 
}
```

```
output:
called b!
app.js:2 undefined

```
But not an error 
This phenomenon is called "Hoisting"

The reason Javasript does that because
Execution context has 2 phases
- 1) Creation phase
- 2) Execution phase

we have global object, this, outer environment(null) will be created
it recognizes where you created variables and functions
It sets up the memory space for variables and functions that step is called Hoisting

before code begins to execute line by line, JS engine sets up memory aside
for functions it keeps the whole function in memory space
but for variables it doesnot know what its value ultimately ends up being instead it pusta a placeholder

So, all variables are set up as undefined in javascript initially
where as functions are kept as whole

## Conceptual Aside #3 - Javascript & 'undefined'
1) creation phase
- Globalobject
- this
- Outer Environment
- Hoisting (variables setup equal to undefined & Functions setup)

undefined is a special symbol in javascript
Never declare undefined to any variables
eg: a = undefined (NEVER DO THIS!) because you might confuse whether its you created that or javascript created that.

2) Execution Phase
we have Global object, this, outerenvironment, It runs the code line by line
```javascript
function b(){
    console.log('called b!'); 
 }

b();

console.log('firsttime ', a);

var a = "Hello World!";

console.log('secondtime ', a);
```

```
O/P
called b!
firsttime  undefined
secondtime  Hello World!
```
## Conceptual Aside #4 - SINGLE THREADED & SYNCHRONOUS EXECUTION

- Single Threaded
One command executed at a time
(Under the hood of the browser it may not be)

- Synchromous: one at a time in order

### Function Invocation & Execution Stack
Invocation - Calling a function - by using paranthesis ()

``` javascript
function b(){
}
function a(){
  b();
}
a();
```
So what happens if we execute this script?

1) Global execution context 
- in creation phase b and a will be in the memory
2) in execution phase when it sees a() a new execution context will be created and placed in the execution stack and run line by line the moment it sees another function b() it creates another execution context for b and executes that, only after it executed it pops off the stack and goes back to next element in stack

Order lexically doesnt matter eg:
say the order is changes
``` javascript
function a(){
  b();
  var c;
}

function b(){
}
a();
```

### Variable Environment
```javascript
function b(){
    var myVar;
    console.log(myVar); 
 }
function a(){
    var myVar = 2;
    console.log(myVar);
    b();
}

var myVar = 1;
console.log(myVar);

a();
```

```
O/P:

1
2
undefined
```

### Scope Chain
``` javascript
function b(){
    console.log('what am i ', myVar); 
}
function a(){
    var myVar = 2;
    console.log(myVar);
    b();
}

var myVar = 1;
console.log(myVar);

a();
```

every execution environment has connection to outer environment, it turns out if JS couldnt find variable in that execution context it checks in its outer execution context (depends on where the function sits lexically)
So, in our case at function b JS didnt find it and went to its outer execution context to check

```
O/P

1
app.js:6 2
app.js:2 what am i  1
```

This whole thing is called Scope Chain

## HOW JAVASCRIPT handles Asynchronous calls?
```javascript
// long running function
function waitThreeSeconds(){
    var ms = 3000 + new Date().getTime();
    while(new Date() < ms){}
    console.log('finished function');
}

function clickHandler(){
    console.log('click event!');
}

// listen for the click event
document.addEventListener('click', clickHandler);

waitThreeSeconds();

console.log('finished execution');

/* O/P
finished function
finished execution
click event!
*/
```
JS fires these events and they will be placed in the event queue once the stack is empty these in event queue will be put up onto stack. so even if you click immediately they will be in queue

### Conceptual aside#4 - Types & Javascript
###### Dynamic Typing 
You dont tell the Engine what type of data a variable holds, it figures it out while your code is running

###### Primitive Types
there are 6 primitive types in JS
- 1 undefined = represents lack of existence (you shouldn't set a variable to this)
- 2 null = represents lack of existence (you can set a variable to this)
- 3 boolean = true or false
- 4 number = floating point number (there's always some decimals unlike other prog languages)
- 5 string = a sequence of charecters
- 6 symbol = used in ES6 (created in next version of JS)

### Conceptual Aside #5 - Operators
A special function that is syntactically writtern differently
``` 
var a = 3+4; 
console.log(a);
```
operators are functions in Js in infix notation
### operator precedence & their associativity
##### operator precedence -
which operator function gets called first functions called in order with its priority higher
##### associativity

```javascript
var a = 3+4*5;
console.log(a);
```
every operator has an order of associativity
eg, = operator has right-left
```javascript
var a=2,b=3,c=4;
a=b=c; // first b=c happens so b becomes 4, then it assigns to a as 4
console.log(a); //4
console.log(b); //4
console.log(c); //4
```
### Conceptual Aside #6 - coercion
converting a value from one type to another
```
var a = 1+2
console.log(a)
var a = 'hello'+'world';
console.log(a)
var a = 1+'2'; // 
console.log(a); // '12'

```
### existence & boolean
Boolean(undefined)
Boolean("")
Boolean(false)
Boolean(0) // false you might need that extra logic check if u consider 0

### Default Values
```
function greet(name){
   name = name || '<your name>';
   console.log('hello '+name);
}
   greet();
```

## Objects & Functions
### Objects & Dot
Object can have 0x001
- primitive property 0x002
- Object property 0x003
- Function method 0x004
```
var person = new Object();
person['firstname'] = 'Tony';
person.firstname
```
### Objects & dot
```
var person = {};
var p2 = {fname: 'Tony', lname:'Alice'};

console.log(p2.lname);
```
### Object Literal
``` javascript
var Tony = {
   fname: 'Tony',
   lname: 'Alice',
   address: {
      street: '111 Main St',
      city: 'New York',
      state: 'NY',
   }
};

function greet(person){
  console.log('hi '+person.fname);
}
greet(Tony);
greet({
  fname: 'Mary',
  lname: 'Doe'
});

```

### Framework Aside: #1 - Or || operator as backup to reduce rewrites
naming in frameworks use 'or' operator to avoid reqrites
var a = a || 'hi';

### Framework Aside: #2
var greet = 'hello';
var greet = 'hola';

console.log(greet);
// spanish overrides english here

so solution is use objects

var english = {};
var spanish = {};
english.greet = 'hello';

### JSON Object Literal
JSON.stringify
JSON.parse

### Functions are objects
In Javascript Functions are objects 
- a special type of object
- primitive, Object, Function
- name or anonymous
- code - will be asproperty (invocable - () )
``` javascript

function greet(){
    console.log('hi');
}

greet.language = 'english'; // as functions are objects we added 

console.log(greet); // you will see code in chrome console
console.log(greet.language); // you will get 'english' came from inmemory 

greet(); //  with () the code will be invoked

```
###### First class functions (only in JS)
Everything you can do with other types you can do with functions
Assign them to variables, pass them arround, create them on the fly

spanish.greet = 'hola';

### Function statements and function expressions
###### Expression 
unit of code that results in a value - it doesnt have to save to a variable
```
a = 3; // it returns 3
1 + 2; // it returns 3
a = { greeting: 'hi' }; // returns object
```
###### statement
```
if(a===3){
}
```
lets see now function statements & function expression
```javascript

greet();

function greet(){
    console.log('hi');
} // this is function statement => this doesnt return a value its a statement
// but it does some special things - it will be placed in execution context
// so it can be hoisted

// Now lets do function expression
var anonymousGreet = function() {
    console.log('hi');
}

```
As we discussed earlier
greet is a function object in memory, it has name property and code property by calling with () - code will be invocked
anonymousGreet that points to a function object in memory, it has no name property and code property.
since it has no name how do we invoke it since this is a function expression  it can be invocked with the variable it points to as
```   anonymousGreet(); ```

But can it be hoisted?

```javascript

greet(); // you get 'hi'

function greet(){
    console.log('hi');
} // this is function statement => this doesnt return a value its a statement
// but it does some special things - it will be placed in execution context
// so it can be hoisted
anonymousGreet(); // you get undefined here similar to any variable
// Now lets do function expression
var anonymousGreet = function() {
    console.log('hi');
}
// anonymousGreet(); // so it should be afterwards
```
Variables will be first assigned as undefined in creation phase and throws error because you are trying to invoke undefined

#### passing functions to functions - also called a functional programing style because functions in JS are objects
```javascript
function log(a){
  a();
}
log(function(){
  console.log('hi');
}); // hi
```

### Conceptual Aside #7 - ByValue vs ByReference
In both cases we are talking about variables
var a = 6
a now knows address say 0x001 in which 6 sits

lets say now
b=a;
this time b copies the primitive value into another memory location say 0x002 and it points to it
This is called ByValue (works only for primitive types)

say
var a = {name: 'sai'};
a now knows address say 0x001 in which  {name: 'sai'} sits.
now say b=a
this time b simply points to 0x001 same location where the object sits while 'a' created it
This is called "By reference"

```javascript
// By Value
var a = 3;
var b;

b = a;
a = 2;

console.log(a); // 2
console.log(b); // 3 no impact even if a changes as b has its own copy

//By Reference - all objects including functions
var c = { greeting: 'hi' };
var d;

d=c;
c.greeting = 'hello'; // Mutate - To change something
console.log(c); // { greeting: 'hello' }
console.log(d) // now it has also { greeting: 'hello' }
 ```
 
 Also when we reassign c, d would still point to old location
 ```javascript
 // By Value
var a = 3;
var b;

b = a;
a = 2;

console.log(a); // 2
console.log(b); // 3 no impact even if a changes as b has its own copy

//By Reference - all objects including functions
var c = { greeting: 'hi' };
var d;

d=c;
c.greeting = 'hello'; // Mutate - To change something
console.log(c); // { greeting: 'hello' }
console.log(d) // now it has also { greeting: 'hello' }
 
//By reference (even as parameters)
function changeGreeting(obj){
    obj.greeting = 'Hola';
}
changeGreeting(d);
console.log(c); //{greeting: "Hola"}
console.log(d); //{greeting: "Hola"}

// Note - the equals operator sets up new memory space (new address)
c = { greeting: 'howdy' };
console.log(c); //{greeting: "howdy"} now c poi ts to new location
console.log(d); //{greeting: "Hola"} d still points to old one still

```
### Objects, Functions, this
Remember when Execution context is created (Creation Phase)
Each "execution context" will get:
- variable environment 
- Outer Environment
- 'this' variable

```javascript
console.log(this); // window - in global execution context of browser

function a() {
    console.log(this); // it will also point to global
    this.newvariable = 'hello'; // you are actually assigng this in global this
}
a();

var b = function() {
    console.log(this);
}

a(); //window
console.log(newvariable);
b(); //window
// They all pointing at the same window at same address
console.log('-------');

// What about methods inside an object?
// property - in  object if its primitve its called property
// method - in object if its a function its called method

var c  = {
    name: 'The c object',
    log: function(){
        this.name = 'updated c object';
        console.log(this);
        var setname = function(newName){
            this.name = newName; // here this points to global object - how to solve it - check below
        }
        setname('Update again! the c object');
        console.log(this);
    }
}
c.log(); // inside an object this points to the object it is inside , it can be useful to acces other propertie and methods of the object
console.log('--------');
/*

{name: "updated c object", log: ƒ}
{name: "updated c object", log: ƒ}

*/

var c  = {
    name: 'The c object',
    log: function(){
        var self = this;
        self.name = 'updated c object';
        console.log(self);
        var setname = function(newName){
            self.name = newName; // here this points to global object - how to solve it - check below
        }
        setname('Update again! the c object');
        console.log(self);
    }
}
c.log();
/*
{name: "updated c object", log: ƒ}
{name: "Update again! the c object", log: ƒ}
*/

// Nolanguage is perfect it has its own quirks
// Using 'let' instead of 'var' could solve someof these problems
```
### Conceptual Aside #8 - Arrays - collections of anything

```javascript
var arr = [1,2,3];

var arr2 = [1, 
    false, 
    {
        name: 'sai',
        address: '5400 W Parmer',
    },
    function(name){
        var greeting = 'Hello';
        console.log(greeting + name);
    },
    'howdy'
];

console.log(arr2);
// how do we invoke this function? eg:
arr[3](arr[2].name); 
```

### "arguments" and spread
Remember in execution context ( creation phase) for a function
- variable environment
- this
- outer environment
- arguments - list of all values / parameters you pass to the function

```javascript

function greet(fname, lname, language='en', ...other){
    language = language || 'en'; // defaulting old style
    console.log(fname);
    console.log(lname);
    console.log(language);
    console.log(arguments);
    console.log('arg[0] ', arguments[0]); //Jhon
    console.log('--spread--', other); //  ["btech", "university", "30"]
    console.log('--------------');
    
  }
  greet();  // In JS you can also not pass anything that sets undefined for them
  greet('Jhon'); // you can skip part of params
  greet('Jhon', 'Doe');
  greet('Jhon', 'Doe', 'CS');
// with spread operator the rest will be taken in it
greet('Jhon', 'Doe', 'CS', 'btech', 'university', '30');
// In ES6 you can set default value directly in parameter
// In old style  you can do inside language = language || 'en';
// arguments is an array-like its not like a perfect array, it wont have all array properties

// Spread operator gets the arguments and creates like an array
```

### function overloading

```
function greet(fname, lname, language){
  language = language || 'en';
  if(language === 'en'){
      console.log('Hello ' + firstname + '' + lastname);
  }
  if(language === 'es'){
      console.log('Hola '+firstname+''+lastname);
  }
}

greet('John', 'Doe', 'en');
greet('John', 'Doe', 'es');
// to reduce this function overloading we can take help of separate functions
//------- we can also make separate functions in few cases---
function greetEnglish(fname, lname) {
    greet(fname, lname, 'en');
}
function  greetSpanish(fname, lname) {
    greet(fname, lname, 'es');
}

greetEnglish('John', 'Doe');
greetSpanish('John', 'Doe');
```

### Conceptual Aside #8 - Syntax Parsers
- making assumptions
- doing certain rules
- charecter by charecter
### Dangerous Aside #1 - Automatic semicolon insert
Syntax parsers in JS does something helpful, It tries to find a semicolon requirement if its missing it inserts for us
Especially incase of return this help can become dangerous
```javascript
function getPerson(){
    return
    {
        firstname: 'Sai'
    }
}

console.log(getPerson()); // you will get undefined
// This happens because of syntax parser did automatic semicolon insertion 
/*
return; // <---- observe here
    {
        firstname: 'Sai'
    }
*/
// so try not to go next line while continous blocks
function getPerson(){
    return { // sameline block start
        firstname: 'Sai'
    }; // semicoln after ending
}

```

### Framework Aside#3 - whitespace
Invisible charecters that create literal 'space' in your written code
carriage returns, tabs, spaces
```
var 
//first name of the person
fname, 
//lastname of the person
lname, 
// language can be
//en or es
language;
var person = {
    // first name
    fname: 'John',
    // lastname
    lname: 'Doe'
}
console.log(person);
```
this is perfectly valid - dont get stuck because of this
