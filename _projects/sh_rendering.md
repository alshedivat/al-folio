---
layout: page
title: PRT for Arbitrary Geometries
description: How to store in transfer signals in implicit surfaces
img: assets/img/projects/ltcs/ltc_teaser.gif
importance: 1
category: work
---
The work is presented in two parts:
- <font size="1">Store Transfer in UV-space instead of Vertex attributes</font> 
    * [<font size="1">"Transfer Textures for Fast Precomputed Radiance Transfer - EuroGraphics'22 Poster"</font>](https://diglib.eg.org/handle/10.2312/egp20221012)
    <!-- , [<font size="1">EuroGraphics'22 Poster</font>] -->
- <font size="1">Using Implicit Surfaces for Precomputed Radiance Transfer </font> 
    * [<font size="1">"Learnt Transfer for Surface Geometries - HPG'22 Poster</font>](https://www.highperformancegraphics.org/posters22/HPG2022_Poster7_Learnt_Transfer_for_Surface_Geometries.pdf)
    * [<font size="1">"Real-time Rendering of Arbitrary Surface Geometries using Learnt Transfer"</font>](https://iiitaphyd-my.sharepoint.com/:b:/g/personal/dhawal_sirikonda_research_iiit_ac_in/EUKOrBzrxrxFsOhmYFLArFcBtWBpY2nfx_CziCUC-JHneg?e=MrdxAJ)


##### Part 1 - Unnecessary tessellations
UV - Mapped Storage of Transfer rather than a using Vertex attribute storage.


The the naive approach of the using vertex attributes to store the transfer usually causes the following issues:

<div class="row justify-content-sm-center">
    <div class="col-sm-2 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/sh_rendering/transfer_textures/tess/high_tess.png" title="Renders of Low Tess" class="img-fluid rounded z-depth-1" %}
        <!-- <caption font="1">Tessellations</caption> -->
    </div>
    <div class="col-sm-2 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/sh_rendering/transfer_textures/tess/high_tess_res.png" title="High Tess Vertex Attrib" class="img-fluid rounded z-depth-1" %}
        <!-- <caption>High-Tess VA Tess</caption> -->
    </div>
    <div class="col-sm-2 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/sh_rendering/transfer_textures/tess/low_tess.png" title="Low Tess" class="img-fluid rounded z-depth-1" %}
        <!-- <caption>Tessellations</caption> -->
    </div>
    <div class="col-sm-2 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/sh_rendering/transfer_textures/tess/low_tess_res.png" title="Low Tess Vertex Attrib" class="img-fluid rounded z-depth-1" %}
        <!-- <caption>Low-tessellations Vextex Attrib</caption> -->
    </div>
    <div class="col-sm-2 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/sh_rendering/transfer_textures/tess/low_tess_res_our.png" title="Ours UV Mapped" class="img-fluid rounded z-depth-1" %}
        <!-- <caption>Ours</caption> -->
    </div>
</div>

Earlier methods mostly concentrated on the using the high-tessellations `[PRT Sloan et al. 2022]` else it causes artefacts like one show in the results in 2nd left. Use of the UV-mapped space to store the Transfer is more appropriate option. In case of the Glossy surfaces it requires a storage of the a matrix which increases memory requirement. But we used Triple product formulations to allevate the problem and stored a vector instead of matrix as now we can store the vectors in the UV-mapped texture.

We also incorporated the secondary bounce information in the setting:


<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/sh_rendering/transfer_textures/interreflection_method.png" title="Method" class="img-fluid rounded z-depth-1" %}
    </div>
     <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/sh_rendering/transfer_textures/interreflection.png" title="Inter-reflection" class="img-fluid rounded z-depth-1" %}
    </div>
    <caption>(a) Method of calculating secondary irradiance, (b) Results of Interreflections</caption>
</div>


But this suffer from the problem of *accurate UV Mapped Texturing requirement*, else you see the results as show below:
We have used the multiple textures for each sub-geometry and it occupies same memory

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/sh_rendering/transfer_textures/texture_sets.png" title="Method" class="img-fluid rounded z-depth-1" %}
        <center><caption>Results of Texture-sets</caption></center>
    </div>
</div>


Here are some results


Still requires a good UV preserving mapping.


##### Part 2 - Use Neural Transfer Approximator

