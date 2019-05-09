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

Task1 
MicroTask1 
Task2 
MicroTask2

but on the current version of Chrome, Edge and Firefox what we see is:

MicroTask1
MicroTask2
Task1
Task2

You can add as many microtasks and tasks as you like and you will see all of the microtasks executed before the tasks. You might be wondering why Task1 was printed first. The reason is that the microtask queue is emptied first when the code that sets the tasks/microtasks ends.

In principle microtasks are always processed first.

You can use this program as a test to see if an object is queuing a task or a microtask. Simply replace the Promise.resolve by whatever you want to test.
