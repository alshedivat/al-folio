---
layout: page
title: Seismic lazily!
description: Offshoreorient studio - A python toolbox for offshore seismic QC
img: assets/img/post/OOS/oos.jpg
importance: 3
year: 2019-2020
category: work
---

`OffshoreOrient Studio` (OOS) is an offshore seismic QC toolbox, a good friend for lazy seismic QC/GEO/NAV/Client. This is my independent work that has been tested and used by my colleagues for several years. Sadly, I will not update it anymore. The OOS had applied for software copyright (Registration No. 5073387) under the National Copyright Administration.

In OffshoreOrient Studio v1.0.3 toolbox, _NavPy_ focuses on the shot-by-shot** or sequence-by-sequence QC**. *QcPy* is mainly used for **Trace edit** and **RMS analysis**. *SourcePy* is a **real-time solution for near-field Gun QC**.

## NavPy: the truth from data

- SurveyWide map: for spatial analysis and statistics. Not just a static map.
- SurveyWide chart: for line-by-line QC. Does barnacle growing affect WSP?
- P1 Navigator: for p190 files format check and transformation.
- CSV Navigator: for shot-by-shot QC.
- STS Navigator: for .sts files extraction.Wide-tow modeling: How do the wide-towed sources work?


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/OOS/oos_attributemap.png" title="Attribute Map by NavPy" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/OOS/oos_feather.png" title="Feather Map by NavPy" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/OOS/oos_surveywide2.png" title="Surveywide by NavPy" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    (left) Attribute map displays all kinds of attributes information, which is an interactive map. (middle) Feather plays a key role in 4D seismic.(right) Streamer attributes line by line. No need excel at all.
</div>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/OOS/tow.png" title="Wide-tow modelling" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Wide-towed source is able to improve the efficiency of acquisition. The toolbox can explain how it effects binning, and how it extends the coverage, and what’s the line spacing we should use.
</div>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/OOS/oos_surveywide.png" title="Surveywide by NavPy" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Shoot point DA (DC is more critical for 4D).
</div>


## QcPy: a click QC, seimic lazily

QcPy could be used for RMS analysis, noise test, sensitivity normalization, and trace edit, Fresnel chart

- Trace Edit toolkits: P2G (Promax to GeoEast) / ADS Pro/ Trace Edit Plot. 
- RMS analysis:  RMS analysis, Noise test, Sensitivity Normalization
- Fresnel Calculation: for estimating the size of the Fresnel zone, and gaining a more flexible binning strategy.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/OOS/oos_rms.png" title="RMS Analysis, stack in channel/streamer/shots by QcPy" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    RMS Analysis, the powerful tools to stack rms in channel, streamer or shots by QcPy. Thus, we can easily do a noise test before the SOL.
</div>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/OOS/oos_polyfit.png" title="Polyfit for sensitivity normalization by QcPy" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Polyfit for sensitivity normalization by QcPy.
</div>

## SourcePy: Real time shooting QC

SourcePy is checking header files by Gun Controller in real time. You can self-define an alarm policy to save your eyes from the screen.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/OOS/oos_sourcepy.png" title="oos_sourcepy" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/OOS/oos_mainpage.png" title="oos_mainpage" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Real-time Near Field QC and Header QC by SourcePy.
</div>


## Timeline of Update


v1.0.3 12 Dec 2019: RMS Analysis, SourcePy

v1.0.3 18 Aug 2019: License, New GUI, ADS Pro and Trace Edit Plot

v.1.0.0 beta 01 Mar 2019: NavPy

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/OOS/NavPy_SurveyWide_Cross-line_QC_package_Introduction-1024x576.png" title="oos_1" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/OOS/NavPy_SurveyWide_Cross-line_QC_package_Introduction1-1024x576.png" title="oos_1" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/OOS/NavPy_SurveyWide_Cross-line_QC_package_Introduction2-1024x576.png" title="oos_1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Offshoreorient studio: Data Driving Solutions for Marine Seismic QC
</div>
