# Closures

A closure is a function that makes use of variables defined in outer functions that have previously returned.

```javascript
function outer(){
  const closures = "closures are ";
  return function inner(){
    return closures+"awesome";
  }
}
  console.log(outer()());
```
another example
``` javascript
function outer(a){
  
  return function inner(b){
    return a+b;
  }
}

console.log(outer(5));
console.log(outer(5)(4));
```

**** ONLY the values that has been used by innerfunction will be remembered not every one that outer function declares.

eg:
```javascript
function outerFn(){
  var data = "Something from Outer fn";
  var fact = "Remember Me!";
  
  return function innerFn(){
    debugger;
    return fact;
  }
}

console.log(outerFn()());
```
you can observe `data` is not there, `fact` is there - because fact is being used by innerFn.

#### why ??
##### when a function returns , it first checks if there are any values that are being used and need to remember if so, it remembers just them. This is how closure works.

In other languages like Java, there is this concept of private variables, But in javascript we have closures.

### Additional privacy with closures
```javascript
function classRoom(){
  var instructors = ['Elie','Colt'];
  return {
    getInstructors: function(){
      return instructors;
    },
    addInstructor: function(instructor){
      instructors.push(instructor);
      return instructors;
    }
  }
}

var course1 = classRoom();
console.log(course1.getInstructors().pop(),
course1.getInstructors().pop(),
course1.getInstructors());
//output
/*
Colt
Elie
[ ]
*/

### Additional exercises with closures


```
But there is a flaw in this we are modifying the actual instructors.
Lets use Slice to make a newone and send it.
```javascript
function classRoom(){
  var instructors = ['Elie','Colt'];
  return {
    getInstructors: function(){
      return instructors.slice();
    },
    addInstructor: function(instructor){
      instructors.push(instructor);
      return instructors.slice();
    }
  }
}

var course1 = classRoom();
console.log(course1.getInstructors().pop(),
course1.getInstructors().pop(),
course1.getInstructors());
//output
/*
Colt
Colt
[ 'Elie', 'Colt' ]
*/
```

