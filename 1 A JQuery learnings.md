# Jquery

### Simple Jquery to hide a text on button click

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
