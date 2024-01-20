---
layout: post
title: Finding similar documents
date: 2017-11-04 11:59:00-0400
description: A fast algorithm to quickly scan over the corpus
tags: comments
categories: sample-posts external-services
giscus_comments: true
related_posts: false
---
Here we address the problem of looking for similar, but not necessarily equal items. This is frequently the case of looking for related documents. For example, all the versions of the same news article: they all possibly come from the same source, each website makes slight modifications.

# Distance measures

If we wanted to find equal documents, finding an efficient solution would be relatively straightforward: hash them and see which ones fall in the same bucket. In this case, we have to define a similarity measure or, analogously, a distance metric, which takes small values when the two items are alike. Many metrics for different kinds of data have been defined.

## Jaccard distance

The Jaccard similarity between two sets $$A$$ and $$B$$ is defined by looking at the relative size of their intersection:

$$J(S,T)=\frac{|S\cap T|}{|S \cup T|}.$$

Equivalently, the Jaccard distance is defined as $$1-J(S,T)$$.

## Cosine distance

Cosine distance is used in spaces that have dimensions, and hence we can think of points as non-zero vectors. In this case, the distance between two vectors $$x$$ and $$y$$ would be the angle between them, which independently of how many dimensions are there, will be between 0 and 180 degrees.

## Edit distance

Edit distance can be used when points are strings. The distance between two strings $$x$$ and $$y$$ will be the smallest number of single-character insertions and deletions that would convert $$x$$ into $$y$$. It can be easily computed from the *longest common subsequence*.

# Efficiently finding similar items

In this problem, we will start from N items (documents, images, etc.) which we represent in a D-dimensional space. An exhaustive approach is calculating all pairwise distances, but that would be very inefficient ($$O(N^2)$$). Instead, we will study an approximate methods, that produces a good enough estimation of similarity in a reasonable time. The process is divided in:

1. Shingling: convert documents into vectors/sets.
2. Minhashing: convert sets to signatures.
3. Local-sensitivity hashing: make an estimation of the similarity.

## Shingling

The first step is representing the documents as sets. A $$k$$-shingle of a document is the set on any substring of length $$k$$ that appears in the document. Or, instead of directly using substrings as shingles, we can apply a hash function that maps strings of length $$k$$ to a number of buckets, representing the data more compactly while conserving most of the information. This is possible because many of the possible shingles might never appear i.e. we are mapping documents to a mostly-empty space. So it's possible to map every shingle the lower dimensionality space represented by the buckets.

The choice of $$k$$ is not trivial, and mostly depends on how long are usually the documents we are dealing with. Hence, $$k$$ must be chosen so that the probability of any given shingle appearing in any given document is low: the longer the average document, the higher the $$k$$ of choice.

There are two kind of special elements in the text that must be dealt with: white spaces - tabs, spaces... - and *stop words* -  the most common words. Stop words are specially interesting because, while usually are just ignored, in some instances they have been used for improved classification.

(Sets contain unique, unordered elements; multisets or bags are generalisations of sets which may contain several instances of the same element.)

## Minhashing

In the exhaustive approach, we could already take the shingle-sets and calculate the Jaccard index between all pairs, still a problem with $$O(N^2)$$ complexity. Additionally, shingle-sets are large. For example, shingle-set hashed to 4 byte-buckets still occupies 4 times more than the original document. So we will convert the sets to small signatures that preserve the similarity information i.e. if two documents are similar, they will tend to have the same output in the hash functions.

We will do so through a process called minhashing. To understand it, we can imagine all our shingle-sets represented it as a characteristic matrix $$C$$, although out data most probably won't be represented like that. Each column $$c$$ of $$C$$ is one document; each row $$r$$ represents one element of the all the possible shingles; and an element $$C_{r,c}$$ will take a value of 1 if the element for row $$r$$ is a member of the set for $$c$$ and 0 otherwise. In the minhash procedure, we will create a minhash signature matrix $$M$$ by repeating the following steps $$n$$ times:

1. Generate a random permutation of the rows of $$C$$.
1. For each column $$c$$/document:
	1. Get the first row $$k$$ that has a 1.
	1. Fill the column $$c$$ of the signature matrix M with $$k$$.

We build a new representation of our set $$S$$ as a vector $$[h_1(S), h_2(S), ..., h_n(S)]$$. This is the only representation we will use to study similarity. Minhashing exploits an interesting property: the probability that permutation $$i$$ of two sets $$S$$ and $$T$$ produce $$h_i(S) = h_i(T)$$ equals the Jaccard similarity of these two sets. This allows us to estimate the Jaccard similarity from $$M$$.

In practice, permuting a huge matrix is very time consuming, and it is not feasible in real-world applications. Instead, $$n$$ hash functions $$h_i$$ are selected, which are applied on the row number. In some cases, two rows might end up in the same bucket. But still, in most of the cases that will not happen, so this is a good approach to random permutations.

## Local-sensitivity hashing

We calculate M, which has a complexity of N. We will pick the documents that are similar enough on the M matrix as candidates to similar documents. Then, we will compute exactly the Jaccard similarity between the candidates.

We do that by binning the rows into bands, and the compare the documents inside each band. We will get how many bands are exactly the same between two documents.

Depending the choice of r and t, we modulate the curve. Hence we get to the sensitivity of our curve.

# References

* Leskovec, J., Rajaraman, A., & Ullman, J. D. (2014). Mining of Massive Datasets (3rd ed.). Cambridge University Press. Retrieved from http://i.stanford.edu/~ullman/mmdsn.html

