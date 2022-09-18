---
layout: post
title: 'Playframework: how to use moreScripts and moreStyles'
date: '2013-02-05T23:52:00+01:00'
tags:
- playframework
- java
category: 'Programming'

---
<h3>Moin Moin,</h3>

<p>actually I am working with the <a href="http://www.playframework.org" target="_blank">http://www.playframework.org</a> in a project. It is MVC web-framework written in Java. I like it because it&#8217;s simple to understand. Ok - maybe better if you already have experience with frameworks like Django or Rails.</p>

<p>What I did not understand a the first glimps is how to use moreScripts and moreStyles in main.html head:</p>

<script src="https://gist.github.com/andywenk/5059702.js"></script><p>But it&#8217;s quite simple because with get one receives the content of a variable and with set, like the name indicates, one sets the value of a variable. The only difference to the variable title in the title-tag above is the fact, that a helper method for JavaScript and CSS files is available. This helper is also setting the path to the files:</p>

<p>Example for moreScripts definition -&gt; public/javascripts</p>

<script src="https://gist.github.com/andywenk/5059710.js"></script><p>Example for moreStyles definition -&gt; public/stylesheets</p>

<script src="https://gist.github.com/andywenk/5059719.js"></script><p>Here is the documentation:</p>

<p><a href="http://www.playframework.org/documentation/1.2.5" target="_blank">http://www.playframework.org/documentation/1.2.5</a></p>

<p>Meno, a colleague told not to use anything else than Playframework 1.2.5. So at this moment, I follow this advice ;-)  </p>

<p>Cheers  </p>

<p>Andy</p>
