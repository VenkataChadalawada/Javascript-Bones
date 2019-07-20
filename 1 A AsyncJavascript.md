# Async Javascript
## 1. Call Backs

``` javascript
function callback(){
  console.log('hi im a callback function');
}

function higherorderfunction(fn){
  console.log('about to call callback function');
  fn();
  console.log('after callback function');
}

higherorderfunction(callback);

```
output:
```
> about to call callback function
hi im a callback function
after callback function
```
#### why callbacks?
- Advance array methods use callbacks
- Browser events use callbacks
- Ajax requests

- code cleanup optimization - exmple 1
``` javascript
function sendMessageA(message){
  console.log(message);
}

function sendMessageB(message){
  alert(message);
}

function sendMessageConfirm(message){
  return confirm(message);
}

sendMessageA("duplicates");

//can be refactored using callback as below:

function sendMessage(message, callback){
  return callback(message);
}

sendMessage("duplicates", console.log);
sendMessage("message for alert", alert);
var result = sendMessage("Are you sure?", confirm);

```
- example 2
```javascript
function greet(name, formatter){
  return "hello "+formatter(name);
}

function upperCaseName(name){
  return name.toUpperCase();
}

console.log(greet("Venky", upperCaseName));
```

## 2. callStacks & heaps
A stack is ordered set of stack frames. most recently invoked function is on top of the stack. Bottom of the stack is the first function that initiated. Stack will be processed from top to bottom

Heap is the area in memory where your data is stored

## 3. setTimeout
A function that asynchronously invokes a callback after a delay in milliseconds
` setTimeout(callback, millisecs); `

```javascript
function callback(){
  console.log('hi--im callback--');
}
console.log('--it started running--');
setTimeout(callback, 2000);
console.log('--it runs this irrespective of that completes--');
```
output
``` 
--it started running--
--it runs this irrespective of that completes--
// after 2 secs
hi--im callback--
```
we have also clearTimeout when we needed it in some cases

```javascript
var timerId = setTimeout(function(){
  console.log('----i will print after 5 seconds');
}, 5000);
console.log('---',timerId);

setTimeout(function(){
  console.log('cancelling first timer as we decided not needed');
  clearTimeout(timerId);
}, 2000);

// Doesn't matter even if you declare it or just runs it. It gives you same output
/*
var b = setTimeout(function(){
  console.log('cancelling first timer as we decided not needed');
  clearTimeout(timerId);
}, 2000);
*/
```
output
```
--- Timeout 41
cancelling first timer as we decided not needed
```
### 4. setInterval
A function that continuously invokes a callback function after every X milliseconds where X is provided to setInterval

```javascript
function callback(){
  console.log('-----hi im venky---');
}

var repeat = 1000;

setInterval(callback, repeat);
// also doesnt matter whether we assign it or not it executes. below gives same result too.
// var someid = setInterval(callback, repeat);
```
output
```
// It never stops and keep printing output
-----hi im venky---
-----hi im venky---
-----hi im venky---
-----hi im venky---
-----hi im venky---
-----hi im venky---
....
....
....
```
### 4.1 clearInterval with a counter

```javascript
var c = 0;
function callback(){
  c+=1;
  console.log('-----hi im venky---');
  if(c===10){
    clearInterval(id);
  }
}

var repeat = 2000;

var id = setInterval(callback, repeat);
console.log(id);
```
output
```
-----hi im venky---
-----hi im venky---
-----hi im venky---
-----hi im venky---
-----hi im venky---
-----hi im venky---
-----hi im venky---
-----hi im venky---
-----hi im venky---
-----hi im venky---
```
### 4.2 clearInterval with a time tracker

```javascript
var time = 0;
var repeat = 2000;
function callback(){
  time = time+repeat
  console.log('-----hi im venky---');
  if(time===10000){
    clearInterval(id);
  }
}

var id = setInterval(callback, repeat);
console.log(id);
```
output
```
// It stoper after 10 seconds - which automatically leads to printing 5 times as it executes every two seconds
-----hi im venky---
-----hi im venky---
-----hi im venky---
-----hi im venky---
-----hi im venky---
```
##### Example
Implement a function called countDown that accepts a time in seconds. The function will print the time remain to the console every second. Instead of printing 0, the function should print "Ring Ring Ring!!!".
```javascript

function countDown(time){
  var curTime = 0;
  var id = setInterval(function(){
    curTime=curTime+1000;
    if(curTime === time){
      console.log('---Ring Ring Ring---');
      clearInterval(id);
    } else{
    console.log('--time remaining---', time-curTime);
    }
  }, 1000);
}
countDown(10000);
```
### 5 Event Loop & Queue
Queue - An ordered list of functions waiting to be placed into the stack in FIFO basis
Event loop - a piece of functionality in the javascript run time checks the Queue when the stack is empty, if the stack is empty the front of the queue is placed in the stack.

Best way to understand is with an example

```javascript
function factorial(n){
  if(n===0 || n===1){
    return 1;
  }
  return n*factorial(n-1);
}

setTimeout(function(){
  console.log('---only appears after stack is empty & event loops gets this out of queue onto the stack---');
}, 0);


console.log(factorial(10));
```
output:-
It prints after executing all the callbacks , the reason is first setTimeout comes to stack and places its function in Queue event loop only will bring the function from Queue only after stack is empty. 

```
3628800
---only appears after stack is empty & event loops gets this out of queue onto the stack---
```
##### Javascript single threaded
code execution in javascript is linear, code that is running cannot be interrupted by something else going on in the program
`if you wanted to loop - use setTimeout as setInterval is already a loop by itself`

### 6 Promises

```javascript
var p1 = new Promise(function(resolve, reject){
  resolve([1,2,3,4]);
});

p1.then(function(arr){
  console.log('promise p1 resolved--', arr);
});
```
Output

```
promise p1 resolved-- [ 1, 2, 3, 4 ]
```

Also we can handle rejects too

```javascript
var p1 = new Promise(function(resolve, reject){
  var a = Math.random();
  if(a<0.5){
    resolve(a);
  } else {
    reject(a)
  }
  
});

p1.then(function(res){
  console.log('promise p1 resolved--', res);
}).catch(function(err){
  console.log('error is ----', err);
});
```

### 6.1 Handling Async code with Promises
With promises we can control and execute things asynchronously

```javascript
var p1 = new Promise(function(resolve, reject){
  setTimeout(function(){
    var randInt = Math.floor(Math.random() * 10);
    resolve(randInt);
  }, 4000);
});

p1.then(function(res){
  console.log('promise p1 resolved--', res);
}).catch(function(err){
  console.log('error is ----', err);
});
```
output
// after 4 seconds promise's setTimeout finshes and gets into call stack when stack is empty , it executes resolve that actually resolves the "then" function and  brings out the output
```
promise p1 resolved-- 8
```

### 6.2 Promise chaining

##### Disadvantages of callbacks - nested callbacks / callback chain hell
```javascript
// nested call backs
// code is hard to read - hard to reason the logic - code is not modular - code duplication

var counter = 0;
setTimeout(function(){
  counter++;
  console.log("Counter:", counter);
  setTimeout(function(){
    counter++;
    console.log("Counter:", counter);
    setTimeout(function(){
      counter++;
      console.log("Counter:", counter);
    }, 3000);
  }, 2000);
},1000);
```
output:-
prints counter: 1 after a sec, then counter:2 after 2 secs and then counter:3 after 3 secs
```
Counter: 1
Counter: 2
Counter: 3
```
##### chaining with an anonymous promise

```javascript
var p1 = new Promise(function(resolve, reject){
  setTimeout(function(){
    var randInt = Math.floor(Math.random() * 10);
    resolve(randInt);
  }, 1000);
});

p1.then(function(res){
  console.log('first promise p1 resolved--', res);
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      var randInt = Math.floor(Math.random() * 10);
      resolve(randInt);
    }, 2000);
  });
}).then(function(res2){
  console.log('second anonymous promise resolved--', res2);
});
```
output:
// It first prints first promise result after a second then after 2 seconds it prints second promise result

```
first promise p1 resolved-- 6
second anonymous promise resolved-- 9
```

##### conerting callback hell into promise

```javascript
/*var counter = 0;
setTimeout(function(){
  counter++;
  console.log("Counter:", counter);
  setTimeout(function(){
    counter++;
    console.log("Counter:", counter);
    setTimeout(function(){
      counter++;
      console.log("Counter:", counter);
    }, 3000);
  }, 2000);
},1000);
*/
//converting this into a promise
var counter = 0;
function increment(){
    counter++;
    console.log("Counter:", counter);
}


function runLater(callback, timeInMs){
  var p = new Promise(function(resolve, reject){
    setTimeout(function(){
      var res = callback();
      resolve(res);
    }, timeInMs);
  });
  return p;
}

runLater(increment, 1000).then(function(){
  return runLater(increment, 2000);
}).then(function(){
  return runLater(increment, 3000);
}).then(function(){
  //final .then not necessary
  //but if you want you can do any post executions if you want
});
  

```
output:
```
Counter: 1
Counter: 2
Counter: 3
```


### Key Concepts using Promise
##### Promises executes as soon as initializes it
``` javascript
var p1 = new Promise(function(res, rej){
	setTimeout(function(){
		res('inside');
	}, 3000);
});

setTimeout(function(){
	console.log('outside');
}, 3000);


p1.then(function(result){ // *** then called here after setTimeout above
  console.log(result);
});
```
Output
/*

inside

outside

*/

But if you do this
``` javascript
setTimeout(function(){
	console.log('outside');
}, 3000);

var p1 = new Promise(function(res, rej){
	setTimeout(function(){
		res('inside');
	}, 3000);
});

p1.then(function(result){
  console.log(result);
});
```

##### Promises has Microtask Queue gets higher precedence than regular task Queue

```javascript
console.log('script start');

setTimeout(function() { // called at beginning than promise
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
```
OUTPUT
/*

script start

script end

promise1

promise2

setTimeout

*/

Note: Some browsers log script start, script end, setTimeout, promise1, promise2. They're running promise callbacks after setTimeout. It's likely that they're calling promise callbacks as part of a new task rather than as a microtask.

#### Another example to look over multiple browsers along with event bubbling effect
```html
<div class="outer">
  <div class="inner"></div>
</div>
```

```javascript
// Let's get hold of those elements
var outer = document.querySelector('.outer');
var inner = document.querySelector('.inner');

// Let's listen for attribute changes on the
// outer element
new MutationObserver(function() {
  console.log('mutate');
}).observe(outer, {
  attributes: true
});

// Here's a click listener…
function onClick() {
  console.log('click');

  setTimeout(function() {
    console.log('timeout');
  }, 0);

  Promise.resolve().then(function() {
    console.log('promise');
  });

  outer.setAttribute('data-random', Math.random());
}

// …which we'll attach to both elements
inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);
```
Output
```
click
promise
mutate
click
promise
mutate
timeout
timeout

#### Chrome : 
click
promise
mutate
click
promise
mutate
timeout
timeout

#### Firefox
click
mutate
click
mutate
timeout
promise
promise
timeout

#### safari
click
mutate
click
mutate
promise
promise
timeout
timeout

#### IE
click
click
mutate
timeout
promise
timeout
promise
```
