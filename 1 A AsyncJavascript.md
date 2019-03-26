# Async Javascript
## 1. Call Backs

``` javascript
function callback(){
  console.log('hi im a callback function');
}

function higherorderfunction(fn){
  console.log('about to call callback function');
  fn();
  console.log('after callback function');
}

higherorderfunction(callback);

```
output:
```
> about to call callback function
hi im a callback function
after callback function
```
