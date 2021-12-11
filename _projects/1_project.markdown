---
layout: page
title: Differentially Private Location Obfuscation in Location-Based Services
description: The goal of this project is to protect vehicle location privacy in location based services (LBS). 
img: /assets/img/project1cover.JPG
importance: 1
---

</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/TrafficAdapter_Framework.png' | relative_url }}" alt="" title="Framework of location obfuscation"/>
    </div>
</div>
<div class="caption">
    Framework of location obfuscation.
</div>

Location obfuscation, which allows mobile users to report obfuscated locations instead of the exact locations, has been a dominating location privacy protection paradigm in many location-based services. Yet, the current obfuscation designs fail to address the vulnerabilities of vehicles, of which the mobility is restricted by the underlying road networks and traffic conditions. Particularly, individual vehicles’ mobility is restricted by various road environments, including local road network topology, speed limits, and traffic conditions. Built upon this insight, in this project, our objective is to 1) demonstrate that, with the road network environment and historical traffic flow information provided, vehicles’ trajectory can be inferred with high accuracy even their reported locations have been obfuscated, 2) propose a new location obfuscation paradigm to protect vehicles’ location privacy considering the vehicles’ mobility features over roads, and 3) develop, deploy, test, and refine the geo-obfuscation methods in dynamic location-based applications.

---

Publications: 
TMC 2020, CIKM 2020, IPSN 2020, ICDCS 2019

This project has been reported by [Rowan Today](https://today.rowan.edu/news/2021/02/protecting-app-based-worker-privacy.html).

The MATLAB code of vehicle location tracking has been released [here](https://github.com/chenxiq1986/vehicle-traffic-flow-aware-attack).
