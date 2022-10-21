---
layout: page
title: Load Modulated Balanced Amplifier (LMBA)
description:A new MMIC LMBA design
img: assets/img/LMBA.png
#redirect: https://unsplash.com
importance: 3
category: work
---

Load modulated balanced amplifiers (LMBAs) are a balanced amplifier architecture that addresses efficiency issues at back-off operation power levels. Many modern communication standards have large peak-to-average power ratios (PAPR), which require amplifiers to operate at a wide range of power levels. Additionally, there has been a push for devices that are wideband in bandwidth and that meet high linearity requirements. Typical single amplifier designs or other amplifier architectures like the Doherty design cannot handle backoff power levels well or are narrowband.

The LMBA architecture consists of a balanced amplifier structure along with an additional control amplifier that injects a signal into one of the output ports of the balanced amplifier. The signal of the control amplifier is varied in magnitude and phase to load modulate the output of the balanced amplifiers to maintain output power or efficiency at a wide range of power levels or frequencies. 

Our work explored a MMIC LMBA design in the WIN Semiconductor .15 micrometer GaN HEMT process designed for X-band. An emphasis was given to high efficiency performance at a variety of conditions and an analysis was performed on operation at different frequencies, power levels, and for different device sizes. Further testing and performance metrics will be examined in future work.   


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/LMBA.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Schematic model of a typical LMBA design. The magnitude and phase shifted control signal is fed back into the isolated port of the output coupler and is presented at the outputs of the balanced amplifiers. 
</div>
