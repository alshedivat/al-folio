---
layout: post
title:  ACL and EMNLP 2012 Debrief
date:   2012-07-13
description: Conference Debrief
tags: research conference
---

## Attending two conference in Jeju, South Korea

Today is the last day of two co-located top tier conferences for Natural
Language Processing and Computational Linguistics, ACL and EMNLP. There’s been
six full days of presentations, posters, and many conversations over coffee
breaks, lunch, and dinner. Being a lone researcher from two labs attending the
conferences, i’ve done a lot of floating and mingling with different groups.
Here’s a debrief of some of the most interesting talks and posters I’ve seen,
some good conversations i’ve had, and some thoughts on other parts of the
conferences.

## Talks and Posters

By a wide margin, the most intersting talks, in my opinion, were those that
used clean and well structured (non-parametric) bayesian models to analyze text
or speech. Here’s a short run down of the ones I liked most.

### [A nonparametric Bayesian Approach to Accoustic Model Discovery](https://aclanthology.org/P12-1005.pdf)

This paper tied together [Hidden Markov
Models](https://en.wikipedia.org/wiki/Hidden_Markov_model) and [Dirichlet
Process Mixture
Models](http://blog.echen.me/2012/03/20/infinite-mixture-models-with-nonparametric-bayes-and-the-dirichlet-process/)
to automatically learn word phonemes in spoken data. Everytime an utterance is
observed, guess at some word boundaries and then for each segment in the word
boundary, they select a HMM from a Dirichlet Process to model the phoneme.
Their performance was pretty good considering it was fully unsupervised and
their model even learned finer distinctions between phonemes based on common
speaker patterns that weren’t recorded in the test labels.

### [ITS: A Hierarchical Non-parametric Model using Speaker Identity for Topic Segmentation in Multiparty Conversation](https://aclanthology.org/P12-1009.pdf)

This model extends LDA to utilize speaker identities to automatically determine
the topics each speaker prefers to use and the likelihood of a speaker changing
a topic during a conversation. For example, in a Vice-Presidential debate, they
captured Sarah Palin’s tendancy to completely change the topic of the
conversation when responding to a question.

### [Word Sense Disambiguation Improves Information Retrieval](https://aclanthology.org/P12-1029.pdf)

WSD has often been linked to IR with mixed results. This late test attempt
first performs WSD by learning word senses from aligned texts in Chinese and
English, where word senses are determined by the presence of multiple
translations of a word between the two languages and ways in which they can be
translated. Using this information they were able to improve a standard IR
baseline on the TREC dataset.

### [Learning to “Read Between the Lines’ using Bayesian Logic Programming](https://aclanthology.org/P12-1037.pdf)

This was my first exposure to Bayesian Logic Programming, which provide a nice
and more scalable alternative to Markov Logic Networks. Using a pipeline
system, they do some information extraction and then use a BLP to infer logical
connections that can then be used to infer unsaid facts from observed
information. For instance, If we know Barack Obama is President of the U.S.,
and we know that presidents, or leaders in general, are members of their group,
then the BLP should probabilisticly infer that Barack Obama is a member of the
U.S. even if it’s never said.

### [Computational Approaches to Sentence Completion](https://aclanthology.org/P12-1063.pdf)

This evaluated Language Model and Distributional Models using a SAT styled
sentence completion test. They covered a lot of different approaches to this
problem, includeing two ways of using LSA, a Recurrent Neural network, and
standard N-Gram based Language Models. The LSA models clearly did best which
suggests something should be done to enhance the other models. I’d like to see
if the different models made different types of errors, for instance, did one
handle world knowledge based questions better, like “the bike law was _ by
congeress” where the blank should be “ratified”, and do others handle other
types of questions better. If this is the case, then perhaps we can learn these
situations and build a model to decide when to use each approach on a test
question.

### [Bayesian Symbol-Refined Tree Substitution Grammars for Syntactic Parsing](https://aclanthology.org/P12-1046.pdf)

This model used a really elegant and simple three level Pitman-Yor process to
combine two sophisticated parsing models together, Symbol-Refined trees and
Tree Substitution Grammars. The first approach refines each node in syntax
trees with finer categories and then second considers subtrees within a full
tree. By using the three level Pitman-Yor model, given a parsed example, the
first level process models the full tree, the second level models symbol
refinements, and the third models possible tree substituions. Given the huge
state space, they showed a simple but effect blocked sampling algorithm.

### [Using Rejuvenation to Improve Particle Filtering for Bayesian Word Segmentation](https://aclanthology.org/P12-2017.pdf)

This model uses an unsupervised Sequential Markov Model to represent word
segments. They improved upon a prior online approach by including Rejuvenation
to the sequential model, which resamples a subset of prior examples after
modeling a new sample. By doing this, they model can fix past mistakes made
when there was less knowledge about the dataset. This is mostly cool because I
fancy Sequential Monte Carlo methods.

### [Unsupervised Relation Discovery with Sense Disambiguation](https://aclanthology.org/P12-1075.pdf)

This paper presented a really interested use of fully unsupervised Word Sense
Induction methods. They used a very cute variant of LDA where documents are a
series of extracted dependency relation tuples using the same connecting
relation. The “words” were then feature vectors modeling each tuples words and
the topics observed from the tuples source sentence and document. The WSD model
showed good improvement over relation clustering, but has some limitations. The
topics learned by LDA provide an initial clustering over the relations, then a
second stage of HAC groups related topics. Would a fully non-parametric model
create a more accurate number of clusters automatically by only generated
topics when they are truely separate? Could this also be used to test different
WSI approaches and give an indiciation of where they are lacking or what
features are missing?

### [Joining Forces Payes Off: Multilingual Joint Word Sense Disambiguation](https://aclanthology.org/D12-1128.pdf)

This Model utilizes BabelNet with a simple ensemble model to really boost
knowledge based WSD. For a given word in a context, they generate the possibile
translations in multiple languages and then for every sense they compute a
graph centrality score using BableNet using the candidate translations. Each
translation serves as an individual WSD model which are combined with a simple
probablistic mixture model. Given BabelNet, this looks really promising. It
might be good to try using this over NYT with my Topic Model evaluations and
use it as a comparison between Knowledge Based WSD and fully unsupervised WSI.

### The Appification of the Web and the Renaissance of Conversational User Interfaces

Patrick Pantel gave this amazing plenary talk and covered the coming issues and
opportunities presented by the growing trend of users accessing the internet
via siloed apps on mobile devices and the desire of users to perform tasks
using a conversational approach. He presented a lot of really good issues that
need consideration and solving. He also went into dept about a graphical model
connecting user queries to user intentions and possible actions that can
address those desires. I’m really fascinated by what can be done with a given
model once it’s been built. For instance, if you have this kind of model and
the user, which has some model of their general intentions or desired actions,
then asks “what can i do that is interesting”, can you then project the dataset
backwards into a view of possible actions and intentions that the user can then
navigate through to explore possible things to do. Concretely, if the model
knows I like certain types of food at certain prices, can it take that
knowledge and then organize surrounding restaurants in terms of what i like so
i can pick and choose these things easily, especially when I don’t really know
what I want initially?

### [Learning Constraints for Consistent Timeline Extraction](https://aclanthology.org/D12-1080.pdf)

The motivating example behind this paper was the challenge of extracting
semantically consistent facts regarding a single entity. For example, given
many mentions about James T. Kirk and many events with him as a participant,
can you extract the logically consistent facts, such as that he was born after
his father and was a space cadet before being a captain or instructor? They do
this with a joint supervised system that extracts facts and validates their
consistency.

### [Monte Carlo MCMC: Efficient Inference by Approximate Sampling](https://ciir-publications.cs.umass.edu/getpdf.php?id=1053)

This paper was really exciting and elegant. When doing a Metropolis Hastings
update in a graphical model, it requires computing the acceptance rate in terms
of factors that change based on the update. However some of these factors can
be expensive to compute, and there may be many many factors. To improve
efficiency, they simply use a subset of the factors in a probability
factorization to compute the acceptance rate, using two possible methods for
selecting that subset. First, they consider a random subset of a uniform size,
and alternatively, they sample more and more samples until the samples have an
estimated mean with 95% confidence, allowing different proposals to use
different sized subsets of factors and giving the inference more flexibility.
In short, really simple, really smart, and really effective.

### [Discovering Diverse and Salient Threads in Document Collections](https://aclanthology.org/D12-1065.pdf)

News corpora cover many related artciles about a string of events. This
approach uses a simple graph analysis algorithm to extract chains of articles
that cover a single topic spread accross many documents. The main issues seem
to be with scale and how to select how many and which threads to extract. For
instance, can you first impose a hierarchy of topics over the dataset and then
select threads within that decomposition? Is there some number of diverse
threads that sufficiently describe the dataset? And how would you learn a lot
of different threads?

### [Constructing Task-Specific Taxonomies for Document Collection Browsing](https://aclanthology.org/D12-1117.pdf)

This sounds really cool, but i didn’t have a chance to see the presentation and
haven’t read it yet.

### [Semantic Compositionality through Recursive Matrix-Vector Spaces](https://aclanthology.org/D12-1110.pdf)

Andrew Ng currently seems to have a man crush on neural networks. He and a
student show a neat improvement upon Recursive Neural Networks, which can do
compositionality between phrases that have non-linear properties. Take the
phrase “absolutely sad”, it does some funny things composition wise, and
existing RNN models can’t handle it. They go a step beyond by projecting each
component phrase’s vector representation by a matrix modeling the other word’s
uses. So in the example, sad modifies absolutely and visa versa, then the joint
vector for both modified words gets pushed through a standard RNN. It worked
out pretty well, but requires training. I’d love to see something here that
doesn’t need training.

## Conversations with other people

My talk about Exploring Topic Coherence over many models got some interesting
responses that were really interesting.


1.    First, we didn’t really vary the feature weighting mechanism before doing
      LSA and PLSA, so this may be affecting the performance of those models
with information that LDA doesn’t have, if we try other schemes, or no scheme,
what happens? does that mean we could improve LDA if we have a way of encoding
that information?
1.   How doe the models compare when using corpora of different sizes? We could
     use TASA as an example of a smaller corpus, or UKWac and Wikipedia as
larger corpora. Does LDA get better representations with less information or
does SVD? Can we then improve either method with those lessons.
1.   What about word senses? Can we pos tag and word sense tag the corpus and
     then see improvement along multiple lines? When doing the coherence
evaluation, we would probably just have to use the raw tokens initially, but
for the word similarity and document evaluations, we can use the sense tagged
words. Issues with this: How do we do sense tagging? SemCore is reasonably
sized but WSD models kinda suck. Are they sufficient to improve results? What
about WSI models? If WSI models do something positive, this would be a good
evaluation of those models without actually knowing what kind of senses or how
many we need to learn.

## The Location

I wasn’t such a huge fan of the conferences being located on Jeju island. There
were things to do on the island, but they were all expensive, as was the food,
in my opinion. Furthermore, the banquet was mildly terrible. We had it in this
tiny restaurant next to the ocean, which had a nice view granted, but was too
small for the attendees and it was a buffet, so a hundred computational
linguists, which all heard about [Chinese Restaurant
Processes](https://en.wikipedia.org/wiki/Chinese_restaurant_process) got to
wait in line to sample tasty Korean food. As awesomely ironic as it was, it
made getting food a terrible experience. I’d have prefered the be in some major
city or college town where things are cheap (note how the 2010 meeting of ACL
was amazing). Jeju is nice and all, especially if i had the time and money to
explore the island more, but I had neither really, and I think nearly all
students felt the same way.
