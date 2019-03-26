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
output
```
```
--- Timeout 41
cancelling first timer as we decided not needed
```
