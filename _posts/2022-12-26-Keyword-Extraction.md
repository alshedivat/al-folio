---
layout: distill
title: How E-commerce Dataset look like and what can we do?
description: an example of analysis and modeling data in E-commerce
date: 2022-12-28

authors:
  - name: Khanh H. Le
    url: "https://lekhanhh.github.io/"
    affiliations:
      name: FPT-Software, HCMC

toc:
  - name: Preface
  - name: How to extract Keyword from a text?
  - name: What if there're duplicated keywords in result?
  - name: Is there any technique related to Keyword Extraction Problem? How they perform?
  - name: How do we evaluate?
  - name: Conclusion

# If you use this post as a template, delete this _styles block.
_styles: >
  .fake-img {
    background: #bbb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }
  .fake-img p {
    font-family: monospace;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }
---

<div class="row mt-3">
    <div class="col-sm mt-6 mt-md-0">
        {% include figure.html path="assets/img/udacity/KeywordExtraction.jpeg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
---

**NOTE:**
This blog base on my work. See full code in my [repository](https://github.com/lekhanhh/udacity_capstone_project)

## Preface

Since the first time I was taught English, I've been wondering how the grammar & linguistic was created & set up if I want to build a Jarvis (Ironman) to teach him like a child.
I had a short time working for web development, and I know that SEO (Search Engine Optimization) is top important for website to reach more and more audiences.
Facebook is extracting activity data from users (post, caption, chat, comment, extracted data from image, voice, ...) to make money from data (create target marketing by using keyword & interest) and you know how big Google & Facebook is

## How to extract Keyword from a text?

Idea of all Keyword extraction algorithms based on 2 approaches:

1. Linguistic Approaches/ Syntactic analysis
   This appoach dive deeper into the linguistic details of the text.
   This method extracts linguistic information, breaking up the given text into a series of sentences and tokens (generally, word boundaries), to provide further analysis on those tokens. For each word in the text, the API/package tells you the word's **part of speech** (noun, verb, adjective, etc.) and how it relates to other words in the sentence (Is it the root verb? A modifier?)
   For example:

---

<div class="row mt-3">
    <div class="col-sm mt-6 mt-md-0">
        {% include figure.html path="assets/img/udacity/linguistic-parsing.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
---
2. Graph-based Approaches
This approach based on an Graph(abstract data type in computer science) idea: 
A sentence usually inclued: S, V, O. Let say if we can extracted perfectly S, V, O from a single sentence.
We can create an edge from a sentence. S & O are the node, and V will be the weight of that edge. 
A text, which make from a list of sentence can be extracted in to a list of edge, which can be formed into a Graph. 
With this Graph, we can do lots of Algorithms to find the most valueable keywords. The easiest way is weighting the node with the sum of all weight of edges connected to that node, then rank them in descending order.
---

<div class="row mt-3">
    <div class="col-sm mt-6 mt-md-0">
        {% include figure.html path="assets/img/udacity/graph-based-approach.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
---

I'm trying to combine 2 approaches and find out

Suppose it is every sentence is strutured as : S + V + O
So 1st entity is S, 2nd entity is O, relation is V
I want to extract 2 entities & relation between 2 enities in the sentence.
So when it come to a normal sentence, how can we find it?

With Linguistic Approaches, Spacy use "matcher" to define new rule for entity & relationship.
In my case, I used the very simple pattern:

- The entities : Should be noun (has tagged with 'NN', 'NNP', 'NNS', 'NNPS' & 'N')
- The relation : verb (ROOT) and can be followed by xcomp & aux (optional)

All Part of Speech (POS) can be seen via this [link](https://machinelearningknowledge.ai/tutorial-on-spacy-part-of-speech-pos-tagging/)

Then, a single sentence will be extracted into an edge with 2 node like this

<div class="row mt-3">
    <div class="col-sm mt-6 mt-md-0">
        {% include figure.html path="assets/img/udacity/edge-example.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Or, we can define ourself by using Matcher to define entity or relation.
The Matcher need a pattern to find the entity/relation/signal or anything you want to find.
We can add more Matcher into our recognize engine to find linguistic pattern, and of course, we need an linguist to be well defined all of patterns in English.

I start with the most naive thought that if the graph is built, we can observe the most important entity that the text mentioned mostly. The weight of edge even isn't necessary because we can mark an edge as 1 unit of weight.
The hardest thing is we have to define which string are belonged to 1 entity without comparing text (because we can't compare text if the entity is mentioned like third-person pronouns). And I decide to investigate it later, this version tried to implement the first prototype.
With help of gensim package (TextRank Summariser), I can score each keyword with a specific score, and I used it to score my extracted entities pair.
But, when I implemented with the relation score or trying to build a graph of keyword, I tried many different way to score the importance of the node. And I decided to score each node base on the maximum score of connected node.

---

## What if there're duplicated keywords in result?

While extracting keyword with many test case, I can see that there're some duplicated keywords in result. This cause by every node cannot be as well-defined as a number. Keyword exist in multiple forms with passive, plural, uppercase, ...

So I decided to write a function that remove duplicated of extracted keywords.
the ideal is looking if a keyword isin another keyword. This should solve passive & plural forms. Some keywords with additional adjective is the same node can be replaced with this method. A 2-nested loop is good enough to check all keyword pair.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/udacity/strange-string.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Then I tried to add TF-IDF as an additional score to work with my algorithm to improve performance.
After that, I normalize 2 output to make the final output using unity-based normalization.
With that result, I tried to implement other method for comparision (KEA, YAKE, ...)

---

## Is there any technique related to Keyword Extraction Problem? How they perform?

There's not many algorithms for Keyword Extraction in the internet. PKE & YAKE are the lastest updated.
Here's some overview & comparisions: [PKE vs YAKE](https://www.libhunt.com/compare-pke-vs-yake)

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/udacity/pke-yake.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

I decided to implement PKE and make some comparision with my algorithm.
For short defination of PKE : pke is an open source python-based keyphrase extraction toolkit. It provides an end-to-end keyphrase extraction pipeline in which each component can be easily modified or extended to develop new models. pke also allows for easy benchmarking of state-of-the-art keyphrase extraction models, and ships with supervised models trained.

This One below is using UNSUPERVISED Model

<div class="row mt-3">
    <div class="col-sm mt-6 mt-md-0">
        {% include figure.html path="assets/img/udacity/pke-unsupervised.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

This one below is using SUPERVISED Model

<div class="row mt-3">
    <div class="col-sm mt-6 mt-md-0">
        {% include figure.html path="assets/img/udacity/pke-supervised.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

We should have evaluation method to decide which model is better.

## How do we evaluate?

There's no official Validation till now (synonym, different forms, ... - we cannot compare string strictly)
In most of paper, they used F1-Score & mAP (mean Average Precision) to evaluate the result
(based on top 10 keywords extracted), see the [paper](https://www.aclweb.org/anthology/W19-8617.pdf)

So I build my own F1-Score using:
Original Precision : TP/(TP + FP)
KE Precision : |annotated keyphrases ∩ extracted keyphrases|/|extracted keyphrases|
Recall : TP/(TP + FN)
KE Recall : |annotated keyphrases ∩ extracted keyphrases|/|annotated keyphrases|
F1-Score = 2* Precision * Recall / (Precision + Recall)

But the result is not good (0.24), with PKE result, F1-score show 0.4, a little bit higher but it doesn't relfex the technical (synonym, different forms, ...) which existed as a wall to pass.

<div class="row mt-3">
    <div class="col-sm mt-6 mt-md-0">
        {% include figure.html path="assets/img/udacity/pke-f1score.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

To be better comparision, we could use stemming as a tool to convert every keyword into original form then check the repeated entity. But it's hard to observed and once you stem word, you can not find the original word back.
This kind of problem remind me to the Identity Graphs on AWS or Knowledge Graph. But it seems to be out of scale of this project.

---

## Conclusion

This blog just show how to deal with Keyword Extraction problem, find Linguistic pattern & build a Knowledge Graph in NLP problems. The current result is not very high caused by validation method & string problem. It's hard to make computer understand which entities are the same one. In the brighter sight, we know about the concept of this NLP problem, there're lots of open problem to work in the future. And, we can completely use this algorithm to support SEO to create list of hashtag, or use it as a tool extracting main keyword of a thesis, essay, ...

Further work:

- Better accuracy function for validation.
- Apply Machine Learning in NLP
- Apply Transformer for a first prototype of BERT
- Apply Knowledge Graph
- We can draw graph as a mind map for essays or even books.
