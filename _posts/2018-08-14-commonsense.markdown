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

Common sense reasoning has long been a well sought after goal for artificial intelligence researchers. From John McCarthy and Marvin Minsky's initial efforts with..., the Cyc Project[^f1] which took swing at MCC ...., and the NELL[^f2] project at CMU. Establishing common sense in machines has always seemed like a critical goal for building somewhat sentient machines. But we realized over time that what humans perceive as "common" sense is not so trivial to be incorporated in AI agents. Instead, we resorted to solving tasks which are more constrained, nevertheless important. This article discusses some of the challenges of instilling common sense into our AI agents, provides a survey of work on research in this exciting research area, including large-scale knowledge collection projects and recent work on mental state prediction and ..., and some future directions. And we will also discuss why it is difficult for a machine to answer the question in the title, i.e. why we use salt on icy roads?

#### Why and when do we need common sense?

Before we get into the complexities of this topic, lets try to understand if common sense really is important for the models that we build these days. John McCarthy once said in an interview, "Purely computational programs don't require common sense." That sounds completely reasonable, you wouldn't imagine a chess program needing to reason about the mental states of its opponent. It could model those processes into the decision making, but there is no evidence that it would benefit from this. On the other hand, models that perform natural language generation can conceivably benefit from common sense facts about the world. We would like to ensure that the text we generate abides by common sensen concepts, thereby also reducing our hypothesis space by a large extent. We haven't actually discussed what common sense encapsulates. It's a loosely defined phrase, but lets define it as the *ability of human beings to perceive real-world objects and situations, and make inferences of varying complexities, often relying on background knowledge about the world*. It is important to note here that this ability in humans is tied strongly with what we speak and how we behave. It appears that a large chunk of work in this area has focused on the **representation** of common sense facts, sometimes ignoring the need for this knowledge to usable by reasoning and generation models.

A certain kind of reasoning which requires us to use knowledge about the world.

Not just useful with language, but with vision, and multiple modalities (and their combinations thereof).  

#### Steps so far

Taxonomic Reasoning - reasoning over hierarchical databases like WordNet created by mining the web. Several different relation types can be queried in such databases -- symmetry, transitivity, and reflexiveness. This form of reasoning is limited by the amount of knowledge that can be encoded in these databases as well as the difficulty of representing abstraction relation types in the database.
Temporal Reasoning - Reasoning about the relative times between occurrence of multiple events 
Qualitative Reasoning - Analyzing cause and effect between events

Knowledge-based approaches that perform reasoning over knowledge graphs, machine learning based models that learn based on a large corpus of data, and crowdsourcing models
Among knowledge-based approaches, there is web mining like NELL

#### Challenges associated with common sense induction

Semantic networks that encode relationships between entities (or classes of entities). The Google Knowledge Graph that they use for search is an example of this.
Ideas considered seminal are the conception of the OpenCyc project and the NELL project.


#### Recent Work: Mental state prediction, RC using common-sense knowledge 

SemEval Task 11 for machine reading with common sense reasoning. The organizers created a dataset that would use script knowledge in addition to factual knowledge given in the passage. However, only 3 out of 11 teams actually used common sense knowledge explicitly. Question arises whether explicit 


Recently, there has been a lot of relevant work in commonsense reasoning models dealing with creation of datasets capturing the some facets of common sense reasoning. Swag [^f5] is a dataset for natural language inference of the kind that requires common sense reasoning. The dataset is constructed using a method called adversarial filtering that explicitly avoids the presence of annotation artifacts that are easily detectable by neural models. Event2Mind [^f6] proposes an interesting problem for
predicting the intents and reactions of the participants involved in a short free-form text. A crowdsourced dataset is created for this task and neural models are put to test for the prediction. 

There was a missing link between theories from cognitive science and common sense reasoning. This paper [^f7] tries to bridge that link by proposing an annotation framework modeling the mental states of story characters by mapping them to theories of motivation and emotion from Maslow, Reiss and Plutchik.

## Future Research Directions

Talk about Winograd schemas

ConceptNet Numberbatch Embeddings[^f4]

<div class="img_row">
    <img class="col three" src="{{ site.baseurl }}/assets/img/9.jpg">
</div>
<div class="img_row">
    <img class="col three" src="{{ site.baseurl }}/assets/img/7.jpg">
</div>
<div class="col three caption">
    A simple, elegant caption looks good between image rows, after each row, or doesn't have to be there at all.
</div>
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
