---
layout: post
title: ICESat-2 vs DTM1, DTM10, Copernicus30, FABDEM
author: Zhihao
description: Dataset is available on Zenodo
date: 2023-11-03
tags:
  - notes
categories: DEM, Snow, ICESat-2
bibliography: lib.bib
lang: eng
publish: yes
comments: true
toc:
  beginning: true
---



What is the difference between DTM1, DTM10, Copernicus GLO30, and FABDEM? How do they compare with ICESat-2? On Zenodo, I uploaded a dataset (10.5281/zenodo.10048875) to answer these questions.

The first step to compare different elevation products is co-registration. Here, I used the Gradient Descent Co-registration method that I mentioned in a previous post.

#### The performance of co-registration

After co‑registration, the percentage of points with a deviation less than 0.5 m from ICESat‑2 snow‑free segments is calculated to be 48.9%, 49.13%, 23.7%, and 27.2% for DTM1, DTM10, GLO30, and FABDEM respectively. In terms of NMAD (Normalized Median Absolute Deviation), for example, the improvement for DTM10 is from 0.99 m to 0.77 m (NMAD). If we attribute the residual bias partially to ICESat-2, we can use the subset_te_flag to exclude bad segments. This will result in better metrics for the co-registered DEM (Table 4.2 in my thesis).


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
    {% include figure.html path="https://i.imgur.com/hPl9Hdw.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
    {% include figure.html path="https://i.imgur.com/YTYUbHN.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

<div class="caption"> Figure 1.: Statistic Binning Analysis: Co-registration and Bias Correction (ICESat-2 - DTM10). The dataset was divided into categories at three stages, and for each category, a violin plot displays the distribution of data. The median of each dataset is represented by a white dot at the center of the violin. The thick bar illustrates the 25% and 75% quantiles, respectively. If the violin is skewed to one side, it indicates a deviation from normal distribution. The aspect-dependent bias is identified and eliminated by co-registration (a); The negative bias are widespread after co-registration (a, b, c).
</div>


$$dh = ICESat-2_{snow-free} - DEM $$


From the figure 1, we can clearly see the aspect-dependent error, the fingerprint of the geo-referencing mismatch, is removed through co-registration, as indicated by the median value (Q50) being located close to zero for all bins (a). Although ATL08 (version 5) has contained geolocation errors since 2021.12 (which have been fixed in version 6), the overall amount of data from that period is not significant to produced wrong co-registration. Additionally, gradient descent co-registration has a certain ability to suppress noise.

The figure also shows significant residual bias after co-registration. The dh has a nearly linear relationship with slope and curvature (b, c). This bias requires further correction.

### The difference after bias correction

After the bias correction, the comparison between DTM1 and DTM10 indicates that they both achieved a high level of accuracy on low slope categories, with less than 1 m and 0.5 m NMAD in 65% and 35% of cases, respectively. In contrast, the worst results are observed in the top 5% of *slope* quantiles and the least 5% of *n_photons* quantiles, which resulted in an NMAD of 2.4 m and 1.8 m, respectively. The bias correction applied to GLO30 produced better results than for FAB, with approximately 40% of measurements showing an NMAD of less than 1 m on the low slopes category (Figure 4.3 in my thesis). These improvements demonstrate the effectiveness of our bias correction in eliminating bias.





<div class="row">
    <div class="col-sm mt-3 mt-md-0">
    {% include figure.html path="https://i.imgur.com/ShRB4wX.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

<div class="caption"> Figure 2.: The Overall Distribution of DEM errors. DTM10 (upper left), DTM1 (upper right), COP30 (lower left), FAB (lower right). The statistical data for raw, after co-registration, and bias-correction are represented by blue, black, and red colors respectively. The 25% quantile (Q1) and the 75% quantile (Q3) are displayed from left to right along the x-axis. After bias correction, Q1 has moved closer to the median, indicating a reduction in negative skewness. Please note that a window of -10 m to 10 m was used to filter outliers in the metrics employed. And, the number of measurements is given by n (DEM) and N (total).
</div>

Figure 2 show the overall $dh$ distributions, which exhibit a negative skewness with long tails on the left side. Prior to bias correction, GLO30 had a median of -1.30 m, while FAB, which is a version of GLO30 with vegetation and building removed, exhibited less skewness. Although DTM1 and DTM10 had similar shapes, their 25% quantiles (Q1) suggested the presence of systematic biases. After implementing the bias correction, there was a noticeable enhancement in the overall symmetry observed across all four scenarios. This was supported by the fact that Q1 moved nearer to the median, while Q3 remained relatively stable. Ultimately, there is an overall NMAD of 0.56 m and 0.57 m for DTM10 and DTM1, respectively. GLO30 and FAB had higher NMAD of 0.98 m and 1.08 m. It is evident that bias correction led to a significant improvement in the accuracy of the results.

One meter of NMAD -- This might be the highest precision that could be achieved for Copernicus GLO30 and FAB. On the other hand, we noticed negative skewness exhibited on all DEMs for unknown reason.


#### Negative skewness of ICESat-2

The negative values have a spatial distribution pattern, which is widely spread on convex terrain. The figure below plots nine curvature combinations categorized by profile curvature and plan curvature. The aggregated mean value of elevation differences reveals that convex ridged terrain (positive plan curvature and negative profile curvature) typically exhibits negative skewness (a,g). A concave bowl-shaped terrain with negative profile curvature does not have much negative skewness, even at high slopes (b), thereby indicating that the observed linear relationship between bias and slope is mainly contributed to by plan curvature.

Naturally, there is overestimation over concave, but underestimation of convex due to the limitation of coarse resolution (or footprint). However, this bias should be symmetrical and not as significant as what we observed in terms of negative skewness (Figure 1 b,c). So we need a further analysis.



<div class="row">
    <div class="col-sm mt-3 mt-md-0">
    {% include figure.html path="https://i.imgur.com/WHUrfZ0.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

<div class="caption"> Figure 3.: Skewness Variations in Convex and Concave Terrains. The elevation difference is between ICESat-2 snow-free segments and DTM1. The color points indicate the aggregated mean value of the elevation difference. Plots (a), (b) and (c) depict the bias pattern along plan curvature, profile curvature, slope and canopy height before the bias correction. A triangle window (a) indicates a bias-free condition, the rest of the area either gives negative bias (blue) or positive bias (red). After the bias correction, most of the negative bias are removed (d, e, f). Plot (g) shows a schematic of curvature combinations. The plot reveals that there is a negative correlation between profile curvature and plan curvature.
</div>


#### Using h_te_mean, h_te_best_fit or h_te_best_fit_geosegments?

One concern is what the real resolution of the ICESat-2 ATL08 product is. Which elevation should I use? The real resolution of the ICESat-2 ATL08 product is not 100 meters. 100 m of the segment is just how the dataset is structured, considering the easy delivery of the canopy information in segments. There are several elevations provided by ATL08:

- h_te_mean: The real mean elevation of the segment. I have tried aggregating DTM1 by a certain window size and comparing the aggregated mean elevation with h_te_mean. However, there is no fixed window that is equivalent to the footprint of a segment (not 100 m or any other fixed value). The photons may not be evenly spread over either a 100 m long segment window or any other size.
- h_te_interp: h_te_interp is an interpolated value, which is generally worse than h_te_best_fit in many cases.
- h_te_best_fit: Good to use; however, when the geosegment is missing, it is very important to use subset_te_flag to exclude bad measurements. When five geosegments are available, the quality significantly improves.
- h_te_best_fit_20m_2: The best-fit elevation at the midpoint of the segment. In my latest paper, the Copernicus GLO30 can be corrected to NMAD 0.74 m, STD 1.63 m and DTM1/10 has NMAD 0.40.

In the beginning, I used h_te_best_fit; however, when the midpoint is not available, this value becomes an interpolated value (not sure if it equals h_te_interp). And this 'interpolated value' contains bias (generally tending to underestimate surface height). Therefore, using h_te_best_fit_20m_2 as the elevation of the midpoint of a segment eliminates any worry about interpolated values. I only suggest using h_te_best_fit by setting sebset_te_flag == 5, and you will get statistically the same results with h_te_best_fit_20m_2.

### DEM bias correction model based on ICESat-2 snow-off measurements


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
    {% include figure.html path="https://i.imgur.com/vpZ6BMg.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

<div class="caption"> Figure 4.: Model interpretation. The bias correction model of DTM1 - ICESat-2 (a) The bias correction model of COP30 - ICESat-2 (b). The interaction value between slope and plan curvature (c). The subset flag and difference.
</div>

As mentioned, the difference between ICESat-2 and DEMs has been corrected by a model. What does the model tell us? I used SHAP to interpret the model's behavior.

The features used in the model are listed from the most influential on the top to the least influential on the bottom. A negative SHAP value means a negative bias (ICESat-2 - DEMs < 0), and vice versa. The feature value has been normalized to show a positive or negative correlation. 

- In general, most of the bias is negative, which **corresponds to the negative skewness mentioned by many studies. However, there are different reasons for DTM1 and COP30.**
- The SHAP value also offers insight into the difference between h_te_best_fit or h_te_best_fit_geosegments. For instance, Figure 4a shows the model using h_te_best_fit_20m_2. Here, the difference is defined as h_te_best_fit_20m_2 - h_te_best_fit. A positive difference (when h_te_best_fit_20m_2 > h_te_best_fit) normally contributes to a negative bias, which means h_te_best_fit has an even more severe negative skewness. This situation often occurs when only 2 to 4 geosegments are available (d). 
- Other features that lead to negative bias include steep slope, convex terrain, canopy, and low standard deviation of ground photons, but positive skewness of ground photons. Additionally, TPI in a 270-meter scale is the least feature, meaning that the elevation difference is purely a micro topographic problem. For a model of COP30 - ICESat-2, the elevation difference is very related to vegetation coverage, canopy and TPI at 90 meters (3 pixels on COP30). **As the TPI behavior is opposite with previous model, statistically we can draw a conclusion that ICESat-2 ATL08 has a better resolution than COP30.**

As demonstrated in figure 3, in figure 4 c, the behavior of negative bias is totally opposite on convex terrain (plan curvature > 0) and concave terrain (plan curvature < 0), which means that **currently, most slope-only-dependent bias correction is not exactly correct.**

Overall, the interpolation and slope correction algorithm of ICESat-2 ALT08 is quite interesting. It tends to underestimate surface height when there are no photons at the midpoint. In cases where h_te_best_fit_20m_2 is available, this algorithm may mistakenly consider it as part of the canopy and remove it. This tendency introduces residual bias, resulting in such as negative snow depth.

#### Exploring the Use of Negative Snow Depth in DEM Bias Correction


While systematic errors can be addressed through bias correction, both DEMs and ICESat-2 data inherently contain random errors constrained by the physical characteristics of the measurement systems. Consequently, instances of negative snow depth are an unavoidable artifact of this uncertainty. To mitigate the impact of these outliers on the distribution's tail, one potential solution is to use these negative snow depth measurements to iteratively correct $$dh$$ However, this approach is fraught with risks,

In my attempts, this method introduced considerable noise into the data. An alternative strategy is implementing stricter quality control measures to minimize the occurrence of negative snow depths. I employed a 10% quantile-based cutoff for values below zero, enhancing the reliability of statistical inferences for snow depth estimation. For instance, we set a cutting-off value of -0.54 m, we include 90% measurements with DTM1 as reference DEM; -0.88 m for GLO30 in my last run.