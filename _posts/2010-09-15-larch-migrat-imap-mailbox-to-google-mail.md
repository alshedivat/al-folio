---
layout: post
title: 'Migrating my IMAP mailbox to Google Mail with larch'
date: '2010-09-15T23:40:00+02:00'
tags:
- google
- google-mail
- larch
- imap-migration
category: 'Server'

---
<p>Moin Moin,</p>

<p>recently I decided to migrate my IMAP mailbox, hosted on one of our server, to Google Mail. There are a lot of advantages using Google Mail or any other (good) web based client. I decided to use Ryan Grove&#8217;s <a href="http://github.com/rgrove/larch" target="_blank">larch</a> Ruby program to get the job done.</p>

<p>There is also <a href="http://www.linux-france.org/prj/imapsync/" target="_blank">imapsync</a> written by Gilles Lamiral in PERL.
</p>
<p>
Everything went quite well besides the fact, that Google is obviously using their own interpretation of the IMAP mailbox folder. I had a lot of issues with subfolders and took the time to move every mail into INBOX.subfolder. Not deeper.
</p>
<p>
Ok quite a lot of work because my mailbox is 2.8&#160;GB big. But what the heck. You don&#8217;t really need a subfolder subfolder in a subfolder structure because Google Mail is using  labels for marking emails. And don&#8217;t forget that there is a really powerful fulltext search. So keep it simple and forget about the subfolder insanity.
</p>
<p>
The cool thing is the fact, that larch is available as a <a href="http://rubygems.org/" target="_blank">gem</a>. So you need ruby (you already have it or you can install it with the supported package manager of your OS) and rubygems. After installing both, simply type:
</p>
<pre>
$ gem install larch
</pre>

<p>
That&#8217;s it. A simple command for transfering a mailbox to google is looking like this:
</p>
<pre>
$ larch --from imap://mail.server.com --to imaps://imap.googlemail.com --from- \ <br/>folder 'INBOX.Andy' --to-folder 'Andy'
</pre>

<p>
This would transfer every mail found in the folder Andy of your IMAP mailbox to a folder Andy in Google mail. After firing this command, you will be promted to give your login credentials of both your IMAP mailbox and of your Google Mail account.
</p>
<p>
You can also use a config file where you write in your credentials and some migration (folder) information. The file can be found in /home/you/.larch/config.yaml. Note that some options are only available in the latest dev version.
</p>
<p>
One good thing more. Larch is tracking the status of the transfer of each email in a sqlite3 database (alos in the .larch folder). So in the normal case, no email will be transfered twice but if the email was not already transfered, larch is trying to do so in a second attempt.
</p>
<p>
My feedback is simple: this is a very easy to use tool and is helping a lot for migrating a IMAP email box to another server. Thanks Ryan &#8230;
</p>

Andy
