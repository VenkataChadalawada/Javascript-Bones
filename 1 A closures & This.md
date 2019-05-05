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

## EXERCISES
```javascript

/* 
Write a function called specialMultiply which accepts two parameters. If the function is passed both parameters, it should return the product of the two. If the function is only passed one parameter - it should return a function which can later be passed another parameter to return the product. You will have to use closure and arguments to solve this.

Examples: 

    specialMultiply(3,4); // 12
    specialMultiply(3)(4); // 12
    specialMultiply(3); // function(){}....
*/

function specialMultiply(a,b){
  var a = a;
  if(b){
    return a*b;
  }
  return function(b){
    return a*b;
  }
}
/*
O/p
>  specialMultiply(5,6)
30
>  specialMultiply(5)
[Function]
>  specialMultiply(5)(6)
30

*/
/* 
Write a function called guessingGame which takes in one parameter amount. The function should return another function that takes in a parameter called guess. In the outer function, you should create a variable called answer which is the result of a random number between 0 and 10 as well as a variable called guesses which should be set to 0.

In the inner function, if the guess passed in is the same as the random number (defined in the outer function) - you should return the string "You got it!". If the guess is too high return "Your guess is too high!" and if it is too low, return "Your guess is too low!". You should stop the user from guessing if the amount of guesses they have made is greater than the initial amount passed to the outer function.

You will have to make use of closure to solve this problem.

Examples (yours might not be like this, since the answer is random every time):

    var game = guessingGame(5)
    game(1) // "You're too low!"
    game(8) // "You're too high!"
    game(5) // "You're too low!"
    game(7) // "You got it!"
    game(1) // "You are all done playing!"

    var game2 = guessingGame(3)
    game2(5) // "You're too low!"
    game2(3) // "You're too low!"
    game2(1) // "No more guesses the answer was 0"
    game2(1) // "You are all done playing!"
*/

function guessingGame(amount){
  var answer = Math.floor(Math.random()*10);
  var guesses = 0;
  var success = false;
    return function rando(guess){
      guesses++;
      if(success){
        return "You are all done playing!";
      }
      if(guesses >= amount) return "No more guesses the answer was "+answer;
      
      if(guess === answer){
        success = true;
        return "You got it!";
      } else if(guess < answer) {
        return "You're too low!";
      } else {
        return "You're too high!";
      }
      
    }
}
```
