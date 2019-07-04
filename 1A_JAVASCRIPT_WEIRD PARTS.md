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


  
