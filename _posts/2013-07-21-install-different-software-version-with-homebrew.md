---
layout: post
title: 'install different software-version with homebrew '
date: '2013-07-21T22:34:22+02:00'
tags: [mac, homebrew]
category: 'Server'

---
<p>Moin Moin,</p>

<p>recently, I had to install <a href="https://code.google.com/p/wkhtmltopdf/" target="_blank">wkhtmltopdf</a> via <a href="http://mxcl.github.io/homebrew/" target="_blank">homebrew</a> to be able to use <a href="https://github.com/pdfkit/pdfkit" target="_blank">pdfkit</a>. Installing wkhtmltopdf with homebrew is as simple as typing</p>

<script src="https://gist.github.com/andywenk/6049817.js"></script><p>Unfortunately, the recent version did not work. So I had to install an older version. The actual Version can be seen with:</p>

<script src="https://gist.github.com/andywenk/6049832.js"></script><p>What you will do is checkout the git repository of wkhtmltopdf in a special version - the list is already showing, how you do that. Be sure to change the directory to /usr/local. The repositories live here. Then, there are three steps: Checkout the git repository in the correct version, unlink the installed version and install the old one:</p>

<script src="https://gist.github.com/andywenk/6049848.js"></script><p>If you want to switch rto the new version, you can do this with:</p>

<script src="https://gist.github.com/andywenk/6049860.js"></script><p>And that&#8217;s it!</p>

<p>Cheers</p>
