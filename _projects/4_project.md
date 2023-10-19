---
layout: page
title: Extrapolation!
description: Python CBS Limit Calculator
img: assets/img/1.jpg
importance: 3
category: fun
---

<b>The CBS limit problem:</b> An ideal finite basis set should mimic the complete basis set (CBS) limit, but reaching this limit often requires large finite basis sets, limiting practical use to small molecular systems.:cry:

<b>The CBS solution:</b>:Various extrapolation schemes have emerged to address the CBS limit problem by approximating infinite basis set calculations through extrapolation. These schemes often use two-, three-point or even four-point extrapolation formulas based on asymptotic convergence of energies, structure parameters and spectroscopic properties, to the CBS limit, with points obtained using progressively larger basis sets. Examples here includes the commonly used Dunning's aug-cc-pVnZ type correlation-consistent basis sets plus the polarization consistent basis sets.

<b>The CBS limit extrapolation calculator:</b> Although many extrapolation formulas involve simple exponential, Gaussian, and power functions, determining parameters for CBS limit extrapolation can be computationally quite intensive. This CBS Limit Extrapolation script significantly simplifies these calculations making the extrapolation process, be it for a two-, three-point, four-point cardinal number system or even higher, more efficient and accessible for everyone. The code calculates the Complete Basis Set (CBS) limit value using any given molecular parameters (e.g.Ee) fits the data to a Ee(n) function, and plots the results, in particular, Ee(∞). 

<br>
here we go...:grin:
<br><b>Step 1.</b> Define the CBS function: for example Ee(n) = Ee(∞) + A * e^-(n-1) + B * e^-(n-1)^2

<b>Step 2.</b> Define the n cardinal number narray for aug-cc-pVnZ basis set sizes (n = 2, 3, 4 or higher).

<b>Step 3.</b>Collect Ee_values: you are prompted to input De, Ee, structure parameters or spectroscopic data separated by commas.

<b>Step 4.</b>Fit the Ee function: Use the curve_fit function from scipy.optimize to fit the Ee function to the provided Ee(n) values.

<b>Step 5.</b> Extract the fitted parameters: Obtain the extrapolated CBS limit value (Ee(∞)) and the corresponding fitting parameters A and B.

<b>Step 6.</b> The script then prints the results displaying the input De values, extrapolated CBS limit value Ee(∞), and fitting parameters.

<b>Step 7.</b> Finally ,matplotlib.pyplot will help you to plot the results, and create a diagram displaying the input Ee values, fitted curve, and extrapolated CBS limit value of Ee(∞)
<br>
<br>

    ---
    script: python/replit.com
    title: CBS limit extrapolation project
    description: script to calculate Ee(∞) as a function of cardinal number n
    url: https://replit.com/@konolemke/CBSExtrapolation
    ---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Caption photos easily. On the left, a road goes through a tunnel. Middle, leaves artistically fall in a hipster photoshoot. Right, in another hipster photoshoot, a lumberjack grasps a handful of pine needles.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>

You can also put regular text between your rows of images.
Say you wanted to write a little bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, *bled* for your project, and then... you reveal its glory in the next row of images.


<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>


The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}
```html
<div ddddd="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
```
{% endraw %}
