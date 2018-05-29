# Cloning
### 1) Assignment operator doesn't create a copy of an object, it only assigns a reference to it, let's look at the following code:
``` javascript
let obj = {
  a: 1,
  b: 2,
};
let copy = obj;

obj.a = 5;
console.log(copy.a);
// Result 
// a = 5;
```
