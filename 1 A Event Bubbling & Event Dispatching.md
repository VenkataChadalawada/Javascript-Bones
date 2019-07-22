# Event Bubling

bottom to top - from child element where click we made travels up to all its parents

```html
<div class="ancestor">
  <div class="parent">
    <button> Click me! </button>
  </div>
</div>
```
js
```javascript
$( "button" ).click(function(event) {
  console.log( "button was clicked!" );
});

$( ".parent" ).click(function(event) {
  console.log( "child element was clicked!" );
});

$( ".ancestor" ).click(function(event) {
  console.log( "descendant element was clicked!" );
});
```
When the user clicks the button the events starts at the button element, so button was clicked! is logged to the console. Then child element was clicked! and finally descendant element was clicked! are logged as well.

### What if you don’t want the event to bubble up?
```javascript
$( "button" ).click(function(event) {
  event.stopPropagation(); // <-- this line here!
  console.log( "button was clicked!" );
});

$( ".parent, .ancestor" ).click(function(event) {
  console.log( "don't click me!" );
});
```
##### Event Capturing is a phase
That is: for a click on <td> the event first goes through the ancestors chain down to the element (capturing phase), then it reaches the target and triggers there (target phase), and then it goes up (bubbling phase), calling handlers on its way.
There are two possible values of the capture option:

If it’s false (default), then the handler is set on the bubbling phase.
If it’s true, then the handler is set on the capturing phase.

```html
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form>FORM
  <div>DIV
    <p>P</p>
  </div>
</form>

<script>
  for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
  }
</script>
```
The code sets click handlers on every element in the document to see which ones are working.

If you click on <p>, then the sequence is:

HTML → BODY → FORM → DIV (capturing phase, the first listener):
P (target phrase, triggers two times, as we’ve set two listeners: capturing and bubbling)
DIV → FORM → BODY → HTML (bubbling phase, the second listener).



# Event delegation
Capturing and bubbling allow us to implement one of most powerful event handling patterns called event delegation.

The idea is that if we have a lot of elements handled in a similar way, then instead of assigning a handler to each of them – we put a single handler on their common ancestor.

In the handler we get event.target, see where the event actually happened and handle it.

Say we have a below html
```
<table>
  <tr>
    <th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th>
  </tr>
  <tr>
    <td>...<strong>Northwest</strong>...</td>
    <td>...</td>
    <td>...</td>
  </tr>
  <tr>...2 more lines of this kind...</tr>
  <tr>...2 more lines of this kind...</tr>
</table>
```
The table has 9 cells

Instead of assign an onclick handler to each <td> (can be many) – we’ll setup the “catch-all” handler on <table> element.

It will use event.target to get the clicked element and highlight it.

``` javascript
let selectedTd;

table.onclick = function(event) {
  let target = event.target; // where was the click?

  if (target.tagName != 'TD') return; // not on TD? Then we're not interested

  highlight(target); // highlight it
};

function highlight(td) {
  if (selectedTd) { // remove the existing highlight if any
    selectedTd.classList.remove('highlight');
  }
  selectedTd = td;
  selectedTd.classList.add('highlight'); // highlight the new td
}
```

# Event Dispatching
instead of manual click we let script trigger the click event
innerdiv.click()
