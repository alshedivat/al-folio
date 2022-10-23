---
layout: page
title: EMI Shielding with Antenna in Package (AiP)
description: Design of 3-D printed antenna and EMI shielding material analysis
img: assets/img/sem_dra.jpg
importance: 3
category: work
---
A study was performed on an antenna in package (AiP) design produced with 3-D printing on the impact of different coating solutions in reducing electromagnetic interference (EMI) in the system. As the market for higher frequency devices, especially for 5G cellular increases, there is a need for high radiation efficiency in devices for these frequencies. Additionally, the footprint of RF designs must be compact and in many cases, reduced.

Dielectric resonator antennas (DRAs) have been shown to increase radiation efficiency and can also be produced with inexpensive materials and processes, such as the commonly used ABS material in 3-D printing. Additionally, antenna in package (AiP) designs allow electronics such as amplifiers to be packaged inside of the antenna itself, reducing footprint significantly. This comes with the challenge of interference occurring between the antenna and electronics, however, and is an important consideration for these types of designs.
 
An AiP design was produced using 3-D printed Preperm ABS1000 material with a dielectric constant of roughly 6.5. A Mini-Circuits PSA-5043+ amplifier was integrated into the antenna hollow and cosimulations were performed between HFSS and ADS to validate performance. A comparison was performed on different shielding materials to reduce EMI in the system. The shielding materials included copper tape, sputtered copper with the AJA Orion system, and ultrasonically coated conductive ink from Tatsuta which used the Sono-Tek ExactaCoat System.

A comparison was performed which examined radiation patterns of the antenna and linearity measurements of the amplifier. It was found that the Sono-Tek ultrasonically coated ink most drastically reduced the EMI in the system and yielded the best performance for both the antenna and the amplifier. A cost effective method for producing AiP designs was validated and the importance of conformal conductive coating inside of the antenna to prevent EMI was demonstrated. 





<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/DRA_schematic.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.html path="assets/img/dra.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    On the top is a schematic of the AiP structure. On the bottom is an image of the actual, 3-D printed antenna.
</div>


<div class="row">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.html path="assets/img/sem_dra.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    SEM imaging of ultrasonic coating on 3-D printed DRA antenna, which closely conformed to the imperfect surface of the device.
</div>


Areas of Research and Development:
<ul>
<li> Examine effects of 3-D printing on dielectric resonator antennas (DRAs)</li>
<li>Design and cosimulate DRA in HFSS and biasing network in AWR for amplifier</li>
<li>Test and validate antenna and amplifier behavior</li>
<li>Compare different types of EMI shielding with amplifier linearity and antenna radiation</li>
</ul>
