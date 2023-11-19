---
layout: post
title: Retrieved snow depth in Mainland Norway (2018.10-2022.10) based on ICESat-2 ATL08 and DEMs
author: Zhihao
description: A tabular dataset ready for machine learning applications
date: 2023-11-03
tags:
  - notes
categories: DEM, Snow, ICESat-2
bibliography: lib.bib
lang: eng
publish: yes
---

On Zenodo, I have uploaded a dataset (DOI: 10.5281/zenodo.10048875) containing snow depth measurements retrieved from ICESat-2. In my previous work, I described the process as follows:

$$\hat(dh) = ICESat2_{snow-free} - DEM $$

This formula represents the discrepancy between ICESat-2 and DEMs. To obtain precise snow depth measurements, the primary effort involves minimizing skewness and noise of $$dh$$, as detailed in my previous post. Consequently, we derived snow depth from well-corrected DEMs, as available in the Zenodo dataset:

$$snow depth = ICESat2_{snow-on} - DEM - \hat(dh)  $$

This dataset is a test run on snow depth retrieval workflow based on ICESat-2 (publication is under preparation).

### Advantages

- Open Access and Free: The ICESat-2 dataset is globally open-accessible and free of charge.
- Subgrid Variability: The dataset offers relatively high resolution, with an ideal footprint size of 13 - 17 m. It may be the only data source that contains subgrid variability of snow depth.

### Limitations

- Sparse Sampling: The sparse nature of the [sampling](https://icesat-2.gsfc.nasa.gov/science/specs) makes it challenging to produce a completed snow depth map. In a year cycle, there is a 4-time repeat orbit with revisited tracks at 7.2 km and 14.4km away in different seasons. For the season reason, we have to use a reference ground to bridge the gap between snow-on and snow-off segments. The sparse sampling also leads to an unbalance of the dataset, making it very challenging to predict the correct distribution of the snow depth.
- Sensitivity to Bias Correction. The accuracy of ICESat-2 snow depth is highly dependent on the bias correction process.
  - Vegetation introduces significant uncertainties in both ICESat-2 and DEMs.
  - Permanent ice and inland water areas, which cannot be used as reference surfaces, must be excluded. However, many DEMs include seasonal snow patches, particularly in high elevations, which are not covered by permanent snow/ice masks. Similarly, lake masks may not be entirely suitable for all DEMs that are acquired in different seasons. In practice, many DEMs are old enough to accumulate many changes on the surface, such as landslides, erosion, and brushwood...
- ICESat-2 Ground-Finding Algorithm:
  - The parameterization of ICESat-2's ground-finding algorithm significantly impacts retrieved snow depth. This algorithm uses a probability distribution function (PDF) of photons reflecting off the surface to determine exact elevations in the ATL08 product. If the algorithm or applied slope correction tends to capture or ignore specific signals, or if the footprint size averages out specific landforms, this can lead to systematic or scaling biases larger than the native footprint size.
- Lack of Validation:
  - Due to scaling and representativeness issues, it is challenging to compare the retrieved snow depth with ERA5 Land data (native 9km resolution, including permanent ice).
  - Large-scale snow surveys for validation are costly, making it difficult to validate the retrieved snow depth across various terrains.

### Example of application

I am excited to unveil an application based on this dataset, focusing on extracting subgrid variability and its utilization in downscaling processes. The following is a flowchart illustrating this application:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
    {% include figure.html path="https://i.imgur.com/KnfLKt1.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption"> Flowchart illustrating the process of extracting snow depth from satellite altimetry data. The snow depth is derived using an elevation differencing workflow. Subsequently, a tree-structure-based regression model is trained and applied to predict the local variability of snow depth at any location and time. Satellite ICESat-2 graphics source: NASA.gov. (Zhihao, in preparation).
</div>


