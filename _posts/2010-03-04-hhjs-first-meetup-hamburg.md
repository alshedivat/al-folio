---
layout: post
title: First HH.js meet up in Hamburg
date: '2010-03-04T16:18:35+01:00'
tags:
- hhjs
- javascript
category: 'Programming'

---
<p>Moin Moin,</p>

<p>yesterday, the first HH.js meet up took place in the nice lounge of SinnerSchrader in Hamburg. About 30 JavaScript geeks (some of them called them self newbie) attended and expected a cool first meeting.</p>

<p>First of all I wanna say thank you (again ;-) ) to Malte for organizing this and thanks to SinnerSchrader for letting the people use their lounge and supporting the meetup with Pizza and drinks. #awesome!</p>

<p>The first topic was <a href="http://nodejs.org" target="_blank">Node</a>. <a href="http://twitter.com/felixge" target="_blank">Felix Geisendörfer</a> was traveling from Berlin to Hamburg to give his talk. Actually he&#8217;s taking part in the project with bugfixing and further development. It&#8217;s a good idea to have look at <a href="http://debuggable.com/posts/javascript-meetup-hamburg-slides:4b8f9986-4e64-4755-b420-074dcbdd56cb" target="_blank">the slides he uploaded at his blog</a>.</p>

<p>Node was invented by <a href="http://twitter.com/ryah" target="_blank">Ryan Dahl</a> and is made for serverside JavaScript. It is built on <a href="http://code.google.com/p/v8/" target="_blank">Google&#8217;s Open Source JavaScript engine V8</a> which is in these day&#8217;s the fastest engine available (it does not build binary code but immediately machine code). The big thing is the fact, that Node is providing asynchronous I/O. This is implemented with callback functions and is giving a big advantage compared to other implementations. <a href="http://nodejs.org/#about" target="_blank">Read more about Node and it&#8217;s functionality here</a>.</p>

<p>Felix took us on a journey through Node. He explained the way Node works and showed some examples like an simple http or tcp server. It&#8217;s written just in a few lines of code. He also introduced future goals namely the support for <a href="http://en.wikipedia.org/wiki/Web_worker" target="_blank">web workers</a>, readable and writable streams, better socket support and so on. </p>

<p>Within the bonus slides he introduced his project Dirty which is basically a mixture of the principle ideas behind <a href="http://couchdb.apache.org/" target="_blank">CouchDB</a> (document based database with a RESTful API) and <a href="http://code.google.com/p/redis/" target="_blank">Redis</a> (an advanced key-value store) to provide a &#8220;scriptable key-value store&#8221;.  The sources can be found at <a href="http://github.com/felixge/node-dirty" target="_blank">github</a>. </p>

<p>Node is still Alpha and the API is changing a lot without backwards compatibility. It is planned that version 0.2 will be released in between the next 4 - 6 weeks. But Felix mentioned a s a side note, that this goal was set up already half a year ago ;-). When Version 0.2 comes out, a freeze will ensure backwards compatibility for the first time. After that it will be possible to use it in production - for sure at your own risk.</p>

<p>So this was really interesting and for sure in many parts kind of &#8220;JavaScript - advanced&#8221;.  </p>

<p>After a short break and another beer,<a href="http://twitter.com/cramforce" target="_blank"> Malte</a> introduced <a href="http://code.google.com/p/joose-js/" target="_blank">Joose</a>. Joose is a meta object system for JavaScript including classes, inheritance, mixins, traits, method modifiers and other stuff. In his slides, he is taking the idea of M.C. Escher pictures to explain, that Joose is &#8220;programmed in itself (self-hosting)&#8221; and cannot crash. Better said, it works completely or does not work at all. To find out more about metaprogramming, refer to<a href="http://en.wikipedia.org/wiki/Metaprogramming" target="_blank"> this Wiki page</a> - to be honest, I am not able to explain it in depth ;-).</p>

<p>After meeting Malte the first time I played around with Joose in some smaller projects. For me coming from OOP in PHP, it was really cool to have the same paradigms in a simple way available in JavaScript. It is helping a lot to develop good structured code. But furthermore there are cool things like before or after methods. Using them in a child class is giving the possibility to do something before or after a method from the parent class is fired. </p>

<p>Joose in depth is really powerful and is providing a lot of mechanisms to write really wicked stuff.</p>

<p>After Felix and Malte&#8217;s talks, some discussions arose. Basically everybody was kind of &#8220;enlightened&#8221; with the possibility&#8217;s available with JavaScript. One setup could be Node as the server (e.g. http) + Joose for coding + CouchDB as the storage  engine. Pure, damn&#8217; JavaScript. A lot of fun &#8230; ;-)</p>

<p>While writing this, I found another <a href="http://openjsan.org/doc/s/sa/samuraijack/Joose/3.006/lib/Joose/Manual.html" target="_blank">Joose manual here</a>. It&#8217;s good and you should take a look here also.</p>

<p>I am looking forward for the next meet up and hope, that it will take place maybe next month?</p>
