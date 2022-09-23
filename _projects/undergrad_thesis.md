---
layout: page
title: Blockchain For Business Networks
project_page: true
description: Undergraduate Thesis
img: assets/img/Thesis_Cover.jpg
importance: 1
category: Thesis
github: https://github.com/saikumarysk/BlockchainForBusinessNetworks
report_pdf: Undergrad_Thesis_report.pdf
---

:warning: Hyperledger Composer is deprecated as of August 2019 :disappointed: :warning:

In this project, I worked on the
<div class="row">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/Thesis_Composer.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/Thesis_Layer.JPG" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Brief overview of Hyperledger Composer and Hyperledger Fabric and their interplay in the project.
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
You describe how you toiled, sweated, *bled* for your project, and then... you reveal it's glory in the next row of images.


The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}
```html
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
```
{% endraw %}

<div class='social'>
<div class="contact-icons">
  Source Code: <a href="{{ page.github }}" title="GitHub"><i class="fab fa-github"></i></a>
  Report: <a href="{{ page.report_pdf | prepend: 'assets/pdf/' | relative_url}}" target="_blank" rel="noopener noreferrer"><i class="fas fa-file-pdf"></i></a>
</div>
</div>
