---
layout: post
title: Why GIT is the only SCM you should use for your projects!
date: '2012-08-14T12:00:00+02:00'
tags:
- git
- torvalds
- scm
- svn
- cvs
category: 'Server'

---
<p>Moin Moin,</p>

<p>after having been assimilated by SinnerSchrader in 2010, I started to use GIT on a daily basis and immediately loved it. I got in touch already when I played around with CouchApp because Benoit Chesneau used GIT for the source code. So I registered at github.com and started to use it.</p>

<p>To be honest, the first SCM I used was CVS but that was in the days when my OS was stil Windows XP. I worked on a PHP project and the code was held in a CVS. I can remember that we used a GUI tool for it which was kind of crappy. And I can also remember, that we threw away the whole repository several times because of errors.</p>

<p>After that we switched to SVN. That was quite good for our needs. Tortoise SVN is a nice integration into the Windows Explorer and I used that. But after throwing away fuckin&#8217; Windows finally and starting to use Ubuntu Linux, I was lost because there was no GUI for my SVN repos. So I started to learn the CLI for SVN and I liked it.</p>

<p>I started to have a lot of SVN repos for all my projects. We even held the writings for our <a href="http://www.pg-praxisbuch.de/" target="_blank">PostgreSQL</a> book in a SVN repo. The experience I have with SVN is quite good. There are some ok possibilities to set access to repositories but you have to dig a little deeper to get them running.
One big problem is the usage of branches. Well yes you can make branches, but merging them back to a main branch is a pain in the ass. So we did not use it and this is a big fail! Another thing is the lack of a local copy of the repository. The commit command is pushing always to the central repository most likely on a different machine, accessible via a internet connection. This means, that the source code is complete only at one physical place. This is a SPOF!</p>

<p>GIT is the solution for all these caveats. I use a lot of features of GIT heavily. Sure, the standard stuff like log, add, commit, pull, push and so on. But also rebase, merge and submodules. And most important: branch.</p>

<p>I strongly recommend using feature branches because it makes your life easier in many ways. You don&#8217;t have to fear, that you brake one of the main branches and you can leave the stuff on a branch for as long as it takes to finish your feature development work. Testing with the last available main branch is easy when you rebase the code base into your feature branch. When everything is done, you can shrink all the commits to one commit (with rebase -i [commit sha1] and merge it into the main branch. If something is wrong and the reason is the one feature branch commit, just rip it out of the main branch and everything is good again.</p>

<p>Here is a little example of how such a feature branch work could be done (German &#8230; sorry): <a href="http://team7.sinnerschrader.de/2011/04/git-commits-mit-rebase-zusammenfassen.html" target="_blank">http://team7.sinnerschrader.de/2011/04/git-commits-mit-rebase-zusammenfassen.html</a></p>

<p>The most important thing about the idea behind GIT is the fact, that GIT is distributed. There is no central main big repo. Everybody has this so called &#8220;main big repo&#8221; locally - or a part of it - or some branches - or just one branch. And you can work on it locally without the need to have a connection to the internet. If your work is done, you can push it to a place where others can pull from. And that&#8217;s it.</p>

<p>Linus Torvalds is the creator of GIT. He developed it because some of his fellows asked him to use a SCM. In the early days he was just using tar-balls and patches and he is convinced, that doing it this way was better than using CVS, SVN and other tools because they all suck. Check out this really good talk at Google he gave about GIT:</p>

<p><a href="https://www.youtube.com/watch?v=4XpnKHJAok8&amp;feature=player_embedded" target="_blank">https://www.youtube.com/watch?v=4XpnKHJAok8&amp;feature=player_embedded</a></p>

<p>Well, here is the conclusion: use GIT!</p>

<p>Cheers</p>

<p>Andy</p>
