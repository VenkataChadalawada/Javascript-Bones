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
