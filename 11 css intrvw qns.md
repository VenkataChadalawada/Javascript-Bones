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

### 14. What are pseudo classes and what are they used for?
Pseudo classes are similar to pseudo elements, but instead of styling a part of an element, they apply styles when an element is in a certain state. For example, you could style a button differently based on whether the user has their mouse pointer over it, or when they click the button.

Another common use case is to style only certain occurrences of elements in a row. For example, styling the first tab in a series of tabs, or every second tab.

### 15. What are pseudo elements and what are they used for?
Pseudo elements are used to style particular parts of an element, rather than the whole thing. For example, you can use it to style the first line or first letter of a paragraph, text you’ve selected, or you can use it to insert text or shapes before or after an element.

They always start with a double colon - although a single colon is still allowed for backwards compatibility - and they look like this:

p::first-line { ... }
span::first-letter { ... }
::selection { ... }
.header::after { ... }
.tooltip::before { ... }

They all start with a single colon and look like this:

.link:hover { ... }
.link:active { ... }
.tab:first-child { ... }
.tab:last-child { ... }
.avatar:nth-child(2n) { ... }

### 16. How would you use media queries in a mobile-first approach?
There’s no way to avoid these nowadays, everyone expects their website to work on mobile devices, even if they don’t specifically ask for it.

The most common approach is the mobile-first one. All styles outside of media queries are targeted at mobile devices. Then, through progressively larger media queries, you can style larger screens one step at a time.

/* mobile styles */
body { 
    font-size: 1em;
}

/* desktop styles */
@media only screen and (min-width: 768px) {
    body {
        font-size: 1.5em;
    }
}

### 17. Do you use any tools for browser support?
One of my favourite online tools is caniuse.com. It’s a website that tells you exactly which browsers support which features, including CSS and JavaScript, which can be extremely helpful in finding out what you can and can’t use!

### 18. Have you used Flexbox & CSS Grid before? What are the differences between them?
Recently we’ve seen the rise of Flexbox and even more recently, CSS Grid. While these aren’t well supported in older browsers, support for them in newer browsers is continuously growing and now is the time to look into them and see if you can start using them. Make sure you check browser support!

Flexbox is a very useful layout tool, especially for smaller areas within the site. Its main features are to align items in horizontal or vertical axes, space them out automatically, invert the order in which they’re displayed, along with a few other layout options.

CSS Grid is more of a layout tool for the entire page. While Flexbox excels in laying out items along a single axis, Grid is better for layouts with both horizontal and vertical axes, i.e. grids!

### 19. Do you use any CSS preprocessors, and which do you prefer?
If you’re working on a medium to large project, it’d be a good idea to use a CSS preprocessor. They allow you to write more concise CSS, split it up into multiple files and use a large number of very useful functions and mixins (you can even create your own!), along with variables.

The main players are Sass (also referred to as SCSS), LESS and Stylus, although arguably Sass is the biggest. I’ll be using Sass in the following examples.

### 20. Do you use any CSS preprocessors, and which do you prefer?
If you’re working on a medium to large project, it’d be a good idea to use a CSS preprocessor. They allow you to write more concise CSS, split it up into multiple files and use a large number of very useful functions and mixins (you can even create your own!), along with variables.

The main players are Sass (also referred to as SCSS), LESS and Stylus, although arguably Sass is the biggest. I’ll be using Sass in the following examples.

### 21. What is file splitting and why should you use it?
File splitting helps organize your CSS into multiple files, decreasing page load time and making things easier to manage. If you’re working with any of the preprocessors above, you can start splitting up your files.

How you decide to split them up is up to you, but it can be useful to separate files by component. For example, you can have all your button styles in a file called _buttons.scss or all your header-specific styles in a file called _header.scss. Then, in your main file, say _app.scss, you can import those files by writing @import 'buttons';

This way you can also create separate stylesheets for separate areas of your website, where you might not need all styles. For example, if you have a web app, you probably don’t need to load all styles when people land on your homepage, when they haven’t even logged into your app yet. Simply create another file and import only those styles you need.

### 22. What are variables used for?
Variables are super useful for things like colors, fonts, font sizes, and certain dimensions, as you can be sure you’re always using the same ones, not 4 different versions of roughly the same color.

$primary-font-stack: 'Helvetica', sans-serif;
$primary-color: #fccd48;

body {
    color: $primary-color;
    font-family: $primary-font-stack;
}
### 23. What are functions/mixins?
Mixins are a very handy way of adding a number of styles, based on a particular input parameter. For example, you might always want to add fallback styles when adding border-radius, but you don’t necessarily know what value you might want.

@mixin border-radius($radius) {
    -webkit-border-radius: $radius;
       -moz-border-radius: $radius;
        -ms-border-radius: $radius;
            border-radius: $radius;
}

.box {
    @include border-radius(10px);
}
