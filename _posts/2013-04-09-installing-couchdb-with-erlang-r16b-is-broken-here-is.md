---
layout: post
title: 'Installing CouchDB with Erlang R16B is broken - here is a fix '
date: '2013-04-09T11:01:00+02:00'
tags:
- erlang
- couchdb
- mac
- homebrew
category: 'CouchDB'

---
<p>Moin Moin,</p>

<p>I am using homebrew to install all needed software on my Mac (if available). When upgrading homebrew with</p>

<script src="https://gist.github.com/andywenk/5344191.js" type="text/javascript"></script><p>you will get the newest Erlang R16B. This is not compatible witrh CouchDB 1.2.1. You have to switch back to Erlang R15B in a specific version. Simply using brew install erlang-15 will not work!</p>

<p>Here is the workaround:</p>

<script src="https://gist.github.com/andywenk/5344201.js" type="text/javascript"></script><p>This is taken from an issue <a href="https://github.com/mxcl/homebrew/issues/18256" target="_blank">here</a>. The important post is from Jan <a href="https://github.com/mxcl/homebrew/issues/18256#issuecomment-15027174" target="_blank">here</a>.</p>

<p>Cheers</p>
