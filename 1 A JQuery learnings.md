# JQuery

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
