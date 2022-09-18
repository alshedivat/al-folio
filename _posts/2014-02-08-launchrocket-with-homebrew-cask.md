---
layout: post
title: launchrocket with homebrew cask
date: '2014-02-08T19:13:05+01:00'
tags:
- launchrocket
- mac
category: 'Server'

---
<p>I just stumbled upon a tweet from <a href="https://twitter.com/ThorstenRinne" target="_blank">https://twitter.com/ThorstenRinne</a> retweeted by <a href="https://twitter.com/tobmaster" target="_blank">https://twitter.com/tobmaster</a> where Thorsten pointed us to <a href="https://github.com/jimbojsb/launchrocket." target="_blank">https://github.com/jimbojsb/launchrocket.</a> It is a</p>

<p><em>Mac PreferencePane for managing services with launchd/launchctl</em></p>

<p>One option to install launchrocket is to install it via <a href="https://github.com/phinze/homebrew-cask" target="_blank">homebrew-cask</a>. I did not know this tool. It is a nice tool to install binary Mac Applications:</p>

<p><em>Homebrew-cask provides a friendly homebrew-style CLI workflow for the administration of Mac applications distributed as binaries.</em></p>

<p>So I thought let me try this. The way to get it done is dead simple. First install homebrew-cask:</p>

<pre><code>brew tap phinze/cask
brew install brew-cask
</code></pre>

<p>Easy. Now install launchrocket:</p>

<pre><code>brew tap jimbojsb/launchrocket
brew cask install launchrocket
</code></pre>

<p>You will be asked to give your sudo password once for all preceding installations when these privileges are neede:</p>

<pre><code>==&gt; We need to make Caskroom for the first time at /opt/homebrew-
cask/Caskroom
==&gt; We'll set permissions properly so we won't need sudo in the future
Password:
</code></pre>

<p>That was easy also. No open the <em>System Preferences</em> and find launchrocket</p>

<p><img src="https://31.media.tumblr.com/9b3c80f28979316c6dba8cb4fef50350/tumblr_inline_n0ovu7KtxX1qa0m1w.png" alt=""/></p>

<p>Open it with a click and see a very nice GUI for all the services you can start easily from here:</p>

<p><img src="https://31.media.tumblr.com/b7c32fbc13c8d313564b5ea5a1932ae6/tumblr_inline_n0ovw7h4lj1qa0m1w.png" alt=""/></p>

<p>Really cool. I like that a lot and maybe you find that useful also :)</p>

<p>Cheers</p>

<p>Andy</p>
