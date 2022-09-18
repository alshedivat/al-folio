---
layout: post
title: "We should support the OpenSSL project"
description: "We should support the OpenSSL project"
category: 'Security'
tags: [openssl]
---

We are all aware of the [Heartbleed Bug](http://heartbleed.com/). We all have changed our passwords. If not, stop reading and do it now!

Nearly every sysadmin worldwide has done nothing else than updating her systems after the vulnerability was released. We know that a German contributor of the OpenSSL project has caused the bug two years ago.

Now we are safe again. Let's go back to work. Really? No! We are not and we should think a bit about why it happened.

##The OpenSSL project

The [OpenSSL project]() is an Open Source project represented by the [OpenSSL Software Foundation, Inc.](http://opensslfoundation.com/) and licensed under a [Apache like license](http://www.openssl.org/source/license.html). The main purpose of the project is to develop the SSL v2/v3 and TLS v1 protocols. These protocols are the defacto standard for cryptographic and secure transport of data in world wide used software. We use it on a daily basis - even though many of us are not aware about this fact.

The project is very small. There is a five member core team and a eleven member development team.

There are different ways [supporting the project](http://www.openssl.org/support/) (taken form the project's website):

* __Join__ the online community
Participate in the online community of developers, testers, and contributing end users working to make OpenSSL a better product.

* __Donate__ to the OpenSSL project
Your donation will help add new capabilities to OpenSSL. Significant sponsors have a say in the future direction of OpenSSL as well as acknowledgements and logo placements.

* __Fund__ the OpenSSL project via a support contract
Obtain the protection of formal support contract coverage for your commercial or government enterprise and support ongoing OpenSSL development.

* __Hire__ individual OpenSSL team members
Some OpenSSL team members are available for custom consultancy contract work.

##The OpenSSL shitstorm

After the release of the Heartbleed vulnerabilty many articles have been written about it. Various _insider_ have questioned the Open Source idea and have started to complain about the possibility, that such a bug can happen at all. You are all wrong!

The bug was an oversight that should not happen. Thats not questionable at all. But how many companies using OpenSSL have checked the [Open Source code](http://www.openssl.org/source/) before making a lot of money with services strongly relying on OpenSSL? Why did they not find the bug when it is such an easy bug? Because they believe in Open Source and that is a good thing. They should not complain about it in any way. They should start to support the project!

##Looking at an Open Source project

The power of an Open Source project is its community. You can use, integrate or modify the produced source code or software at your needs. That's what the project is giving to you. The project is taking care of the development with it's core developers and integrates patches provided by contributors. It is also taking care of bugs or security issues. But the project is giving no warranty:

> Unless required by applicable law or agreed to in writing, software
> distributed under the License is distributed on an "AS IS" BASIS,
> WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

The snipped is taken from the [Apache 2 License](http://www.apache.org/licenses/LICENSE-2.0).

Does this mean, that the software is shitty? No - not at all. But the people contributing to the project are volunteers. A volunteer cannot be made responsible for what the project is doing in whole.

The positive aspects are obvious. Many people have many different skills and experience. The community is discussing where the software is leading to. Plus point: it is not marketing driven. Throw that into a bucket and you will have a very good product.

##The problem

So far, we understood that an Open Source project relies on its community. The problem is the following sentence:

> It's done when it's done!

This sentence has two implications:

* the pace of the progress made is driven by the community. The more time contributors invest, the higher the pace is.

* if the community is small, the progress relies on few people. This can cause pressure or lack of reviewing code.

And here we come to to problem why such a simple bug in OpenSSL was not found: the code review was made by one person who did not see it.

In the [CouchDB project](http://couchdb.apache.org), we have the rule, that a patch (git pull request) has to be acknowledged (+1) by two different committers. But what to do if there are not enough committers or reviewers? The answer is simple: if we want high quality Open Source software, we have to support the project in various ways. This can be done with manpower and also financially.

##Support the OpenSSL project

I have said this before and will repeat myself again: support the projects you benefit from! Steve Marquess, co-founder, president and business manager of the [OpenSSL Software Foundation, Inc.](http://opensslfoundation.com/who.html) has written a [emotional blog post](http://veridicalsystems.com/blog/of-money-responsibility-and-pride/) you should read now. Just take the numbers. The donations are like nothing.

Again: we are using SSL on a daily basis so we have the responsibility to support the OpenSSL project. If we don't, we do not have the right to complain about our stolen passwords. We have to accept the fact, that bugs can cause huge problems!

###Disclaimer

This is my personal opinion. I am wether writing as a member of the Apache CouchDB PMC, nor does this writing reflect the opinion of the Apache CouchDB PMC.

I have also heard about controversial discussions about the OpenSSL Software Foundation Inc. but have not read related articles yet. If you find one or wrote one, please get in touch with me (andy@nms.de). Though it will not change my opinion about the need of supporting Open Source projects we benefit from.



