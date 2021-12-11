---
layout: page
title: Differentially Private Location Obfuscation in Location-Based Services
description: The goal of this project is to protect vehicle location privacy in location based services (LBS). 
img: /assets/img/project1cover.JPG
importance: 1
---

<div class="row justify-content-md-center">
    <div class="col">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/TrafficAdapter_Framework.png' | relative_url }}" alt="" title="Framework of location obfuscation"/>
    </div>
</div>
<div class="caption">
    Framework of location obfuscation.
</div>

**Overview.** Location obfuscation, which allows mobile users to report obfuscated locations instead of the exact locations, has been a dominating location privacy protection paradigm in many location-based services. Yet, the current obfuscation designs fail to address the vulnerabilities of vehicles, of which the mobility is restricted by the underlying road networks and traffic conditions. Particularly, individual vehicles’ mobility is restricted by various road environments, including local road network topology, speed limits, and traffic conditions. Built upon this insight, in this project, our objective is to 1) demonstrate that, with the road network environment and historical traffic flow information provided, vehicles’ trajectory can be inferred with high accuracy even their reported locations have been obfuscated, 2) propose a new location obfuscation paradigm to protect vehicles’ location privacy considering the vehicles’ mobility features over roads, and 3) develop, deploy, test, and refine the geo-obfuscation methods in dynamic location-based applications.

**Topic 1: Traffic flow aware inference attacks.** We propose a new threat model that leverages traffic flow information to recover vehicles’ real locations from obfuscated locations. We modle a target vehicle’s mobility by a *hidden Markov model (HMM)*, where the vehicle’s actual and obfuscated locations are considered as a *hidden state* and an *observable state*, respectively. The HMM transition matrix, which can be learnt using the traffic flow information, describes the probabilities of the vehicle traveling between the locations over the map. Given the HMM matrix, the vehicle’s real locations can be estimated with a high accuracy using well-developed hidden state inference algorithms (e.g., the Viterbi algorithm). 

Figure 1 shows an example on how a traffic aware attacker can accurately track a taxicab’s locations (in Shenzhen mobility trace dataset) even when the taxicab’s location has been obfuscated with a state-of-the-art obfuscation algorithm.
</div>
<div class="row justify-content-md-center">
    <div class="col">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/TrafficAdapter_inference.png' | relative_url }}" alt="" title="Example: Accuracy of location tracking using the vehicle traffic flow information."/>
    </div>
</div>
<div class="caption">
    Framework of location obfuscation.
</div>


Publications: IPSN 2020

The MATLAB code of vehicle location tracking has been released [here](https://github.com/chenxiq1986/vehicle-traffic-flow-aware-attack).

---

**Topic 2: Location obfuscation over the road networks**. As a countermeasure, we then develop a new strategy to obfuscate a vehicle’s locations by a “fake” trajectory that follows a realistic traffic flow. The fake trajectory is designed to not only hide the vehicle’s real location but also guarantee the quality of service (QoS) of LBS. Our experimental results demonstrate that 1) the new threat model can accurately track vehicles’ real locations, which have been obfuscated by two state-of-the-art algorithms, and 2) the proposed obfuscation method can effectively protect vehicles’ location privacy under the new threat model without compromising
QoS.

Publications: 
TMC 2020, CIKM 2020, ICDCS 2019

---

**Topic 3: Policy-driven location obfuscation**. 


Publications: NA

