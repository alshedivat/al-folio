---
layout: post
title: svn:ignore property usage
date: '2009-05-28T00:00:00+02:00'
tags:
- svn
- netbeans
- subversion
- svn:ignore
category: 'Server'

---
Moin Moin,

first to my fans at <a href="http://www.nmmn.com" target="_blank">NMMN</a>: cooool ;-)

Ok - a little more serious. It&#8217;s kind of a hobby or philosophy to find the best editor for hacking. Have you found your&#8217;s yet? I know that all the MAC users mostly use <a href="http://macromates.com/" target="_blank">TextMate</a>. And a lot of Linux users like <a href="http://www.eclipse.org/" target="_blank">eclipse</a>. After having tested and used eclipse for about two years (and three versions and three times fuckups with upgrading) I am using <a href="http://www.netbeans.org/downloads/index.html" target="_blank">Netbeans</a> these days. I installed the PHP and Python version which is running well.

One point that made me go crazy all the time is the <a href="http://subversion.tigris.org/" target="_blank">SVN</a> implementation in eclipse and Netbeans. Well, the developers of Netbeans integrated svn assistance in the standard version. But it&#8217;s working so la la. So I decided to use svn from the shell. Since I use <a href="http://github.com/andywenk" target="_blank">git</a> for some stuff, this is even more familiar to me (I know that there are git clients - but hey come on! that&#8217;s not cool ;-) ).

In each project there are always files or directories which you don&#8217;t want to have in your svn repo. So you want to use the svn:ignore command. Here is a brief introduction of it&#8217;s usage.

<strong>svn property commands</strong>

Basically you can use these property commands with svn:

<pre>propdel (pdel, pd)
propedit (pedit, pe)
propget (pget, pg)
proplist (plist, pl)
propset (pset, ps)</pre>

This is part of the output when you type

<pre>$ svn help</pre>

For ignoring a file or a directory you use basically pl (proplist), pg (propget) and ps (propset).

<strong>Using svn:ignore</strong>

Let&#8217;s say we are in the working directory of our project. Because we use Netbeans, there is a folder called &#8220;nbprojects&#8221; with project settings in it. We don&#8217;t want this folder to be added to the svn repo. Also, there is a file called &#8220;info&#8221; with some reminding stuff. This file is also not needed in the svn repo. So let&#8217;s start by ignoring the folder:

<pre>$ ll
insgesamt 4
-rw-r--r-- 1 duke duke    0 2009-05-28 12:24 info
drwxr-xr-x 3 duke duke 4096 2009-05-28 12:18 nbproject
$ svn ps svn:ignore nbproject .
Eigenschaft »svn:ignore« für ».« gesetzt</pre>

The command line means, that we use the program svn and its command ps (propset) with the option svn:ignore to set the property for this folder ( . at the end) with ignoring the folder nbproject. Let&#8217;s see if this is correct:

<pre>$ svn pl
Eigenschaften zu ».«:
  svn:ignore</pre>

Ok - that means, we have set a svn property for the folder . (the actual folder). Now let&#8217;s examine what exactly is ignored:

<pre>$ svn pg svn:ignore
nbproject</pre>

Yep - that means, the folder nbproject is ognored for commits - as expected.

<strong>adding more files or folders to the svn:ignore list</strong>

This is importnat now. If you want to add more folders or files to the svn:ignore list, you have to keep in mind, that each usage of svn ps svn:ignore will overwrite the list for this folder. So you have to add the allready ignored files / folders and the new one again to the list. The first approach will not bring the expected result:

<pre>$ svn ps svn:ignore info .
Eigenschaft »svn:ignore« für ».« gesetzt
$ svn pg svn:ignore
info --&gt; nbproject is lost</pre>

The better way:

<pre>$ svn ps svn:ignore nbproject,info .
Eigenschaft »svn:ignore« für ».« gesetzt
$ svn pg svn:ignore
nbproject,info</pre>

And there is another way to avoid overwriting allready set propertys. Use the command

<pre>$svn propedit svn:ignore .</pre>

This will call your standard editor and is giving you the possibility to write down all the files or folders to be ignored in the actual choosen folder. I recommend to use this way &#8216;cause it&#8217;s the safest.

That&#8217;s it.

<strong>Deleting a property</strong>

Sure we need also a possibility to delete a property. Therfore we use pd (propdel). Here is the usage:
<pre>
$ svn pd svn:ignore .
Eigenschaft »svn:ignore« wurde von ».« gelöscht.</pre>

That means we deleted the property svn:ignore form the folder . . Using svn pg svn:ignore will now return no result.

So have fun using svn!

Andreas

P.S.: the online svn book is <a href="http://svnbook.red-bean.com/" target="_blank">here</a>
