# Javascript-Bones

A repo to understand few complex topics in js
Structure - Behaviour - Presentation
HTML - JS - CSS

## Some DOM Basics

### 1 Select & Manipulate:
#### Select
getElementById
getElementsByClassName
getElementsByTagName
querySelector
```
document.querySelector('hi');
```
Manipulate

```
var h1 = document.querySelector('hi');
h1.style.color = 'pink';
```

Eg 1: Every second change the color of body until 1 minute
we can take help of `setInterval` in js
``` javascript
var body = document.querySelector('body');
var isBlue = false;
var time = 0;
var Animator = setInterval(function(){
	time+=1;
	if(time === 60){
		clearInterval(Animator);
	}
	if(isBlue){
		body.style.background = "white";
	} else {
		body.style.background = "grey";
	}
	isBlue = !isBlue;
}, 100); 

```


#### Manipulate
- a) changing an element style
- b) adding/removing classes
- c) changing the content of a tag
- d) changing attributes(src, href, etc)

##### a) changing an element style
var tag = document.getElementById('highlight');
tag.style.color = 'blue';
tag.style.border = '10px solid red';
tag.style.fontSize = '70px';
tag.style.background = 'yellow';
tag.style.marginTop = '200px';

say if we have a class
```
.some-class{
 color: blue;
 fontSize: 76px;
}
tag.classList.add('some-class');
tag.classList.remove('some-class');
tag.classList.toggle('some-class');
```
 

Eg2: Move a box from left to right by creating an animating effect

```javascript
var body = document.querySelector('body');
var isBlue = false;
var time = 0;

var box = document.createElement('div');
box.style.height="30px";
box.style.width="30px";
box.style.background="orange";
box.style.position = "relative";

body.append(box);
var time = 0;
function getValueinpixels(pix){
  return Number(pix.slice(0, pix.length-2));
}
var animate = setInterval(function(){
	if(time === 60){
		clearInterval(animate);
	}
	box.style.left = getValueinpixels(box.style.left)+10+'px';
	console.log('---', getValueinpixels(box.style.left), '---');
time+=1;
}, 100);
```

