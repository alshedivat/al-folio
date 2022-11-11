---
layout: page
title: Intelligent Character recognition for Mathematical Documents
description: From a mathematical document detects the mathematical equation and converts it into latex code and rest into text.
img: /assets/img/math_bbox.png
importance: 4
category: personal
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/math_ocr.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Project pipeline
</div>

Mathematical documents contains equations which are not recognised by optical character recognition. Unlike texts, for proper interpretation of mathematical equation the equations are to be converted into equivaent latex code. In this project, the region of mathematical equations are detected using a <b>single shot detector</b>. The detected equation are cropped and converted into latex code using OCR model. The equation area is removed to get remaining text which is passed to separate OCR model to generate text output. 