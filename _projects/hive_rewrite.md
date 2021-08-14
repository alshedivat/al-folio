---
layout: page
title: Hive Rewrite
description: Rewriting Hive Crowdsourcing
importance: 1
category: open-source
---

For my first foray back into Open Source development after nearly a decade doing closed source development, I'll be starting with something I know reasonably well, crowdsourcing.

Many years ago I saw the New York Times Lab's project
[Hive](https://github.com/nytlabs/hive) come up.  When it came out it was
pretty cool and great to see but not something I could actively use.
Unfortunately, while it seemed used a few times, it didn't get much updating
and very quickly went out of date.  It depend both on a now very old and
ancient version of Elastic Search, but it also depended heavily on the Go
Language which has some usage but is not nearly as popular as Node.js.

So, Project Number 1 is to get old package working, mostly as is, with the
latest version of Elastic Search and run entirely in a Node.JS service.  I'll
also aim to give it some improved documentation and testing.  Hopefully that'll
help it live on into the future with a bit more use.
