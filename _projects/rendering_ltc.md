---
layout: page
title: Rendering using Linearly Transformed Cosines
description: Is it possible to get Ray Traced Effects in Rasterized Framework or at the least minimal Ray Tracing
img: assets/img/projects/ltcs/ltc_teaser.gif
importance: 2
category: work
---

Rasterization is widely used methods of rendering geometries with suitable approximations, to acheive photo-realistic effects. Many works have tried incorporating the photo-realisim using required approximation namely Spherical Harmonics Lighting.

One of the complex scenario to reproduce is as follows:

<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0" >
        {% include figure.html path="assets/img/projects/ltcs/direct_label.png" title="Direct Illumination" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


Simple Path tracing of the can be used to get the result using the equation provided below. I have used ```Nvidia Optix 7+``` to obtain the following result.

$$  \mathcal{L}_{o} = \mathcal{L}_{e}(x, \omega_o) + \int_{\Omega} f_{r}(x, \omega_i, \omega_o)\mathcal{L}_{i}(x, \omega_i)(\omega_{i} \cdot n)d\omega_{i} $$

As the light source present in the scene is an area light(scene is shown below). `[Arvo 1995 Siggraph]` provides a line-integral based approach to find the contibution of the light in the setting of direct lighting.  

<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0" >
        {% include figure.html path="assets/img/projects/ltcs/scene_albedo.gif" title="Scene Albedo" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Stage 1: LTC's(Linearly Transfomed Cosines)

Fairly recent, work by `LTC [Heitz et al. 2016 Siggraph]` has formualted a `BRDF` fitting approch to obtain the *area* light contributions without the tracing rays. The renders looks very similar to that of a ray-traced. Specifically in the regions of highlights.
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/ltcs/direct_label.png" title="Direct Label" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/ltcs/ltc.png" title="LTC" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Albeit the Lossing in shadows LTC's faithfully produces the effects of ray-tracing.
</div>

#### Brief mathematical Explaination of how it is done? 
`(Why not detail? Just to spare the jargon!!!! Isn't that obvious)`


The approach of LTC(*Linearly Transformed Cosines*) relies on a transformation obtained from the fitting of Cosine samples to that of a GGX.(OK! How does that help?)

Well, once you have such fitting rather than shooting rays into scene and obtaining radiance values like we do in the case of Ray-tracing, we just keep a record of the light in the scene. 

Now for every point to be rederered, we project the *area* lights on the points hemisphere, apply a transformation using the matricies fitted using LTC. The transfromed matrix can be used in conjunction with the Linear Integral(Boundary Integral) to obtain its effect.



## Stage 2: OK! How to address the lost Visibility?

Look at the picture below.

<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/ltcs/ltc_direct.gif" title="Direct vs LTC" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    We can observe that, despite being occluded by the torous(Donut shaped object in blue) the blocks under it do not have shadow like we have in ray-traced result. 
</div>

To obtain the Contribution of shadows, the work of `Ratio Estimator[Heitz et al 2018]` uses sparse shooting of rays and evaluation of the intergral with and without Visiblity taken into account.

`What does that mean???`

 $$L = \underbrace{\int_{\Omega}BRDF \times Light}_{unshadowed\ analytical\ evaluation\ using\ LTC} \times \underbrace{\frac{\int_{\Omega}BRDF \times Light \times Visibility}{\int_{\Omega}BRDF \times Light}}_{Stochastic\ Evaluation\ with\ denoise\ of\ Numerator\ and\ denominator}$$ 


That traslates to first-term `unshadowed analytical evaluation using LTC` is calcualted via LTCs using prior approch of `LTC [Heitz et al. 2016]` the rest two are obtained via a `MIS` of *Light* sampling and *BRDF-GGX-NDF* sampling. The second-term *numerator* is evaluated using the *visibility* and accounts and *denominator* does not take *visibility* into account. The calculation both terms are using same set of sampled rays. Both are denoised individually. 
<div class="row justify-content-sm-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/ltcs/stoDirect_label.png" title="Numerator with Visibility" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/ltcs/stoNoVis_label.png" title="Denominator without Visibility" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The left figure is Numerator of the second term in the above equation. (<i>Observe the shadows</i>) The right one is disregarding the shadows.
</div>

In order to obtain the results of direct illumination in the setting of LTC `Ratio Estimator` suggests denoising of individual terms of `numerator` and  `denominator`.
I have used `Optix 7.5` *deep learning based* denoiser instead of Bilater filter.

<div class="row justify-content-sm-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/ltcs/stoDirectDenoise_label.png" title="Denoised Numerator with Visibility" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/ltcs/stoNovisDenoise_label.png" title="Denoised Denominator without Visibility" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The left figure is Denoised Numerator of the second term in the above equation. (<i>Observe the shadows</i>) The right one is disregarding the shadows while denoised.
</div>


We multiply *first term* with the *second term* and get the following result.

<div class="row justify-content-sm-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/ltcs/direct_label.png" title="Reference Direct Illumnation" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/ltcs/ratio_estimator_label.png" title="LTC Ratio Estimator" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The left figure is Direct illumination obtained using Optix 7. (<i>Observe the shadows</i>) The second is from the <b>Ratio Estimator</b>.
</div>

Visually we can notice a difference. It is a good approximation of ray-traced direct illumination.


## Stage 3: Is the problem solved??????

Not exactly! What about GI?

<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/ltcs/path_label.png" title="Path traced multibounce" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The result of multibouce evaluation of path traced highly specular objects in Area light setting. 
</div>

I built the `Stage 1` and `Stage 2` till now using `Optix 7.5` and I am currently trying figure out ways to incorporate *GI - Global Illumination* in this setting.

{% raw %}
References:
```
[Arvo 1995 Siggraph]: Applications of Irradiance Tensors to the Simulation of Non-Lambertian Phenomena.
[Heitz et al. 2016]: Real-Time Polygonal-Light Shading with Linearly Transformed Cosines
[Heitz et al. 2018 I3D]: Combining Analytic Direct Illumination and Stochastic Shadows
```
{% endraw %}