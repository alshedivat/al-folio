---
layout: post
title: Playing with JavaScript callbacks
date: '2010-11-28T21:46:57+01:00'
tags:
- javascript
- callback
category: 'Programming'

---
<h4>Moin Moin,</h4>

<p>while watching a stupid film in TV, what can you better do than playing with Firebug&#8217;s JS console. Actually I played with callbacks. Here ist what I did:</p>

<pre>
console.log("FIRST WAY:")

var fn = (function(param) {
    console.log("param in fn (first way): " + param);
}('bla'));

var action = function(callback) {
    callback;
}

console.log("calling action:");
action(fn);
console.log("action is a: " + typeof action);
console.log("fn is a: " + typeof fn);

console.log(" ")
console.log("OTHER WAY:")

var fn = function(param) {
    console.log("param in fn (other way): " + param);
}

var action = function(callback) {
    var param = 'other way';
    callback(param);
}

console.log("calling action:");
action(fn);
console.log("action is a: " + typeof action);
console.log("fn is a: " + typeof fn);
</pre>

<p>Result:</p>

<pre>
FIRST WAY:
param in fn (first way): bla
calling action:
action is a: function
fn is a: undefined

OTHER WAY:
calling action:
param in fn (other way): other way
action is a: function
fn is a: function
</pre>

<p>Hm - what&#8217;s that? Yeah - just playing around. Actually there are two things which are kind of interesting. First, the anonymous function is called immediately after it was built. Even though it is held in a variable (fn).<br/>
The second thing is, that the typeof fn is undefined. Hm &#8230; I don&#8217;t know why at the moment I am writing this. I would expect it is a string. I will examine this further.</p>

<p>One side note: you have to call the callback in action() in the first approach as a string because it&#8217;s not a function - that&#8217;s why I assume it should be typeof string.

</p><p>The conclusion is: don&#8217;t use the first way because it does not work and does not make sense at all.</p>
