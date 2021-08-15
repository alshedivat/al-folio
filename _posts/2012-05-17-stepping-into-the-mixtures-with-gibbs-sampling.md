---
layout: post
title:  Stepping Into the Mixtures With Gibbs Sampling
date:   2012-05-17
description: Reviewing Gibbs Sampling
tags: bayesian
---

## Refresher

As stated
[before](http://blog.echen.me/2012/03/20/infinite-mixture-models-with-nonparametric-bayes-and-the-dirichlet-process/),
mixture models are pretty cool. But rather than diving head first into a
complicated mixture model like the [Dirichlet Process Mixture
Model](https://en.wikipedia.org/wiki/Dirichlet_process) or the [Hierarchical
Dirichlet
Process](https://en.wikipedia.org/wiki/Hierarchical_Dirichlet_process), we’re
going to ease our way into these models, just like you’d learn to accept the
horrors of a pool of water before you try deep sea diving. First, we’ll figure
out how to apply the [Gibbs Sampling
Method](https://en.wikipedia.org/wiki/Gibbs_sampling) with the Linked List of
machine learning methods, [Naive
Bayes](https://en.wikipedia.org/wiki/Naive_Bayes_classifier). Then, after Gibbs
Sampling feels comfy, we’ll tackle a [Finite Mixture
Model](https://en.wikipedia.org/wiki/Mixture_model) with
[Gaussian](https://en.wikipedia.org/wiki/Multivariate_normal_distribution)
components. And with the magic of [Scalala](https://github.com/scalala/Scalala)
and [Scalanlp](http://www.scalanlp.org/) the code’ll be short, sweet, and easy
to understand.

## The Toy of Machine Learning Methods

Simple but instructive data structures like a Linked List work well as an
instructive tool. Good libraries provide solid and efficient implementations,
but it’s straightforward enough for beginners to implement in a variety of
manners. For our goals, Naive Bayes will serve the same purpose. As simple as
the model is, it’s reasonably powerful.

So what is the Naive Bayes model? Let’s say we want to group a bundle of emails
into two groups: spam and not spam. And all you have to go on are the contents
of the emails. In this situation, we’d like to just use the words in a single
email to decide whether or not it’s spamtastic or spamfree. Naive Bayes assumes
that you can make this decision based on each word in the email individually
and then combine these decisions. It’s
[Bayesian](https://en.wikipedia.org/wiki/Bayes%27_theorem) because it’s a
simple [Bayesian Model](https://en.wikipedia.org/wiki/Bayesian_network) and
it’s Naive because this approach assumes the words are totally independent and
have no statistical relation whatsoever.

## Model Representations

Due to it’s simplicity, and that naive assumption, Naive Bayes makes for an
easy model to understand and describe using a variety of models. here’s some of
the most frequent descriptions:

These two views of Naive Bayes describe the same model, but different ways of
computing it. For the model on the right, if we work backwards, it says that a
data point comes from some multinomial distribution . is a latent variable that
encode which group, i.e. spam or not spam, the data point came from, and that
itself comes from a multinomial . The two distributions describe our knowledge
about spam and non-spam emails, respectively. And finally, all three
multinomial distributions come from Dirichlet distributions. The added magic of
the [Dirichlet distrubtion](https://en.wikipedia.org/wiki/Dirichlet_distribution) is that it generates multinomial distributions, this
relationship is more formally known as a [Conjugate
Prior](https://en.wikipedia.org/wiki/Conjugate_prior). The plate diagram on the
left says nearly the same story except it collapses out the distribution
and links directly to the compnent labels. We could also in theory collapse the
distrubtions, but we’ll not do that for the moment.

### A Graphical Model

This graphical view tells an alternative story. Instead of probability
distrubutions making other distributions and then finally making data points.
this says that the class of a data point, generates the features of the data
point, . This is where the naive part comes from, each “feature”, i.e. word in
the email, is completely disconnected from the other words and only depends on
the class of the email.

### A Probability Distribution

Finally, there’s the written way to understand Naive Bayes, as a conditional
probability distrubtion. Let’s write out the distribution for just the spam
class:

This looks pretty much the same for non-spam. Simple, no? If we combine
together the different views above with this written form, then we can think of
the class as a [Multinomial
distribution](https://en.wikipedia.org/wiki/Multinomial_distribution) over
words and the probability of a word given the class spam is really just the
probability of picking the word based on how many times it’s shown up in spammy
emails. Similarly, the probability of seeing spam is just the number of times
you’ve seen a delcious piece of spam, be it on your phone, at home, or in the
frying pan. Using that intuition and some Bayesian math, the above definition
gets boild down to:

Let’s get some definitions out of the way.

Let’s tease this appart into two pieces, and . The first part is:

This basically says that the probability of spam is the number of time’s we’ve
seen it, plus some smoothing factors so that both span and non-spam have some
positive possibility of existing. Amazingly! this is also equivalent to the
collapsed distribution we mentioned in the bayesian description of Naive Bayes,
by doing just a little bit of math and realizing that the Dirichlet is a
conjugate prior of a multinomial, we get the above distribution for each class.

Next,

If describes the probability of each word occuring in a spammy email, then
becomes the likelihood of seeing that word as many times as observed in the
email. By computing the product of all these words, we naively get the
probability of the full email. Slam the two distributions together and we get
the full likelihood of the email given the class spam.

## Don’t forget Gibbs!

Now that Naive Bayes makes some more sense in a variety of descriptive flavours
and we’ve defined our distrubutions and hyper parameters, it’s time to throw in
gibbs sampling. To quickly refresh our memories, the recipe for gibbs at this
stage is:

```
    for each data point
        Forget about
        Compute the likelihood that each component, , generated
        Sample and jot down a new component, , for
        Remember
    Restimate our component parameters,
    Repeat
```

You might be wondering “why forget about the current data point?” The reason is
that we’re trying to decide what to do with a new data point. Gibbs sampling
only really works because the distrubtions we’re working with are
[exchangeable](http://en.wikipedia.org/wiki/Exchangeable_random_variables),
i.e. the ordering of our data doesn’t matter. So we can just pretend any data
point is new by just forgetting it ever existed, Note, this is why has a in the
denominator, that count has been “forgotten”. Other than that tidbit, we just
pretend everything else is the same.

## Writing out the code

With Gibbs sampling fresh in our minds, and our probability distributions
clear, let’s see what some real code looks like. To do this, I’m going to use
Scalala and Scalanlp, which take care of the linear algebra and probability
distrubtions for us really concisely. And while it may not be the fastest
library around, it’s super easy to read and understand. For faster
implementations, you can just translate this code into whatever beast you
desire and optimize away.

### Setting up before sampling

Before we go on a spam sampling binge, we gotta setup our initial groupings.
Gibbs sampling works pretty well with a random starting point, so let’s go with
that:

```scala
def sampleThetas(labelStats: Array[DenseVectorRow[Double]]) =
    labelStats.map(n_c => new Dirichlet(n_c+gamma).sample)

val k = numComponents
val v = numFeatures
val n = numDataPoints
var labelStats = Array.fill(k)(new DenseVectorRow[Double](
    Array.fill(v)(0d)))
var thetas = sampleThetas(labelStats)

val labels = new Multinomial(new Dirichlet(alpha).sample.data).sample(n).toArray
var labelCounts = new DenseVectorRow[Double](Array.fill(k)(0d))
data.zip(labels).foreach{
    case (x_j, j) => {labelStats(j) += x_j; labelCounts(j) += 1} }
```

So what’s going on here? Well, first, we just get some basic stats about our
data such as the size, the number of features and the number of components we
want, in this case, 2. Then we make a data structure that will hold the number
of times we see each feature within each component, labelStats; the number of
times we’ve seen each component overall labelCounts; and the parameters for
each compnent, thetas. Finally, randomly assign each point to a random
component and update the labelStats and labelCounts. Note that we get the
thetas from a Dirichlet distribution that uses the labelStats and a smoothing
parameter gamma, just like we noted in the Bayesian Plate diagram above.

Now for the real sampling meat:

```scala
for (i <- 0 until numIterations) {
    for ( (x_j, j) <- data.zipWithIndex ) {
        val label = labels(j)
        labelStats(label) -= x_j
        labelCounts(label) -= 1

        val prior = labelCounts + alpha - 1 / (n-1+alpha.sum)
        val likelihood = new DenseVectorRow[Double](thetas.map( theta =>
            (theta :^ x_j).iterator.product).toArray)

        val probs = prior :* likelihood
        val new_label= new Multinomial(probs / probs.sum).sample

        labelCounts(new_label) += 1
        labelStats(new_label) += x_j
        labels(j) = new_label
    }
    thetas = sampleThetas(labelStats)
}
```

The first three lines in the loop get the current label for `x_j` and then
forget about it’s data. prior represents the likelihood of selecting each
component just based on it’s frequency, i.e. . likelihood represents the
likelihood of each component generating `x_j`, i.e. . To finish off the
sampling procedure, we sample a new label by turning these likelihoods into a
multinomial distrubtion and sample from it. With the new label we then add in
the data for `x_j` to the that component’s stats. Once we’ve made a full sweep
through the data set, we update our parmeters for each component by resampling
from a Dirichlet distribution by using the our `labelStats`.

And Voila! We have a simple gibbs sampler for Naive Bayes.

## Running it on some data

Let’s see how this unsupervised version of Naive Bayes handles a really generic
looking dataset: globs of data points from three different Gaussian
distributions, each with a different mean and variance. And let’s start off
with just trying to find 2 groups, as we’ve been working along with so far.

![2 groups](/assets/img/2012/test.nb.groups.png)

Looks pretty neat huh? Even with a terrible and completely random starting
point, our learner manages to split up the data in a sensible way by finding a
dividing plane between two groups. What’s even cooler, is that notice how after
iteration 1 completes, nearly all the data is assigned to one class. By somehow
by iteration 10, we’ve managed to finagle our way out of that terrible solution
and into a significantly better solution. And by the 100th iteration, we’ve
stayed there in a stable state.

Now what happens if we try finding 3 components in the data set?

![3 groups](/assets/img/2012/test.nb.3.groups.png)

Here we get a similar split, but not what we’re looking for. Our mixture model gets all befuddled with the group on the bottom left and tries to flailingly split into two smaller groups. If you run this a couple times, you’ll see that it does the same thing with the two green groups, it can’t split them evenly as you’d expect.

## The Secret no one mentions

This simple model i’ve walked through is the unsupervised equivalent to the
supervised Naive Bayes model. It does a pretty reasonable job of splitting
apart some groups of data, but there are clearly datasets it has some issues
dealing with. But what’s not been said so far is that this model is actually
not just Naive Bayes, it’s a Finite Mixture Model with Multionomial components.
The code, probabilities, and graphs i’ve layed out all work for more than two
components. So next, i’ll show two cool ways to extend this model:

1.  With Gaussian components, which can better handle this toy data set
1.  With an infinite number of components, which figure out that paramter for
    you like a magician.
