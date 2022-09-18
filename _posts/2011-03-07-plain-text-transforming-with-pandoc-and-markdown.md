---
layout: post
title: plain text transforming with pandoc and markdown
date: '2011-03-07T19:15:00+01:00'
tags:
- pandoc
- transforming-plain-text
- latex
category: 'Server'

---
Moin Moin,

<p>actually we are writing a <a href="http://couchdb-buch.de" target="_blank">CouchDB book</a>. Today I was starting to read the whole book and make some notes which todo&#8217;s we have. I was thinking how I write them down - means in which format. No question that it will be a plain text format anyway.</p>

<p>I decided to use <a href="http://daringfireball.net/projects/markdown/" target="_blank">markdown</a> because it&#8217;s really simple and easy to transform. Yes transform because of three reasons:</p>

<ul><li>actually I don&#8217;t know which format I need later</li>
<li>github.com does transform it to HTML</li>
<li>it could be also transformed to LaTex</li>
</ul><p>So how to transform the markdown. There is a really powerfull programm called <a href="http://johnmacfarlane.net/pandoc/" target="_blank">pandoc</a> written by John MacFarlane. pandoc is able to transform from various plain text formats to various other formats. E.g it&#8217;s easy to transform markdown to HTML.</p>

<p>As a Mac OS X user I was first looking in <a href="http://mxcl.github.com/homebrew/" target="_blank">homebrew</a> if there is a package - unfortunately there isn&#8217;t yet. So I had to use <a href="http://www.macports.org/" target="_blank">MacPorts</a>. Be sure to update the ports tree because pandoc is changing rapidly. So use sudo port selfupdate, sudo port upgrade outdated and then sudo port install pandoc.</p>

<p>So after having installed pandoc the usecase is quite simple illustrated. I have a simple textfile called TODO.md with some content. The first target is to create a html file. The creation process is as easy as this:</p>

<pre>
$ pandoc -s -t html -5 -f markdown -o TODO.html TODO.md
</pre>

<p>The options are:
</p><ul><li>-s -&gt; we want a complete html file with enclosing &lt;html&gt;&lt;/html&gt; tags and not only a html snippet.</li>
<li>-t html -&gt; the output format is html</li>
<li>-5 -&gt; use html5</li>
<li>-f markdown -&gt; the input format is markdown</li>
<li>-o TODO.html -&gt; the file to be written</li>
<li>TODO.md as the last option is the input file</li>
</ul><p>Well the result is really good. Try it yourself.</p>

<p>Well the next target is to create a PDF file. So therefor, a detour over LaTex is required. But don&#8217;t worry, it&#8217;s dead simple because pandoc is shipped with a program called markdown2pdf. Assuming you have LaTex installed, take these steps:</p>

<pre>
$ markdown2pdf TODO.md -o TODO.pdf
</pre>

<p>Wow - the result is a PDF TODO.pdf. Cool isn&#8217;t it?</p>

<p>Cheers</p>

Andy
