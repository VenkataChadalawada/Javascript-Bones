# Cloning
1) Reference Copying
Assignment operator doesn't create a copy of an object, it only assigns a reference to it, let's look at the following code:
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
2) Shallow Copying
A shallow copy will duplicate the top-level properties, but the nested object is shared between the original(source) and the copy(target).
``` javascript
let obj = {
  a: 1,
  b: 2,
};
let objCopy = Object.assign({}, obj);

console.log(objCopy); // result - { a: 1, b: 2 }
objCopy.b = 89;
console.log(objCopy); // result - { a: 1, b: 89 }
console.log(obj); // result - { a: 1, b: 2 }
```
But
``` javascript
let obj = {
  a: 1,
  b: {
    c: 2,
  },
}
let newObj = Object.assign({}, obj);
console.log(newObj); // { a: 1, b: { c: 2} }

obj.a = 10;
console.log(obj); // { a: 10, b: { c: 2} }
console.log(newObj); // { a: 1, b: { c: 2} }

newObj.a = 20;
console.log(obj); // { a: 10, b: { c: 2} }
console.log(newObj); // { a: 20, b: { c: 2} }

newObj.b.c = 30;
console.log(obj); // { a: 10, b: { c: 30} }
console.log(newObj); // { a: 20, b: { c: 30} }

// Note: newObj.b.c = 30; Read why..
```
Why is obj.b.c = 30?
Well, that is a pitfall of Object.assign(). Object.assign only makes shallow copies. Both newObj.b and obj.b share the same reference to the object because of individual copies were not made, instead a reference to the object was copied. Any change made to any of the object's property applies to all references using the object. How can we fix this? Continue reading... we have a fix in the next section.
A deep copy will duplicate every object it encounters. The copy and the original object will not share anything, so it will be a copy of the original. Here's the fix to the problem we encountered using Object.assign(). Let's explore.

Using JSON.parse(JSON.stringify(object));
This fixes the issue we had earlier. Now newObj.b has a copy and not a reference! This is a way to deep copy objects. Here's an example:
``` javascript
let obj = { 
  a: 1,
  b: { 
    c: 2,
  },
}

let newObj = JSON.parse(JSON.stringify(obj));

obj.b.c = 20;
console.log(obj); // { a: 1, b: { c: 20 } }
console.log(newObj); // { a: 1, b: { c: 2 } } (New Object Intact!)
```
Note - for circular JSON copying we still need to use Object.asign
