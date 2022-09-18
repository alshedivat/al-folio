---
layout: post
title: Install ruby 1.8.7 with rvm on Mac OS X 10.8
date: '2012-10-09T22:23:56+02:00'
tags: [ruby]
category: 'Programming'

---
<p>Moin Moin,</p>

<p>if you have trouble installing ruby 1.8.7 via rvm on Mac OS X 10.8 (Mountain Lion), please check out these advices from <a href="http://stackoverflow.com/users/232053/matteo-alessani" target="_blank">Matteo Alessani</a>:</p>

<p><a href="http://stackoverflow.com/questions/11664835/mountain-lion-rvm-install-1-8-7-x11-error" target="_blank"><a href="http://stackoverflow.com/questions/11664835/mountain-lion-rvm-install-1-8-7-x11-error" target="_blank">http://stackoverflow.com/questions/11664835/mountain-lion-rvm-install-1-8-7-x11-error</a></a></p>

<p>Short summary:</p>

<ol><li>install X11 via <a href="http://xquartz.macosforge.org/landing/" target="_blank"><a href="http://xquartz.macosforge.org/landing/" target="_blank">http://xquartz.macosforge.org/landing/</a></a></li>
<li>export CPPFLAGS=-I/opt/X11/include</li>
<li>CC=/usr/local/bin/gcc-4.2 rvm reinstall 1.8.7</li>
</ol><p>All credits for this to <a href="http://stackoverflow.com/users/232053/matteo-alessani" target="_blank">Matteo Alessani</a></p>

<p>Cheers</p>

<p>Andy</p>
