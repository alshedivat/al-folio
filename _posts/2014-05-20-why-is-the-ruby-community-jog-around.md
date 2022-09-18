---
layout: post
title: "Why is the Ruby community jog around?"
description: "Why is the Ruby community jog around?"
category: 'Rails'
tags: [rails]
---

These days, there are many blog posts we can read about why the Ruby community is split into parts. I am a bit surprised about this, especially about the way how folks are talking about this.

##The split

Some folks say, that there is a Rails community and a Ruby community. Adam Hawkins ([@adam65](http://twitter.com/adman65)) for example is speaking of a ["Fragmentation in the Ruby Community"](http://hawkins.io/2014/05/fragmentation_in_the_ruby_community/):

> The Ruby community is fragmenting.
> The community needs new leadership.

I have to admit, that I am not attending Ruby or Rails conferences (unfortunately) and do not really have direct contact to the community. But I read a lot from and about it and follow many talks.

My feeling is, that there is no gap and also no need for new leadership but the need for a bit more selfconfidence. How in the world can one speak of a "leader" in an open source community? I am afraid here is a bit of misunderstanding (maybe also on my side).

##DHH is the bad guy!

Really? Why? As far as I followed the discussions, it started all with DHH's [keynote at this years Railsconf 2014](https://www.youtube.com/watch?v=9LfmrkyP81M). I watched the keynote and I thought it was a good one. Even when I don't agree with everything DHH said, I think it was a good one because DHH stated a clear position about how he is developing software. This is focusing. Yes! But not selling ... .

In my humble opinion, it's a good thing. You are not forced to share DHH's opinion in any way. You should find your own point of view and speak about it - like [Luca Guidi did](http://lucaguidi.com/2014/05/19/rails-is-not-dead.html). So why is DHH the bad guy? I don't follow that.

Side Note: I also read that some [people are not happy about the language DHH is using](http://codon.com/the-dhh-problem). I can understand that and I think also it is questionable. In the [CouchDB community](http://couchdb.apache.org), we are in the process of creating the ["Project Code of Conduct and Diversity Statement"](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=41812010). This is for a good reasen because we want to make clear, that we expect people to behave in a "empathetic, welcoming, friendly and patient" way in our community. DHH's language in his talk would not be appropriate.

UPDATE: I just found the blog post [http://www.ugtastic.com/dhh-cult-personality-problem](http://www.ugtastic.com/dhh-cult-personality-problem) and I fully chare the opinion of Mike Hall.

##So we stop using Rails?

Nonsense. I cannot understand, that people are moving away from using Rails because they think, a so called "leader" is moving into a wrong directinon.

First of all, you can definitely move to another framework. There is [Sinatra](http://www.sinatrarb.com/) for more low level applications or [Padrino](http://www.padrinorb.com/) as an alternative with yet a smaller scope of functionality compared to Rails. But before moving away, you should definitely review the requirements you have for your application and think about how you would implement them in the various frameworks. Furthermore don't think in a "monolithic Rails Way". Yes, there is a Rails Way - in a way. But there are still many ways to walk the Rails way. Find your's.

Here are some suggestions that might help finding the one:

[Component-based Architectures in Ruby and Rails](https://www.youtube.com/watch?v=-54SDanDC00)
[Hexagonal Rails and The Ludicrous Terminal Application](http://pivotallabs.com/hexagonal-rails-and-the-ludicrous-terminal-application/)

##About Testing

Oh man, this is a big thing. DHH is again the bad guy because he said "TDD is dead".

But wait. Did he really? In my opinion he didn't.

There is a great disucssion going on between Martin Fowler, Kent Beck and David Heinemeier Hansson. Naturally, Martin and Kent have the position that TDD is a great thing and David is moving a way for reasons he is explaining. As of this writing, the first two parts out of five have been on air:

[Is TDD dead?](https://www.youtube.com/watch?v=z9quxZsLcfo)
[Is TDD dead? Part II](https://www.youtube.com/watch?v=JoTB2mcjU7w)

scheduled for May 20, 2014:
[Is TDD dead? Part III](https://www.youtube.com/watch?v=YNw4baDz6WA)

The first two parts are providing a lot of insights from both point of views. I really like to watch them. After having seen them, one should be able to decide wether TDD is a good or bad fit.

One thing is really clear: you should write tests! But you may stumble upon stones on the way to achive this goal:

* knowledge about what to test
* knowledge about how to test (TDD with test first, test after)
* does every team member have the skills to test?
* which tools should one use?

And here is a good quote from Kent Beck heard in the second part of the before mentioned conversation:

"Difficult testing is a sign for poor design" *(Kent Beck)*

This does not only count for developing software with TDD but also for general development.

If the software is strong coupled or models are not following the [single responsibility principle](http://en.wikipedia.org/wiki/Single_responsibility_principle), you will not only have hard times to test your software, but also run into problems when extending or refactoring your application.

I recently started to develop a new Rails based application and we made the following desicsions how to test:

* we don't test controllers explicitely
* we are testing the public interface of models with [rspec](http://rspec.info/)
* we are testing the website by using [Capybara](https://github.com/jnicklas/capybara)
* we are free to test other parts of the application if needed
* we test JavaScript (Jasmyn or Mocha)

So I expect you to ask, why not TDD. The answer is simple: because we don't know how to do it *(feeling big storm of "whaaaaaatttt?" over my head)*.

Another answer is, that I think we don't need it - when using Rails. I personally compare Rails as a blank form where I have to fill in the missing parts in the inputfields. That means, Rails is providing a lot of (already tested) functinality I can use.

For example in a controller. If used correctly, one will call a public method from a model to receive data from a database or execute some business logic. Now look again to the list. This is what I test because if this fails, I expect to have a big problem in my application.

Hopefully I was able ot make clear, that the before mentioned statements count with respect to using Rails. When creating a plain Ruby application (or also a gem), this approach has to be changed to a wider testing model. But I am not sure if it has be TDD though and the leadership his taking (although he doesn't).

##Summary

Some people in the Ruby community see a split between Rails and Ruby and proclaim two communities. Some people dislike DHH for his controversial discussion about TDD.

I think a good, respectful, friendly and open discussion will help all "parts" in the Ruby world. Finally, the most important facts are:

* Rails is a great framework - when it fits the job: use it!
* DHH has a strong position about TDD and how software should be built. Share it or point your position out to discuss it
* stop blaming people for their position
* the Rails and Ruby community is not split

And yes ... DHH should stop using the F-word

Happy coding!



