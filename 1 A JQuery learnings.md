# JQuery
### creating dom elements
```javascript
var txt1 = "<p>Text.</p>";               // Create element with HTML  
  var txt2 = $("<p></p>").text("Text.");   // Create with jQuery
  var txt3 = document.createElement("p");  // Create with DOM
  txt3.innerHTML = "Text.";
  $("body").append(txt1, txt2, txt3);
```
### JQuery basic dom selectors
```
$("* ")
$(this)
$(p)
$(p.intro)
$("a[target='blank']")
```
### this -> to grab same context selector
```javascript
$("p").click(function(){
  $(this).hide();
});
```
### events
``` click mouseup mousedown dblclick focus hover mouseenter mouseleave blur ```

### multiple events
```javascript
$("p").on({
  mouseenter: function(){
    $(this).css("background-color", "lightgray");
  }, 
  mouseleave: function(){
    $(this).css("background-color", "lightblue");
  }, 
  click: function(){
    $(this).css("background-color", "yellow");
  } 
});
```
### hide/show
```javascript
$("#hide").click(function(){
  $("p").hide();
});

$("#show").click(function(){
  $("p").show();
});

$("button").click(function(){
  $("p").hide(1000);
});

$("button2").click(function(){
  $("p").toggle();
});
```

### fadeIn
```js
$("button").click(function(){
  $("#div1").fadeIn();
  $("#div2").fadeIn("slow");
  $("#div3").fadeIn(3000);
});

```

### GET
``` text() html() val() ```
```javascript
$("#w3s").attr("href")
```
### SET
```javascript
//text
$("#btn1").click(function(){
  $("#test1").text("Hello world!");
});
//html
$("#btn2").click(function(){
  $("#test2").html("<b>Hello world!</b>");
});
// value for a form elemet/input element
$("#btn3").click(function(){
  $("#test3").val("Dolly Duck");
});
//generic attribute
$("button").click(function(){
  $("#w3s").attr("href", "https://www.w3schools.com/jquery/");
});
// multiple attributes
$("button").click(function(){
  $("#w3s").attr({
    "href" : "https://www.w3schools.com/jquery/",
    "title" : "W3Schools jQuery Tutorial"
  });
});
```

### Add
```javascript
$( "div" ).css( "border", "2px solid red" )
  .add( "p" )
  .css( "background", "yellow" );
```

### Append / Prepend / before / after
The jQuery append() method inserts content AT THE END of the selected HTML elements.
The jQuery prepend() method inserts content AT THE BEGINNING of the selected HTML 
after() - Inserts content after the selected elements
```javascript
$("p").append("Some appended text."); // will be at the end inside same 'p' tag
$("ol").append("<li>Appended item</li>");
//prepend
$("p").prepend("Some prepended text.");
//after
$("img").after("Some text after");
//before
$("img").before("Some text before");
```

### Remove
remove() - Removes the selected element (and its child elements)
empty() - Removes the child elements from the selected element

```javascript
$("#div1").remove();
$("p").remove(".test"); //removes all <p> elements with class="test"
$("p").remove(".test, .demo"); //removes all <p> elements with class="test" or class="demo"


$("#div1").empty();
```
### CSS manipulation
addClass() - Adds one or more classes to the selected elements
removeClass() - Removes one or more classes from the selected elements
toggleClass() - Toggles between adding/removing classes from the selected elements
css() - Sets or returns the style attribute

```javascript
$("button").click(function(){
  $("h1, h2, p").addClass("blue");
  $("div").addClass("important");
});

$("button").click(function(){
  $("h1, h2, p").removeClass("blue");
});

$("button").click(function(){
  $("h1, h2, p").toggleClass("blue");
});

$("p").css("background-color"); //will return the background-color value of the FIRST matched element
$("p").css("background-color", "yellow"); //will set the background-color value for ALL matched elements
$("p").css({"background-color": "yellow", "font-size": "200%"});
```

### Dimensions
width()
height()
innerWidth()
innerHeight()
outerWidth()
outerHeight()
```javascript
$("button").click(function(){
  var txt = "";
  txt += "Width: " + $("#div1").width() + "</br>";
  txt += "Height: " + $("#div1").height();
  $("#div1").html(txt);
});

$("button").click(function(){
  var txt = "";
  txt += "Inner width: " + $("#div1").innerWidth() + "</br>";
  txt += "Inner height: " + $("#div1").innerHeight();
  $("#div1").html(txt);
});

$("button").click(function(){
  var txt = "";
  txt += "Document width/height: " + $(document).width();
  txt += "x" + $(document).height() + "\n";
  txt += "Window width/height: " + $(window).width();
  txt += "x" + $(window).height();
  alert(txt);
});

//setting width & height
$("button").click(function(){
  $("#div1").width(500).height(500);
});

```

### Ancestors / children / siblings
parents()
children()
find()
```javascript
//returns all ancestors of all <span> elements
$(document).ready(function(){
  $("span").parents();
});

//returns all ancestors of all <span> elements that are <ul> elements
$(document).ready(function(){
  $("span").parents("ul");
});
// returns all elements that are direct children of each <div> elements
$(document).ready(function(){
  $("div").children();
});
// returns all <p> elements with the class name "first", that are direct children of <div>
$(document).ready(function(){
  $("div").children("p.first");
});
//returns all <span> elements that are descendants of <div>
$(document).ready(function(){
  $("div").find("span");
});
//returns all descendants of <div>
$(document).ready(function(){
  $("div").find("*");
});
// returns all sibling elements of <h2>
$(document).ready(function(){
  $("h2").siblings();
});
// returns the next sibling of <h2>
$(document).ready(function(){
  $("h2").next();
});
```

### Filtering
 first(), last(), eq(), filter() and not()
```javascript
//returns the first element of the specified elements
$(document).ready(function(){
  $("div").first();
});
//returns an element with a specific index number of the selected elements
$(document).ready(function(){
  $("p").eq(1);
});
```
### 1 Simple Jquery to hide a text on button click

```html
<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
$(document).ready(function(){
    $(".btn").click(function(){
      // $("p").toggle();
      $("p").hide();
    });
});
</script>
</head>
<body>
<h2>counter exercise</h2>
<p>I will be hidden after click</p>
<button class="btn">submit</button>
</body>
</html>
```

### 2 On click Do ajax call in JQuery using $.getJSON

```html
<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
$(document).ready(function(){
  console.log('--hi--');
  $("#btn").click(function(){
    console.log('--btn--', btn);
    $.getJSON("https://ron-swanson-quotes.herokuapp.com/v2/quotes").done(function(data){
      console.log('----', data);
      //$("#catImg").attr("src", data);
      $("h3").html(data[0]);
    }).fail(function(data){
      alert("request is not pawsibble");
    });
});
});
</script>
</head>
<body>
<h2>Random cat photos</h2>
    <h3 id="quote"></h3>
<button id="btn">Random Quote</button>
<img id="catImg" src="" alt=""/>
</body>
</html>

```

### 3 Four different common ways of ajax
```html
<!DOCTYPE html>
<html>
<head>
  <style>
  </style>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>var url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes'
var xhrbtn = document.querySelector("#xhr");
var fetchbtn = document.querySelector("#fetch");
var axiosbtn = document.querySelector("#axios");
var display = document.querySelector("#quote");

xhrbtn.addEventListener("click", function(){
  var XHR = new XMLHttpRequest();
  XHR.onreadystatechange = function(){
    if(XHR.readyState == 4 && XHR.status == 200){
      var quote = JSON.parse(XHR.responseText)[0];
      display.innerText = quote;
    }
  }
  XHR.open("GET", url);
  XHR.send();
});


fetchbtn.addEventListener("click", function(){
  fetch(url)
  .then(function(req){
    req.json().then(function(data){
      display.innerText = data[0];
    })
  })
  .catch(function(){
    alert("ERROR!")
  })
});



$('#jquery').click(function(){
  $.getJSON(url)
  .done(function(data){
    $('#quote').text(data[0]);
  });
});


axiosbtn.addEventListener("click",function(){
  axios.get(url)
  .then(function(res){
    display.innerText = res.data[0];
  })
  .catch(function(){
    alert("ERROR!");
  })
});
</script>
</head>
<body>
<h2>4 diff ways</h2>
<section class="container">
  <button id="xhr">XHR</button>
  <button id="fetch">Fetch</button>
  <button id="jquery">jQuery</button>
  <button id="axios">Axios</button>
</section>
</body>
</html>


```
