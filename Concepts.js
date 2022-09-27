[
    {
        id: 1,
        name: 'venkat',
        age: 20
    }, {
        id: 1,
        name: 'venkat',
        age: 20

    }, {
        id: 1,
        name: 'venkat',
        age: 20

    }
]
// 1 mapping
const names = users
.sort((user1, user2) => (user1.age < user2.age ? 1 : -1)) // descending order
.filter((user) => user.isActive) // active users
.map((user) => user.name) // names array

// 2 hoisting  - declarations will be done first

console.log(foo); // foo is not defined
foo1 = 2;

console.log(foo); // 2
var foo2 = 2; 

foo();
function foo() {} // works , function is same like var

const a = 1; let b = 2 // they wont bubbled up and wont be hoisted


// 3 closure

const privateCounter = () => {
    let count = 0;
    return {
        incremnet : (val=1) => {
            count+=val;
        },
        getValue: () => {
            return count;
        }
    }
}

const counter = privateCounter();
console.log(counter.getValue());
counter.incremnet();
console.log(counter.getValue());

// 4 currying
const multiply = (x) => {
    return (y) => x*y;
}
const multiply = (x) => (y) => x*y;
multiply(2)(3) // 6

// 5 create a curry function
const curry = function(fn){
  var arity = fn.length;
  console.log("arity", arity);
  return function f1(...args){
      if(args.length >= arity){
        console.log("enough arguments");
        return fn(...args);
      } else {
          console.log("need more arguments");
          return function f2(...moreArgs){
              var newArgs= args.concat(moreArgs);
              return f1(...newArgs);
          }
      }
  }
}
const curriedSum = curry((a,b,c) => a+b+c);
curriedSum(1,2,3);
curriedSum(1)(2)(3);
curriedSum(1)(2,3);
curriedSum(1,2)(3);

// 6 adding elements in array
const append = (arr, el) => {
    return [...arr, el]; // safer than push un mutating
}
console.log(append([1,2], 3));

// 7 concatenating array
const mergeArrays = (arr1, arr2) => {
    return [...arr1, ...arr2];
}

const res = mergeArrays([1,2,3], [3,4]);

//8 check user if same name

const user = [
    {
        id: 1,
        name: 'venkat',
        age: 20
    }, {
        id: 2,
        name: 'John',
        age: 21

    }, {
        id: 3,
        name: 'Mike',
        age: 22

    }
];
// solution 1 
const isNameExists = (name, arr) => arr.some(ele => ele.name === name); // 'some' returns bool ; 'filter' returns value
// solution 2
const isNameExists = (name, arr) => {
  const index = arr.findIndex(el => el.name === name);
  return index > 0;
} 

// 9 Remove all duplicates in the array
const removeDups = (arr) => [...new Set(arr)];
// sol2
const uniqueArr = arr => {
    const res = [];
    arr.forEach(item => {
        if(!res.includes(item)) {
            res.push(item)
        }
    });
    return result
}
// sol3
const uniqueArr = arr => {
    return arr.reduce((acc, el) => {
        return acc.includes(el) ? acc : [...acc, el];
    }, [])
};

// 10 sorting array
const arr = [3,5,1]
// sol1 
const res = arr.sort((a,b) => a<b?-1:1);
// sol2
const res = arr.sort((a,b) => a-b);
console.log(arr, res);
// sort by author name
const books = [
    {name: "Harry", author: "John"},
    {name: "Warcross", author: "Marie"},
    {name: "Hunger Games", author: "Suzanne"},
];
const res = books.sort((book1, book2) => {
    const authorLastName1 = book1.author.split(" ")[1];
    const authorLastName2 = book2.author.split(" ")[1];
    return authorLastName1 < authorLastName2 ? -1 : 1;
});

// 11 range function
range(1,50)
// 1,2,3...50
const range = (start, end) => {
  return [...Array(end-start).keys()].map(el => el+start);
}

// 12 writing shuffle function
const shuffleItems = items => {
    return items.map((item ) => ({sort: Math.random(), value: item}))
    .sort((item1, item2) => item1.sort - item2.sort)
    .map((a) => a.value)
};

// 13 find the number of occurances of minimum value in the list
const arr = [1,2,3]
const minValue = Math.min(...arr);
const minArr = arr.filter( el => el === minvalue);

// 14 this
// task 1 function
function getItem(){
    console.log(this); // here this -> window
}
getItem();
//task2 object
const item = {
    title: "Ball",
    getItem() {
        console.log("this", this); // here this -> item object itself
    },
};
item.getItem();
//task3 class
class Item {
    title = "Ball";
    getItem(){
        [].map(function (item){
            console.log(this); // undefined // use arrow funcs to get the context
        })
        function someFn(){
            console.log('this', this); // undefined // use arrow funcs to get the context
        }
        console.log("this", this); // Item class
    }
}
const item = new Item();
item.getItem();

// 15 Design a class for employee which takes id and name in during construction of object and has a salary property

class Employee {
    constructor(id, name){
        if(!id || !name){
            throw new Error("Employee if and name are mandatory");
        }
        this.id = id;
        this.name = name;
    }
    setSalary(salary){
        this.salary = salary;
    }
    getSalary(){
        this.salary;
    }
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
}

class Manager extends Employee {
    setDepartment(name){
        this.department = name;
    }
    getdepartment(){
        return this.department;
    }
}

const employee = new Employee(1, 'Jack');
employee.setSalary(1000);
const manager = new Manager(2, 'Shain');
manager.department('IT');

// 16 Prototypes for same Employee & manager

var Employee = function(id, name) {
    if(!id || !name){
        throw new Error('Employee id and name are mandatory');
    }
    this.id=id;
    this.name=name;
};
Employee.prototype.setSalary = function(salary){
    this.salary = salary;
}
Employee.prototype.getSalary = function(){
    return this.salary;
}
Employee.prototype.getId = function(){
    return this.id;
}
Employee.prototype.getName = function(){
    return this.name;
}

var Manager = function (params) {
    Employee.apply(this,arguments);
}
Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager;
Manager.prototype.setDepartment= function(department){
    this.department = this.department;
}
Manager.prototype.getDepartment = function(){
    return this.department;
}

// 17 - ES6 Modules
// create a es6 module getName, getSurname and default export getFullname
//es6.js
export const getName = name => name;
export const getSurName = surname => surname;
export default (name, surname) => `${getName(name)} ${getSurName}`;
//main.js
import getFullname,{getName, getSurName} from './es6.js';

// with commonJS module
//commonjs
const getName = name => name;
const getSurName = surname => surname;
module.exports = (name, surname) => `${getName(name)} ${getSurName}`;
module.exports = {
    getName,
    getSurName
}
// main.js
const getFullname = require('./common');

// whats the diff? - common.js used inside nodejs as standard, es6 modules used in browser(this is sugar around require)

// 18 - Debounce - func will be called after certain period of time
const saveInput = name => {
    console.log('saveInput', name);
}
const processChange = debounce(saveInput, 2000);

processChange('foo');
processChange('foo');
processChange('foo');
processChange('foo');
processChange('foo');
processChange('foo');
processChange('foo');
processChange('foo'); // no matter how many time we call it will only pick once evert 2 seconds.

// 18 create a debounce function
const debounce = (fn, timeout=300) => {
  let timer;
  return (...args) => {
      console.log('inner fn', args);
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, timeout)
  }
}

const saveInput = (name) => {
    console.log('saveInput', name);
}

const processChange = debounce(saveInput, 2000);
processChange('foo');
processChange('foo');
processChange('foo');
processChange('foo');

// 19 create Throttle function
const throttle = (func, timeout = 300) => {
  let isWaiting = false;
  return (...args) => {
    if(!isWaiting) {
        func.apply(this,args);
        isWaiting = true;
        setTimeout(() => {
            isWaiting = false;
        }, timeout);
    }
  }
}

const saveInput = (name) => {
    console.log('saveInput', name);
}

const processChange = throttle(saveInput, 2000);
processChange('foo');

setTimeout(() => {
    processChange('foo');
}, 1000)

setTimeout(() => {
    processChange('foo');
}, 2000)

// ----------------------------DOM related----------------------------------------

// 1 highlight all of the words over 8 characters long in the paragraph test ( with a yellow background for example )
const $paragraph = document.querySelector('p');
$paragraph.innerHTML = $paragraph.innerHTML.split(" ").map(word => {
    return word.length > 8
    ? `<span style="background-color: yellow">${word}</span>`
    : word;
})
.join(" ");

// 2 add a link
const link = document.createElement('a');
link.href = 'https://jjwbdjhw.com';
link.innerText = 'Text generated from Lorem Ipsum';
document.body.appendChild(link);

// 3 split each new sentence to a separate line in the paragraph test. A sentence can be assumed to be a string of text terminated with a period (.)
const paragraph = document.querySelector('p');
paragraph.innerHTML = paragraph.innerHTML.split(/\.[^.|<]/).join('.</p><p>')+'</p>';

// 4 Event delegation - implement a click on todo item as fast as possible
//Sol 1: on <li>s
const items = document.querySelectorAll('.item');
items.forEach(item => {
    item.addEventListener('click', () => {
        console.log('you clicked on item' + item.innerText);
    });
}); // problem so many listeners
//Sol 2:  on <ul>
const app = document.querySelector('.todo-app');
app.addEventListener('click', (e) => {
    if(e.target && e.target.classList.contains('item')){
        console.log('you clicked on item:'+ e.target.innerText);
    }
})


// ----------------------ASYNC JS-----------------------------
// 1 XMLHttpRequest

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.github.com/users');
xhr.send();
xhr.onload = function() {
    if(xhr.status !==200) {
        console.log('Error' + xhr.status + xhr.statusText);
    } else {
        console.log('success', xhr.response);
    }
};
xhr.onError = function (){
    console.log('xhr request failed');
}

// 2 using fetch
fetch('https://api.github.com/users')
.then(res => res.json())
.then(data => {
    console.log("success", data);
})
.catch(err => {
    console.log('error',err);
});


// 3 write an async function which executes callback after finishing its async task
const asyncFn = callback => {
    setTimeout(() => {
        callback('done');
    }, 2000);
};

asyncFn((message) => {
    console.log('callback', message);
})
// callback allow us to make some asyn task and then execute task

const asyncFunc1 = (callback) => {
    setTimeout(() => {
        callback(1);
    }, 3000);
};

const asyncFunc2 = (callback) => {
    setTimeout(() => {
        callback(2);
    }, 2000);
};

const asyncFunc3 = (callback) => {
    setTimeout(() => {
        callback(3);
    }, 1000);
};

const asyncParallel = (asynFuncs, callback) => {
    const resultArr = new Array(asyncFuncs.length);
    let resultCounter = 0;
    asyncFuncs.forEach((asyncFunc, index) => {
        asyncFunc((value)=> {
            resultArr[index] = value;
            resultCounter++;
            if(resultCounter >=asyncFuncs.length){
                callback(resultArr);
            }
        });
    });
};

asyncParallel([asyncFunc1, asyncFunc2, asyncFunc3], result => {
    console.log(result);
})

// 4 convert callback to promise
const promisifyAsyncFunc = () => {
    return new Promise(resolve => {
        asyncFunc((data) => {
            resolve(data);
        })
    })
}
promisifyAsyncFunc().then((result) => console.log(result));

// 5 map data on promises
const users = [
    {
        id: 1,
        name: 'Jack'
    },
    {
        id: 2,
        name: 'Jim'
    },
    {
        id: 3,
        name: 'Jain'
    },
];

const getUsers = () => {
    return new Promise((resolve) => {
        resolve(users);
    });
};

const getUserStatuses = () => {
    return new Promise((resolve) => {
        resolve(userStatuses);
    });
};

//sol1 - slow
getUsers().then(users => {
    getUserStatuses().then(userStatuses => {
        const mappedUsers = users.map(user =>{
            const isActive = userStatuses.find(
                (userStatus) => userStatus.id === user.id
            ).isActive;
            return {...user, isActive};
        });
        console.log("mappedUsers", mappedUsers);
    })
})

//sol2 - fast
Promise.all([getUsers(), getUserStatuses()]).then(([users, userStatuses]) => {
    const mappedUsers = users.map((user) => {
        const isActive = userStatuses.find(
            (userStatus) => userStatus.id === user.id
        ).isActive;
        return {...user, isActive};
    });
    console.log('mappedUsers', mappedUsers);
});

// 6 Asyn Await
const getMappedusers = async () => {
  try{
    const users = await getUsers();
    const userStatuses = await getUserStatuses();
    const mappedUsers = users.map((user) => {
        const isActive = userStatuses.find(
            (userStatus) => userStatus.id === user.id
        ).isActive;
        return {...user, isActive};
    });
    console.log('getMappedusers', mappedUsers);
    } catch(e){
        console.log('err', e);
    }
}
getMappedusers();


// 7 Design request manager

const requestManager = (url, options={}, attempt=3) => {
    return new Promise((resolve, reject) => {
        fetch(url, options)
        .then(resolve)
        .catch((err) => {
            const isLastAttempt = attempt === 1
            if(isLastAttempt) {
                return reject(error)
            }
            setTimeout(() => {
                requestManager(url, options, attempts-1)
                .then(resolve)
                .catch(reject)
            }, 3000)
        })
    });
}
requestManager('https://foo.com').then((res) => {
    console.log('response', response);
}).catch((err) => {
    console.log(err);
})


// ------------------COMPARISONS------------
// 1 Shallow - super performent but not useful for nested elements
const shallowCompare = (source, target) => {
    if (typeof(source) !== typeof(target)) {
        return false;
    
    }
    if (Array.isArray(source)) {
        if(source.length !==target.length){
            return false;
        }
        return source.every((el, index) => el === target[index]);
    }
    if(typeof source === 'object'){
        if(Object.keys(source).length !== Object.keys(target).length) {
            return false;
        }
        return Object.keys(source).every((key) => source[key] === target[key]);
    }
    return source === target;
}


// 2 Deep comparison

const deepCompare = (source, target) => {
    if (typeof(source) !== typeof(target)) {
        return false;
    
    }
    if (Array.isArray(source)) {
        if(source.length !==target.length){
            return false;
        }
        return source.every((el, index) => el === target[index]);
    }
    if(typeof source === 'object'){
        if(Object.keys(source).length !== Object.keys(target).length) {
            return false;
        }
        return Object.keys(source).every((key) => source[key] === target[key]);
    }
    return source === target;
}


// 3 memoization function
