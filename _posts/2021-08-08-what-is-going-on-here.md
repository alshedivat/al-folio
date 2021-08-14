---
layout: post
title: What is going on here
date: 2021-08-08
description: A long decayed update
tags: life open-source
---

![Surface Logo](/assets/img/surface.png)

As I do every few years, I am restarting my blog and doing it the hard way.
About a decade ago I used Octopress and GithubPages to do a blog.  A year or so
ago I used Ghost to do a blog.  Intermitently I've tried Medium and even
Substack.  But like always, i'm here again with a really rough blog platform
with few bells or whistles.

So why do this all over again?  The key reason is that in the very near future
I will be leaving Google after over 9 years of full employment and I need to
get back into the flow of both blogging and using open source tools.  Further,
I always prefer platforms where I fully own the content that gets made.  Ghost
is great but it requires a bit too much to maintain.  So rough again we go.

For the last few months of employment I'll be making a simple project of
updating the New York Times [Hive](https://github.com/nytlabs/hive) projects
into the modern era.  I found this project many years ago when I started a
crowdsourcing project and thought it was pretty cool.  The sad story however
was that the project was poorly documented and it ended up going stale pretty
quickly.  Go was always a weird language to use that had a small community and
ElasticSearch advanced too fast for New York Times to keep up with.  So that
old package got pretty crusty pretty fast.

That's why project number one is just to take an existing well intentioned
project and make it work with a slightly more long lasting stack.  That'll mean
getting it to work with the latest Elastic Search APIs (7.x as of now) and to
get it working with a slightly more trendy and persistent server stack.  For me
that looks like something that works smoothly with the serverless trend and is
based solidly on node.js.  After poking a lot at frameworks Next JS feels like the easiest to use and has the fewest oddities backed into it.

If this all works well I will likely checkin with Professor Paul Eggert at UCLA
to pitch a CS 130 project to extend the effort to do a few cool things.
Probably have a good solid user interface that wraps the REST APIS.  Maybe
generalize the framework to use more than just ElasticSearch, such as SOLR or
some other option.  And to do something about authentication.  The original
library seemed to assume authentication was just...done...for you....and that's
never the case.  Again, Next JS seems to have handled that pretty well.

So, like all my blogging efforts, this might die out, but hopefully not.  At least this time around there's a cool and very custom logo.
