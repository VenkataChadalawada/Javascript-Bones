
const obj = {
	a: 1,
	b: 2,
	getA(){
		console.log(this.a);
		return this; // answer
	},
	getB(){
		console.log(this.b);
	}
}

obj.getA().getB(); // what would you do to get this working?

//Q2) want to have a method in array and on executing get results
// [1,2].print(); //output=  1,2

Array.prototype.print = function() {
	let res = '';
	for(let i=0; i<this.length; i++) {
		if(i === this.length-1){
			res += this[i];
		} else {
			res += this[i]+',';
		}
	}
	return res;
}

console.log([1,2].print());


// Q3) Inhertiance
const a = function(x) {
	this.x = x;
	this.getX =function(){
		return this.x;
	}
};

const b = function(x, y) {
	this.y = y;
	a.call(this, x); // you need this to get a function being called 
	this.getY = function() {
		return this.y;
	}
};

const newB = new b('x', 'y');


console.log(newB.getX()) // should get 'x'
console.log(newB.getY()) //should get 'Y'

//---- Q4) clone the object
const obj2 = {
	a: {
		b: {
			c: 1
		}
	}
};
/* const clone = Object.assign // a) how do you clone it?
clone.a.b.c=2;
console.log(obj.a.b.c); // b) original should not get changed?
*/
//Ans
const clone = JSON.parse(JSON.stringify(obj2)); // one good way
// otherway is you can implement your own clone
clone.a.b.c=2;
console.log('--original--', obj2.a.b.c);

const clone2 = Object.assign({}, obj2); 
clone2.a.b.c=2;
console.log('--2 original--', obj2.a.b.c); // wrong ans becasue its shallow


//------Q5 Merge sorted way
const a1 = [1,2,5,7,9];
const b1 = [2,5,7,12,100];

const c1 = [1,2,2,5,5,77,12,100];

// solution - 2 pointer technique


//------ Q6  scope of this inside of a function in an object
const obj3 = {
	x: 1,
	getX: function() {
		const inner = function(){
			console.log(this.x);
		}
		inner();
	}
};

obj3.getX(); // what would you get?

//Ans - undefined

// how do you solve it
// 1) Binding technique
// 2) const that = this way
// 3) arrow function - but might be danger inside functions 

const obj4 = {
	x: 1,
	getX: function() {
		const inner = (function(){
			console.log(this.x);
		}).bind(this);
		inner();
	}
};

obj4.getX(); // 1


// Q7 add method 
const arr = [1,2,3,4,5,6];
console.log(arr.reduce(function(acc, ele){
	return acc+ele;
}, 0));

// Q8) sum approach in finding missing one
const ary = [9,10,1,2,3,4,5,12,6,7,8]; // unsorted array
//it has oen number is misisng so how do you find it
// 12*(12-1)/2 = 6*11 = 66 // Math.sum(values)
// so if we total this and substract we will know what are we missing


//Q9) what is the diff between - Hoisting

function x(){
 
}

let y = function(){

}

// Ans
// at first x is undefined then it gets assigned to function object
// you can make into an expression you can use () and also can make an IIFE
(function x(){
}); // Expression

(function x(){
})(); // IIFE

// Q10) when you mass a function to another function it beocmes fucntion expression
const cT = {
	penny: 12,
	nickel: 10,
	dime: 2,
	quareter: 12,
	dollar: 30
}

// say 20.47 given we should return minimum number of coins
// ans
const value = {
	penny: 12,
	nickel: 10,
	dime: 2,
	quareter: 12,
	dollar: 30
}
function money(total){
	let cT = total * 100; // 2047
	re = cT%value.dollar;
	dollar = cT-re;
}

//Q11 find length with out converting into string

let N = 1234; //len = 4


//Q12 what would you get - 'this'
const profile = {
	name: 'venkata',
	getName: () => {
		console.log(this.name)
	}
}
profile.getName();

//ans
// arrow function has probelm
// approach 1  - you can change it to function
const profile2 = {
	name: 'venkata',
	getName: function() {
		console.log(this.name)
	}
}
profile2.getName();

/*
//Q13 - whats the output
const arr3 = [1, 4, 2, 3];
for(let i=0; i<arr3.length; i++){
	setTimeout(() => {
		console.log('index '+ i+ 'element '+arr3[i]);
	}, arr3[i]);
} */
/*
func0 after 5 
func1 after 120
func2 after 15
func3 after 21

*/

/* output gonna be
index0 element 5
index2 element 15
index3 element 21
index1 element 120
*/

// note both arrow and regular func behaves same way

//Q14  - Brain teaser
/*
n kids are sitting in a circle
k toys available to distribute
i position to start from
*/
// 3,5,1  => 2

//Q15 - can you create your own reducer similar to reduce
// [1,2,3].reduce((a, e) =>  a+e);
/*  // using arrow function wont work becuase it changes the context to its parent scope by default
Array.prototype.myReduce = (fn, init) => {
	for()
}
*/
// solution would be changin => to function
/* Array.prototype.myReduce = function(fn, init){
	for()
} */
Array.prototype.myReduce = function(fn, init){
	let cur = init || this[0]; // catch 1
	let j=0;
	if(init){
		j=1;
	}
	for(let i=j; i<this.length;i++){
		cur = fn(this[i], cur);
	}
	return cur;
}

// Q16 -Do you know Promises? - can you impolement your own promise

let Promise = function(fn){

}


let p = new Promise((res, rej) => {
		res();
		rej();
});


// Q17 - can you think of functions?
/* f(1)(2)(3) //9
f(2)(2)(1) //4
f(2,2,1); //4
f(); //0 */
// can you write function to satisfy provided conditions?
// closure type solution
function f(a,b,c){
	if(a&&b&&c){

	}
}

console.log('-----------------------');

// CLOSURES
// JS has lexical scoping
// ---
let i =1;
const fun = () => {
	console.log('--closure--', i);
}
fun();

//-----
let fun2;
if(true){
	let i =1;
	fun2 = () => {
		console.log('--closure--', i);
	}
}
fun2();

//---
let f4 = () => {
	let i=1;
	let j=2;
	return () => {
		console.log(i);
	}
};
// return function only closes i but not j


//--- closure inside a loop
// TYPE 1
for(let i=0; i<3; i++){
	const f2 = () => {
		console.log(i);
	}
	f2();
}
// we get 0,1,2 - no issues because of closure

/*
//TYPE 2 - with setTimeOut
for(let i=0; i<3; i++){
	setTimeout(() => {
		console.log(i);
	}, 1000);
}
// output
/*
0
1
2
*/
// Ans- when setTimeOut is placing those functions in Queue they encloses their value needs as closure


// TYPE3 - follow up question?
// But if we change let to var?
/*
for(var j=0; j<3; j++){
	setTimeout(() => {
		console.log(j);
	}, 1000);
}
/*
3
3
3
*/
// first - loop only should run until 0->2 but why 3 is occuring 3 times
// var is functional scope not block scope, it wont create a new i, it just changes i
// so the value it holds gets changed
// as value changes it updates the closure
/*********very imp interview question********* */
// how to fix this with var?
/*
for(var k=0; k<3; k++){
	((k) => { 
		setTimeout(() => {
			console.log('--',k);
		}, 1000);
	})(k);
}
*/

//------------- "this" key word in JS-----------------

this.table = 'window table';
console.log(window.table); // It works - window table

const cleanTable = function(soap) {
	console.log('f---2-> cleaning', this.table, ' using ', soap); // this doesnt know what is this 'this' here
	let that = this;
	const innerFunction = function(_soap){
		console.log('**3***cleaning '+that.table+' using '+_soap)
	}
	innerFunction(soap);
}
// call function to rescue
cleanTable.call(this, 'some soap');

this.garage = {
	table: 'garage table',
	cleantable: function() {
		console.log('cleaning window table--', this.table);
	}
}
console.log(this.garage.table); // It works beacuse this here is public property
cleanTable.call(this.garage, 'some soap');
// 1 - this inside object
// as you can see we are not creating this.johnsroom a private obejct
let johnsRoom = {
	table: 'johns table'
}
// console.log(this.johnsRoom.table) // you get error because its private
console.log(johnsRoom.table); // would work

console.log('---------');
//2 - what about method?
let johnsRoom2 = {
	table: 'johns table2',
	cleantable: function() {
		console.log('cleaning johns table--');
	}
}
// console.log(johnsRoom2.cleantable());
// console.log(this.garage.cleantable());
cleanTable.call(johnsRoom, 'some other soap'); 
//3 ----- what about function scope
// added above cleanTable in each place

//4 ------ this inside inner function

//-----------------TRICKY JS Q&A
console.log('===========TRICKY STUFF===========');

// Q1)==========
console.log(2+'2'); // 22
console.log(2-'2'); // 0 

//why?
//Ans
// + preference gives to concat
// -  is only a number operator

//Q2 ============
let nums = [1,2,2,3]; // [1,2,3]
// do it on one line - can you
// ans
// JS introduced SET 
console.log([...new Set(nums)]);


//Q3=========
let funny = function(){
	{
		let l = 'let';
		var v = 'var';
	}
	console.log(v);
	console.log(l);
}

func();
// fix this you only get var here

// ANS - IIFE
let funny = function(){
	
	(function(){
		let l = 'let';
		var v = 'var';
	})();
	
	console.log(v);
	console.log(l);
}

//Q4=======
console.log(5<6<7); // true
console.log(7>6>5); // false
// Actually what happens
// step 1
console.log(true<7); // true
console.log(true>5); // false
// step 2 becomes
console.log(1<7); // true
console.log(1>5); // false
// hence we get it but not actually they are
