---
layout: post
title: MVCC in PostgreSQL
date: '2009-07-15T00:00:00+02:00'
tags:
- mvcc
- postgresql
- couchdb
category: 'PostgreSQL'

---
<p>Moin Moin,</p>

<p>actually I received a tweet to a blog post from J. Chris Anderson (CouchDB developer) with title &#8220;Fixing HTML 5 Storage&#8221;. He is writing about the approaches of implementing a local storage feature to HTML 5 (<a href="http://dev.w3.org/html5/webstorage/#the-storage-interface" target="_blank"><a href="http://dev.w3.org/html5/webstorage/#the-storage-interface" target="_blank">http://dev.w3.org/html5/webstorage/#the-storage-interface</a></a>). Please read his very interesting post at <a href="http://jchrisa.net/drl/_design/sofa/_show/post/Fixing-HTML-5-Storage" target="_blank"><a href="http://jchrisa.net/drl/_design/sofa/_show/post/Fixing-HTML-5-Storage" target="_blank">http://jchrisa.net/drl/_design/sofa/_show/post/Fixing-HTML-5-Storage</a></a>.</p>

<p>He was talking about which the best way would be to implement this feature and is concerned about having no locks while storing or reading data. That means that a multi version concurrency control (MVCC) should be implemented (like also in CouchDB). </p>

<p>MVCC was originally introduced by PostgreSQL (edit: apparently by InterBase - thanx to andreas) and this is a really big advantage compared to database systems with out it. There is a very good article written by Joseph Mitchell about how MVCC is working in PostgreSQL. The article was written 2001 but is still up to dat. I ask you to read it under <a href="http://onlamp.com/pub/a/onlamp/2001/05/25/postgresql_mvcc.html?page=last&amp;x-maxdepth=0" target="_blank"><a href="http://onlamp.com/pub/a/onlamp/2001/05/25/postgresql_mvcc.html?page=last&amp;x-maxdepth=0" target="_blank">http://onlamp.com/pub/a/onlamp/2001/05/25/postgresql_mvcc.html?page=last&amp;x-maxdepth=0</a></a> to get an idea what MVCC in PostgreSQL is.</p>

<p>More about MVCC can also be read in the offical PostgreSQL docu under <a href="http://www.postgresql.org/docs/8.4/interactive/mvcc-intro.html" target="_blank"><a href="http://www.postgresql.org/docs/8.4/interactive/mvcc-intro.html" target="_blank">http://www.postgresql.org/docs/8.4/interactive/mvcc-intro.html</a></a></p>

<p>Andy</p>
