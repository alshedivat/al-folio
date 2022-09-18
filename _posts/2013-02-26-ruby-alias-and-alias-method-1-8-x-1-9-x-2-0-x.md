---
layout: post
title: ruby alias and alias_method 1.8.x, 1.9.x, 2.0.x
date: '2013-02-26T13:37:00+01:00'
tags:
- ruby
- alias_method
- alias
category: 'Programming'

---
<p>Moin Moin,</p>

<p>it took me a moment to understand how this is working. Actually there are no good examples for the usage of alias and alias_method in the w3 so I decided to post this here.</p>

<p>The code for the examples can be found here:
<a href="https://gist.github.com/andywenk/5038259" target="_blank"><a href="https://gist.github.com/andywenk/5038259" target="_blank">https://gist.github.com/andywenk/5038259</a></a></p>

<p>Here is a basic example for the usage of <strong>alias</strong>:</p>

<script src="https://gist.github.com/andywenk/5059628.js" type="text/javascript"></script><p>The output is:</p>

<p><em>Example with the usage of alias</em><br/><em>I am the total perfect method</em></p>

<p>The first thing to mention, is that this will not work, when one is writing the <em>alias</em> line before the <em>even_nicer_method</em>. The reason is, that <em>alias</em> is a Ruby keyword and is immediately executed, when the source is parsed. So the method <em>even_nicer_method</em> has to be declared in advance.</p>

<p>Now an example for the usage of <em>alias_method</em>:</p>

<script src="https://gist.github.com/andywenk/5059638.js" type="text/javascript"></script><p>The output is:</p>

<p><em>Example with the usage of alias</em><br/><em>AliasMethod::even_nicer_method called</em></p>

<p>On first sight, it seems to be the same. The big difference is found in scoping. Here is an example using inheritance which is working also in both ways:</p>

<script src="https://gist.github.com/andywenk/5059644.js" type="text/javascript"></script><p>The output is for both alias and alias_method:</p>

<p><em>Example for inheritance</em><br/><em>I am the Mother</em></p>

<p>But when using class methods, things are changing:</p>

<script src="https://gist.github.com/andywenk/5059647.js" type="text/javascript"></script><p>In this constructed situation, a class method <em>my_name</em> is defined in <em>MotherScope</em> and is beeing called in <em>ChildScope</em>. So the question is, how <strong>self</strong> is handled.</p>

<p>The output when using alias in <em>MotherScope.my_name</em> is:</p>

<p><em>Example for class methods in inheritance (scope!)</em><br/><em>I am the Mother</em></p>

<p>The output when using alias_method in MotherScope.my_name is:</p>

<p><em>Example for class methods in inheritance (scope!)</em><br/><em>I am the Child</em></p>

<p>Why? Because when using alias, self is the thing when parsing the source code. That means, self &#8220;is pointing&#8221; to <em>MotherScope</em>. But when using <em>alias_method</em>, the scope is the one found during runtime!</p>

<p>I hope this makes the usage and difference between alias and alias_method clear. While writing this I found these two posts - so yes there are at least some posts ;-):</p>

<p><a href="http://andreacfm.com/2012/11/29/ruby-alias-vs-alias-method/" target="_blank"><a href="http://andreacfm.com/2012/11/29/ruby-alias-vs-alias-method/" target="_blank">http://andreacfm.com/2012/11/29/ruby-alias-vs-alias-method/</a></a></p>

<p><a href="http://blog.bigbinary.com/2012/01/08/alias-vs-alias-method.html" target="_blank"><a href="http://blog.bigbinary.com/2012/01/08/alias-vs-alias-method.html" target="_blank">http://blog.bigbinary.com/2012/01/08/alias-vs-alias-method.html</a></a></p>

<p>Cheers</p>
