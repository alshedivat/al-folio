---
layout: post
title:  GSoC '20 Final Report
date: 2020-08-26 08:00:00
description:
tags: gsoc aswf
categories: gsoc
thumbnail: assets/img/otio.jpg
---

![](/assets/images/gsoc.jpg)

Hey! GSoC'20 is coming to an end and I'm excited to share my experience and talk about what I worked on this time.

This year I worked with the Academy Software Foundation on the OpenTimelineIO project. Ever since I heard about ASWF I was looking for an opportunity to get involved. When I saw it in this year's GSoC orgs list, I knew this was my chance. Working at Pixar is a dream of mine, and contributing to one of their past projects and being able to work with engineers at Pixar, was in a way a dream come true.

For those who are not aware about the OpenTimelineIO project, it is an interchange format and a library for use with editorial cut information. In simpler words we can use this format and library to share video editing timelines between different content creation software, and much more! For more information see [this](https://github.com/PixarAnimationStudios/OpenTimelineIO).

My proposal for this year's project had three parts, one of which wasn't in OTIO's ideas list.
- Add support for all the predicates from Allen’s Interval Algebra for TimeRange.
- C language bindings
- Java language bindings (this wasn't in the ideas list)

OTIO has some core math libraries for working with time, and a restructuring of these libraries around a more consistent mathematical framework has been in planning. The support for [Allen's Interval Algebra](https://en.wikipedia.org/wiki/Allen%27s_interval_algebra) is one of the first changes amongst many to come. I had to add operators to determine relationships between time ranges. For example, to check if two ranges had any intersection, or if one range came before another.

OTIO is written in C++. Having it's functionality in multiple languages is always going to be helpful. It can have use cases in other applications or tools, which might need a different language. In order to bind with languages like Lua, Go or Ruby, first we need to wrap the C++ API in C. This part of the project, although relatively straightforward, taught me a few things. Mainly because I had never written C before.

The last leg of GSoC was the most fun for me. I worked on Java bindings. It was the first programming language I learnt and have developed a level of comfort with it over the years. I gained a lot out of working on this part of the project. The reason being that I had to work with two different languages at the same time, but more importantly a large team of advisors came together to help out with it. I received a lot of help from the team in understanding how to work with one language (Java) that had in-built reference counting and garbage collection of objects and another (C++) that didn't have any of these. I got guidance on idiomatic ways to do specific things in Java and on how to keep the API close to how it would be natively on the platform, while writing bindings.
All in all, it's been a fun and enriching experience.

Below is a brief of all the work that was done, prior to and during GSoC, along with future plans.

### Prior to GSoC

I worked on the following features/issues:

- Implement OTIO to SVG Adapter [PR #649](https://github.com/PixarAnimationStudios/OpenTimelineIO/pull/649) (open)
- Indicate Empty track in otioview and display track name [PR #677](https://github.com/PixarAnimationStudios/OpenTimelineIO/pull/677) (merged)
- Implement Clip Inspector [PR #686](https://github.com/PixarAnimationStudios/OpenTimelineIO/pull/686) (open)
- Toggle 'complete track name' display on double click in otioview [PR #690](https://github.com/PixarAnimationStudios/OpenTimelineIO/pull/690) (merged)

### During GSoC

- Add support for predicates from Allen's Interval Algebra for TimeRange [PR #697](https://github.com/PixarAnimationStudios/OpenTimelineIO/pull/697) (merged)
- Initialize C language bindings [PR #696](https://github.com/PixarAnimationStudios/OpenTimelineIO/pull/696) (merged)
- C bindings - wrap safely typed any [PR #720](https://github.com/PixarAnimationStudios/OpenTimelineIO/pull/720) (merged)
- Add tests for C-bindings [PR #723](https://github.com/PixarAnimationStudios/OpenTimelineIO/pull/723) (unmerged and closed)
- Enforce stricter interval algebra rules for overlaps and contains [PR #760](Enforce stricter interval algebra rules for overlaps and contains) (merged)
- Create Java Bindings [PR #753](https://github.com/PixarAnimationStudios/OpenTimelineIO/pull/753) (open)
- Remove redundant test and add comments to tests [PR #712](https://github.com/PixarAnimationStudios/OpenTimelineIO/pull/712), [PR #725](https://github.com/PixarAnimationStudios/OpenTimelineIO/pull/723), [PR #755](https://github.com/PixarAnimationStudios/OpenTimelineIO/pull/755), [PR #757](https://github.com/PixarAnimationStudios/OpenTimelineIO/pull/757) (merged)
- Use std::fabs() instead of abs() in rationalTime.cpp [PR #721](https://github.com/PixarAnimationStudios/OpenTimelineIO/pull/721) (merged)
- Add .clang-format file [PR #707](https://github.com/PixarAnimationStudios/OpenTimelineIO/pull/707) (open)
- Create GitHub Actions Workflow [PR #752](https://github.com/PixarAnimationStudios/OpenTimelineIO/pull/752) (open)

### Future plans

Although I've met the goals as planned, there is still some polishing work to be done on the bindings. My mentor Nick Porcino is working with the C-bindings to make it easier to use and making a sample app to demonstrate the library. The Java bindings can be made more feature complete by implementing a few algorithms not present in the C++ core, but in the OTIO python bindings. The Java bindings have been added as a goal for the next beta release, so I need to make it release ready. With the mobile devices becoming cheaper and more powerful, content creation and consumption on phones is increasing. So building and maintaining the Java bindings for Android makes sense. My next goal will be to package it for Android and build a sample app to view OTIO timelines.

### Highlights and challenges

- **Making sure the TimeRange operators follow the correct rules:** The diagrams found online explaining these rules can be ambiguous. I had to do some legwork and look at existing implementations of these operators elsewhere to make sure I was doing the right thing.
- **Reference counting in the bindings:** It takes some time for beginners to understand how reference counting works in OTIO. It was the same with me. Initially I implemented the C-bindings without taking care of reference counting and had a hard time trying to debug segmentation faults. Nick came to the rescue and found the reason for the crashes and fixed them. Once I'd understood this well I didn't have much trouble working on the Java bindings.
- **Getting Java and the C++ JNI code to build:** A major amount of time went into figuring out a way to build the native code and the Java code in one go, packaging everything into a JAR archive and using it in other projects. Some part of this was done prior to GSoC and some after the work on Java bindings concluded. Most of it was going through other projects on GitHub, reading Gradle's documentation and a lot of trial and error. Finally the build works well on all platforms.
- **Garbage collection and freeing native memory in Java bindings:** This was the most confusing part for me in the Java bindings. I wouldn't have been able to figure out a method to do this without the help from Anton Margoline and Eric Reinecke. We used PhantomReferences to find out when an object was to be garbage collected and freed native memory accordingly. This was a new concept for me and I had fun implementing it.
- **Maintaining the native platform's feel in the bindings:** It was more of a precaution than a challenge. It included writing some boilerplate code to make everything feel Java-like as much as possible. I picked up a few things in Java-8 along the way, that I hadn't used before.

It's been a fun and productive summer and I'm a little sad that it's my last time being a GSoC candidate. But I'm surely going to stick around as a regular contributor to OTIO and try to get other people involved, maybe mentor future GSoC students!

### Acknowledgements

I'd like to thank my mentors and all the others who helped me during these three months. [Nick Porcino](https://github.com/meshula) has been in constant contact with me throughout GSoC providing feedback and helping clear doubts on the go. [Joshua Minor](https://github.com/jminor), [Stephan Steinbach](https://github.com/ssteinbach) and [Eric Reinecke](https://github.com/reinecke) have helped clarify issues with all OTIO work GSoC and non-GSoC, such as explaining the semantics of the TimeRange operators, how timecodes worked and how to get CI working properly. [Anton Margoline](https://github.com/margant) and Eric Reinecke provided invaluable guidance with the Java bindings. Last but not the least, [David Baraff](https://github.com/davidbaraff) helped me understand how reference counting worked with the python bindings. He was very patient and answered the silliest of doubts.