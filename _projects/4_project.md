---
layout: page
title: graph bundling
description: revealing connectivity patterns in large graphs
img: assets/img/pattern1_1bin.png
importance: 3
category: visualization
github: https://github.com/dcmoura/3dheb
---

3DHEB is an algorithm that bundles edges of a graph to reveal connectivity patterns. It allows to tackle large graphs and specify bundling criteria to cluster edges (in addition to the default criteria based on  proximity).

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/airlines_1bin.png" title="US airlines bundling" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Bundling origin-destination links of air trips in the US (datasource: <a href="https://github.com/gephi/gephi/wiki/Datasets">US airlines dataset</a>)
</div>

In the above image, the nodes of the graph are airports and the edges (aka arcs or links) of the graph are trips between airports, with weight equal to the number of trips between the origin-destination airports. Edges are bundled iteratively based on their spatial density, revealing connectivity patterns.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/airlines_flow.png" title="US airlines bundling - flow" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Bundling origin-destination links of air trips in the US, using flow direction as bundling criteria.
</div>

By adding bundling criteria the algorithm can reveal more patterns. In the above case, the direction of the flow is taken into account to produce different density maps that interact among them. Flows that have opposite directions are repealed while flows that have similar direction are attracted. Gradient colouring allow for a better understanding of the direction of the flows, with edges being blue at the origin and red at the destination, passing through black.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/pattern1_1bin.png" title="Bundling a graph with 5M edges" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Bundling large graphs (<a href="https://sparse.tamu.edu/Andrianov/pattern1">Andrianov/pattern1</a> from the University of Florida Sparse Matrix Collection, 5 million edges).
</div>

The algorithm can tackle large graphs like the one above with 5 million edges. Bellow, edges are clustered into 8 clusters taking into account their origin and destination, with each cluster being represented by different color.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/pattern1_8bins.png" title="Bundling a graph with 5M edges" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Bundling a large graph using origin-destination clusters as criteria (each cluster has a different color).
</div>

I have created an <a href="http://dcmoura.github.io/3DHEB/">online tool</a> where you can have a go and play with the different parameters of the algorithm. The code is available at <a href="https://github.com/dcmoura/3DHEB">github</a> and more details can be found in the paper <a href="https://arxiv.org/abs/1504.02687">3D Density Histograms for Criteria-driven Edge Bundling</a>.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/3dheb_app_pic.png" title="Online app for bundling graphs" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <a href="http://dcmoura.github.io/3DHEB/">Online tool</a> for bundling your graphs.
</div>
