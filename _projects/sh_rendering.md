---
layout: page
title: PRT for Arbitrary Geometries
description: How to store in transfer signals in implicit surfaces
img: assets/img/projects/sh_rendering/transfer_textures/teaser.gif
importance: 1
category: work
---
The work is presented in two parts:
- <font size="1.5">Store Transfer in UV-space instead of Vertex attributes</font> 
    * [<font size="1.5">"Transfer Textures for Fast Precomputed Radiance Transfer - EuroGraphics'22 Poster"</font>](https://diglib.eg.org/handle/10.2312/egp20221012)
- <font size="1.5">Using Implicit Surfaces for Precomputed Radiance Transfer </font> 
    * [<font size="1.5">"Learnt Transfer for Surface Geometries - HPG'22 Poster</font>](https://www.highperformancegraphics.org/posters22/HPG2022_Poster7_Learnt_Transfer_for_Surface_Geometries.pdf)
    * [<font size="1.5">"Real-time Rendering of Arbitrary Surface Geometries using Learnt Transfer"</font>](https://iiitaphyd-my.sharepoint.com/:b:/g/personal/dhawal_sirikonda_research_iiit_ac_in/EUKOrBzrxrxFsOhmYFLArFcBtWBpY2nfx_CziCUC-JHneg?e=MrdxAJ)


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
<div>
    <video controls autoplay width="320" height="180">
        <source src="https://raw.githubusercontent.com/dhawal1939/dhawal1939.github.io/master/.github/videos/sh_rendering/transfer_textures/results_transfer_textures.webm" type="video/webm">
    </video>
    <video controls autoplay width="320" height="180">
        <source src="https://raw.githubusercontent.com/dhawal1939/dhawal1939.github.io/master/.github/videos/sh_rendering/transfer_textures/interreflection.webm" type="video/webm">
    </video>
    <br/>
    <caption>(left) Results of Transfer Textures, (right) Results of Interreflections</caption>
</div>

```
Still requires a good UV preserving mapping.
```

##### Part 2 - Use Neural Transfer Approximator


What to do in case of Implicit surfaces?


*Implicit surfaces do not have any UV locations*

As the surface representation does not have a storage schema, how can we store transfer values? 

- It does not have a Vertex Position
- It does not have UV mapping


What we do then?

1) Sample points, calculate the visibility.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/sh_rendering/learnt_transfer/data_creation.png" title="Method" class="img-fluid rounded z-depth-1" %}
        <center><caption>Data Creation</caption></center>
    </div>
</div>


2) Fit a small shallow MLP which can regress a transfer from the surface parameters? (normal and position)

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/sh_rendering/learnt_transfer/mlp_fit.png" title="MLP FIT" class="img-fluid rounded z-depth-1" %}
        <center><caption>MLP Fit</caption></center>
    </div>
</div>

3) Once fit extract weights into mat4 ops rather than serial for loops

4) Extract the MLP weights into GLSL for a forward evaluation
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/sh_rendering/learnt_transfer/glsl.png" title="GLSL" class="img-fluid rounded z-depth-1" %}
        <center><caption> GLSL Implementation</caption></center>
    </div>
</div>

5) In case network is big CUDA based implementation helps. Refer to the paper for more info

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/sh_rendering/learnt_transfer/cuda.png" title="CUDA" class="img-fluid rounded z-depth-1" %}
        <center><caption> CUDA Implementation</caption></center>
    </div>
</div>

6) Large scence


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/sh_rendering/learnt_transfer/large_scene.png" title="CUDA" class="img-fluid rounded z-depth-1" %}
        <center><caption> Large Scenes</caption></center>
    </div>
</div>

<center>
<video controls autoplay width="480" height="270">
    <source src="https://raw.githubusercontent.com/dhawal1939/dhawal1939.github.io/master/.github/videos/sh_rendering/learnt_transfer/results_learnt_transfer.webm" type="video/webm">
</video>
</center>
