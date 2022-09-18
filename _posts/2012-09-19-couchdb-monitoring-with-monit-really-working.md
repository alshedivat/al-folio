---
layout: post
title: CouchDB monitoring with monit - really working!
date: '2012-09-19T21:18:08+02:00'
tags:
- couchdb
- monit
- heart
category: 'CouchDB'

---
<p>Moin Moin,</p>

<p>I have decided to use the latest development version of <a href="http://couchdb.apache.org/" target="_blank">CouchDB</a> (1.3.0a-272d641-git) on my machine. I am using CouchDB in a shop system to store user like contact requests. Nothing dramatical important.</p>

<p>Since a lot of different software is running on this machine which is important for that shop and it&#8217;s availability is essential (like <a href="http://www.elasticsearch.org/" target="_blank">elasticsearch</a>), I decided to use <a href="http://mmonit.com/monit/" target="_blank">Monit</a> for monitoring and alerting.</p>

<p>Unfortunately I could not get it working with CouchDB. And - surprise, surprise - CouchDB stopped working from time to time (btw - especially version 1.3.0a-72ea7e3-git). I had many approaches and I am aware that a correctly configured Erlang installation should fix the problem, because &#8220;heart&#8221; is taking the monitoring job for CouchDB. But - it still crashed.</p>

<p>So now I am glad that I got it fixed and finally, it&#8217;s dead simple. Her is the (or better my, for me working) solution:</p>

<pre><code>check process couchdb with pidfile /usr/local/var/run/couchdb/couchdb.pid
  group database
  start program = "/etc/init.d/couchdb start -u couchdb"
  stop  program = "/etc/init.d/couchdb stop -u couchdb"
  if failed host 127.0.0.1 port 5984 then restart
  if cpu is greater than 40% for 2 cycles then alert
  if cpu &gt; 60% for 5 cycles then restart
  if 10 restarts within 10 cycles then timeout
</code></pre>

<p>This is the content of the file /etc/monit/conf.d/couchdb.conf and the most important parts are:</p>

<ul><li>correct path to couchdb.pid</li>
<li>start stop CouchDB as user couchdb (-u couchdb)</li>
</ul><p>So if you have trouble with this and just found old or not for you working examples in the w3, check this one ;-)</p>

<p>Cheers</p>

<p>Andy</p>
