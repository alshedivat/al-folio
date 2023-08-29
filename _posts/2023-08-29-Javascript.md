---
layout: post
title: Javascript
date: 2023-08-28
description: Javascript basics
tags: javascript code js
categories: code
featured: true
toc:
  sidebar: left
---
# Javascript basics
<center>
  <div class="row justify-content-center align-items-center">
    {% include figure.html path="assets/img/javascript/function-definition.jpg" class="img-fluid rounded z-depth-1" height= "100%" width="100%" %}
  </div>
</center>

# Java basics lewagon

The Client-side Programming Language
What’s with the name?
JavaScript != Java
JavaScript Version ES6: (Short for ECMAScript Edition 6) released in 2015

JavaScript vs. Ruby
Being both OOP languages, JavaScript and Ruby share a lot of commonalities.
---

# Declaring variables

You have to say const or let.

````markdown
```javascript
// with `const` variables reassignment is forbidden
const fullName = "Sebastien Saunier";
const message  = `Hello ${fullName}`;

// `let` variables can be reassigned with another value
let total = 0;
total += 1;
```
````
---

# Objects

Ruby calls them hashes, JavaScript calls them objects.

````markdown
```ruby
const student = {
  firstName: "Boris",
  lastName: "Paillard"
}
```
````
---
But JavaScript gives an even shorter syntax for getting/setting values:

````markdown
```javascript
student.firstName // gets the value "Boris"

student.firstName = "Romain" // sets the value to "Romain"
```
````
JavaScript doesn’t have symbols like Ruby, so objects generally have String keys.

---
# if statements
const age = 17;

`````markdown
```javascript
if (age >= 18) {
  console.log("You can vote");
} else if (age === 17) {
  console.log("You can't vote yet, but you will be able to soon!")
} else {
  console.log("You can't vote");
}
```
````
Note: to check equality, Ruby uses == but JavaScript uses ===
---

# Functions
This is called an arrow function and is how we do things in ES6 💪

````markdown
```javascript
// Defining a function
const addition = (param1, param2) => {
  return param1 + param2;
};

// Calling a function
addition(10, 5);
```
````

{% details Another method %}
````markdown
```javascript
// Inline arrow function, with implicit return
const addition = (param1, param2) => param1 + param2;

// Or the old way
function addition(param1, param2){
  return param1 + param2;
}
```
````
{% enddetails %}

---

# Live-code: Capitalize

Let’s livecode an arrow function and store it into capitalize.

````markdown
```javascript
const capitalize = (word) => {
  const firstLetter = word[0].toUpperCase();
  const restOfTheWord = word.substring(1).toLowerCase();
  return `${firstLetter}${restOfTheWord}`;
};

capitalize("wagon") === "Wagon"
capitalize("codIng") === "Coding"
```
````


# Interacting with the DOM
The most important method
````markdown
```javascript
document.querySelector(CSS_SELECTOR);
```
````

Selecting an element with an id

<code><ul id="players"></ul><code>

````markdown
```javascript
const list = document.querySelector("#players"); // CSS id selector

// you will also occasionally see this, which does the same thing:
const list = document.getElementById("players"); // no need for a `#`
```
````
---

# Elements with no id?

  -  Basic CSS selectors
Reminder
````markdown
```css
p               /* Type selector  */
.red            /* Class selector */
#players        /* ID selector    */
```
````

  - Advanced CSS selectors
Reminder
````markdown
```css
ul .active     /* Descending combinator */
ul > .active   /* Child combinator */
```
````
---

# Append content
  - traduction en francais = ajouter du contenu

We are using the Element#insertAdjacentHTML method.

````markdown
```javascript
list.insertAdjacentHTML("beforeend", "<li>Luke</li>");
list.insertAdjacentHTML("beforeend", "<li>Anakin</li>");
```
````
---

# Selecting from a subset of the DOM
  - You can call querySelector on any element!

````markdown
```html
<p class="red">A red paragraph</p>

<ul id="players">
  <li class="green">Luke</li>
  <li class="red">Anakin</li>
</ul>
```
````
````markdown
```javascript
const list = document.querySelector("#players");
const element = list.querySelector(".red");
console.log(element.innerText);
// => ?
Anakin
```
````
---

# Selecting several elements
  - We want to select all winners

````markdown
```html
<ol id="fifa-wins">
  <li>Brazil (5 wins)</li>
  <li>Germany (4 wins)</li>
  <li>Italy (4 wins)</li>
  <li>Argentina (3 wins)</li>
  <li>Uruguay (2 wins)</li>
</ol>
```
````
````markdown
```javascript
const countries = document.querySelectorAll("#fifa-wins li");
//countries is a NodeList variable. This operates similarly to an Array.
```
````

Use the right method
````markdown
```javascript
const countries = document.querySelector("#fifa-wins li");
// => <li>Brazil (5 wins)</li>
// querySelector returns the first element it finds!
```
````

````markdown
```javascript
const countries = document.querySelectorAll("#fifa-wins li");
// => NodeList(5) [li, li, li, li, li]
// querySelectorAll returns them all in a list!
```
````

 Append "France (2 wins)" to the list.
````markdown
```javascript
const list = document.querySelector('#fifa-wins');
list.insertAdjacentHTML('beforeend', '<li>France (2 wins)</li>');
```
````

# Show / Hide
Use HTMLElement.style

````markdown
```javascript
const element = document.querySelector(CSS_SELECTOR);
// Hide
element.style.display = "none";
// Show
element.style.display = "";
Add / Remove a class
```
````
---

# Use classList

````markdown
```javascript
element.classList.add("red");
element.classList.remove("red");
element.classList.toggle("red");
```
````
---

# Read / Write inputs
````markdown
```html
<input name="email" id="email" value="paul@gmail.com" />
```
````

````markdown
```javascript
const emailInput = document.querySelector("#email");
// Read
console.log(emailInput.value);
// Write
emailInput.value = "john@gmail.com";
```
````
# Extract text / HTML
````markdown
```html
<a href="https://www.lewagon.com" id="home">Le Wagon <em>rocks</em></a>
```
````

````markdown
```javascript
const home = document.querySelector("#home");
console.log(home.innerText);
console.log(home.innerHTML);
console.log(home.attributes.href.value);

home.innerHTML = "Le Wagon <strong>rocks</strong>!"; // Update HTML
```
````



---
addeventlistener is a method that takes two arguments, the first is the event type, the second is a function that will be called when the event occurs. example:
```javascript
document.addEventListener('click', function() {
  console.log('The document was clicked');
});
```
before addEventlistener we have to select the element we want to add the event to. Here are the elements we can select:
```javascript
document.getElementById('id');
document.getElementsByClassName('class');
document.getElementsByTagName('tag');
document.querySelector('css selector');
document.querySelectorAll('css selector');
```
there is not only document there is also window, which is the global object in client-side JavaScript, and represents the browser window that our code is running inside. It's where the global variables and functions we create live, and we can access it as window. or just as a global object. example:
```javascript
window.alert('Hello world!');
window.addEventListener('load', function() {
  console.log('window loaded');
});
```

# Comment

After the // or /*, you can write anything you want. The browser will ignore it.

````markdown
```javascript
// Change heading:
document.getElementById("myH").innerHTML = "My First Page";

// Change paragraph:
document.getElementById("myP").innerHTML = "My first paragraph.";
```
````

---
# For more
-  [Codetogo](https://codetogo.io/all/)
