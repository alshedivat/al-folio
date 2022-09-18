---
layout: post
title: git tab-completion on Mac OS X when installed via homebrew
date: '2013-02-21T14:57:00+01:00'
tags:
- git
- bash
- mac
category: 'Server'

---
<p>Moin Moin,</p>

<p>on Mac OS X you do not have tab-completion in git. You have to activate it. Recently my colleauge Enrico found a description how to do so:</p>

<p><a href="http://en.newinstance.it/2010/05/23/git-autocompletion-and-enhanced-bash-prompt/" target="_blank">http://en.newinstance.it/2010/05/23/git-autocompletion-and-enhanced-bash-prompt/</a></p>

<p>This is cool but it will not work, when you have installed git via homebrew &#8230; what I strongly recommend. Here is what you have to add to your .bash_profile in your homedirectory:</p>

<script src="https://gist.github.com/andywenk/5059691.js"></script><p>Make sure that the two files are executable (change it with chmod a+x [file]).</p>

<p>Cheers</p>

<p>Andy</p>
