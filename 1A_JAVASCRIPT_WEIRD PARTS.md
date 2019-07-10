# Javascript - Understanding, Weird parts

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

"this" will be pointing at different thing depending on how function is invoked
when you create a function this still points to global this object


```javascript
console.log(this); // window - in global execution context of browser

function a() {
    console.log(this); // it will also point to global
    this.newvariable = 'hello'; // you are actually assigng this in global this
}
a();

var b = function() {
    console.log(this); // still window
}

a(); //window
console.log(newvariable); // 'hello'
b(); //window
// They all pointing at the same window at same address

console.log('-------');

// What about methods inside an object? - can we still want this to be window? No when JS sees the function is inside an object it sets 'this' to the parent object.
// property - in  object if its primitve its called property
// method - in object if its a function its called method

var c = {
  name: 'The c object',
  log: function(){
     console.log(this); // this is 'c' object here 
     console.log(this.name); // The c object'
   }
}

// However say you have another same name variable inside that very function inside c object then in this case you may want that to be that functions own variable rather than C object's variable?
// Also say if a method has inner function inside , in that fiunction this becomes global value of this (window)

var c  = {
    name: 'The c object',
    log: function(){
        this.name = 'updated c object';
        console.log(this); // this here points to 'c' object
        var setname = function(newName){
            this.name = newName; // here this points to global object so in this case it creates a glbal name to window and sets this newName - its a bug in JS - how to solve it - check below
        }
        setname('Update again! the c object'); // updates global this (window)
        console.log(this); // still this contains " updated c " but not "Update again! the c object"
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

### Immediately Invoked Function Expression

```javascript
//function statement
function greet(name){
    console.log('hello '+name);
}
greet('sai');

//using a function expression
var greetFunc = function(name){
    console.log('hello '+name);
}
greetFunc('sai');

// using an Immediately Invoked Function Expression
var greeting = function(name){
    console.log('hello '+name);
}('sai');
console.log(greeting);

3; //valid JS expression

"im a string"; //valid JS expression

{ name: 'sai' }; //valid JS expression

function(name){
    console.log('hello '+name);
}; // Error - this is a function statement not an expression , so syntax parser throws error

(function(name){
    console.log('hello '+name);
}); // No error - valid function expression syntax using parenthisis


(function(name){
    var greeting = 'hello'
    console.log(greeting+' '+name);
}('sai')); // Immediately Invoked Function Expression - valid syntax using parenthisis

// we can also provide parenthesis outside
(function(name){
    var greeting = 'hello'
    console.log(greeting+' '+name);
})('sai'); // Immediately Invoked Function Expression - valid syntax using parenthisis
```

### Framework aside #4 -
```javascript
(function(name){
    var greeting = 'hello'
    console.log(greeting+' '+name);
}('sai')); // Immediately Invoked Function Expression - valid syntax using parenthisis
```
Global execution context 
It created function in memory anonymous 
new execution context will be created
in execution phase 'sai' goes into the 
```javascript
var greeting = 'Hola';
(function(name){
    var greeting = 'hello'
    console.log(greeting+' '+name);
}('sai')); 
```
Most of libraries do this way to reduce collisons
say if we want global obj
```javascript
(function(global, name){
    var greeting = 'hello';
    global.greeting = 'Hello';
    console.log(greeting+' '+name);
}(window, 'sai')); 
console.log(greeting);
```
### Understanding Closures
```javascript
function greet(whattosay){
    return function(name){
        console.log(whattosay+' '+name);
    }
}
greet('hi')('sai'); // hi sai


function greet(whattosay){
    return function(name){
        console.log(whattosay+' '+name);
    }
}
var sayhi = greet('hi'); 

sayhi('sai'); // hi sai
```
how does sayhi knows about whattosay ?

when execution context is popped off normally JS does garbage Collection clears off the memory space used by it 

when sayhi execution context comes in  it gets name but what about 'whattosay' ?? how will it get it?
closing in all variables that it suppose to have access to is called closure 

closures are simply a feature of JS engine, it ensures the functions get access to whatever they are supposed to get it


### Understanding Closures - 2
sometimes closures give unexpected results. possible solution is using IIFE in those situations
```
function buildFunctions(){
    var arr = [];
    for(var i=0;i<3;i++){
        arr.push(function(){
            console.log(i); // when this function executes it looks for 'i'
        }); // arrays are collections of anything
    }
    return arr;
}

var fs = buildFunctions();
fs[0]();
fs[1]();
fs[2]();
// you may expect 0,1,2
//but u get 3 3 3 because of closure accessing i which has been changed to 3
```
how does execution stack looks like?
well, first global execution context it has
- buildFunction
- fs variable
when buildFunction executes it has execution context
- i 3
- arr [f0,f1,f2]
whe it hit return arr above two values will be there in execution context and it will be popped off from stack but those i and arr will stay in memory
now next line fs[0]() executes, its execution context will be created , it doesnt have i - so it goes to its outer scope and checks inmemory which has i as 3 and arr has [f0,f1,f2]
similarly for fs[1]() and fs[2]() - they all point to same memory spot.

##### With ES6- Let it creates block scope
```javascript
function buildFunctions(){
    var arr = [];
    for(var i=0;i<3;i++){
        let j = i;
        arr.push(function(){
            console.log(j);
        })
    }
    return arr;
}

var fs = buildFunctions();
fs[0]();
fs[1]();
fs[2]();

```
this time you will get 0,1,2 as expected - because it will be segmented so that it will created 3 different memory spots (subsegments)

##### with out let
what we need is a separate execution context for that function - the only way to get the execution context is with a function, how can we get that onfly - IIFE
```javascript
function buildFunctions(){
    var arr = [];
    for(var i=0;i<3;i++){
        let j = i;
        arr.push(
         (function(j){
             return function(){
                console.log(j);
             }
        })(i)
        );
    }
    return arr;
}

var fs = buildFunctions();
fs[0]();
fs[1]();
fs[2]();
// 3 j's will be created refering to three diff exe cut contexts
```   
### FrameworkAside #5 - using closures creating factory functions

```javascript
function makeGreeting(language){
    return function(fname, lname){
        if(language === 'en'){
            console.log('hello '+fname+' '+lname);
        }
        if(language === 'es'){
            console.log('hola '+fname+' '+lname);
        }
    }
}

var greetEnglish = makeGreeting('en');
var greetSpansih = makeGreeting('es');

greetEnglish('John', 'Doe');
greetSpansih('John', 'Doe');
```

greetEnglish is a closure function whose language points to greetEnglish
greetSpansih is a closure function whose language points to greetSpansih

makeGreeting acted like a factory function


In the beginning, we will have global execution context which has
- greetEnglish
- greetSpanish
- makeGreeting()
makeGreeting('en') gets executed and gets context which has
- language 'en'
and pops off which leaves language en in memory
when we see greetEnglish gets a closure of fname, lname of its and and its outer scope points to language 'en w
similary greetSpanish

### Closures and Callbacks 
setTimeout, jQuery events everythings uses these
```javascript
function sayHiLater(){
    var greeting = 'Hi';
    setTimeout(function(){
        console.log(greeting);
    }, 3000);

    // it drops an event after time out 

    sayHiLater(); // it still has reference to greeting 'hi'
}
```
callback function :
a function you give to another function to be 
run when the other function is finished
so the function you call , 'callsback' by calling the function you gave it when it finishes.

```javascript
function tellmewhendone(cb){
    var a = 1000;
    var b = 2000;
    callback();
}
tellmewhendone(function(){
    console.log('im done');
});
```
### Call Apply Bind
Function is a special kind of object, it has
- name property
- code property can be invokable with ()
in addition to it, they can also get access to some special methods
- call, apply, bind methods

```javascript
var person = {
    fname: 'John',
    lname: 'Doe',
    getFullName: function(){
        var fullname  = this.fname+ ' '+this.lname;
        return fullname;
    }
}

var logname = function(lang1, lang2){
    console.log('logged:' + this.getFullName());
    console.log('Arguments:'+lang1+' '+lang2);
    console.log('----------------');
}

var logpersonName = logname.bind(person);
// bind creates a new copy of that function
logpersonName('en');


logname.call(person, 'en', 'es');
//unlike bind call & apply actually executes the function

logname.apply(person, ['en', 'es']);
// apply takes paramns in arrY

//WE CAN also does this on fly tricking syntaxparser 

(function(lang1, lang2){
    console.log('logged:' + this.getFullName());
    console.log('Arguments:'+lang1+' '+lang2);
    console.log('--------**--------');
}
).apply(person, ['es', 'en']);

```

how do we use them in real life instances?
###### 1) function borrowing

```javascript
var person = {
    fname: 'John',
    lname: 'Doe',
    getFullName: function(){
        var fullname  = this.fname+ ' '+this.lname;
        return fullname;
    }
}
// function borrowing
var person2 = {
    fname: 'sai',
    lname: 'chad',
}
console.log(person.getFullName.apply(person2));
```
o/p
```
sai chad
```
##### 2 function currying - bind usecase
creating a copy of a function but with some preset parameters - very useful in mathematical situations etc..
```javascript
// function currying
function multiply(a,b){
    return a*b;
}

var multipleByTwo = multiply.bind(this, 2); // this now permanantly sets first parameter is always 2
console.log(multipleByTwo(4)); //this will end up as second param

var multipleByTwo2 = multiply.bind(this, 2, 3); // this now permanantly sets both parameters as 2 and 3
console.log(multipleByTwo2(4)); //even if we pass another param it wont affect

/*
o/p
8 
6
*/
```

### FUNCTIONAL PROGRAMMING
having the capability like first class functions
function prog eg - lisp, schema or ml
```javascript
var arr1 = [1,2,3];
console.log(arr1);
// create arr doubles
var arr2 = [];
for(var i=0;i<arr1.length;i++){
    arr2.push(arr1[i]);
}


//  JS way - func prog

function mapforEach(arr, fn){
    var newArr = [];
    for(var i=0;i<arr1.length;i++){
        newArr.push(
            fn(arr[i])
        );
    }
    return newArr;
}

var arr1 = [1,2,3];
console.log(arr1);
var arr2 = mapforEach(arr1, function(item){
    return item*2;
});
console.log(arr2);
// say I can do something diff rather than multiply on it
var arr3 = mapforEach(arr1, function(item){
    return item > 2;
});
console.log(arr3);

var checkPastlimit = function(limiter, item){
    return item>limiter;
}
var arr4 = mapforEach(arr1, checkPastlimit.bind(this, 1));
console.log(arr4);
// now we cemented limiter to 1 using bind - own copy with limit as 1

function doIt(fn, limiter){
    return fn.bind(this, limiter);
}
var arr5 = mapforEach(arr1, doIt(checkPastlimit, 1));
console.log(arr5);

/*
(3) [1, 2, 3]
app.js:23 (3) [1, 2, 3]
app.js:27 (3) [2, 4, 6]
app.js:32 (3) [false, false, true]
app.js:38 (3) [false, true, true]
app.js:52 (3) [false, true, true]
*/
```

// Mutation vs Immutation
sometimes either we mutate overall or dont mutate at all

underscore.js - has good opensource info - go through it

### Object Oriented JS and Prototypal Inheritance
creation of objects
#### conceptual aside - classical vs prototypical
Inheritance:
One object gets access to the properties and methods of another object.

classical inheritance - there in c#, java
Verbose
massive trees - once it becomes so large - lot of keywords friend, protected, private, interface
prototypal inheritance
flexible, extensible, easy to understand (not saying its perfect than other )

#### understanding the prototype:
say we have object in memory obj it has prop(prop1) & method
we can access with `obj.prop1`

JS engine adds some hidden properties & methods,
all objects have proto{} property
a property simply a reference to another object thats prototype
say if proto has prop2 and we call obj.prop2, when we dont have in actual object it goes and checks in proto properties
it can be nested it can go proto of proto to find that property.
This is called "Prototype Chain". Its hidden for the user JS engine does that search

Objects can share the proto's too.

```javascript
var person = {
    fname: 'Default',
    lname: 'Default',
    getFullName: function(){
        return this.fname+' '+this.lname;
    }
}

var john = {
    fname: 'John',
    lname: 'Doe',
}

//Dont do this ever only for understanding proto
john.__proto__ = person; // john now inherits the person
console.log(john.getFullName());
console.log(john.fname); // it prints 'John' but not 'Default'

var jane = {
    fname: 'Jane',
}

jane.__proto__ = person;
console.log(jane.getFullName());
console.log(jane.fname);
/*

John Doe
app.js:17 John
app.js:24 Jane Default
app.js:25 Jane

*/
```

### Everything is an Object(or a primitive)

```javascript
var a = {};
var b = function(){};
var c = [];

a.__proto__
b.__proto__
c.__proto__

// they all have __proto__
```

### Reflection and Extend
##### Reflection
An object can look at itself listing and changing its properties and methods

```javascript
var person = {
    fname: 'Default',
    lname: 'Default',
    getFullName: function(){
        return this.fname+' '+this.lname;
    }
}

var john = {
    fname: 'John',
    lname: 'Doe',
}
john.__proto__ = person;

// Reflection
for(var prop in john) {
    if(john.hasOwnProperty(prop)){
        console.log('only---',prop + ': '+ john[prop]);
    }
    console.log('all----',prop + ': '+ john[prop]);
}

var jane = {
    address: '111 Main St.',
    getFormalname: function(){
        return this.lname + ','+ this.fname;
    }
}

var jim = {
    getFirstName: function(){
        return fname;
    }
}

// may be we dont want them in the prototype chain

// underscore extend - assuming we have attached underscore.js library as well

_.extend(john, jane, jim);

console.log(john);
```

### Function constructors & keyword new

Function constructor: 
when a normal function that is used to construct objects.Function
the 'This' variable points a new empty object, and that object is returned from the function automatically

  
```javascript
function Person(){
    console.log(this);
    this.fname = 'John';
    this.lname = 'Doe';
    console.log('this func is invoked');
}
  
var john = new Person();
console.log(john);

// here we created a 
// new is an operator -> It invokes the function 
// 

var jane = new Person();
console.log(jane);

function Person2(fname, lname){
    console.log(this);
    this.fname = fname;
    this.lname = lname;
    console.log('this func is invoked');
}

var tim = new Person2('Tim', 'Vin');
console.log(tim);
```

### Function constructors and Prototype

when we use function constructor , Proto is already set for us
``` john.__proto__ ```
every function in JS has prototype
as soon as we use new operator on a function then it will be used 
prototype property of the function is where the prototype chain points to 
eg:
John points to prototype property of Person
```var john = new Person();```

when we call new keyword it sets the empty object of the function you applied on to new

we can also add functions later too

Q) Why prototypes?
remember functions are objects in JS, they take up memory space, if you have 1000 such objects they take such many memory spaces, instead if we keep it in prototype it just takes 1 space.
```javascript
function Person(){
    console.log(this);
    this.fname = 'John';
    this.lname = 'Doe';
    console.log('this func is invoked');
}
var john = new Person();
console.log(john);

// here we created a 
// new is an operator -> It invokes the function 
var jane = new Person();
console.log(jane);

function Person2(fname, lname){
    console.log(this);
    this.fname = fname;
    this.lname = lname;
    console.log('this func is invoked');
}
var tim = new Person2('Tim', 'Vin');
console.log(tim);


console.log(john.__proto__);
Person.prototype.getFullName = function(){
    return this.fname+' '+ this.lname;
}
console.log("=====", john.getFullName());

/* O/P
Person {}
app.js:5 this func is invoked
app.js:8 Person {fname: "John", lname: "Doe"}
app.js:2 Person {}
app.js:5 this func is invoked
app.js:13 Person {fname: "John", lname: "Doe"}
app.js:16 Person2 {}
app.js:19 this func is invoked
app.js:22 Person2 {fname: "Tim", lname: "Vin"}
app.js:25 {constructor: ƒ}
app.js:29 ===== John Doe
*/
```

### Dangerous Aside:
if we forgot to ass new keyword. it returns undefined as a regular function and  everything will fail

### Conceptual Aside - Built in Function constructors
var a = new Number("3")
a
Number.prototype => you will see bunch of things
```javascript
var a = new String("John");
String.prototype.indexOf('o')
String.prototype.indexOf("Jo");
a.indexOf("o");
````
`"John".length`   same as `new String("John")`

```javascript
String.prototype.isLengthGreaterThan = function(limit){
  return this.length > limit;
}

console.log("John".isLengthGreaterThan(3));
   
// Now all Strings get that method inside them

Number.prototype.isPositive = function(){
  return this>0;
}
3.isPositive() // Error -> because by default it wont convert a number into object automatically, It did for string 
var a = new Number(3); // It can become this way
a.isPositive() // true
```
### Dangerous Aside - Built in Function constructors

```
var a = 3;
var b = new Number(3);
console.log(a == b) // true
console.log(a === b) // false -> because once we do new Number , the number gets converted into an object of Number prototype

// if we are dealing with Dates
//moment.js -> helps out dealing with Dates instead of built in JS Date Constructor

var c = Number("3")
console.log(c === a);

/*
true
app.js:4 false
app.js:10 true
*/


```
### Dangerous Aside# Arrays for..in
```
// Arrays are objects
Array.prototype.myCustomFeature = 'cool!';

var arr = ['John', 'Jane', 'Jim'];

for(var prop in arr){
    console.log(prop+':'+arr[prop]);
}
/*
0:John
1:Jane
2:Jim
*/

// Now after adding mycustomfeature in beginning
/*
0:John
1:Jane
2:Jim
myCustomFeature:cool!
*/

// So in case of array use the standard for loop, than for..in loop -> because arrays are objects and you can iterate down into their prototype
```
### Object.create and Pure Prototypal Inheritance

```javascript
// Polyfill:
// code that adds a feature whcih the engine may lack because of older and newer JS engines
// few older browsers might have missed Object.create
// polyfill for object.create
if(!Object.create){
    Object.create = function(o){
        if(arguments.length > 1){
            throw new Error('Object.create implementation'+'only accepts the first parameter');
        }
        function F(){}
        F.prototype = o;
        return new F();
    }
}



var person = {
    fname: 'Default',
    lname: 'Default',
    greet: function(){
        return 'Hi' + this.fname; // if we dont use this , it looks for its execution context , if not there it goes out and look for as objects dont have the execution context it beocmes window
    }
}
//created object using Object literal notation above

var john = Object.create(person); // creates empty object with __proto__ pointing to the prototype of person
console.log(john.fname);
john.fname = 'John'; // we can have its own
john.lname = 'Doe';
console.log(john);

// This is Pure prototypal inheritance
```

### ES6 and classes
```javascript
class Person {
    constructor(fname, lname){
        this.fname = fname;
        this.lname = lname;
    }
    greet(){
        return 'Hi'+fname;
    }
}

var john = new Person('John', 'Doe');

// how do we set the prototype in ES6 style, extends sets the Prototype
class InformalPerson extends Person{
    constructor(fname, lname){
        super(fname, lname); // calls the constructor of the parent object
    }
    greet(){
        return 'Yo'+fname;
    }
}

// Syntactic Sugar:
/*
A different way to type something that doesn't change how it works under the hood
*/

```

### Odds & Ends
#### typeof, instanceof and figiuring out what something is?

```javascript
var a = 3;
console.log(typeof a); // number

var b = "Hello";
console.log(typeof b); // string

var c = {};
console.log(typeof c); // object

var d = {};
console.log(typeof d); // object // - weird?
console.log(Object.prototype.toString.call(d)); // [object Array] //- better

function Person(name){
    this.name = name;
}
var e = new Person('Jane');
console.log(typeof e); // object
console.log(e instanceof Person); // if any of that __proto__ chain is Person

console.log(typeof undefined); // makes sense
console.log(typeof null); // object -> its a bug since , like , forever ...

var z = function(){};

console.log(typeof z); // function
```

