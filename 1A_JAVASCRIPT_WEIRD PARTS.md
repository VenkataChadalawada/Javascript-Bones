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


