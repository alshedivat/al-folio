---
layout: post
title: using rvm aliases -
date: '2013-03-01T15:15:43+01:00'
tags: [rvm]
category: 'Server'

---
<p>Moin Moin,</p>

<p>let&#8217;s assume, you have many different Ruby&#8217;s for your projects and you want to keep your gems separate in each Ruby. The best way (in my experience) is to use different Ruby versions and use there the needed gems for this kind of application. An example:</p>

<p>You have different Rails 2.3.17 applications. When running against a Mock, you use ruby-1.8.7-p371, when running against a WebService, you use jruby-1.7.2.</p>

<p>Then you have different Rails 3.2.12 applications. When running against a Mock, you use ruby-1.9.3-p392, when running against a WebService, you use jruby-1.7.3.</p>

<p>So this is what we&#8217;ve got so far:</p>

<script src="https://gist.github.com/andywenk/5064886.js"></script><p>Well, to remember this, some unnecessary brain activity is needed. Let&#8217;s simplify that with creating some aliases:</p>

<script src="https://gist.github.com/andywenk/5064902.js"></script><p>Nice. Now we could write rvm use salesm. But when using rvm list, we don&#8217;t see the aliases listed. Simple enough, we creat an alias in ~/.bashrc or ~/.bash_profile:</p>

<script src="https://gist.github.com/andywenk/5064913.js"></script><p>Now we can see both results from rvm list and rvm alias list:</p>

<script src="https://gist.github.com/andywenk/5064917.js"></script><p>Simple and helpful &#8230; isn&#8217;t it?</p>

<p>Cheers</p>
