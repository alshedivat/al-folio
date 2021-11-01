---
layout: post
title:  Screentime tracker
date:   2020-05-22 12:00:00
description: How to keeping a healthy work-life balance.
---

## Why screen time needs to be kept in balance

Working on fascinating and challenging projects is awesome! And getting in the flow of things, focusing for hours on further improving the current work can be a thrill. But being so much in your head often also means that you lose track of time.

Having a good work-life balance is crucial for maintaining a healthy and efficient self and to become the best version of oneself. Loosing track of time and being stuck in the flow for too long can be a risk of imbalancing work and life, and eventually can lead to exhaustion, or worse burnout.

## The screen time tracker
To prevent any of this from happening, I wrote a small 'screentime tracker' script that can be used to log the time I spend actively in front of my macbook. The code can be found [here on Github](https://github.com/miykael/xbar_screentime_tracker) and uses [xbar](https://xbarapp.com/) to directly provide the overall active time in the taskbar of my macbook.

Next to the standard reporting of the 'active time', shown in the taskbar, my script can also generate useful additional visualizations. For example, on a daily basis, and whenever you want, you can ask my screen tracker to report the daily overview:

<img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/blog_screentracker_plot_day.png" data-zoomable width=600px style="padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px; background-color: #fff">

What you can see here is that on Monday the 11th October 2021, I worked 10h 24min, with detailed information of when I was active and when not. This figure also reveals in a bit more detail how the 'active screen time' actually is computed. This is time where my macbook lid is open, the screen saver is off, the computer is unlocked and the computer is not in a sleep state.

To allow this all to work, I put my screen saver activation time to 10min, which means that if I'm gone for more than 10min, my tracking stops. In other words, quick grabbing of coffee or toilet breaks still count as working, while off-computer (real world) meetings are not recorded.

To give a bit more information, I also have a plotting function to provide an overview for the full week:

<img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/blog_screentracker_plot_week.png" data-zoomable width=600px style="padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px; background-color: #fff">

These two figures, the daily and the weekly are generated whenever needed to provide a constant logging of my activation time.

## Data insights

After almost 18-month of data tracking, I was able to get some very interesting insights. The following is a list of all 291 tracked working days so far (there were holidays, days where the script didn't work, etc.). Each horizontal line indicates the time when I was active.

<img class="img-fluid rounded z-depth-1" src="{{ site.baseurl }}/assets/img/blog_screentracker_day_average.png" data-zoomable width=600px style="padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px; background-color: #fff">

I shared my insight about this figure via the following twitter thread:

<br>

{% twitter https://twitter.com/miyka_el/status/1454553521014067202 %}
