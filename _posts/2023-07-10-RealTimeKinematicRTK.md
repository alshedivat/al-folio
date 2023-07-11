---
title: "Real Time Kinematic Processing"
layout: post
date: "2023-07-10 10:43:00"
tags: "drone, satellite, gps, surveying"
categories: scantiques
description: Getting Highly Accurate Positions for our Trees <3
---
# Let's talk about satellites! 

We have spent the last couple of days blasting across the prairies. To navigate from to place we have been heavily on a technology important for navigation of both people and drones. This post is dedicated to the unseed hero of drone-based remote sensing - the satellite. Specifically, satellites that are members of the elite suite of satellites referred to as our **Global Naviation Satellite System** (GNSS). These satellites constantly transmit data that when used in combination with at least four other positioning satellites can give a precise location. The world of positioning is very exciting so let's dive in! 

The first thing to know is that the moniker "GPS" or Global Positioning System is misleading. There five distinct GNSS systems available for positioning. These systems are: 
1. GPS; deployed in 1978 and publicly available since 1994 
2. Quasi-Zenith Satellite System (QZSS); publicly available since 2018 but only covers Eastern Asia
3. BEIDOU; a Chinese satellite system that is now fully available (2020) with global coverage
4. GALILEO; a European Union satellite system available since 2016
5. GLONASS; Russian GNSS system with global coverage since 2011

For our phones to give us our 3D location, they use a technique called* **trilateration**.**Trilateration** is frequently confused with triangulation. Both of these processes uses overlap, but trilateration uses overlap of ranges, or distances between a satellite and a reciever, to get either a 2D or 3D location. Triangulation uses overlap of angles on lines. You can see an outline of trilateration below. Any GPS receiver uses this process, your phone, your car, even airplanes! Yet, our phones gives us accuracies in the meter (5 + meter) or multimeter (10 + meters) accuracy when our research interested in sub-meter accuracy. For example, what is the precise position of a tree impacted by root rot (tune into for Madi's guest blog post on this soon!). These accuracy levels are determined by satellite coverage, atmospheric interference, and direct control from the US government. To increase accuracy level of our data we use a process called **real time kinematic** or RTK. 

</div>
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/Satellite_Outline.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Method of trilateration to get a satellite fix. 
</div>

## Real Time Kinematic Positioning

In a prior blog post I discussed some of the problems of drone work - one of the biggest being satellite connection for both the drone and a GNSS base-station. We use RTK processing where the drone and GNSS base-station work in tandem to give real-time centimeter accuracy data. Our M300 drone uses all but the QZSS GNSS systems to collect data accurate to the centimeter level. With RTK, the drone, which is also called a rover, links to an unmoving GNSS base-station that records the same satellite information at the same time. RTK uses the known distance between the stationary base station and the drone to correct for satellite associated errors resulting from issues with the satellite location, atmospheric interference, and reflection of signal that might confuse the GNSS receiver. In RTK systems, such corrections are done in real-time, but these corrections can also be done after data collection using a process called **Post-Processing Kinematic** (PPK). We don't use PPK processing that often in our research, but I should mention the main advantage of PPK over RTK is that if the drone and base station lose connection, you can still get accurate locations with later processing. However, RTK is what allows our drone to keep exact positioning, land at exactly the same spot, and make sure that it covers all of the flight plan. 

The schematic below describes the overall process. Satellites send out signals that define the exact time that the signal is sent out - this is called the **code phase**. Our GPS receivers then align their own clocks to the time of the satellite to get time that it took the signal be received. The signal travels at the speed of light, which is a constant, so we can use the time multiplied by the speed to get the distance. However, errors introduced while sending the signal and the receiving the signal can cause minute errors. These minute errors, multiplied by the speed of light cause large errors in positioning. Luckily, we can also use the frequency that comes alongside the **code phase**, the **carrier phase**, which operates at a much higher frequency with much lower error margins which better parse errors in our positioning. Code phase is easily disentangled from different satellites, carrier phase is less so. In an RTK system the base station and the rover lock onto the same satellites with their code-phases and use these positions to pinpoint a more exact location from the carrier phases. All of that seems really complex! To simplify let's look at the process as a whole: 

## The RTK process:  
1. The GNSS base station and a rover (i.e. the drone) lock onto the same satellites 
2. Using the satellites, the base station and the rover approximate their positions
3. With the known distance between the base station and the information sent by the same satellites the unmoving base station updates and corrects the rovers location in real-time. 
   *Note: in RTK processing this position of the rover is relative to the base station. We have to link the base station to a known geographic point for our final accuracy to be as correct as possible. 

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/RTK_process.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    An overview of the RTK and PPK systems. The different signals sent by the satellite are shown by the lines. 
</div>
   
I hope that this post has started to unravel the complex world of GNSS positioning. It is really crazy how much we rely on this complex technology! 

## Key Science Terms 
* **Trilateration**: Using a combination of distances from an object (or ranges) to get the 2D or 3D 'fix' or precise location. For GNSS recievers, they need to receive transmission from 4 unique satellites. 
* **rover**: A moving GNSS receiver that is part of a two part GPS receiving system. 
* **Base station**: A GNSS receiver that does not move during data collection and generally has a precise known location on earth. 
* **Real-Time Kinematic** : A system of satellite receivers (a GNSS base station and a rover) that work in tandem to adjust errors in satellite signals to get exact final positions. RTK will make these corrections in real-time. 
* **Post-Processing Kinematic** : A similiar combination of a GNSS base station and a rover that collect data from satellites simultanously, but are not actively transmitting data to eachother. The base station has a known location that is used to adjust errors in the rover after data collection. 
* **code phase**: The unique time signal sent out by a satellite and aligned by a GPS reciever to give the distance between the satellite and the receiver. 
* **carrier phase**: A higher frequency signal sent out by a satellite that helps pinpoint location more precisely. 
