---
layout: post
title: git advanced config and shortcuts / aliases
date: '2013-02-21T20:42:00+01:00'
tags: [git]
category: 'Server'

---
<p>Moin Moin,</p>

<p>wow - two git related posts today ;-)</p>

<p>I recently found a very nice page with helpful git settings. They are written by <a href="http://mislav.uniqpath.com/" target="_blank">Mislav Marohnic</a>. On the first page he is discussing Git merge vs. rebase:</p>

<p><a href="http://mislav.uniqpath.com/2013/02/merge-vs-rebase/" target="_blank">http://mislav.uniqpath.com/2013/02/merge-vs-rebase/</a></p>

<p>The second one is offering some nice tips when using git:</p>

<p><a href="http://mislav.uniqpath.com/2010/07/git-tips/" target="_blank">http://mislav.uniqpath.com/2010/07/git-tips/</a></p>

<p>So it should be a good thing to add some aliases to your ~/.gitconfig. Let&#8217;s say you wanna set the shortcut &#8216;pu&#8217; for pull but with an extra option to always use rebase when pulling:</p>

<script src="https://gist.github.com/andywenk/5059677.js"></script><p>This helps you to avoid flooding your history with unnecessary merge commits.</p>

<p>Here some helpful shortcuts taken from my ~/.gitconfig:</p>

<script src="https://gist.github.com/andywenk/5059683.js"></script><p>I found an entry on stackoverflow giving some insight on how to use aliases: <a href="http://stackoverflow.com/questions/2553786/how-do-i-alias-commands-in-git" target="_blank">http://stackoverflow.com/questions/2553786/how-do-i-alias-commands-in-git</a></p>

<p>Cheers</p>

<p>Andy</p>
