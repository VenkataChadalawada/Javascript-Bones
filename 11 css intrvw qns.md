Note - Taken from several internet resources
few among them - https://quizlet.com/28293152/front-end-interview-questions-css-flash-cards/
https://neal.codes/blog/front-end-interview-css-questions
https://css-tricks.com/how-to-create-an-ie-only-stylesheet/
https://github.com/yangshun/front-end-interview-handbook/blob/master/questions/css-questions.md
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

### 7 Can you give an example of an @media property other than screen?

@media queries support 4 different types; all, screen, print, and speech. It is quite common for a site to provide different styles for pages that would be printed; different color schemes (B&W) maybe required, hiding background images, as well as addressing hidden information that could be relevant when printed.

### 8 What are some of the "gotchas" for writing efficient CSS?
There are some other types but they will be removed in the css level 4 spec.

Primarily about efficient css selectors

- Avoid key selectors that match large numbers of elements (tag and universal selectors)

- Prefer class and ID selectors over tag selectors

- Avoid redundant selectors

- Preferably don't use * (universal selector)


*And like any other code, try group and reuse common properties.
Ref: https://www.w3schools.com/cssref/css3_pr_mediaquery.asp

### 9 svg exmpl
<rect x="10" y="10" width="100" height="100" stroke="blue" 
  fill="purple" fill-opacity="0.5" stroke-opacity="0.8"/>
  
### 10 preprocessors like less saas
Describe what you like and dislike about the CSS preprocessors you have used.
Likes:

Mostly the advantages mentioned above.
Less is written in JavaScript, which plays well with Node.
Dislikes:

I use Sass via node-sass, which is a binding for LibSass written in C++. I have to frequently recompile it when switching between node versions.
In Less, variable names are prefixed with @, which can be confused with native CSS keywords like @media, @import and @font-face rule.
### 11. Can default property value be restored through CSS? If yes, how?

In CSS, you cannot revert back to old values due to lack of default values. The property can be re- declared to get the default property.

### 12. Enlist the various Media types used?

Different media has different properties as they are case insensitive.

They are:

Aural – for sound synthesizers and speech
Print – gives a preview of the content when printed
Projection- projects the CSS on projectors.
Handheld- uses handheld devices.
Screen- computers and laptop screens.
29. What is CSS Box Model and what are its elements?

This box defines design and layout of elements of CSS. The elements are:

Margin: the top most layer, the overall structure is shown
Border: the padding and content option with a border around it is shown.  Background color affects the border.
Padding: Space is shown. Background colour affects the border.
Content: Actual content is shown.

### 13. What is contextual selector?

Selector used to select special occurrences of an element is called contextual selector. A space separates the individual selectors. Only the last element of the pattern is addressed in this kind of selector. For e.g.: TD P TEXT {color: blue}
