Note - Taken from several internet resources
few among them - https://quizlet.com/28293152/front-end-interview-questions-css-flash-cards/
https://neal.codes/blog/front-end-interview-css-questions
https://css-tricks.com/how-to-create-an-ie-only-stylesheet/
currying in js -https://css-tricks.com/how-to-create-an-ie-only-stylesheet/

### 1 What is CSS selector specificity and how does it work?
Specificity is the means by which browsers decide which CSS property values are the most relevant to an element and, therefore, 
will be applied. Specificity is based on the matching rules which are composed of different sorts of CSS selectors.

### 2 What's the difference between "resetting" and "normalizing" CSS? Which would you choose, and why?
CSS resets aim to remove all built-in browser styling. Standard elements like h1 - h6, p, strong, em end up looking exactly alike, having no decoration at all. 
You're then supposed to add all decoration yourself.
ims to make built-in browser styling consistent across browsers. Elements like h1 - h6 will appear bold, larger et cetera in a consistent way across browsers. 
You're then supposed to add only the difference in decoration your design needs.

### 3 Describe Floats and how they work.
There are left , right and none for float . 
Each value indicates how an element should float. When float is set, each element will get out of its normal flow and will be shifted to the specified direction, until it gets its container or another floated element.

### 4 Describe z-index and how stacking context is formed.

A stacking context is formed, anywhere in the document, by any element in the following scenarios: Root element of document (HTML). 
Element with a position value "absolute" or "relative" and z-index value other than "auto".

### 5
- Empty Div Method:
<div style="clear:both;"></div>

- Overflow Method: setting auto or hidden overflow property on parent will expand it to contain the floats.

- The Psuedo Method: uses the parent's :after to add the clear: both property
.clearfix:after { 
content: "."; 
visibility: hidden; 
display: block; 
height: 0; 
clear: both;
}
### 6 How would you approach fixing browser-specific styling issues?

Use a separate stylesheet that only loads when that specific browser is being used. Thankfully, the days of IE specific stylesheets are almost gone.
