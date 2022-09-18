---
layout: post
title: Compress components in Apache2 (mod_deflate)
date: '2010-01-11T17:39:00+01:00'
tags:
- mod_deflate
- compression
- apache2
- yslow
category: 'Server'

---
<p>Moin,</p>
<p>actually I am reading Steve Souders book <a href="http://www.amazon.de/High-Performance-Web-Sites-Faster-Loading/dp/0596529309/ref=sr_1_3?ie=UTF8&amp;s=books-intl-de&amp;qid=1263225757&amp;sr=8-3" target="_blank">"High Performance Websites"</a>.  He is describing with 14 rules how you can increase the performance of any website. I also saw him live talking <a href="http://jsconf.eu/2009/" target="_blank">@jsconfeu</a> what was really cool ;-) (thanks Steve!).</p>

<p>Creating a bigger project like we do with <a href="http://www.e-unique.com" target="_blank">eUNIQUE</a> is kind of a challenge and fun. But seeing it growing and adding a lot of functionality, requires also a lot of maintenance concerning a good usability behavior. The behavior is often defined (or even mostly) in how fast a page is loading.</p>

<p>Coming back to Steve Souders and his book, leads to one of the biggest most important rules in achieving a good performance of your website: output compression. This will reduce response times up to 75% - 90%. Wow - awesome! So when trying to set this up in <a href="http://httpd.apache.org/" target="_blank">apache2</a>, I was running in some problems.</p>

<p>In apache2, the module which needs to be enabled is called <a href="http://httpd.apache.org/docs/2.2/mod/mod_deflate.html" target="_blank">mod_deflate</a>. For a deeper understanding and further configuration options I recommend reading the docu in depth. To check if the module is enabled you simply fire up this command:</p>

<pre>
# a2enmod deflate
Module deflate already enabled
</pre>

<p>If you see the result shown above, everything is fine. Otherwise enable it first.</p>

<p>Then I was not sure which configuration is need exactly. So here is the most simple way to get compression running, you need the following lines:</p>

<pre>
SetOutputFilter DEFLATE
AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/x-javascript
</pre>

<p>Uh - what does it mean? First of all we define, that DEFLATE shall be used to compress the output served by the webserver. We then declare which file types have to be compressed. Here we compress all text file types including html, xml, css and javascript (!) files. Actually the compression of css and javascript files was the reason what to look for all this (beacause I had an F grade in YSlow ;-( ).</p>

<p>Finally the question was, where to put the directives. If you want to compress all these files for all VirtualHosts you have running, simply put it into your apache2.conf (/etc/apache/apache2.conf). If you want to keep this a little more fine granulated, put it into your VirtualHost container. It doesn&#8217;t matter where you put it there. Although, a good place would be the <directory></directory> or (if you have it) a <location></location> container inside the VirtualHost container.</p>

<p>For testing purposes, I am using <a href="http://developer.yahoo.com/yslow/" target="_blank">YSlow as a Firefox Extension</a>. After setting up the directive&#8217;s in apache and doing a graceful reload &#8230; nothing happened. WTF? After playing around for a while I recognized, that I had to clean the Firefox cache and had to stop and start the apache webserver. Doing so, I could see the positive result (getting a A grade for compressing text files ;-) ) in  YSlow. Chakka!</p>

<p> I think this is a really easy way to increaes the page loading time for your website or project. I strongly encourage you to use it and set it up. Actually I am not sure if you could also use the directives in a .htacces file. Check it out!</p>

<p>Andy</p>
