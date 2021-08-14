---
layout: post
title:  Morphological Analysis Made Easy With Scala
date:   2012-02-29
description: Easy morphology with Scala
tags: linguistics
---

Ever since I got involved with distributional semantics, i’ve been perplexed about how to handle morphed words, which happens to be just about every noun and verb in English. What is a morphed word in English you ask? It’s pretty much any word that’s been changed to reflect things like past tense, plurality, ownership, and all those things. They’re conjugated verbs and more! But they always pose a massive problem in distributional semantics.

Think about it for a second, what’s the big difference between “cat” and
“cats”? Not too much, the second is simply saying there are multiple
occurrences of a “cat”. But what do people typically do for distributional
semantics? One of two bad options: leave the two words as separate things and
thus split the information gained about “cat” across two words or stem every
word and throw away something important like the multitude of “cat”. Both seem
totally wrong and unsatisfactory.

So on and off I’ve searched for a good tool to do morphological analysis for
English. Ideally, the analyzer could recognize the word “cats” and split into
two things: cat and that way you can retain all your information about a cat
and still know that there were a multitude of them when you see “cats”. And for
verbs? You should see the same thing, ran could then become something like run
and `<past>` so that again, you still know everything about running and that it
happened in the past. But until today, I’ve never found a tool that does this
both quickly and easily in a usable language.

That all changes today. Today I found the
[Lltool-box](wiki.apertium.org/wiki/Lttoolbox-java) for Java. It creates a
large finite state machine for recognizing morphed words and figuring out the
root word, i.e. “run” in “ran” and “cat” in “cats”, and how the word was
morphed, i.e. “run” for “ran” and “cat” for “cats”. All you have to do is get a
listing of how words are morphed, load it up until the Lttoolbox-java system
and analyze away your sentences.

So let’s take a spin on how to do this. First, you read the wiki instructions
for Lttoolbox-java, download it, and compile it. Compiling is easy:

```sh
mvn deploy -DskipTests
```

The `-DskipTests` part seems needed since their unit tests don’t pass. But
after that, you can start using the code in your favorite jvm based language.
my personal fave is Scala, so let’s run with that. So what next? Now you create
a [Finite State
Transducer](https://en.wikipedia.org/wiki/Finite-state_transducer) using a
dictionary file and tell it to analyze words:

```scala
// Create the Finite State Transducer processor.
val fstp = new FSTProcessor()

// Load the finite state transducer with the compiled dictionary file.  
fstp.load(openInFileStream(args(0)))

// Setup the trandsducer to do morphological analysis and make sure it's valid.
fstp.initAnalysis
```

Now that you have a transducer ready to analyze words, you just feed it stuff
like this:

```scala
val in = new StringReader("cats, dogs and blubber all running quickly!")
val out = new StringWriter()
// Do the analysis.
fstp.analysis(in, out)
```

You gotta create a reader and writer for their transducer interface. It’s
funky, but it still leaves you with a pretty flexible interface. So now what?
What does the output look like? If you feed it “cats, dogs and blubber all
running quickly!”, the output is pretty ugly at first:

```
^cats/cat<n><pl>$^,/,<cm>$
^dogs/dog<n><pl>$
^and/and<cnjcoo>$
^blubber/*blubber$
^all/all<adj>/all<adv>/all<predet><sp>/all<det><qnt><pl>/all<det><qnt><sp>/all<prn><qnt><mf><sp>$
^running/run<vblex><ger>/run<vblex><pprs>/run<vblex><subs>/running<adj>/running<n><sg>$
^quickly/quickly<adv>$
```

Beastly no? So i figure that it’s best to write some regular expressions to
handle all of this. You’ll need a couple: one to split up words, one to match
analysed words, one for unrecognized words, and one to split up the tags. In
scala you can do this pretty easily like this:

```scala
// 1: Recognize a fully analyzed word so that they can be tokenized.  In the
// above test case, "cats," will not be separated by white space so we require
// this more complicated splitting method.
val parseRegex = """\^.*?\$""".r
// 2: Recognize a word with morphological tags.
val morphredRegex = """\^(.+?)/(.+?)(<[0-9a-z<>]+>).*\$"""
// 3: Recognize a word that could not be recognized.  The transducer prepends
// &quot;*&quot; to unrecognized tokens, so we match and eliminate it.
val unknownRegex = """\^(.+)/\*(.+?)\$"""
// 4: A regular expression for matching morphological tags.  This is simpler
// than writing a splitting rule.
val featureRegex = """<.*?>"""
```

Then all you need to do is run through the analyzed sentence and split it up
into separate tokens, some for root words and some for morphed features. You
can do that like this:

```scala
val tokens = parseRegex.findAllIn(out.toString).map(parseMatch =&gt;
// Match the current analyzed word as being morphed or unknown.  For morphed
// words, create a list of the lemma and the tags.  For unknown words just
// create a list of the lemma.
parseMatch.toString match {
    case morphredRegex(surface, lemma, tags) =&gt;
        lemma :: featureRegex.findAllIn(tags).toList
    case unknownRegex(surface, lemma) =&gt;
        List(lemma)
}).reduceLeft(_++_).filter(!rejectFeatures.contains(_))
```

This bit of code’s pretty sweet. You first iterate over each analyzed word with
the first matcher. Then you match each word with the two word level regular
expressions: one for fully analyzed words and one for unrecognized words. After
that it’s easy smeesy, you just split the tags up with the last regular
expression and turn it all into a list. The last two bits at the end turn the
whole thing into a single list and lets you filter out tags or tokens you don’t
want.

So with that, you can now do simple and fast morphological analysis in Java,
Scala, or even Clojure (but who’d do something silly like that?)!-
