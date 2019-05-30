## 1) JavaScript Async - Events

We can try this out and demonstrate the way that microtasks behave with a simple program:
```javascript
setTimeout(
     function () {
        console.log("Task1"); 
     }, 0);
Promise.resolve().then(
     function () {
        console.log("MicroTask1");
     }); 
setTimeout(
     function () {
        console.log("Task2"); 
     }, 0);
Promise.resolve().then(
     function () {
        console.log("MicroTask2");
     });
```
This uses setTimeout to add two tasks and Promise.resolve to add two microtasks.

The order that they are added in suggests that we should see:

- Task1 
- MicroTask1 
- Task2 
- MicroTask2

but on the current version of Chrome, Edge and Firefox what we see is:

- MicroTask1
- MicroTask2
- Task1
- Task2

You can add as many microtasks and tasks as you like and you will see all of the microtasks executed before the tasks. You might be wondering why Task1 was printed first. The reason is that the microtask queue is emptied first when the code that sets the tasks/microtasks ends.

In principle microtasks are always processed first.

You can use this program as a test to see if an object is queuing a task or a microtask. Simply replace the Promise.resolve by whatever you want to test.

## 2) Event Bubbling vs Event Delegation vs Event Capturing && Stopping bubbling
#### Event Delegation
event delegation is the technique, bubbling is what the event itself does, and capturing is a way of using event delgation on events that don’t bubble

Event delegation is a technique for listening to events where you delegate a parent element as the listener for all of the events that happen inside it.
```
var form = document.querySelector('#hogwarts-application');

// Listen for changes to fields inside the form
form.addEventListener('input', function (event) {

	// Log the field that was changed
	console.log(event.target);

}, false);
```
#### Event Bubbling
Most events bubble. But some, like the focus event, do not.
Bubbling is what the event itself does.

If you’ve ever watched the bubbles in a glass of soda, you’ll understand how event bubbling works.

The event starts are the element that triggered it (saying, changing the #email field in our example above). Then, it bubbles up to each of it’s parent elements until it reaches the html element.

#### Event Capturing
capturing is a way of using event delegation on events that don’t bubble.

```
document.addEventListener('focus', function (event) {
	console.log(event.target);
}, false);
```

#### Stopping bubbling
A bubbling event goes from the target element straight up. Normally it goes upwards till <html>, and then to document object, and some events even reach window, calling all handlers on the path.

But any handler may decide that the event has been fully processed and stop the bubbling.

The method for it is event.stopPropagation().

## 3) setTimeout weird parts
#### type 1
```
for(let i=0; i<5; i++){
  setTimeout(function(){
  }, 2000);
  console.log('hi', i);
}
```
o/p - after 2 seconds it prints
```
"hi" 0
"hi" 1
"hi" 2
"hi" 3
"hi" 4
```
#### type 2
```
 setTimeout(function(){
    for(let i=0; i<5; i++){
      console.log('hi', i);
    }
  }, 2000);

```
o/p after 2 secs
``` 
"hi" 0
"hi" 1
"hi" 2
"hi" 3
"hi" 4
```

#### type3 - let scope
```
 setTimeout(function(){
    for(let i=0; i<5; i++){
      console.log('hi', i);
    }
  }, i);
  ```
  o/p
  ```
  i is not defined
  ```
