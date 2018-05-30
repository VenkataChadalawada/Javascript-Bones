#### few quick notes:
- In JavaScript all functions are object methods.


### 1) Explain event delegation
Event delegation allows you to avoid adding event listeners to specific nodes; instead, the event listener is added to one parent.
say
``` javascript
<ul id="parent-list">
	<li id="post-1">Item 1</li>
	<li id="post-2">Item 2</li>
	<li id="post-3">Item 3</li>
	<li id="post-4">Item 4</li>
	<li id="post-5">Item 5</li>
	<li id="post-6">Item 6</li>
</ul>
```
Let's also say that something needs to happen when each child element is clicked.
You could add a separate event listener to each individual LI element, 
but what if LI elements are frequently added and removed from the list?  
So, Adding and removing event listeners would be a nightmare, especially if addition and removal code is in different places within your app.  
The better solution is to add an event listener to the parent UL element.
``` javascript
// Get the element, add a click listener...
document.getElementById("parent-list").addEventListener("click", function(e) {
	// e.target is the clicked element!
	// If it was a list item
	if(e.target && e.target.nodeName == "LI") {
		// List item found!  Output the ID!
		console.log("List item ", e.target.id.replace("post-", ""), " was clicked!");
	}
});
```

### 2)Explain how this works in JavaScript?
refers to that particular context.
global is window
local is particular object

### 3)Explain how prototypal inheritance works
A prototype is an internal object from which other objects inherit properties. Its main purpose is to allow multiple instances of an object to share a common property. 
Thus, object properties which are defined using the prototype object are inheritedby all instances which reference it
``` javascript
function Dog() {
}
Dog.prototype.bark = function() {
 console.log(‘woof!’);
};
var fido = new Dog();
fido.bark(); // ‘woof!’
```
JavaScript uses an inheritance model called “differential inheritance”. What that means is that methods aren’t copied from parent to child. 
Instead, children have an “invisible link” back to their parent object.
There’s really no such property as fido.bark. It doesn’t exist. Instead, fido has access to the bark() method on Dog.prototype because it’s an instance of Dog. 
This is the “invisible link” I mentioned. More commonly, it’s referred to as the “prototype chain”.

### 4)What do you think of AMD vs CommonJS?
AMD and CommonJS are both Javascript module loader. They accomplish the same task but works different. ... While, CommonJS, is a standard, 
mostly used in servers and it loads modules synchronously, though extra step is required if you want your JS file size to be minified 
and compressed
AMD - require js - multiple call backs asynchronous
common js - browserify - one single concatenated file- complex on browserfiy side but simple for us

###### Why do we need to use Javascript module loader?
Usually, JS files are loaded in order via script tag in HTML templates, but files and code gets complicated once an application becomes large. 
Javascript module loaders lets us separate our code into modules and include a specific module in another module. 
This lets us import what module is required and load only the necessary. 
Better Javascript file size load and better code compartmentalization, means, JS module loader mitigates away the danger of global-namespace issue.

### 5)Explain why the following doesn't work as an IIFE: function foo(){ }();. What needs to be changed to properly make it an IIFE?
iffy -  Immediately Invoked Function Expression
  It is a common Javascript design pattern used by popular JS libraries such as jQuery, Backbone.js. 
  Purpose of using an IIFE is to maintain code inside of a local scope.
     This means, to be able to use global object inside of IIFE, you will need to pass it as arguments.
As for an explanation, the following code doesn’t work as an IIFE because it is a function declaration, it does invoked immediately due to its parenthesis at the end, but there are downsides to using this approach.

function foo() {}();    - not an iify

For the above code to be considered an IIFE, 
it needs to be an anonymous function, this is because IIFE needs to be Invoked Immediately without invoking it a function name. 
We also need to wrap the anonymous function with parenthesis, so the Javascript parser treats our anonymous function 
as a function expression.
Below is the one:
``` (function() {}()); ```

### 6) What's the difference between a variable that is: null, undefined or undeclared

- undefined is a variable that has been declared but no value exists and is a type of itself 'undefined’
- null is a value of a variable and is a type of object. … 
- undeclared variables is a variable that has been declared without 'var' keyword.
###### 6a how do we handle?
 if(typeof someUndefVar == whatever) — works 
but
  if(someUndefVar) -- error 
common practice is below
value = obj.prop || defaultValue

### 7) closure
A JavaScript closure is a function that has a pointer reference to a free variable. A free variable is one that has fallen out of scope after its parent function has returned. However, if that outer function still has some reference to the free var (normally through a function that gets returned, or through a method property), the variable will not get garbage collected because it will have a non-zero reference count. Thus, from outside the function, we can still access the inner variable by means of the closure.
``` closure = function + outer context ```
Timer example to understand closure:------

``` javascript
function StopWatch(){
    var startTime =  Date.now();
    function getDelay(){
        var elapsedTime = Date.now()-startTime;
        alert(elapsedTime);
    }
    return getDelay;
}

//execution
var timer = StopWatch();
for(var i=0;i<10000;i++){
    var foo = Math.random()*10000;
}
timer();
```
##### Why closure ?---

In other words, a closure gives you access to an outer function's scope from an inner function.

### 8)Can you describe the main difference between a forEach loop and a .map() loop and why you would pick one versus the other?
forEach() — executes a provided function once for each array element.
map() — creates a new array with the results of calling a provided function on every element in the calling array.
``` javascript 
var squared = [1,2,3,4].map(function(num){
  return Math.pow(num,2);
});

console.log(squared); // 1,4, 9, 16
```
### 9)What's a typical use case for anonymous functions?
 I would say that the most typical use for anonymous functions in JS is to pass them as arguments to other functions. Take the setTimeout function for example:
``` javascript 
//eg1
setTimeout(function() {
  alert('hello');
}, 1000);

//eg2
var numbers = [2,4,6];
var numers_half = numbers.map(function(item) {
 return item / 2;
});
```
### 10)How do you organize your code? (module pattern, classical inheritance?)
###### Modular
Modular pattern imitates the classes in conventional software engineering and it mainly focuses on the public and private access to methods & variables. The module pattern goals are to reduce the use of globally scoped variables, so as to decreasing the chances of conflicting with other code throughout an application.
This is also regarded as the most commonly used design pattern and it is also widely accepted in a number of large projects such as jQuery, Dojo, ExtJS and YUI.
Advantages
• Organized and clean approach for developers
• We can encapsulate data.
• More clean code in the global namespace(avoiding conflicts).
Disadvantages
• We cannot access private methods
• We can extend Private methods and functions.
###### The classical inheritance
 It is in a way is similar to the inheritancein Java or C. Those who have backgrounds in those programming languages must be familiar. So by using classical inheritance, we are recreating the basic programming language’s behavior i.e. using classes and objects, which are instances of those classes.

So a classical pattern is used together with the“prototype”keyword added to the constructor and the newoperator.
1. Call a constructor function.
2. Have a child’s prototype point to the parent’s prototype.

### 11) What's the difference between host objects and native objects?
native object

object in an ECMAScript implementation whose semantics are fully defined by this specification rather than by the host environment.

NOTE Standard native objects are defined in this specification. Some native objects are built-in; others may be constructed during the course of execution of an ECMAScript program.
host object

object supplied by the host environment to complete the execution environment of ECMAScript.

NOTE Any object that is not native is a host object.
examples:
Native objects: Object (constructor), Date, Math, parseInt, eval, string methods like indexOfand replace, array methods, ...

Host objects (assuming browser environment): window, document, location, history, XMLHttpRequest, setTimeout, getElementsByTagName, querySelectorAll, …

### 12) Difference between: function Person(){}, var person = Person(), and var person = new Person()?
1. function Person() {} 
Declares a function (but does not execute it).
It will usually have some code between the curly brackets.

2. var person = Person()
Declares a variable (person), invokes a function (Person) and sets the value of person to the return of the function.

3. var person = new Person()
Creates a new instance of an object based on the Person function. So the variable (person) is now an Object, not just a string or a number.

### 13) What's the difference between .call and .apply?
call - With call(), an object can use a method belonging to another object.
``` javascript
var person = {
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
}
var person1 = {
    firstName:"John",
    lastName: "Doe",
}
var person2 = {
    firstName:"Mary",
    lastName: "Doe",
}
person.fullName.call(person1);  // Will return "John Doe"
// call with params
var person = {
    fullName: function(city, country) {
        return this.firstName + " " + this.lastName + "," + city + "," + country;
    }
}
var person1 = {
    firstName:"John",
    lastName: "Doe",
}
person.fullName.call(person1, "Oslo", "Norway");
```
apply is very similar to call(), except for the type of arguments it supports. You use an arguments array instead of a list of arguments (parameters). 
``` javascript
var person = {
    fullName: function(city, country) {
        return this.firstName + " " + this.lastName + "," + city + "," + country;
    }
}
var person1 = {
    firstName:"John",
    lastName: "Doe",
}
person.fullName.apply(person1, ["Oslo", "Norway"]);
```

### 14) Explain Function.prototype.bind ?
Here is sample code in which one could be forgiven for caching the context to a variable:
``` javascript

var myObj = {

    specialFunction: function () {

    },

    anotherSpecialFunction: function () {

    },

    getAsyncData: function (cb) {
        cb();
    },

    render: function () {
        var that = this;
        this.getAsyncData(function () {
            that.specialFunction();
            that.anotherSpecialFunction();
        });
    }
};

myObj.render();
```
If we had left our function calls as this.specialFunction(), then we would have received the following error:

``` 
Uncaught TypeError: Object [object global] has no method 'specialFunction'
```
We need to keep the context of the myObj object referenced for when the callback function is called. Calling that.specialFunction() enables us to maintain that context and correctly execute our function. However, this could be neatened somewhat by using Function.prototype.bind().

``` javascript
render: function () {
    this.getAsyncData(function () {
        this.specialFunction();
        this.anotherSpecialFunction();
    }.bind(this));
}
```
WHAT DID WE JUST DO?
Well, .bind() simply creates a new function that, when called, has its this keyword set to the provided value. So, we pass our desired context, this (which is myObj), into the .bind() function. Then, when the callback function is executed, this references myObj.

If you’re interested to see what Function.prototype.bind() might look like and what its doing internally, here is a very simple example:

``` javascript
Function.prototype.bind = function (scope) {
    var fn = this;
    return function () {
        return fn.apply(scope);
    };
}
```
Another ex to understand bind
``` javascript
var foo = {
    x: 3
}

var bar = function(){
    console.log(this.x);
}

bar(); // undefined

var boundFunc = bar.bind(foo);

boundFunc(); // 3
```

### 15) What's the difference between feature detection, feature inference, and using the UA (User Agent)string?
eg
- Feature detection checks a feature for existence, e.g.:
```
if (window.XMLHttpRequest) {
    new XMLHttpRequest();
}
```
- Feature inference checks for a feature just like feature detection, but uses another function because it assumes it will also exist, e.g.:
```
if (document.getElementsByTagName) {
    element = document.getElementById(id);
}
```

Checking the UA string is an old practice and should not be used anymore. You keep changing the UA checks and never benefit from newly implemented features, e.g.:
```
if (navigator.userAgent.indexOf("MSIE 7") > -1){
    //do something
}
```
### 16)Explain Ajax in as much detail as possible.
 AJAX, as in its acronym states, is Asynchronous in nature. This means, it can receive data through user interaction or automation event without the need to refresh the page, thus, updating and reloading certain portion of the page. There are manyways we can implement AJAX
 

The best use of AJAX is where it is used to send small payloads. Here is a simple example.

I load a page that contains information about stock. It has graphs, charts, company information and it also displays the share-price. Every 30 seconds, I make an AJAX request that gets the updated share-price and changes it on the page.

Without AJAX, I might decide to refresh the entire page every 30 seconds, but with AJAX, I can just make a lightweight request to get the tiny bit of information I need.
Disadvantage-
When using AJAX, you need to handle the task of telling the user if something has gone wrong. 
Other issues to watch out for are any JavaScript errors that may prevent your events from firing - or if JavaScript is disabled, in either case ensuring that the form can submit normally before you add the AJAX code is the safest option.

### 17) Explain how JSONP works (and how it's not really Ajax).

JSONP's callback is not an actual callback. Rather, JSONP works by script injection. E.g., if you want to make a JSONP call, you insert this script element into the DOM:

<script src="http://example.com/ajaxendpoint?jsonp=parseResponse"></script>
The server's response will be something like this:

parseResponse({"json":"value"});

### 18) Have you ever used JavaScript templating?
you can use templates, which cleans up your code hugely. 

mustache
underscore
handlebars
dust
jade

### 19) Explain "hoisting"?
In JavaScript, a variable can be declared after it has been used.

In other words; a variable can be used before it has been declared.

Example 1 gives the same result as Example 2:
```
//eg-1
x = 5; // Assign 5 to x

elem = document.getElementById("demo"); // Find an element 
elem.innerHTML = x;                     // Display x in the element

var x; // Declare x
```

```
//eg-2
var x; // Declare x
x = 5; // Assign 5 to x

elem = document.getElementById("demo"); // Find an element 
elem.innerHTML = x;   
```
To understand this, you have to understand the term "hoisting".

Hoisting is JavaScript's default behavior of moving all declarations to the top of the current scope (to the top of the current script or the current function).

- JavaScript only hoists declarations, not initializations.
### 20) Describe event bubbling.
Event bubbling occurs when a user interacts with a nested element and the event propagates up (“bubbles”) through all of the ancestor elements.
``` html
<div class="ancestor">
  <div class="parent">
    <button> Click me! </button>
  </div>
</div>
```
``` javascript
$( "button" ).click(function(event) {
  console.log( "button was clicked!" );
});

$( ".parent" ).click(function(event) {
  console.log( "child element was clicked!" );
});

$( ".ancestor" ).click(function(event) {
  console.log( "descendant element was clicked!" );
});
```
When the user clicks the button the events starts at the button element, so button was clicked! is logged to the console. Then child element was clicked! and finally descendant element was clicked! are logged as well.
Stopping event bubbling

What if you don’t want the event to bubble up?
 event.stopPropagation(); // <-- this line here!
``` javascript
$( "button" ).click(function(event) {
  event.stopPropagation(); // <-- this line here!
  console.log( "button was clicked!" );
});

$( ".parent, .ancestor" ).click(function(event) {
  console.log( "don't click me!" );
});
```
### 21) What's the difference between an "attribute" and a "property"?
In general terms (and in normal English usage) the terms mean the same thing.

In the specific context of HTML / Javascript the terms get confused because the HTML representation of a DOM element has attributes (that being the term used in XML for the key/value pairs contained within a tag) but when represented as a JavaScript object those attributes appear as object properties.

To further confuse things, changes to the properties will typically update the attributes.

For example, changing the element.href property will update the href attribute on the element, and that'll be reflected in a call to element.getAttribute('href').

However if you subsequently read that property, it will have been normalised to an absolute URL, even though the attribute might be a relative URL!

### 22)Why is extending built-in JavaScript objects not a good idea?
When you extend an object, you change its behaviour.

Changing the behaviour of an object that will only be used by your own code is fine. But when you change the behaviour of something that is also used by other code there is a risk you will break that other code.
When it comes adding methods to the object and array classes in javascript, the risk of breaking something is very high, due to how javascript works
f you need custom behaviour, it is far better to define your own class (perhaps a subclass) instead of changing a native one. That way you will not break anything at all.

The ability to change how a class works without subclassing it is an important feature of any good programming language, but it is one that must be used rarely and with caution.

### 23)Difference between document load event and document DOMContentLoaded event?
The DOMContentLoaded event is fired when the document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading 
(the load event can be used to detect a fully-loaded page).

### 24)What is the difference between == and ===?
js has  JavaScript has both strict and type-converting equality 
=== type check

### 25) Explain the same-origin policy with regards to JavaScript.
 The same-origin policy helps prevent malicious attacks by stopping code from another site executing on your site. An attacks like this is known as a Cross Site Scripting 
 
### 26) duplicate([1,2,3,4,5]); make this work 

### 27) Why is it called a Ternary operator, what does the word "Ternary" indicate?
“Ternary” means operands with three(n-ary) param. This is a one-line shorthand for an if-then statement.
### 28) What is "use strict";? what are the advantages and disadvantages to using it?
Strict mode helps out in a couple ways:

It catches some common coding bloopers, throwing exceptions.
It prevents, or throws errors, when relatively "unsafe" actions are taken (such as gaining access to the global object).
It disables features that are confusing or poorly thought out.
- disadv
 but some developers don’t like the constraint and want to use all the features of the language.
 
### 29)Create a for loop that iterates up to 100 while outputting "fizz" at multiples of 3, "buzz" at multiples of 5 and "fizzbuzz" at multiples of 3 and 5

### 30)Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?
It’s harder to read the code and reason about it when variables seem to appear out of thin air (but really from the global scope).
Anyone can update a global variable from any point in the program at any time (and from any thread if there’s more than one going).
General code smell - if you're too lazy to put the variable only where it needs to be then what other corners are you cutting?
It’s probable that you'll encounter global variable name clashes. Since there’s only one namespace you're more likely to double up on a variable name.
