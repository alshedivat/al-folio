---
layout: post
title: "Why use salt on icy roads?"
description: Review of common sense reasoning literature
date: 2018-08-14 18:12:41+0100
comments: true
---

<div class="img_row">
    <img class="col three" src="{{ site.baseurl }}/assets/img/icysalt.jpg">
</div>

<br>

[Page under construction, check back in a few days]

<br>

Common sense reasoning has long been a well sought after goal for artificial intelligence researchers. From John McCarthy's efforts to formalize common sense inference using first order logic to Marvin Minsky's inception of the Open Mind Common Sense Project that resulted in ConceptNet[^f4], many researchers have established large-scale projects to tackle this challenge. Yet, we still stand very far from truly imparting common sense reasoning capabilities in machines. This calls for a greater need to perform research in this area: focusing on 1) forms of representation that are complementary with recent advances in the use of deep neural network models, 2) acquisition and learning of seen and unseen knowledge and finally, 3) exploring ways of biasing our models with common sense knowledge. Do our models already learn a fair bit of common sense? Is this already internalized into the models? There are considerable benefits of having more explicit control over what is encoded though: post-filtering, not getting biased by the data. Of course, it would be ideal if we could have a "god" system that would allow us to perform all forms of abstract queries but we don't have to our exposure such a flexible system.  

<!-- the Cyc Project[^f1] which took swing at MCC ...., and the NELL[^f2] project at CMU.  -->
 Imparting common sense into machines has always seemed like a critical goal for building somewhat sentient machines. But we realized over time that what humans perceive as "common" sense is not so trivial to be incorporated in AI agents. Instead, we resorted to solving tasks which are more constrained, nevertheless important. This article discusses some of the challenges of instilling common sense into our AI agents, provides a survey of work on research in this exciting research area, including large-scale knowledge collection projects and recent work on mental state prediction and reading comprehension with common sense. We will focus primarily on recent work and discuss possible directions for future research. And finally, we will also address as to why it is difficult for a machine to answer the question in the title, i.e. why we use salt on icy roads?

#### Why and when do we need common sense?

Before we get into the complexities of this topic, lets try to understand if common sense really is important for the models that we build these days. John McCarthy once said in an interview, "Purely computational programs don't require common sense." That sounds completely reasonable, you wouldn't imagine a chess program needing to reason about the mental states of its opponent. It could model those processes into the decision making, but there is no evidence that it would benefit from this. On the other hand, models that perform natural language generation can conceivably benefit from common sense facts about the world. We want to avoid generating text that does not seem sensible or plausible given our knowledge about the world. We would like to ensure that the text we generate abides by common sense concepts, thereby also reducing our hypothesis space by a large extent. Such information would not just be useful with natural language, but with computer vision, multiple other modalities and their combinations. For instance, if a chef is getting together ingredients to make sushi in a movie, it is easy for us to conclude that he/she is making sushi, but this will not be an easy task for a machine unless it has seen this example before.

We haven't actually discussed what common sense encapsulates. It's a loosely defined phrase, but lets define it as the *ability of human beings to perceive real-world objects and situations, and make inferences of varying complexities, often relying on background knowledge about the world*. It is important to note here that this ability in humans is tied strongly with what we speak and how we behave. It appears that a large chunk of work in this area has focused on the **representation** of these common sense facts, sometimes ignoring the need for this knowledge to usable by reasoning and generation models.

A certain kind of reasoning which requires us to use knowledge about the world.


#### Types of Common Sense

There are different forms of inference we care about when dealing with common sense knowledge. Often, we are concerned about the plausibility of an event or fact. Sometimes, we care about the likely effect of an event, where the event and its effect might both be unknown.
forms of common sense that have been discussed in previous literature include:

**Taxonomic Reasoning** - Reasoning over hierarchical databases like WordNet created by mining the web. Several different relation types can be queried in such databases -- symmetry, transitivity, and reflexiveness. For example, take the example of the animal kingdom, elephants are heavier than cats, and cats are heavier than mice, hence, we can conclude that elephants are heavier than mice :open_mouth: .

**Temporal Reasoning** - Reasoning about the relative times between occurrence of multiple events. A classic example is this, if we know that PersonA was born after PersonB and died before PersonB, then PersonB lived longer than PersonA. Note that the events that have happened -are known, and we are merely concerned about their ordering in time.

**Qualitative Reasoning** - Analyzing cause and effect between interrelated quantities. Going back to our animal kingdom example, assuming we know than elephants eat grass, if humans burn a lot of grass in their habitat, elephants are likely to die because of shortage in diet. Another example of this is, if you shout at someone, he/she is likely to be sad. Evidently, this encapsulates infinitely wide range of cause/effect relationships in science, ecology, and other domains that couldn't possibly be found in data. As humans, we have the capability to learn from causal relationships and judge accurately the plausibility of new relationships. For instance, humans have great instincts to responding to any possible danger. We don't need to have seen all possible circumstances that could cause damage to us, but we can appropriately judge if an event is harmful for us. This might not be easy to do for a machine.///

#### Existing Views to Common Sense Representation

<div class="img_row">
    <img class="col three" src="{{ site.baseurl }}/assets/img/gkngraph.jpg">
</div>
<div class="col three caption">
    A simple, elegant caption looks good between image rows, after each row, or doesn't have to be there at all.
</div>

#####  **Knowledge-based approaches**
This view approaches the problem by attempting to create a large collection of facts, that may be probabilistic. To obtain this repository of facts, we could turn to web mining methods [^f1] [^f8] [^f9] or crowdsourcing [^f4]. This form of reasoning is limited by the amount of knowledge that can be encoded in these databases as well as the difficulty of representing abstraction relation types in the database. Usually, facts and relations are encoded in a knowledge graph. Examples of this are the Google Knowledge Graph that is used for Google Search or ConceptNet. Inference is usually performed using theories from mathematical logic or informal approaches like those of Minsky (1975) and Schank (1977). The most successful example in this approach is the Cyc Project, launched by Doug Lenat in 1984. Cyc has a large collection of concepts and facts, which are mostly taxonomic in nature.  
Semantic networks that encode relationships between entities (or classes of entities).

Among knowledge-based approaches, there is web mining like NELL [^f8] and KnowItAll [^f9].

#### Challenges associated with common sense induction

As has been highlighted in Ernest (2015), although the problems of representation and inference have been looked at in depth, the problem of actually carrying out reasoning using common sense knowledge remains largely unsolved.

##### The Long Tail of Common Sense

Negations, long tail of facts that don't occur in the data such as, the name of the author of an obscure book, or something that is very obvious to humans, like oranges are round.

##### Unseen Domains

##### Increasing Complexity of Queries

    Importance of nonmonotonic reasoning, deductive is monotonic



#### Recent Work: Mental state prediction, RC using common-sense knowledge

Now to the more exciting stuff, the research that has recently been published on this topic. It's encouraging that institutions like [AI2](allenai.org) and [UW](https://www.cs.washington.edu/research/nlp) are heavily focusing on the right kind of goals for CSR.

Among tasks asking participants to make use of world knowledge, SemEval Task 11 for machine reading with common sense reasoning. The organizers created a dataset that would use script knowledge in addition to factual knowledge given in the passage. However, only 3 out of 11 teams actually used common sense knowledge explicitly. Question arises whether explicit


Recently, there has been a lot of relevant work in commonsense reasoning models dealing with creation of datasets capturing the some facets of common sense reasoning. Swag [^f5] is a dataset for natural language inference of the kind that requires common sense reasoning. The dataset is constructed using a method called adversarial filtering that explicitly avoids the presence of annotation artifacts that are easily detectable by neural models. Event2Mind [^f6] proposes an interesting problem for
predicting the intents and reactions of the participants involved in a short free-form text. A crowdsourced dataset is created for this task and neural models are put to test for the prediction.

There was a missing link between theories from cognitive science and common sense reasoning. This paper [^f7] tries to bridge that link by proposing an annotation framework modeling the mental states of story characters by mapping them to theories of motivation and emotion from Maslow, Reiss and Plutchik.

## Future Research Directions

We are still in the nascent stages of building links between traditional commonsense reasoning and reasoning/generation models. Hence, it is important to set goals for what we would like to achieve thoughtfully. We don't exactly want to collect a very large set of logical propositions. Ideally, we would like our r/g models to actively use common sense knowledge to always formulate "sensible" hypothesis. When integrated correctly, this can greatly benefit our systems.

### Need for benchmark datasets

Carefully thought out set of tasks and datasets.
Talk about benchmark such as the Winograd schemas, [^f10]


### Incorporating cognitive science theories
Researchers in cognitive neuroscience have built elegant theories for how we respond to stimuli.
A good example is Modeling Naive Psychology [^f7]

###

ConceptNet Numberbatch Embeddings[^f4]

<div class="img_row">
    <img class="col two first" src="{{ site.baseurl }}/assets/img/8.jpg">
    <img class="col one last" src="{{ site.baseurl }}/assets/img/10.jpg">
</div>


<div class="img_row">
    <img class="col one first" src="{{ site.baseurl }}/assets/img/11.jpg">
    <img class="col one" src="{{ site.baseurl }}/assets/img/12.jpg">
    <img class="col one last" src="{{ site.baseurl }}/assets/img/7.jpg">
</div>


-------------------------------------------------------------------------------------


[^f1]: [Never-Ending Learning](http://www.cs.cmu.edu/~tom/pubs/NELL_aaai15.pdf). T. Mitchell, W. Cohen, E. Hruschka, P. Talukdar, J. Betteridge, A. Carlson, B. Dalvi, M. Gardner, B. Kisiel, J. Krishnamurthy, N. Lao, K. Mazaitis, T. Mohamed, N. Nakashole, E. Platanios, A. Ritter, M. Samadi, B. Settles, R. Wang, D. Wijaya, A. Gupta, X. Chen, A. Saparov, M. Greaves, J. Welling. In Proceedings of the Conference on Artificial Intelligence (AAAI), 2015.
[^f2]: Lenat, Douglas B., and Ramanathan V. Guha. [Building large knowledge-based systems; representation and inference in the Cyc project](https://www.sciencedirect.com/science/article/pii/000437029390092P). (1989).
[^f3]: Davis, Ernest, and Gary Marcus. [Commonsense reasoning and commonsense knowledge in artificial intelligence](https://dl.acm.org/citation.cfm?id=2701413). Communications of the ACM 58.9 (2015): 92-103.
[^f4]: Robert Speer, Joshua Chin, and Catherine Havasi (2017). [ConceptNet 5.5: An Open Multilingual Graph of General Knowledge](https://www.aaai.org/ocs/index.php/AAAI/AAAI17/paper/viewFile/14972/14051). In proceedings of AAAI 2017. ; https://github.com/commonsense/conceptnet-numberbatch
[^f5]: Zellers, Rowan, et al. "SWAG: A Large-Scale Adversarial Dataset for Grounded Commonsense Inference." arXiv preprint arXiv:1808.05326 (2018).
[^f6]: Hannah Rashkin, Maarten Sap, Emily Allaway, Noah A. Smith, & Yejin Choi. Event2Mind: Commonsense Inference on Events, Intents and Reactions. In Proceedings of the 56th Annual Meeting of the Association for Computational Linguistics 2018.
[^f7]: Hannah Rashkin, Antoine Bosselut, Maarten Sap, Kevin Knight, Yejin Choi. Modeling Naive Psychology of Characters in Simple Commonsense Stories. In Proceedings of the 56th Annual Meeting of the Association for Computational Linguistics 2018.
[^f8]: Etzioni, O., Cafarella, M., Downey, D., Kok, S., Popsecu, A., Shaked, T., . . . Yates, A. (2004). Web-scale extraction in KnowItAll (preliminary results). 13th International Conference on World Wide Web, (pp. 100-110).
[^f9]: Wu, W., Li, H., Wang, H., & Zhu, K. Q. (2012). Probase: A probabilistic taxonomy for text understanding. ACM SIGMOD.
[^f10]: Trieu H. Trinh, Quoc V. Le. A Simple Method for Commonsense Reasoning (2018). ArXiv.
