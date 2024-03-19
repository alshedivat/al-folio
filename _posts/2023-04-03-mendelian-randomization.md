---
layout: post
title: Mendelian randomization
date: 2023-04-03 11:59:00-0000
description: Causality.
tags: comments
categories: bioinformatics genetics
giscus_comments: true
related_posts: false
toc:
    sidebar: left
---

# A primer on Mendelian randomization

Understanding how exposures, such as gene expression, cause complex phenotypes is a key question in biology. While randomized controlled trials are the gold standard for establishing causality, their use on humans is unethical, necessitating the use of observational studies. Crucially, observational studies cannot directly prove causality: they can produce biased estimates and be affected by unknown confounders and reverse causality. Interestingly, SNPs are generally equivalent to a randomized treatment, as they are randomized at conception and fixed throughout life, making them unaffected by confounders (though LD and population structure are exceptions to the former, and canalization to the latter). Hence, when this is true, we can indeed establish causality. This is the case between siblings, for which the inheritance of each SNP is completely randomized. However, in the general population, the distribution of variants is not completely random. For instance, due to assortative mating, people with similar heritable phenotypes will tend to get together. In general, traits that are more genetically proximal (e.g., molecular traits like gene expression) are less prone to these biases.

<aside>
💡 **Randomized controlled trials** (RCTs) can establish causality even in the presence of variables that are not under experimental control. The key procedure involves randomly assigning the treatment to the subjects. In other words, with a large enough sample size, the treatment and control groups should be similar in all regards except for the treatment variable. Hence, any difference between the groups must be attributable to the treatment.
</aside>

Mendelian Randomization (MR) studies the causal effect of an exposure on an outcome using genetic variants (SNPs). When certain assumptions are met ([Key assumptions and how to verify them](#key-assumptions-and-how-to-verify-them)), it can address the aforementioned issues. MR leverages [this](https://www.cell.com/cms/attachment/8c0c3e2d-595c-4c71-8562-85225737be90/gr2.jpg) [directed acyclic graph](https://mr-dictionary.mrcieu.ac.uk/term/dag/) (DAG).

## Measuring causal effects using instruments

Our goal is to precisely estimate the effect of an exposure on a trait. However, the presence of confounders that are either unobserved or difficult to measure makes this impossible. An instrument, such as the SNP, is a variable that modifies the exposure and is not affected by the confounders. Since there are no backdoor paths between the SNP and the outcome, any effect between them must occur through the exposure.

In mathematical terms, we aim to estimate the effect of an exposure $X$ on an outcome $Y$using an instrument $Z$. Since $Z$ is a SNP, it will usually take values in 0, 1 and 2 (the number of minor alleles). Assume some potential confounders affecting both $X$ and $Y$. The most basic MR protocol assumes linearity, and consists of three steps:

1. Estimate the relation between the instrument and the exposure: $X=\beta_{ZX}Z+\varepsilon$
2. Compute an estimated exposure, $\tilde X = \beta_{ZX}Z$, which is independent of potential confounders
3. Estimate $Y=\beta_{\hat{X}Y}\hat{X}+\epsilon$

The estimated causal effect $\beta_{\hat{X}Y}$ is unconfounded! This is usually performed via [**two-stage least squares**](https://mr-dictionary.mrcieu.ac.uk/term/tsls/). Alternatively, we can obtain $\beta_{\hat{X}Y}$ without computing it explicitly via the **[Wald ratio estimator](https://mr-dictionary.mrcieu.ac.uk/term/wald-ratio/)**: $\beta_{\hat{X}Y} = \frac {\beta_{ZY}} {\beta_{ZX}}$. Note that the standard error of $\beta_{\hat{X}Y}$ also needs to be computed.

## Key assumptions and how to verify them

MR relies on three assumptions:

1. *Relevance*: the SNP is associated with the exposure.
2. *Independence*: the SNP is not associated to the outcome through a confounder, measured or not.
3. *Exclusion restriction*: the SNP is exclusively associated to the outcome through the exposure.

Other common, but optional, assumptions are *linearity* and *homogeneity* (the effect does not vary across strata in the population, like SNP levels or sex).

Although these assumptions are sometimes violated, we have ways to detect such cases:

1. It can be violated when the SNP is a weak instrument. It can be measured using (Cragg-Donald) F-statistic $\left( \frac {n-m-1} {m} \right) \left( \frac {R^2} {1-R^2}\right)$ where $n$ is the number of samples, $m$ is the number of SNPs, and $R^2$ is the SNP heritability. Conventionally, this assumption is considered met when F is larger than 10.
2. Common violations include [assortative mating](https://mr-dictionary.mrcieu.ac.uk/term/assortative-mating/), [population structure](https://mr-dictionary.mrcieu.ac.uk/term/pop-strat/) and [dynastic effects](https://mr-dictionary.mrcieu.ac.uk/term/dynastic/). This can only be assessed for the potential confounders that have been measured, by measuring the respective associations between those and the SNP and outcome.
3. [(Horizontal) pleiotropy](https://mr-dictionary.mrcieu.ac.uk/term/horizontal-pleiotropy/) and linkage with other causal genes are common violations. When using multiple instruments, it can be assumed that they will all lead to the same estimate of the causal effect. Strong departures from this situation suggest that some instruments are affecting the outcome in different ways.

## Types of MR algorithms

MR methods can be classified according to multiple criteria:

- Origin of the measurements
    - One-sample: the SNP, exposure and outcome are measured on the same samples.
        
        Example: two-stage least squares.
        
    - Two-sample: the SNP-exposure relationship is measured on a set of samples, and the exposure-outcome on another one.
        
        Example: Wald ratio estimate
        
- Instrument
    - SNP
    - Polygenic score
- Granularity
    - Individual-level
    - Summary-level: as an attention note, all summary statistics must come from ancestry-matched samples.
- Number of SNPs
    - Single SNP
    - Multiple SNPs: this can address the weak association that individual SNPs might have with the trait. Notably, the dependencies between the SNPs (linkage disequilibrium) can produce trouble.  The SNPs should be conditionally independent predictors (e.g., not in perfect LD). Even when not in perfect LD, too many correlated SNPs can lead to numerically unstable estimates. This is solvable by a prior feature selection and/or dimensionality reduction steps.
- Number of exposures
    - Univariable: one exposure
    - Multivariable: several exposures
- Location of the SNPs
    - Cis-MR: use SNP(s) from the gene of interest coding region
    - Trans-MR

## Applications

### Learning the causes of a trait

MR provides an ethical way to find causal links between exposures and diseases. 

**Exposure:** it can be simple (e.g., gene expression), or complex (e.g., body mas index). 

**Instruments:** we will use as many SNPs associated to the exposure of interest as possible (e.g., polygenic score). This will capture the full genetic architecture of the trait as well as violations of the assumptions. 

### Finding drug targets

In the clinical setting, our interest is learning about *modifiable *****causes of disease, i.e., those that can be treated. 

**Exposure:** typically, a protein, since it needs to be targetable by a small molecule, a monoclonal antibody, etc. The expectation is that it will affect a complex biomarker through *vertical* pleiotropy (e.g., drugs that lower blood LDL do not target LDL directly, but hamper LDL/cholesterol synthesis).

**Instruments:** SNPs affecting the gene/protein of interest, often *cis*-pQTL. *Trans*-pQTL can also be used, but they are more likely to partake in horizontal pleiotropy.

### Identifying the relevant tissues

We can use multivariable MR to get tissue-specific exposures, and partition the effect on the phenotype. Two disclaimers are in order: GWAS hits often colocalize with eQTLs in multiple tissues; and expression control in the diseased state might not match that in the healthy state.

### Characterizing causal pathways

Multivariable MR studies the causal impact of multiple exposures. This allows to consider complex causal pathways, even those involving mediators.

# References

- Hartley, A. E., Power, G. M., Sanderson, E., & Smith, G. D. (2022). A Guide for Understanding and Designing Mendelian Randomization Studies in the Musculoskeletal Field. In JBMR Plus (Vol. 6, Issue 10). Wiley. https://doi.org/10.1002/jbm4.10675
- Burgess, S., Mason, A. M., Grant, A. J., Slob, E. A. W., Gkatzionis, A., Zuber, V., Patel, A., Tian, H., Liu, C., Haynes, W. G., Hovingh, G. K., Knudsen, L. B., Whittaker, J. C., & Gill, D. (2023). Using genetic association data to guide drug discovery and development: Review of methods and applications. In The American Journal of Human Genetics (Vol. 110, Issue 2, pp. 195–214). Elsevier BV. https://doi.org/10.1016/j.ajhg.2022.12.017
- Teumer, A. (2018). Common Methods for Performing Mendelian Randomization. In Frontiers in Cardiovascular Medicine (Vol. 5). Frontiers Media SA. https://doi.org/10.3389/fcvm.2018.00051
- Holmes, M. V., Richardson, T. G., Ference, B. A., Davies, N. M., & Davey Smith, G. (2021). Integrating genomics with biomarkers and therapeutic targets to invigorate cardiovascular drug development. In Nature Reviews Cardiology (Vol. 18, Issue 6, pp. 435–453). Springer Science and Business Media LLC. https://doi.org/10.1038/s41569-020-00493-1