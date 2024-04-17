---
layout: page
title: Snowdepth matters!
description: Things are more complicated than your expectation.
img: assets/img/post/snowdepth/drone-snow-5.jpg
importance: 1
year: 2022
category: work
---

As a research assistant in this scientist group (SNOWDEPTH), I joined the field (drone) trip and currently working on the algorithm development for processing DEM and ICESat-2 datasets. The topic is highly related to my thesis: `Benchmarking DEM uncertainties by ICESat-2 - a workflow and application on snowdepth`. This research is key to understanding the snow-depth-related climate mechanism or application, e.g. permafrost, high-mountain precipitation, hydropower...

## The state of the snow depth problem

Accurate estimates of accumulated snow are critical in predicting runoff for `water resource management` and `hydroelectricity`. Snow characteristics also induce significant uncertainties for `weather`, `periglaciation` and `climate` studies. 

> Decreasing snow depth, in parallel, reduces the thermal insulation of soil interface with atmosphere and increases soil vulnerability to fluctuations in air temperature. This can in turn contribute to decreasing frost depth and increasing the frequency of swings in FT (Frost-Thaw) states. **Such changes can result in widespread alterations** in regional `hydrology`, `phenology`, `geology`, `water quantity, and quality` as well as `socio-economic activities`. In addition, some of these alterations can create feedback effects with other elements of the environment. For instance, thawing landscapes in northern regions can affect the `climate system` through the emission of excessive `greenhouse gas fluxes`, which can intensify the rate of `global warming`.

- Hatami, S., Nazemi, A. **Compound changes in temperature and snow depth lead to asymmetric and nonlinear responses in landscape freeze–thaw.** Sci Rep 12, 2196 (2022). https://doi.org/10.1038/s41598-022-06320-6

`Remote sensing` provides multiple techniques to observe snowpack. While snow cover extent has been successfully addressed, **SWE or Snow depth are much more challenging, particularly the snow depth in mountain areas.**

- Preferred frequency (Ku-band Synthetic Aperture Radar) for snow depth is not in space yet.
- Passive microwave observations has coarse (~25 km) footprints and lack of mountain areas.
- Airborne Lidar system is accurate but local interest and costly (Deems et al., 2013; Painter et al., 2016).

## Altimetry or radar, which one is the solution?

Firstly, ICESat's elevations on the snow surface are compared to the DEM elevations to retrieve snow depth by Désirée Treichler. She found that the main source of uncertainty lies with ICESat's large footprints (70 m) and the terrain variation therein within the reference DEM: spatially varying, systematic vertical bias severely hampers accurate estimation. For the regions with abundant frozen lakes(no need DEM), the repeat ICESat altimetry observations can derive snow accumulation information with r of 0.88 and RMSE of 5 cm. Now **what if there is new ICESat-2 (~ 14 m footprint**) and **high-quality** DEM nowadays**?**

- Treichler, D., & Kääb, A. (2017). **Snow depth from ICESat laser altimetry—A test study in southern Norway**. *Remote Sensing of Environment*, *191*, 389–401. https://doi.org/10.1016/j.rse.2017.01.022
- Shu, S., Liu, H., Frappart, F., Huang, Y., Wang, S., Hinkel, K. M., Beck, R. A., Yu, B., Jones, B. M., Arp, C. D., Wang, L., & Ye, Z. (2018). **Estimation of snow accumulation over frozen Arctic lakes using repeat ICESat laser altimetry observations – A case study in northern Alaska**. *Remote Sensing of Environment*, *216*, 529–543. https://doi.org/10.1016/j.rse.2018.07.018

Microwave radar in C-band (Sentinel-1) is an ideal solution for snow depth as well: 6 days revisit period, 2-satellites with long-term continuity, 5 m x 20 m resolution. The C-Snow team from Leuven University has done extensive work. By cross-polarized backscatter algorithm, C-SNOW retrieves snow depth in mountainous areas with a large scale (1 km). Sentinel-1 reveals the spatial detail and the elevation profile of snow depth by resembling reanalysis data.

- Lievens, H., Demuzere, M., Marshall, H.-P., Reichle, R. H., Brucker, L., Brangers, I., de Rosnay, P., Dumont, M., Girotto, M., Immerzeel, W. W., Jonas, T., Kim, E. J., Koch, I., Marty, C., Saloranta, T., Schöber, J., & De Lannoy, G. J. M. (2019). **Snow depth variability in the Northern Hemisphere mountains observed from space**. *Nature Communications*, *10*(1), 4629. https://doi.org/10.1038/s41467-019-12566-y


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/snowdepth/drone-snow-4.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/snowdepth/drone-snow-3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/snowdepth/drone-snow-5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The fieldwork of geoscience is always amazing. I am wondering how many students actually love nature and thus study geoscience.
</div>

## ICESat-2's elevation measurement is beneficial, and DEM continue hampering

ICESat-2 has made a great success in the polar area. The top height of the snowpack over the sea ice can be retrieved by ICESat-2. The actual snow depth then equals to the top height minus the bare height of sea ice from radar measurements of CryoSat-2. Elevation differencing works but gets unhandy when it comes to complex terrain.

- Kwok, R., Kacimi, S., Webster, M. A., Kurtz, N. T., & Petty, A. A. (2020). **Arctic Snow Depth and Sea Ice Thickness From ICESat‐2 and CryoSat‐2 Freeboards: A First Examination**. *Journal of Geophysical Research: Oceans*, *125*(3). https://doi.org/10.1029/2019JC016008

## DEM Co-registration & uncertainties: the start point

The shift between repeat DEMs might have systematic differences, in particular if it originates from different sensors or orientation procedures. Kääb (2005, 2011) and Nuth (2011) have an iterative approach by solving a cosine equation to co-registrate DEMs efficiently, which is key to addressing DEM uncertainties and snow depth in this case.

- Kääb, A. (2005). ***Remote sensing of mountain glaciers and permafrost creep***. Geographisches Institut der Universität Zürich. page 67
- Nuth, C., & Kääb, A. (2011). **Co-registration and bias corrections of satellite elevation data sets for quantifying glacier thickness change**. *The Cryosphere*, *5*(1), 271–290. https://doi.org/10.5194/tc-5-271-2011

## Cryosphere and Climate Study

The SNOWDEPTH project will benefit cryosphere and climate research eventually!

## The fieldwork

There are some photos I am keen to share.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/snowdepth/drone-snow.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The news report from titan.uio.no, Photo: Eivind Torgersen, UiO.
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/snowdepth/drone-snow-2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/snowdepth/drone-snow-6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Cross-country skiing is an essential skill for snow study.🎿
</div>


For more information about SNOWDEPTH, please visit [UiO website](https://www.mn.uio.no/geo/english/research/projects/snowdepth/index.html).

Read the [news article (in Norwegian)](https://titan.uio.no/geologi-klima/2022/hvor-mye-sno-er-det-egentlig-i-fjellet)


