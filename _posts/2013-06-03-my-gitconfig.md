---
layout: post
title: My ~/.gitconfig
date: '2013-06-03T21:29:00+02:00'
tags:
- git
- gitconfig
category: 'Server'

---
<p>Moin Moin,</p>

<p>when you&#8217;re using git as your scm, you will probably love it&#8217;s command line interface. I am using it on a daily basis &#8230; heavily. I know that there are some quite good GUI&#8217;s (like <a href="http://www.sourcetreeapp.com/" target="_blank">SourceTree</a>) but I never got really into them. So if you&#8217;re interested to make your git-life a little more comfortable, you can check out my (small) .gitconfig:</p>

<script src="https://gist.github.com/andywenk/5700580.js" type="text/javascript"></script><p>There are three entries worth mentioning:</p>

<ol><li><p>always use &#8220;git pull &#8212; rebase&#8221; to avoid unnecessary merge commits</p></li>
<li><p>use &#8220;_conflictstyle = diff3&#8221; for an advanced diff while solving conflicts during merge or rebase. You will see three different parts: your changes, their changes and the merged common ancestors. This gives you full access to all changes and you can choose what has to be merged</p></li>
<li><p>check out the awesome alias &#8220;lg&#8221;. Full power overview what&#8217;Äs going on in your repo. Credits go out to my fine colleague Thomas <a href="http://twitter.com/thereincarnator" target="_blank">@Thereincarnator</a>.</p></li>
</ol><p>Cheers</p>
