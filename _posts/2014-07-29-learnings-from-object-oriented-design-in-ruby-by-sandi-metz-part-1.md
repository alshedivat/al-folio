---
layout: post
title: "Learnings from 'Object Oriented Design in Ruby' by Sandi Metz - Part I"
description: "Learnings from 'Object Oriented Design in Ruby' by Sandi Metz - Part I"
category: "Programming"
tags: [ruby]
---

During my holidays in Finisterre (or the more correct name Fisterra in Gailego) in the most western part of Spain, and after having finished several greate Scify books by [James S.A. Corey](http://www.amazon.com/#) ('The Expanse' series), I started to read [`Practical Object-Oriented Programming Design in Ruby`](http://www.amazon.com/#) by Sandi Metz again. This is the first post of some posts I plan to write. The posts will provide a look at the practices Sandi is covering in her great book. The intention of this writing is to intorduce the most basic ideas behind good software design and serve as guidelines you should follow.

In the last two years I was able to identify some of the Ruby-People in the community every Ruby-Programmer should listen to. Among various others, there is [Avid Grim](http://) with his great writings, [Justin Weiss](http://) with his great blog and [Brandon Hilkert](http://) with a great book about how to build Rubygems and a great blog also. Sandi belongs definitely in this club of great Rubyists and I encourge you to follow thes fine people.

In the first part of the posts we are going to have a look at the basics of Object-Oriented Design.

##Introduction

##Object-Orient Design

Sandi writes:

> Object-oriented design is about *managing dependencies*. It is a set of coding techniques that arrange dependencies such that objects can tolerate change.

Everything is about to change. When we start a software project, we never know which requirements are coming along the way. That means we have to try to avoid heavy dependencies between classes and methods. We should always expect the need for a change in our code. But because we don't know which part of our code is going to need a change, we need to write code that is changeable.

Change in requirements is the reason why we should not fall into the trap of thinking, that it's ok to have *some* dependencies in our *small* application. Sandi knows why:

> The problem with poorly designed *small* applications is that if they are successfull they grow up to be poorly designed *big* applications.

I am 100% sure everyone fell into the snake pit where this sentence was true. So we can conclude that it is highly recommended to write well designed applications. It is not easy to achieve this goal. It need's us to practice a lot because:

> Design is thus an art, the art of arranging code.

##Tools

What are the tools available helping us achieving the goal of good object-oriented design? We are not lost and we do not have to reinvent the wheel. Here is a list of some well known and broadly used principles of object-oriented design.

###[SOLID](http://)

*SOLID* stands for five principles originally defined by [Michael Feathers](http://) and broadcasted by [Uncle Bob Martin](http://):

* *Single Responsibility*:
each method or class has exactly one responsibility and nothing more
* *Open-Closed*:
tbc
* *Liskov Substitution*:
tbc
* *Interface Segregation*:
tbc
* *Dependency Inversion*:
tbc

###[DRY](http://)

*DRY* stands for *Don't Repeat Yourself* and it was defined by [Andy Hunt](http://) and [Dave Thomas](http://). The idea behind this principle is to avaid duplication in our code. When we recognize duplicated code, we should refactor out the code part to a place (e.g. a method) we can reuse. Doing so, we are able ot remove the duplication.

###[LoD](http://)

*LoD* stands for *Law of Demeter* and was defined by the [Demeter project at Northeastern University](http://). tbc

Using these tools will help us improving our code. I can definitely acknowledge this __THESE/AUSSAGE__ out of my own experience. And Sandi is seconding this with writing:

> The principles of good design represent measurable truths and following them improve your code.

##What is the Design process?

Sandi writes:

> Design is a process of progressive discovery that relies on a feedback loop. This feedback loop should be timely and incremental.

The *Feedback Loop* is one of the most important tools when creating object-oriented applications. Sandi is mentioning the [*iterative techniques of the Agile software movement*](http://agilemanifesto.org). This is very true but in my opinion even when not following agile practices, we should definitely at least use a feedback loop with the people, we are creating the applicatin for (aka: product owner in agile speak). It is the only way to recognize changes in the requirements and also missunderstandings of requirements. So Sandi states perfectly well, that the feedback loop has to be *timely* and *incremental*. Therfore we define the length of one loop (aka: sprint in agile speak). The length depends on the kind of project but the experience showed, that one up to two weeks is fitting very good. The loops are going to be repeated until everybody is satisfied with the results.

##The difference between object-oriented and procedural programming languages

In this section we are having a very quick view to the difference between object-oriented and procedural programming languages.

A procedural language has a fixed set of data types and the syntax of the language is providing operations to work with these data types. We are not able to create new operations or create new data types. But we are able to create *functions* or *methods* where we can group together functionality to work on our data to create behaviour. Still, *data* and *behaviour* are two complete different things.

In object-oriented languages, *data* and *behaviour* are packed into one thing: an *object*. The operations we can use on a specific object (like String) are *'built into the object itself instead of into the syntax of the language'*. Each object contains it's own *data* but the *behaviour* of similar objects is always the same. Because of this reason, *'every object decides for itself how much, or how little, of its data to expose'*.

A class-based object-oriented language like Ruby has builtin classes for every data type we expect as programmers. These data types are overlapping with the ones provided by procedural languages like *String*, *Fixnum* among others. All these classes are based on the class *Class*. This brings the ability to create new data-type classes based on *Class*. We are not limited to the builtin data-ytpes provided by procedural languages. This is a big advantage (among others) of object-oriented languages and most likely the reason why we want to use them.

Even though there are the outlined advantages of object-oriented programming languages, we should definitely not forget the many usecases where we don't want to use OO languages but languages like *C* or *Erlang*.

##Summary

The topic of this first post in the series we had a look to Object-Orient Design. tbc

