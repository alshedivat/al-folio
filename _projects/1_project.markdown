---
layout: page
title: Vehicle Location Privacy Protection in Location-Based Services
description: The goal of this project is to protect vehicle location privacy in various location based applications. 
img: /assets/img/project1cover.JPG
importance: 1
---

**Task 1: Traffic flow aware inference attacks.** Thinking like an adversary, we propose a new threat model that leverages traffic flow information to recover vehicles’ exact locations from other types of information, such as braking signals or perturbated locations. The target vehicle’s mobility is described by a *hidden Markov model (HMM)* (Figure 1), where the vehicle’s exact location is considered as a *hidden state*, while its sensing information/perturbated location is considered as an *observable state*. The HMM transition matrix, which can be learnt using the traffic flow information, describes the probabilities of the vehicle traveling between the locations over the map. Given the HMM matrix, the vehicle’s exact locations can be recoverd with a high accuracy using well-developed hidden state inference algorithms (e.g., the Viterbi algorithm). 

<div class="row justify-content-md-center">
    <div class="col-sm-9">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/TrafficAdapter_HMM.png' | relative_url }}" alt="" title="Figure 1. HMM model"/>
    </div>
</div>
<div class="caption">
    Figure 1. HMM model.
</div>

Figure 3 shows an example on how a traffic aware attacker can accurately track a taxicab’s locations (in Shenzhen mobility trace dataset) even when the taxicab’s location has been obfuscated with a state-of-the-art obfuscation algorithm.
<div class="row justify-content-md-center">
    <div class="col-sm-9">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/TrafficAdapter_inference.png' | relative_url }}" alt="" title="Figure 1. Example: Accuracy of location tracking using the vehicle traffic flow information."/>
    </div>
</div>
<div class="caption">
    Figure 2. Example: Accuracy of location tracking using the vehicle traffic flow information.
</div>

Publications: IPSN 2020

The MATLAB code of vehicle location tracking has been released [here](https://github.com/chenxiq1986/vehicle-traffic-flow-aware-attack).

---

**Task 2: Location obfuscation over the road networks**. As a countermeasure of task 1, we aim to design time-efficient obfuscation techniques to protect vehicles' location privacy against the traffic-aware inference attacks. Considering that individual vehicles’ mobility is restricted by various road environments, including local road network topology, speed limits, and traffic conditions, our objective is to 


<div class="row justify-content-md-center">
    <div class="col-sm-9">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/TrafficAdapter_Framework.png' | relative_url }}" alt="" title="Figure 3. Framework of location obfuscation"/>
    </div>
</div>
<div class="caption">
    Figure 3. Framework of location obfuscation.
</div>

Publications: 
TMC 2020, CIKM 2020, ICDCS 2019

---

**Task 3: Policy-driven location obfuscation**. 


Publications: NA

