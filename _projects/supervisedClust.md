---
layout: page
title: Supervised Clustering of Critically Ill Patients
description: Turing project
img: assets/img/superClust.png
importance: 1
category: UoE
#github: https://github.com/Demi-wlw/Supervised-Clustering-Patients
---
### Project Description
Passive immunotherapy with convalescent plasma (CP) is a type of antiviral therapy administered in moderate-to-severely ill patients from COVID-19. However, as reported in cohort studies, the benefit of this treatment has not been observed in randomised clinical trials (RCTs) suggesting against its use outside of RCTs. It is well recognized that the immunological heterogeneity in COVID-19 patients is observable at the protein level.
This means that the differences in biological features between critically ill COVID-19 patients are common and reflected in collected data. 
[Fish et al. (2022)](https://link.springer.com/article/10.1007/s00134-022-06869-w) had shown that when accounted for the heterogeneity of treatment effect (HTE) there are well-defined subphenotypes in critically ill patients where treatment effects vary considerably. 
{: .text-justify}

Grouping patients with respect to the similarity of measured biomarkers is common with clustering to explore these different subphenotypes. 
Informed by this previous work on exploring whether differences in treatment effect were detectable between COVID-19 subphenotypes based on unsupervised clustering, we further argue that meaningful clusters should be found with the guidance of the outcomes of interest. 
Therefore, in this project, we evaluate this hypothesis by assessing a collection of existing supervised clustering approaches (all metric-based learning), on cytokines measurements from critically ill patients to group them with mortality and CP treatment as outcome variables.
{: .text-justify}

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/supClust1.png" title="data-intensive plot" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
     The data-intensive plot (Fish et al., 2022).
</div>

As shown in the following odds ratio figure, we aim to find clusters that are either statistically significant in favor of CP treatment or usual care.
The advantage of using supervised clustering methods is to use the labels of outcome to guide our clustering results. Hence, it is important to determine what sort of outcome of interest is used for training. We developed a new "FavorCP" outcome which is shown to be helpful for odds ratio tests.
{: .text-justify}

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/supClust2.png" title="PCA contribution" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/supClust4.png" title="odds ratio plot" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/supClust3.png" title="biomarkers radar plot" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Key results from Fish et al. (2022) using Hierarchical clustering. Left, top ten contributing variables to principal components. Middle, odds ratio plot using organ support free days at 21 days (OSFD-21). Right, biomarkers radar plot.

