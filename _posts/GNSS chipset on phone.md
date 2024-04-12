---
layout: post
title: How good it will be, the GNSS chipset on your phone?
description: The best tools for finding a answer
date: 2022-03-31
tags: <d-cite key="\1"></d-cite>
categories: notes
publish: yes
toc: true
---


Probably you hate the GNSS chipset on your phone, which eats battery a lot and never ready to use when you need it. I had a GNSS course 10 years ago, at that time, if you need **sub-meters** coordinates.

- The phone was not an option at all for positioning.
- Elevation by GPS was thought shitty. We did only believe orthometric height by level measurement.
- The credible differential GPS technique was RTK (Real Time Kinemetric). We need find a ground control point first and hope it is high enough, otherwise we need do transition by total station. Then setting up stationary GPS and radio antenna to broadcast corrections.

Somethings changed since 2018, 2019:

- The chipset evolved. <d-cite key="\1"></d-cite>(https://www.youtube.com/watch?v=vywGgSrGODU)
- Google opened the <d-cite key="\1"></d-cite>(https://developer.android.com/guide/topics/sensors/gnss#analyze) and provided the tools <d-cite key="\1"></d-cite>(https://play.google.com/store/apps/details?id=com.google.android.apps.location.gps.gnsslogger&hl=zh&gl=US).

> This changed with the launch of Android Nougat 7.0, which brought the ability to collect and process raw <d-cite key="\1"></d-cite>(https://developer.android.com/guide/topics/sensors/gnss.html) within an Android app. Android Pie 9.0 went further by <d-cite key="\1"></d-cite>(https://youtu.be/vywGgSrGODU?t=1898) for testing <d-cite key="\1"></d-cite>(https://en.wikipedia.org/wiki/Real-time_kinematic), or <d-cite key="\1"></d-cite>(http://insidegnss.com/auto/julaug10-solutions.pdf).

> The <d-cite key="\1"></d-cite>(https://medium.com/@sjbarbeau/dual-frequency-gnss-on-android-devices-152b8826e1c) on newer Android devices has gotten a lot of attention lately, as using multiple GNSS frequencies is potentially a game-changer in terms of location accuracy — going from several meters of error (over 10 feet) to decimeter level (less than 1 foot).

The traditional positioning is done by code correlation, determining a pseudorange with limitations (3 meters for the C/A code and 0.3 meters for the P code, which is up to the chipping rate of the code used). The actually accuracy needs plus clock error and path delays.Carrier-phase measurement is calculated by carrier wavelength times the number of the cycles. So, the wavelength determined the error, which is 0.19 m for the L1 signal. It is possible improve to 1% of its wavelength by solving the problem called integer ambiguity .

I never expect that today we have so many GNSS satellites available. And satellite-based augmentation system (SBAS) is everywhere.



#### Amazing Tools for Exploring GNSS on Android

- How to logger raw files: GNSSLogger, <d-cite key="\1"></d-cite>(https://github.com/google/gps-measurement-tools)
- How to logger/view/test the GNSS data: <d-cite key="\1"></d-cite>(https://play.google.com/store/apps/details?id=com.android.gpstest)
- How to properly process raw data: <d-cite key="\1"></d-cite>(https://wiki.openstreetmap.org/wiki/RTKLIB)
  - You need ephemerides and solutions from IGS, and RINEX file from a nearby base station. It could be real time or post processing.
  - with RTKLIB, you can easily do PPP, Or,  you can use webservice <d-cite key="\1"></d-cite>(https://webapp.geod.nrcan.gc.ca/geod/tools-outils/ppp.php).
- How to turn raw measurements to Rinex files: <d-cite key="\1"></d-cite>(https://github.com/rokubun/android_rinex)

Here is a full list, <d-cite key="\1"></d-cite>(https://github.com/barbeau/awesome-gnss).



#### Some Results

By using RTKLIB and raw measurements from smartphone, one of the processing results is here.

>  the resulting errors for the training set were 1.37 meters for the 50th percentile, 5.35 meters for the 95th percentile and 3.36 meters for the average of the two. <d-cite key="\1"></d-cite>(https://rtklibexplorer.wordpress.com/2022/01/10/google-smartphone-decimeter-challenge/)



#### What I Have Got

I do not have enough time to do PPP process. By hardware estimation (android outputs the raw measurements with accuracy estimation at 68% confidence), the precision is 3.8m, 2.5m for the one of points, corresponding to horizontal and vertical measurements.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/post/gnss_phone-min.png" title="Screenshot from GPSTest" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Screenshot from GPSTest
</div>


If the ground truth is error free, at the moment I look at my phone, the true error is 6.67/5.97 m. After 268 seconds (1 sample per second), on average, the true error is 6.72/5.45 m.

My location is surrounded by trees and a 5-floors-building.

If possible, I shall check the ground control point. I believe it is possible to achieve 1 meter accuracy of positioning with dual frequency smartphones.



#### What's in the Future

In the future.

> Machine learning and precision GNSS algorithms are expected to improve this accuracy and provide billions of Android phone users with a more fine-tuned positioning experience.
> <d-cite key="\1"></d-cite>(https://www.kaggle.com/competitions/google-smartphone-decimeter-challenge/overview/description)


