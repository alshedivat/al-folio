---
layout: page
title: PPD
description: pipeline
img: assets/img/36.png
importance: 5
category: Ph.D.
---

Target enrichment (such as Hyb-Seq) is a well-established high throughput sequencing method that has been increasingly used for phylogenomic studies. Unfortunately, current widely used pipelines for analysis of target enrichment data do not have a vigorous procedure to remove paralogs in target enrichment data. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/37.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 1. Paralogs vs. orthologs and current pipeline for Hyb-Seq data.
</div>

In this study, we develop a pipeline we call Putative Paralogs Detection (PPD) to better address putative paralogs from enrichment data. The new pipeline is an add-on to the existing HybPiper pipeline, and the entire pipeline applies criteria in both sequence similarity and heterozygous sites at each locus in the identification of paralogs. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/36.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 2. Flow chart of PPD (add link).
</div>

The new pipeline also removes highly polymorphic sites attributed to errors in sequence assembly and gappy regions in the alignment. We demonstrated the value of the new pipeline using empirical data generated from Hyb-Seq and the Angiosperm 353 kit for two woody genera Castanea (Fagaceae, Fagales) and Hamamelis (Hamamelidaceae, Saxifragales). Comparisons of datasets showed that the PPD identified many more putative paralogs than the popular method HybPiper. Comparisons of tree topologies and divergence times showed evident differences between data from HybPiper and data from our new PPD pipeline. We further evaluated the accuracy and error rates of PPD by BLAST mapping of putative paralogous and orthologous sequences to a reference genome sequence of Castanea mollissima. Compared to HybPiper alone, PPD identified substantially more paralogous gene sequences that mapped to multiple regions of the reference genome (31 genes for PPD compared with 4 genes for HybPiper alone). In conjunction with HybPiper, paralogous genes identified by both pipelines can be removed resulting in the construction of more robust orthologous gene datasets for phylogenomic and divergence time analyses. Our study demonstrates the value of Hyb-Seq with data derived from the Angiosperm 353 probe set for elucidating species relationships within a genus, and argues for the importance of additional steps to filter paralogous genes and poorly aligned regions (e.g., as occur through assembly errors), such as our new PPD pipeline described in this study.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/38.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Fig. 3. similar divergence time result tested in Castanea and Hamamelis.
</div>
