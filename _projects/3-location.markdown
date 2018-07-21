---
layout: page
title: Differential Privacy
description: Experiments on how semantics affect Location Privacy
img: /assets/img/bg-6.jpg
---
<p>
<a target="_blank" href="https://github.com/susheels/libqif/tree/master/samples/semantic"><strong>code</strong></a> 
</p>

<strong>Abstract</strong>

<p align="justify">
    We study the effects of an adversary using semantic information for constructing his priors and statergy, on the user's privacy. For the study, we assume that the adversary obtains the semantic meaning of the users actual location from some side channel and uses it to chart out 'informed' priors which will reduce his loss. The Side Channel in this case could be any geosocial networking application like Twitter, Facebook, Foursquare, Yelp, etc. The adversary makes use of this semantic meaning inferred from a side channel to obtain Location Types. Location Types are a class of broad labels for POIs, for eg., Restaturant, Train Station, Govt. Office, Park, Airport, Theater, etc. With this locatin type, the adversary then constructs global and user priors from the datasets. For eg., if the semantic label inferred from the side channel was 'Park', then the adversary would use this label and query all POIs from the dataset which have a label 'Park' and then construct his priors, rather than just considering all the POIs. These priors of POIs with 'Park' label will give the adversary a general sense of users possible locations in the respective region defined by the dataset. With the help of these global and user priors from location based datasets, the adversary creates an effective remapping strategy.
</p>

<div class="img_row">
    <img class="col three" src="{{ site.baseurl }}/assets/img/semantic.PNG" alt="" title="Pipeline"/>
</div>
<div class="col three caption">
    Adversary Error vs Locaion Semantics (top) . Location map of New York, Paris and Tokyo used (bottom). 
</div>