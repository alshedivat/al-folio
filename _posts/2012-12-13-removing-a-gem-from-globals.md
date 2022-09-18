---
layout: post
title: removing a gem from @globals
date: '2012-12-13T17:43:00+01:00'
tags: [ruby, rubygems]
category: 'Programming'

---
<p>Moin Moin,</p>

<p>some minutes ago I hade the problem, that my gemset was fucked up. I am using rvm and I had to remove rake 10.0.3. So it works like this:</p>

<pre><code>rvm use @global gem uninstall rake -v 10.0.3
rvm use @ gem uninstall rake -v 10.0.3
</code></pre>

<p>Don&#8217;t forget to go back to the ruby version you used before with</p>

<pre><code>rvm use 1.6.7
</code></pre>

<p>or similar &#8230;</p>

<p>Credits for this go to my fine colleague Enrico!</p>

<p>Cheers</p>

<p>Andy</p>
