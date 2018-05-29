# Pure Functions
give same input same output should be retrived. There shouldn't be any changes to input
eg: given I say we get O . Given another I , It should only provide O

Eg- Not pure function
``` javascript
function doublevalues(inpArr){
  for(var i=0;i<inpArr.length;i++){
    inpArr = inpArr[i]*2;
  }
  return inpArr;
}
```
Say if you pass [1,2,3] -> returns [2,4,6] and this also changes inpArr 

refactor that to make Pure Function
``` javascript
function doublevalues(inpArr){
  return inpArr.map((e,i) => e*2);
}
```
Another example
Non-Pure Function
``` javascript
var person = { id:53, name:"Tim" };
function addJob(job){
  person.job = job;
}
addJob(instructor);
```
Pure function 
``` javascript
var person = { id:53, name:"Tim" };
function addJob(personObj, job){
  return Object.assign({},personObj,{job})
}
addJob(person, 'Instructor');
```
