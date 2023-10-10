---
layout: page
title: Clustering Individual Trajectories of Multiple Long-Term Conditions
description: Master's dissertation at the University of Edinburgh
img: assets/img/trajClust.png
importance: 2
category: UoE
#github: https://github.com/Demi-wlw/Clustering-Multimorbidity-Trajectories
---

### Project Description

Multimorbidity (or multiple long-term conditions) is the co-existence of two or more chronic diseases in an individual. 
In an ageing society nowadays, its significance has gradually manifested itself due to its increasing prevalence. 
People tend to pursue a better quality of life and have a longer life expectancy, whereas, it has been shown multimorbidity is greatly associated with decreased quality of life and increased mortality. 
Moreover, it places a huge economic and logistic burden on health services because healthcare systems typically are designed for a single disease. However, standardised care for each chronic condition can be inapplicable for multimorbidity and the costs of management can also be approximately doubled for an additional chronic disease. 
As a result, it is advocated that implementing targeted approaches to prevent or delay multimorbidity and its resulting adverse outcomes is crucial for future healthcare planning. To achieve this, the first step to is understand how multimorbidity develops over time and their associations with patients. 
{: .text-justify}

Many works have been done in the cross-sectional analysis of multimorbidity but less attention is paid to the longitudinal analysis of patients' disease trajectories, which should take the temporal influences of conditions development into account. 
Furthermore, in the methods of longitudinal analysis of disease trajectories, there is also an evident lack of studies focusing on the order and sequencing of diseases [(Cezard et al., 2021)](https://bmjopen.bmj.com/content/11/11/e048485). 
Therefore, the objective of this project is to utilize the temporal clustering methods to explore the progressive procedure of disease trajectories and find meaningful clusters of individual trajectories that are highly related to the outcomes of interest such as mortality. 
Subsequently, it is also possible to identify the risk factors (eg. age, gender, behavior, etc.) correlated with the discovered patterns of trajectories, which helps society improve the quality of life by paying more attention to them.
{: .text-justify}

As shown in the following figure, patients with different sociodemographics and lifestyles, etc. can have various observed clinical traits such as biomarkers and diagnosis of conditions. 
If we see it temporally, this can be regarded as trajectories. By analysing the variations in the clinical traits of individuals, we can figure out some common representations, which are also called phenotypes among individuals. 
The phenotypes can be either clearly defined or latent in the medical field but they all play an important role in summarising the patient characteristics and determining how they will progress or react to the interventions. 
Different phenotypes may lead to different patient outcomes such as mortality. Figuring out latent phenotypes of disease trajectories can vastly help all the existing analyses more related to the outcomes of interest if we succeed since we help split the whole population into several subgroups with similar characteristics. 
Further analysis of association with no matter risk factors or health outcomes can be done based on these subgroups. 
More generally, if we successfully identify some typical disease trajectories that are greatly related to the outcome of interest and then what drives specific trajectories to these patterns, we can take early intervention to help prevent patients from getting adverse outcomes by changing their trajectory groups. 
Moreover, it can also help clinicians to diagnose appropriately. All in all, it has the potential to provide personalised medical treatment and to understand the potential cause-and-effect association between diseases.
{: .text-justify}

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="assets/img/MLTC_causal_infer.png" title="MLTC causal relationships" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Relationships of the medical terms.
</div>
