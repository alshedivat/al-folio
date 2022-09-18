---
layout: post
title: PHPUnit - testing php apps
date: '2009-06-09T00:00:00+02:00'
tags:
- php
- phpunit
- tdd

---
Moin Moin,

I am a bad programmer! This is the conclusion after reading the first lines of <a href="http://sebastian-bergmann.de/" target="_blank">Sebastian Bergmanns</a> <a href="http://www.phpunit.de/manual/3.4/en/index.html" target="_blank">manual for PHPUnit</a>. 

<em>"Even good programmers make mistakes. The difference between a good programmer and a bad programmer is that the good programmer uses tests to detect his mistakes as soon as possible. The sooner you test for a mistake the greater your chance of finding it and the less it will cost to find and fix."</em>

Ok - I will take my first words not too serious but I have to admit, that I do not develop test driven. The reason for that is the fact, that I never had an idea how to do it. I bought Sebastian Bergmanns <a href="http://www.amazon.de/PHPUnit-kurz-gut-Sebastian-Bergmann/dp/3897215152/ref=sr_1_2?ie=UTF8&amp;s=books&amp;qid=1244538197&amp;sr=8-2" target="_blank">"quick and dirty" PHPUnit</a> book some years ago but did not tune in to it any further. Another reason ist the fact, that <a href="http://www.e-unique.com" target="_blank">eUNIQUE</a> for example was started without any testing. Drilling tests afterwards into was expected too expensive. 

Since I have an account at <a href="http://github.com/andywenk" target="_blank">github</a> and are following some folks programming in Python or Ruby I recognized, that no software is going over the wire without tests. Which is a good thing in my opinion. Realizing that we have some really stupid bugs in our software (and also in other projects of mine) opened the disussion about using tests again - at least in my mind. But mentioning, using tests would definitely be a good idea was thrown to ground with the answer: there&#8217;s no time to do that. I don&#8217;t believe in that. I think the opposite is the truth. Thanks to a tweet from Stefan Bergmann, that the PHPUnit Manual has a new CSS style, I started to read it. I will drop my experiences here in the next few posts because now I will start using tests!

<strong>Installing PHPUnit</strong>

You know that I am using an <a href="http://www.debian.org" target="_blank">Debian based system</a>. So sorry to all the other geeks out there when I just explain stuff based on this OS. It shouldn&#8217;t be a big thing to adapt this to other OS.

PHPUnit is delivered by <a href="http://pear.php.net/" target="_blank">PEAR</a>. I was running in a small issue when trying to install PHPUnit like explained in the manual. The reason was the wrong PEAR Installer. Fix it like this:

If you never used PEAR or it might be old, simply reinstall it (just to be save):

<pre>$ sudo aptitude reinstall php-pear</pre>

Next step is to add the channel for PHPUnit

<pre>$ sudo pear channel-discover pear.phpunit.de
Adding Channel "pear.phpunit.de" succeeded
Discovery of channel "pear.phpunit.de" succeeded</pre>

Good - now we try to install PHPUnit (output shortened):

<pre>$ sudo pear install phpunit/PHPUnit
...
phpunit/PHPUnit requires PEAR Installer (version &gt;= 1.8.1), installed version is 1.7.1
...
No valid packages found
install failed</pre>

Ok - this did not work. So we have to update the PEAR installer. Checking out the PEAR page helps. Follow these steps (shortened):

<pre>$ sudo pear upgrade --force <a href="http://pear.php.net/get/PEAR-1.4.3.tar" target="_blank">http://pear.php.net/get/PEAR-1.4.3.tar</a>
downloading PEAR-1.4.3.tar ...
Starting to download PEAR-1.4.3.tar (Unknown size)
.............done: 1,745,408 bytes
WARNING: channel "pear.php.net" has updated its protocols, use "channel-update pear.php.net" to update
...
downloading Archive_Tar-1.3.3.tgz ...
Starting to download Archive_Tar-1.3.3.tgz (18,119 bytes)
...done: 18,119 bytes
upgrade ok: channel://pear.php.net/Archive_Tar-1.3.3
upgrade ok: channel://pear.php.net/PEAR-1.4.3
...
</pre>

Ok - now we follow the instructions of upgrading the protocol:

<pre>$ sudo pear channel-update pear.php.net
Retrieving channel.xml from remote server
Update of Channel "pear.php.net" succeeded</pre>

Then we upgrade PEAR (output shortened):
<pre>
$ sudo pear upgrade PEAR
downloading PEAR-1.8.1.tgz ...
Starting to download PEAR-1.8.1.tgz (290,382 bytes)
........................................done: 290,382 bytes
downloading XML_Util-1.2.1.tgz ...
Starting to download XML_Util-1.2.1.tgz (17,729 bytes)
...done: 17,729 bytes
upgrade ok: channel://pear.php.net/XML_Util-1.2.1
upgrade ok: channel://pear.php.net/PEAR-1.8.1</pre>

And finally we install PHPUnit (shortened):

<pre>$ sudo pear install phpunit/PHPUnit
downloading PHPUnit-3.3.17.tgz ...
Starting to download PHPUnit-3.3.17.tgz (272,418 bytes)
..........................................done: 272,418 bytes
install ok: channel://pear.phpunit.de/PHPUnit-3.3.17</pre>

Tata &#8230; that&#8217;s it. If you want, you can install the optional packages. If want to install all the dependencies add the option &#8212;alldeps to the install command. The output will be like this (quite long - sorry):

<pre>$ sudo pear install --alldeps phpunit/PHPUnit
WARNING: "pear/DB" is deprecated in favor of "pear/MDB2"
phpunit/PHPUnit can optionally use PHP extension "pdo_sqlite"
phpunit/PHPUnit can optionally use PHP extension "xdebug" (version &gt;= 2.0.0)
pear/Log can optionally use PHP extension "sqlite"
downloading PHPUnit-3.3.17.tgz ...
Starting to download PHPUnit-3.3.17.tgz (272,418 bytes)
........................................done: 272,418 bytes
downloading Image_GraphViz-1.2.1.tgz ...
Starting to download Image_GraphViz-1.2.1.tgz (4,872 bytes)
...done: 4,872 bytes
downloading Log-1.11.4.tgz ...
Starting to download Log-1.11.4.tgz (44,275 bytes)
...done: 44,275 bytes
downloading DB-1.7.13.tgz ...
Starting to download DB-1.7.13.tgz (132,246 bytes)


...done: 132,246 bytes
downloading MDB2-2.4.1.tgz ...
Starting to download MDB2-2.4.1.tgz (119,790 bytes)
...done: 119,790 bytes
downloading Mail-1.1.14.tgz ...
Starting to download Mail-1.1.14.tgz (17,537 bytes)
...done: 17,537 bytes
downloading Net_SMTP-1.3.2.tgz ...
Starting to download Net_SMTP-1.3.2.tgz (10,247 bytes)
...done: 10,247 bytes
downloading Auth_SASL-1.0.2.tgz ...
Starting to download Auth_SASL-1.0.2.tgz (5,645 bytes)
...done: 5,645 bytes
install ok: channel://pear.phpunit.de/PHPUnit-3.3.17
install ok: channel://pear.php.net/Image_GraphViz-1.2.1
install ok: channel://pear.php.net/Log-1.11.4
install ok: channel://pear.php.net/DB-1.7.13
install ok: channel://pear.php.net/MDB2-2.4.1
install ok: channel://pear.php.net/Mail-1.1.14
install ok: channel://pear.php.net/Net_SMTP-1.3.2
install ok: channel://pear.php.net/Auth_SASL-1.0.2
MDB2: Optional feature fbsql available (Frontbase SQL driver for MDB2)
MDB2: Optional feature ibase available (Interbase/Firebird driver for MDB2)
MDB2: Optional feature mysql available (MySQL driver for MDB2)
MDB2: Optional feature mysqli available (MySQLi driver for MDB2)
MDB2: Optional feature mssql available (MS SQL Server driver for MDB2)
MDB2: Optional feature oci8 available (Oracle driver for MDB2)
MDB2: Optional feature pgsql available (PostgreSQL driver for MDB2)
MDB2: Optional feature querysim available (Querysim driver for MDB2)
MDB2: Optional feature sqlite available (SQLite2 driver for MDB2)
MDB2: To install optional features use "pear install pear/MDB2#featurename"</pre>

As you can see it&#8217;s quiet simple to install PHPUnit. The last step is to check wheter everything is good or not by writing a simple test (taken from the manual). Create a new file named StackTest.php and write the following into it:

<pre>
<?php require_once 'PHPUnit/Framework.php';

class StackTest extends PHPUnit_Framework_TestCase {
    public function testPushAndPop() {
        $stack = array();
        $this->assertEquals(0, count($stack));

        array_push($stack, 'foo');
        $this-&gt;assertEquals('foo', $stack[count($stack)-1]);
        $this-&gt;assertEquals(1, count($stack));

        $this-&gt;assertEquals('foo', array_pop($stack));
        $this-&gt;assertEquals(0, count($stack));
    }
}
?&gt;</pre>

Now let&#8217;s see if we can use PHPUnit:

<pre>$ phpunit --verbose StackTest
PHPUnit 3.3.17 by Sebastian Bergmann.

StackTest
.

Time: 0 seconds

OK (1 test, 5 assertions)</pre>

If you see this result, everything works. 

That&#8217;s it for this time. In the next posts I will write about the integration of unit tests in our software - but don&#8217;t ask me when ;-). Please go and read the manual for PHPUnit in the meantime. Thanks to Sebastian Bergman!

Andy
