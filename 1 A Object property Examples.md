# Objects
### simple class creation with method in pure javascript
``` javascript
function counter(){
  this.sum=0;
  this.count=0;
}

counter.prototype.add= function(arr){
  arr.forEach(function(val,arr){
    this.sum+=val;
    ++this.count;
  }, this);
}

const obj = new counter();
obj.add([4,5,6]);
console.log(obj.count);
console.log(obj.sum);
```
#### Object.assign
``` javascript
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }
console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
console.log(source);

//simple cloning
var copy = Object.assign({},source);
console.log(copy);


// cloning & Deep cloning

function test() {
  'use strict';

  let obj1 = { a: 0 , b: { c: 0}};
  let obj2 = Object.assign({}, obj1);
  console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}
  
  obj1.a = 1;
  console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
  console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}
  
  obj2.a = 2;
  console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
  console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 0}}
  
  obj2.b.c = 3;
  console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 3}}
  console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 3}}
  
  // Deep Clone
  obj1 = { a: 0 , b: { c: 0}};
  let obj3 = JSON.parse(JSON.stringify(obj1));
  obj1.a = 4;
  obj1.b.c = 4;
  console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 0}}
}

test();
```
##### javascript object assign - Primitives will be wrapped to objects

``` javascript
var v1 = 'abcd';
var v2 = 'g';
var v3 = 10;
var v4 = Symbol('foo');
var v5 =  { h: 'h'};

var obj = Object.assign({}, v1, null, v2, undefined, v3, v4, v5); 
// Primitives will be wrapped, null and undefined will be ignored.
// Note, only string wrappers can have own enumerable properties.
console.log(obj); // { "0": "a", "1": "b", "2": "c", h: 'h' }
```

#### Object.create

```javascript
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);

me.name = "Venkata"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();
// expected output: "My name is Matthew. Am I human? true"

```

#### Object.defineProperties
``` javascript
const object1 = {};

Object.defineProperties(object1, {
  property1: {
    value: 42,
    writable: false
  },
  property2: {}
});
object1.property1 = 50
console.log(object1.property1);
// expected output: 42
```

#### Object.entries
```
const object1 = { foo: 'bar', baz: 42 };
console.log(Object.entries(object1));
// expected output: Array ["baz", 42]

const object3 = { foo: {'a':'b'}, baz: 42 };
console.log(Object.entries(object3));
// expected output: Array ["baz", 42]

const object2 = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.entries(object2)[2]);
// expected output: Array ["2", "c"]

const result = Object.entries(object2).sort((a, b) => a - b);
console.log(Object.entries(result)[1]);
// expected output: Array ["1", Array ["1", "b"]]
```


