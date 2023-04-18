---
layout: page
title: ccle 
description: cancer cell line encyclopedia
img: assets/img/nate/media/ccle_titlecard.jpg
importance: 3
category: recent
---
{% if site.data.repositories.ccle %}
<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.ccle %}
    {% include repository/repo.html repository=repo %}
  {% endfor %}
</div>
{% endif %}
<br>

***
### Description
A statistical analysis of breast cancer data is carried out in R as a first years Master's project in Statistical Learning at `Politecnico di Milano.`

The [CCLE database](https://sites.broadinstitute.org/ccle/) is a multi-year, international effort summarizing data concerning 25 distinct cancers present in over 1000 individuals. The motivation for our project was to combine data in this repository concerning:
* drug treatment responses 
* physiological data 
* gene sequencing information
  
in order to establish a statistically valid link between gene expression and drug treatment response.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/ccle_aov_lab.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/ccle_aov_ethnicity.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Boxplots visualizing cancer drug efficacy partitioned according to different hierarchical considerations prsent in the dataset. 
</div>

Unsupervised statistical methods like hierarchical clustering were applied to treated samples in order to uncover relationships such as which cancers respond similarly to certain drugs as well as the inverse question; which drugs were similar based on their efficiencies at treating key cancers. 

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/ccle_hierarchical.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<br>
In addition to the provided data, a `web-scraping` bot was made to build out our database by collecting and handling information concerning the treatments included in the dataset.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/ccle_bot_fulltable.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/ccle_bot_cell.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="caption">
    Using Python and <a href="https://selenium-python.readthedocs.io/" target="_blank">Selenium</a> we webscraped a third party databases to gather info on the 250+ drugs mentioned in the original dataset. 
</div>

<br>
Agnostic methods like PCA as well as embedded feature selection strategies like LASSO regression were implemented for dimensionality reduction. This allowed for the reduction in genetic feature space of the gene sequencing data from 50000 genes to roughly 50 statistically significant ones. The selected genes were then cross referenced with literature to ensure and we retained the genes which had previously noted to influence cancer growth either positively or negatively. 


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/ccle_selected_genes.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Subset of the intersection of our statistically relevant genes influencing drug efficacy with a known list of influential genes. 
</div>

Finally a logistic regression model was trained using the reduced feature space to estimate cancer drug efficiencies with k=5 fold cross-validation with an R^2 of 0.75 on average. 

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/ccle_model_summary.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Tests for normality of the residuals for the fitted model. 
</div>


