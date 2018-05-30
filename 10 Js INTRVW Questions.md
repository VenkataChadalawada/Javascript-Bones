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
