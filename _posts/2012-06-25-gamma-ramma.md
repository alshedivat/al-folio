---
layout: post
title:  Gamma Ramma
date:   2012-06-25
description: Bayesian Gamma Visualizations
tags: research bayesian visualization
---

## Before getting to Cooler Mixture Models

Before going into the depths that is ways to improve the simple Multinomial
Mixture Model that I discussed in the last post, I want to give a little
adventure story regarding the [Gamma
distribution](https://en.wikipedia.org/wiki/Gamma_distribution). Why the Gamma
distribution?  Mainly because it is deeply tied to [Gaussian
distributions](https://en.wikipedia.org/wiki/Normal_distribution) and those
will factor heavily into cool things you can do in mixture models.

### This thing called my Conjugate Prior

So how is the Gamma distribution related to a Gaussian distribution? The short
story is that a properly parameterized Gamma distribution can approximate the
precision (or inverse variance) for a Gaussian distribution (the proper wording
for this relationship is that a Gamma distribution is a [conjugate
prior](https://en.wikipedia.org/wiki/Conjugate_prior) for a Gaussian
distribution when you know the mean but don’t know the precision). This turns
out to be super powerful when you have some idea of what the mean of your
Gaussian is but need to estimate the variance. However, this distributions has
some flavors that can really wreck havoc on your ability to learn these values
if you use them in the wrong place, and similarly people are really terrible at
pointing out which flavour you can and should use. So here’s an adventure on
taste testing the Gamma distribution

### Sampling from Gamma Distributions

Let’s start with an example. Let’s say we have two one dimensional Gaussian
distributions. Each distribution is defined by two parameters: for the mean, or
center point, and for the variance, or inverse precision. So let’s say our two
distributions have these two parametrizations: and . Here’s a nice density plot
of these two distributions together:

![Two Gaussians](/assets/img/two_univariate_gaussians.png)

Now let’s look at what the Gamma distribution can do if we sample from it with the “proper” parameters (which I’ll point out later on).

![Two Gammas](/assets/img/gamma_breeze_samples.png)

It looks like a good approximation of what we know the two variance values to
be and the samples can be generated really easily with Scala’s
[breeze](https://github.com/dlwh/breeze) library
which you’ll see in the next section. But let’s for funsies sake say that we
don’t like using breeze (say because we hate Scala and prefer to trust
libraries written in Java), we may then want to use some other implementation
of this distribution, like say in [Apache Commons
Math](https://commons.apache.org/proper/commons-math/) or Java’s [Colt
library](https://dst.lbl.gov/ACSSoftware/colt/).  What happens if we take the
parameters we passed into breeze and passed them to these libraries? What comes
out? Let’s See!

![Comparing two Gammas](/assets/img/gamma_comparison_samples.png)

That looks kinda funky. What’s going on? This exposes the difference between
the two main flavors of this distribution: two related but poorly explained
ways to parameterize the model! Both flavours depend on a shape parameter that
(aptly named) guides the shape of the distribution. The difference in the
flavours is the use of either a scale parameter, sometimes referred to as , or
a rate parameter, sometimes denoted as . Is there a relation between these two?
Totally! They are inverses of each other, i.e. .

## Finding the funky culprit

Now how do we know which of the above three implementations is doing the right
thing? One way is to use the [Inverse Gamma
distribution](https://en.wikipedia.org/wiki/Inverse-gamma_distribution).
Samples from an Inverse Gamma distribution should (roughly) be the reciprocal
of samples from a Gamma distribution with the same parameters. But these
packages don’t really have an implementation of an Inverse Gamma distribution,
so what else can we do to check? Well, Colt looks to be doing two really wierd
things that violate our intuitions about variances: (a) one set of variance
estimates are completely missing and (b) the one that does exist gives negative
variance values, and we know this to be impossible since the variance is
defined to be an average of real values raised to the power of two. And if we
read the Colt javadoc more carefully, we can figure out that they use the rate
and not the scale, but it’s never totally obvious in their documentation. So if
we fix that in our parameterization, we get this agreeable set of plots:

![Fixed two Gammas](/assets/img/gamma_comparison_fixed_samples.png)

That’s much better looking.

## Finding the magic parameters

Now let’s dive deeper and see how I made all these (now fixed) samples:

{% highlight scala linenos %}
import breeze.stats.distributions.Gamma
import org.apache.commons.math3.distribution.GammaDistribution
import cern.jet.random.{Gamma=>CGamma}

val data = ...
val alpha = 1d + 5000
val beta_1 = 1d + data(0).map(_-5.0).map(pow(_,2)).sum/2d
val beta_2 = 1d + data(1).map(_-10.0).map(pow(_,2)).sum/2d
val pw = new PrintWriter(args(1))
val numsamples = args(2).toInt
for ( ((a,b), i) <- List((α, 1/β\_1), (α, 1/β\_2)).zipWithIndex) {
    // Create a Gamma distribution using breeze 
    val gdist = new Gamma(a, b)
    // Create a Gamma distribution using Apache Commons Math
    val acgDist = new GammaDistribution(a, b)

    for (x <- 0 until numsamples) {
        pw.println("breeze %d %f".format(i, (1/gdist.sample)/10d))
        pw.println("commons-math %d %f".format(i, (1/acgDist.sample)/10d))
        // This is the easiet way to sample from Colt's gamma distribution.  Note that 
        // i'm now turning the scale parameter back into the rate parameter.
        pw.println("colt %d %f".format(i, (1/CGamma.staticNextDouble(a, 1/b))/10d))
    }
}
pw.close
{% endhighlight %}

In this snippet, I’ve left out data, but it’s simply a map for accessing the
list of samples I drew earlier to make the Gaussian plot. The key equations
here are for computing what I’m calling `alpha` and `beta_*`. Looking at a
handy table of [conjugate priors for continuous likelihood
distributions](en.wikipedia.org/wiki/Conjugate_prior#Continuous_likelihood_distributions),
we find these two core equations used in the code:

Where is the number of points in the group and denotes points within coming
from the same distribution. Looking at that table of conjugate priors and the
list created in the first for loop, you might wonder why i use the reciprocal
of the values, i.e. the scales. This is because of the cute footnote in the
conjugate prior table noting that

 as computed above is in fact the rate.

## An even more terrifying parametrization

Now if you thought what I’ve touched on is cool, a little funky, and possible
frustrating in the minor differences, it’s time to really complicate things. A
really smart man by the name of Carl von Rasmussen designed an [Infinite
Gaussian Mixture
Model](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.45.9111) that
depends heavily on the Gamma distribution for just
the purpose I’ve described. BUT he gives this parameterization:

Throw this into our sampling code and we get this rediculous plot:

![Infinite Gammas](/assets/img/gamma_comparison_samples_ras.png)

Which is totally wrong. So what gives? Well, at a much later date, Mr.
Rasmussen points out that as he defines them, the two parameters are slightly
mutated versions of the shape and scale as we’ve described them so far. The
real way to use his parameters is to mutate them by doing this:

## Summary!

So to summarize this adventure time blast, I have one key lesson: figure out
which parameterization your software is using and which parameterization a
model designer is using and make sure they match. Otherwise you’ll spend a
terrible amount of time wondering why you just can’t estimate those variances
accurately. I failed to do this a few weeks ago and was quite befuddled for a
while, so don’t be like me.
