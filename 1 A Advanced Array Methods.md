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
##### c) with strings
``` javascript
var arr = ['venkat','kittu','sravani','durga'];

const res = arr.reduce(function(accumulator, nextValue){
  return accumulator+=' '+nextValue;
}, 'The instructors are');

console.log(res);
```

##### d) creating counter objects out of arrays
```javascript
var arr = [3,9,3,6,1];

const res = arr.reduce(function(accumulator, nextValue){
  if(nextValue in accumulator){
    accumulator[nextValue]+=1;
  } else {
    accumulator[nextValue]=1;
  }
  return accumulator;
}, {});

console.log(res);
```

##### e)conditional accumulation
```javascript
var arr = [3,9,3,6,1];

function sumOfOddNumbers(arr){
  return arr.reduce(function(acc,next){
    if(next%2!==0) acc+=next;
    return acc;
  });
}

console.log(sumOfOddNumbers(arr));//3+9+3+1 = 16
```
##### f) converting massaged arrays from arrayswith objects
```javascript
var arr = [{first:'venkata',last:'chadalawada'},{first:'sravani', last:'kapilavai'}];

function createFullName(arr){
  return arr.reduce(function(acc,next){
    acc.push(next.first+' '+next.last)
    return acc;
  },[]);
}

console.log(createFullName(arr));
//[ 'venkata chadalawada', 'sravani kapilavai' ]
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

#### Exercises on reduce
```javascript
/*
Write a function called extractValue which accepts an array of objects and a key and returns a new array with the value of each object at the key.

Examples:
    var arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}]
    extractValue(arr,'name') // ['Elie', 'Tim', 'Matt', 'Colt']
*/

function extractValue(arr, key){
  return arr.reduce(function(acc, next){
    acc.push(next.name);
    return acc;
  },[]);
    
}
 var arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}]
    console.log(extractValue(arr,'name')) // ['Elie', 'Tim', 'Matt', 'Colt']

/*
Write a function called vowelCount which accepts a string and returns an object with the keys as the vowel and the values as the number of times the vowel appears in the string. This function should be case insensitive so a lowercase letter and uppercase letter should count
*/
Examples:
    console.log(vowelCount('Elie')) // {e:2,i:1};
    vowelCount('Tim') // {i:1};
    vowelCount('Matt') // {a:1})
    vowelCount('hmmm') // {};
    vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};


function vowelCount(str){
  const vowels = 'aeiou';
  return str.toLowerCase().split('').reduce(function(acc, next){
    if(vowels.indexOf(next)>0){
      if(!acc[next]){
        acc[next]=1;
      } else{
        acc[next]++;
      }
    }
    return acc;
  },{});
}

/*
Write a function called addKeyAndValue which accepts an array of objects and returns the array of objects passed to it with each object now including the key and value passed to the function.

Examples:
*/
    var arr = [{name: 'Elie'}, {name: 'Tim'}, {name: 'Matt'}, {name: 'Colt'}];
    
    console.log(addKeyAndValue(arr, 'title', 'Instructor')) 
/* 
      [
        {title: 'Instructor', name: 'Elie'}, 
        {title: 'Instructor', name: 'Tim'}, 
        {title: 'Instructor', name: 'Matt'}, 
        {title: 'Instructor', name: 'Colt'}
       ]*/


function addKeyAndValue(arr, key, value){
  return arr.reduce(function(acc, next){
    const obj = {};
    obj[key]= value;
    Object.assign(obj,next);
    acc.push(obj);
    return acc;
  },[]);
    
}


/*
Write a function called partition which accepts an array and a callback and returns an array with two arrays inside of it. The partition function should run the callback function on each value in the array and if the result of the callback function at that specific value is true, the value should be placed in the first subarray. If the result of the callback function at that specific value is false, the value should be placed in the second subarray. 

Examples:
  */  
    function isEven(val){
        return val % 2 === 0;
    }
    
    var arr = [1,2,3,4,5,6,7,8];
    
    console.log(partition(arr, isEven)); // [[2,4,6,8], [1,3,5,7]];
    
    function isLongerThanThreeCharacters(val){
        return val.length > 3;
    }
    
    var names = ['Elie', 'Colt', 'Tim', 'Matt'];
    
    console.log(partition(names, isLongerThanThreeCharacters)) // [['Elie', 'Colt', 'Matt'], ['Tim']]


function partition(arr, callback){
  
  return arr.reduce(function(acc, next){
    if(callback(next)){
      acc[0].push(next);
    }
    else{
      acc[1].push(next);
    }
      return acc;
  },[[],[]]);
    
}

```
