// Objects & Arrays
let obj = {
  name: 'venkat',
  age: 29,
  address: {
    housenum: 343,
    street: 'w parmer ln',
    city: 'austin',
    zip: 78727
  }
};
  
console.log(Object.keys(obj));
// [ 'name', 'age', 'address' ]
console.log(Object.values(obj));
/* [ 'venkat',
  29,
  { housenum: 343,
    street: 'w parmer ln',
    city: 'austin',
    zip: 78727 } ]
    */
console.log(Object.entries(obj));
/*
 [ 'name', 'venkat' ],
  [ 'age', 29 ],
  [ 'address',
    { housenum: 343,
      street: 'w parmer ln',
      city: 'austin',
      zip: 78727 } ] ]
      */

console.log(obj.hasOwnProperty('age'));
// true

// Arrays are ordered
/* 
use arrays when you need order, sometimes you might need linkedlists
when you need insertion and removal(sort of)
Access: O(1)

Insertion at end: O(1)
insertion at begining : O(n)
same goes with 
Removing at end: O(1)
removing at beginning: O(n)

Searching : O(n)

*** o push and pop always faster than shift and unshift

*/
console.log('-------------------');
let arr = ['apple', 2, [], {hi: 'hello'}];
console.log(arr.push('orange'));
// adds to end of array and returns the length of array
console.log(arr.pop()); 
// returns the popped element - orange
console.log(arr.unshift('universe')); 
// adds to beginning of array and returns the length of array
console.log(arr.concat('solid')); 
// if you add element it adds at the end
console.log(arr.concat(['milk', 'banana', 'oil'])); 
// if you add array it opens array and adds all its elements and returns new array
console.log('========',arr.slice(2));
// creates a fresh array from 2 pos to last
//--- inserts at index 1 ----
var months = ['Jan', 'March', 'April', 'June'];
console.log(months.splice(1, 0, 'Feb'), '******', months);
// [] '******' [ 'Jan', 'Feb', 'March', 'April', 'June' ]
// // ------// replaces 2 element at index 3------- returns new array
console.log(months.splice(3, 2, 'May'), '***---***', months);
//[ 'April', 'June' ] '***---***' [ 'Jan', 'Feb', 'March', 'May' ]

// ------slice(start, end)------- returns new array
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2), '-----', animals); // [ 'camel', 'duck', 'elephant' ]
console.log(animals.slice(2, 4)); // [ 'camel', 'duck' ]
console.log(animals.slice(1, 5)); // [ 'bison', 'camel', 'duck', 'elephant' ]

animals.forEach((ele, i) => console.log('-----', ele, i));
var newanimals = animals.map((ele) => ele+'2');
console.log('--animals--', animals, '--new--', newanimals);

var newanimals = animals.filter((ele) => ele === 'bison');
console.log('--animals--', animals, '--new--', newanimals);


var newanimals = animals.reduce((acc, ele) => acc+ele, '');
console.log('--animals--', animals, '--new--', newanimals);

var newanimals = animals.reduce((acc, ele) => {
   acc.push(ele+acc)
  return acc}, []);
console.log('--animals--', animals, '--new--', newanimals);
/*

push - O(1)
pop - O(1)
unshift - O(n)
shift - O(n)
concat - O(n)
slice - O(n)
splice - O(n)
sort - O(n*log n)
forEach/map/filter/reduce - O(n)
*/
