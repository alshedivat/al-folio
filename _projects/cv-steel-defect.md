---
layout: page
title: Steel Defect Detection
description: Python, OpenCV, Streamlit, ONNX
img: assets/img/steel_defect/thumbnail.png
importance: cv-92
category: Computer Vision
github: 
---

### General Info
Because of heating and rolling, drying, and cutting, various equipment contact flat steel throughout the manufacturing process. As a result, steel has been scrapped from the supply chain. After creating a picture of steel, we need to identify any segmentation faults in the material. Segmentation models were built using HarDNet, while the website itself was built using Streamlit.

### Output
Below is an example of the detection result on the local web application.
<div class="row">
    <div class="col-sm mt-3 mt-md-0" align="center">
        {% include figure.html path="./../../../assets/img/steel_defect/output.png" title="Output" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Screenshot of the detection result on the local web application.
</div>