# Advanced Array Methods

### 1 forEach
- iterates through an array
- runs a callback function on each value in the array
- returns 'undefined'
``` javascript
[1,2,3].forEach(function(value, index, array){
    console.log(value);
});
```

### 2 map
- creates a new array
- iterates through an array
- runs a callback function for each value in the array
- pushes the result of the callback function to the new array
- returns the new array

``` javascript
/* arr.map(function(val){
  return val*2;
}); */
// structure of map would be
function map(arr, callback){
  const res =[];
  for(var i=0;i<arr.length;i++){
    res.push(callback(arr[i]));
  }
  return res;
}

// usage example
function tripleValue(arr){
  return arr.map(function(v){
    return v*3;
  });
}

console.log(tripleValue([1,2,3])); 
// [3,6,9]

```

### 3 filter
- creates a new array
- Iterates through an array
- runs a callback function on each value on the array
- if the callback function returns true that value will be added to new array else it will be ignored
- new array will be returned

``` javascript
var r = arr.filter(function(ele){
     return ele>2;
});

console.log(r);

function filter(arr, callback){
  var newArr = [];
   for(var i=0;i<arr.length;i++){
     if(callback(arr[i])){
       newArr.push(arr[i]);
     }
   }
  return newArr;
}

// example
function onlyFourLetters(arr){
  return arr.filter(function(ele){
    return ele.length===4;
}
```

### 4 reduce
##### a) No accumulator
accumulator = first value eg: 1 (from below)
nextValue = second value eg:2
```javascript
var arr = [1,2,3,4,5]
const res = arr.reduce(function(accumulator, nextValue){
  return accumulator+nextValue;
});

console.log(res);
```
##### b) with accumulator
accumulator = first value eg: 10 (from below)
nextValue = second value eg:1
```javascript
var arr = [1,2,3,4,5]
const res = arr.reduce(function(accumulator, nextValue){
  return accumulator+nextValue;
}, 10);

console.log(res);
```

#### filter practice
```javascript
/*
Write a function called filterByValue which accepts an array of objects and a key and returns a new array with all the objects that contain that key.

Examples:
*/
    console.log(filterByValue([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner')); // [{first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Colt', last:"Steele", isCatOwner: true}]


function filterByValue(arr, key){
    return arr.filter(function(ele){
      return !!ele[key];
    });
}

/*
Write a function called find which accepts an array and a value and returns the first element in the array that has the same value as the second parameter or undefined if the value is not found in the array.

Examples:
*/
    console.log(find([1,2,3,4,5], 3)) // 3
    console.log(find([1,2,3,4,5], 10)) // undefined


function find(arr, searchValue){
    const res = arr.filter(function(ele){
      return ele === searchValue;
    });
    return res[0];        
}

/*
Write a function called findInObj which accepts an array of objects, a key, and some value to search for and returns the first found value in the arrayt.

Examples:
*/
    console.log(findInObj([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwner',true)); // {first: 'Tim', last:"Garcia", isCatOwner: true}
console.log('-----');
console.log(findInObj([{first: 'Elie', last:"Schoppik"}, {first: 'Tim', last:"Garcia", isCatOwner: true}, {first: 'Matt', last:"Lane"}, {first: 'Colt', last:"Steele", isCatOwner: true}], 'isCatOwnerzzz',true));

function findInObj(arr, key, searchValue){
    return arr.filter(function(ele){
      return ele[key] === searchValue;
    })[0];
}

/*
Write a function called removeVowels which accepts a string and returns a new string with all of the vowels (both uppercased and lowercased) removed. Every character in the new string should be lowercased.

Examples:
    removeVowels('Elie') // ('l')
    removeVowels('TIM') // ('tm')
    removeVowels('ZZZZZZ') // ('zzzzzz')
*/

function removeVowels(str){
  var vowels = 'aeiou';
  return str.toLowerCase().split('').filter(function(letter){
    return vowels.indexOf(val) === -1;
    }).join('');

    
}

/*
Write a function called doubleOddNumbers which accepts an array and returns a new array with all of the odd numbers doubled (HINT - you can use map and fitler to double and then filter the odd numbers).

Examples:
*/
    console.log(doubleOddNumbers([1,2,3,4,5])) // [2,6,10]
    doubleOddNumbers([4,4,4,4,4]) // []


function doubleOddNumbers(arr){
  return arr.filter(function(ele){
    return ele%2!=0;
  }).map(function(ele){
    return ele*2;
  });
    
}

```
