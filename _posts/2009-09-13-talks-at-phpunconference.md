---
layout: post
title: talks @ phpunconference
date: '2009-09-13T00:00:00+02:00'
tags:
- phpunconference
- php
category: 'Programming'

---
Moin Moin,

<p>cool - <a href="http://www.php-unconference.de" target="_blank">PHP Unconference</a> is really good this year (again good). I&#8217;ve got the feeling, that the quality and the level of the held talks have grown compared to last year. Here is a short summary of what I heard.
</p>
<h3>Day 1</h3>
<p>
<strong># memcache / <a href="http://blog.nevalon.de/" target="_blank">Gordon Franke</a></strong>
</p>
<p>
<a href="http://de2.php.net/memcache" target="_blank">memcache</a> is RAM based and easy accesible storage system. The talk showed opportunities to use it with PHP. For example it&#8217;s easy to set the session.save_handler to memcache. The performance boost is amazing: ten times faster then using the filesystem.
</p>
<p>
<strong># Netbeans for developer / Ingo Reinhart and Bastian Feder (<a href="https://twitter.com/lapistano" target="_blank">@lapistano</a>)</strong>
</p><p>
<a href="http://netbeans.org/downloads/" target="_blank">Netbeans</a> vs. <a href="http://www.eclipse.org" target="_blank">Eclipse</a> with PDT. Who&#8217;s the winner? For me surely Netbeans. Since I am using Netbeans I don&#8217;t want to bash my monitor or - better - the whole working station because of never ending waiting and Nullpointer Exceptions in Eclipse (sorry to all Eclipse guy&#8217;s ;-) ).
</p>
<p>
Ingo showed us how to use Netbeans. Ok - quite clear. After the session I asked him some stuff about integreating <a href="http://www.xdebug.org/" target="_blank">xdebug</a> and debugging. Very easy and a good choice. At home I was also integrating UnitTests with Netbeans. Assumed that <a href="http://www.phpunit.de/" target="_blank">PHPUnit</a> is installed, Netbeans is generating a skeleton for your tests. Very cool!
</p>
<p>Slides: <a href="http://www.slideshare.net/IngoReinhart/netbeans-fr-phpentwickler" target="_blank"><a href="http://www.slideshare.net/IngoReinhart/netbeans-fr-phpentwickler" target="_blank">http://www.slideshare.net/IngoReinhart/netbeans-fr-phpentwickler</a></a>
</p>
<p>
<strong># PHPillow - <a href="http://kore-nordmann.de" target="_blank">Kore Nordman</a></strong></p>
<p>
Yeah - there we go again. <a href="http://couchdb.apache.org" target="_blank">CouchDB</a> is cool and <a href="http://kore-nordmann.de/blog/phpillow_php_couchdb_wrapper.html" target="_blank">PHPillow</a> is a wrapper for PHP to talk to CouchDB. Kore was talking a lot about how to get data out of CouchDB what is made by creating map and reduce functions. Basically and originally these functions are written in JavaScript but can be written in actually every Language. A brilliant talk with brilliant slides.
</p>
<p>
Slides: <a href="http://kore-nordmann.de/portfolio.html" target="_blank"><a href="http://kore-nordmann.de/portfolio.html" target="_blank">http://kore-nordmann.de/portfolio.html</a></a>
</p>
<p>
<strong># Refactoring - Unit Testing / <a href="http://stubbles.org/" target="_blank">Frank Kleine</a> &amp; Thorsten Rinne</strong>
</p>
<p>
As I mentioned in earlier posts, the need for testing is now burned in my head. And I like it. Frank and Thorsten were talking about how to write code that it is possible to test it at all. The main killers are Singletons and Registry Patterns. So the advice is clear: DON&#8217;T DO IT!
</p>
<p>
Slides: <a href="http://www.stubbles.org/exit.php?url_id=422&amp;entry_id=66" target="_blank"><a href="http://www.stubbles.org/exit.php?url_id=422&amp;entry_id=66" target="_blank">http://www.stubbles.org/exit.php?url_id=422&amp;entry_id=66</a></a>
</p>
<h3>Day 2</h3>
<p>
<strong># Semantic Web - <a href="http://kore-nordmann.de" target="_blank">Kore Nordman</a></strong>
</p>
<p>
Uh - the topic is not really speaking for it self if you don&#8217;t know what &#8220;semantic&#8221; means. But everybody is using it in a way - even if you don&#8217;t know that you use it.
There are different semantics like RDF, RDFa, RDF-Schema, Microformats, OWL, SPARQL (SQL for RDF). Kore explained the way to use these semantics and where the problems can be found. The target is to get more info into HTML so that it is possible to e.g. search for &#8220;All citys of South Africa&#8221;.
</p>
<p>
The main problem is actually, that the browser&#8217;s do not integrate the tags in standard, so we destroy valid HTML. Let&#8217;S see what the future brings.
</p>
<p>
Slides: <a href="http://kore-nordmann.de/portfolio.html" target="_blank"><a href="http://kore-nordmann.de/portfolio.html" target="_blank">http://kore-nordmann.de/portfolio.html</a></a>
</p>
<p>
<strong># MVC - <a href="http://www.priebsch.de/" target="_blank">Stefan Priebsch</a></strong>
</p>
<p>
Nearly nobody is using MVC correctly in web apps. Even the best known frameworks don&#8217;t. The talk was more or les a discussion about using MVC in web apps. Really interesting and my personal point of view was approved again. We don&#8217;t want big frameworks lik ZF - we are artists and write our stuff by ourself (you need not more than one day for a MVC skeleton).
</p>
<p>
Actually I did not hear the last two slots because of lack of interest. I sat together with Arne, Stefan and Sebastian (<a href="http://thephp.cc/" target="_blank">thePHP.cc</a>) and had a good talk about some stuff relating Stefan and Sebastians upcoming book about QA and about code sniffer and the newly written PHP QA by Stefan. PHP QA is a new (and better) code analyzer in development.
</p>
<p>
That was good and fun. Thanks for all the talks in talks or in the lobby!
</p>
<p>
By the way - see the <a href="http://wiki.php-unconference.de" target="_blank">PHP Unconference Wiki </a>for info about all talks (click timetabel saturday and timetable sunday)</p>
