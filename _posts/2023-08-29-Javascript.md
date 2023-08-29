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
    {% include figure.html path="assets/img/javascript/function-definition.jpg" class="img-fluid rounded z-depth-1" height= "75%" width="75%" %}
</div>
</center>



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
