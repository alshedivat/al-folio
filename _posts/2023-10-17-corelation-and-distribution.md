---
layout: post
title: Correlation and distribution
author: Zhihao
description: ...
date: 2023-05-12
tags: links
categories: statistics datascience machine_learning
lang: eng
publish: no
---





## Correlation

Pandas provide a useful df.corr() fucntion, where you can set method = Pearson'r, Kendall's τ or Spearman's ρ:

- Pearson Correlation (Pearson's r) measures the linear relationship between two continuous variables.

  - Assumptions: Pearson correlation assumes that the data follows a normal distribution, and it is sensitive to outliers.

  - Range: Pearson correlation coefficients range from -1 (perfect negative linear relationship) to 1 (perfect positive linear relationship), with 0 indicating no linear relationship.

- Kendall Tau Correlation (Kendall's τ or τ) is a non-parametric measure of association between two variables. It assesses the strength and direction of the monotonic (non-linear) relationship between two variables.

  - Assumptions: Kendall Tau is robust to the presence of outliers and does not assume that the data follows a specific distribution.

  - Range: Kendall's τ ranges from -1 (perfect inverse association) to 1 (perfect direct association), with 0 indicating no association.

- Spearman Rank Correlation (Spearman's ρ or ρ) is another non-parametric method used to measure the strength and direction of association between two variables. It assesses the monotonic relationship, similar to Kendall Tau but work more efficient over large dataset.

  - Assumptions: Spearman's correlation is also robust to outliers and does not rely on specific distribution assumptions. 

  - Range: Spearman's ρ has a similar range to Kendall Tau, from -1 (perfect inverse association) to 1 (perfect direct association), with 0 indicating no association.

  

One of the correlation matrix example is:

```python
corr = df_test[['sd_correct_dtm1','df_dtm1_era5','E', 'N','h_te_best_fit','slope', 'aspect', 'planc','profc','curvature','tpi','tpi_9','tpi_27','sd_era','sde_era','wf_positive', 'wf_negative','month']].corr(method='spearman')

sns.heatmap(corr, cmap="coolwarm",annot=False)
```

![](https://i.imgur.com/3eHZufh.png)

However, correlation is very simple quantification of two variables, which cannot handle high-dimension relationship. In the real-world, consider a scenario where you are analyzing a dataset with multiple features contributing to an outcome. A single correlation value for each pair of features does not capture the complexity of the relationships at play. So, you may see the correlation between two variables may appear extremely weak when the sample contains such a high dimension relationship. As you can see, here is a case of correlation between topo-climatic features and snow depth / snow depth variability.



There are several way to deal with such situation.

- PCA (Principal Component Analysis) and Dimensionality Reduction
- Parallel Coordinates Plot
- T-SNE (t-Distributed Stochastic Neighbor Embedding)



## Distribution



One of concern is the distribution of snow depth. In some case, it said the gamma distribution is the most 

![](https://i.imgur.com/wI4trBS.png)



## Kolmogorov-smirnov D statistic



When comparing two datasets, if their data distributions align and their rankings match, it's a strong indicator that the datasets are identical. This means the values and their order are in perfect sync. Sometimes, the rankings match, but the data distributions don't quite align. This suggests that the datasets share a similar structure, but one may be on a different scale. In such cases, we can use quantile mapping to correct the distribution, assuming we know the correct one. If the distributions of two datasets fit together, meaning that all quantiles are identical, it's a green light for focusing on probability. This is especially valuable when you're more concerned about event likelihood than the specific order or structure of the data.
