---
layout: post
title: Boosting eUNIQUE - PostgreSQL 8.3
date: '2009-08-17T00:00:00+02:00'
tags:
- postgresql
- performance
- eunique
category: 'PostgreSQL'

---
<p>Moin Moin,</p>

<p>today we finally switched <a href="http://www.e-unique.com" target="_blank">eUNIQUE</a> over from <a href="http://www.postgresql.org" target="_blank">PostgreSQL</a> 8.1 to 8.3. The reason for waiting that long was the hope to finde time to port the implementation of the contrib module tsearch2 to the integrated fulltextsearch (based on tsearch2) of PG 8.3. Even though we did not find the time, we switched.</p>

<p>The process was fairly simple because the onboard programs pg_dump and pg_restore are making the PostgreSQL admin&#8217;s life easy. So we dropped a note to our customers, that the upgrade will take aprox. one hour. Dumping the databases and restoring them took us about 15 minutes - and there have even been some smaller issues so that we had to drop a database and create it again.</p>

<p>Because there was some time left (wow - 45 minutes ;-) ) we decided to check the configuration of our PostgreSQL cluster. Actually we realized, that we had been lousy dbadmins because the configuration (postgresql.conf) was not optimized for the underlying machine (Intel Xeon CPU X3210&#160;2.13GHz, 8&#160;GB ram). </p>

<p>To enable the PostgreSQL to use higher values, it is needed to raise the shared memory settings in the kernel. So you have to rais the following values:</p>

<p>kernel.shmmax = 2147483648<br/>
kernel.shmall = 2147483648</p>

<p>Human readable: 2GB.</p>

<p>Now you are able to raise the following values (not all depend on higher settings for shared memory for sure) in postgresql.conf:</p>

<p># to make VACUUM happy:<br/>
maintenance_work_mem = 480MB </p>

<p># raised form 0.5 to 0.7 to give the process mor time<br/>
checkpoint_completion_target = 0.7&#160;</p>

<p># this is set from 3 to 8 what means there are 128&#160;MB transactionlog befor <br/>
# firering a checkpoint<br/>
checkpoint_segments = 8&#160;</p>

<p># let PG use a lot of RAM for querys so that there is no need to use the hd <br/>
effective_cache_size = 5632MB </p>

<p># let PG use a lot of RAM for sorting, joins and scans<br/>
work_mem = 40MB </p>

<p># enough needed for big transactions <br/>
wal_buffers = 4MB </p>

<p># how much is used by PG - this is raised a lot because of the 8&#160;GB RAM<br/>
shared_buffers = 1920MB </p>

<p># raised from 100 to 200 - we have a quite good machine ;-)<br/>
max_connections = 200&#160;</p>

<p>Be sure to backup your postgresql.conf first. The values are based on the values proposed by <a href="http://pgfoundry.org/projects/pgtune/" target="_blank">pgtune</a>.</p>

<p>After restarting the cluster and checking the application we recognized a really fast and good behaviour (much better than before). We had the feeling that Apache is now the bad guy when a page needs to load a little ;-)</p>

<p>Happy we are!</p>
