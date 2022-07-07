---
layout: page
title: Indoor Backscatter
description:
img: assets/img/backcam_size_comparison.png
importance: 3
category: work
---

## Backcam

<img src="/assets/img/backcam_size_comparison.png" class="img-fluid" alt="Size comparison between Backcam PCB and a credit card">

We introduce the design and implementation of BackCam, a low-power wireless camera sensor platform that supports continuous realtime vision applications, all using commodity radios. In the lowest power mode, our camera board consumes only 9.7mW and continuously transmits images for over one month on two AA batteries. We introduce a novel power management system that incorporates input from the camera itself to increase battery life up to 62%. Using images and system metadata as input, we designed a feedback system between the sensor and the gateway. This allows dynamic vision application requirements to be met while consuming as little power as possible. For example, our system can temporarily increase the resolution after an object of interest is detected, then reduce it again after it has disappeared. This increases the accuracy of simplistic facial recognition by at least 25% compared to operating constantly in the lowest power mode. We implement communications using a full-duplex WiFi backscatter radio, ensuring compatibility with commodity WiFi devices. We also designed an efficient data streaming and compression pipeline straight from the camera to the backscatter transmitter, allowing us to minimize latency and avoid expensive memory writes. We deployed BackCam in a real office environment, and as a proof-of-concept, implemented basic realtime face detection and recognition. 

## FreeRider

At the CoNEXT 2017 conference in Seoul, South Korea, we introduced the design and implementation of FreeRider, the first system to enable backscatter communication with multiple commodity radios, such as 802.11g/n WiFi, ZigBee, and Bluetooth, while these radios are simultaneously used for productive data communication. Furthermore, we are, to our knowledge, the first to implement and evaluate a multi-tag system.

The key technique used by FreeRider is codeword translation, where a tag can transform a codeword present in the original excitation signal into another valid codeword from the same codebook during backscattering. In other words, the backscattered signal is still a valid WiFi, ZigBee, or Bluetooth signal. Therefore, commodity radios decode the backscattered signal and extract the tag’s embedded information. More importantly, FreeRider does codeword translation regardless of the data transmitted by these radios. Therefore, these radios can still do productive data communication. FreeRider accomplishes codeword translation by modifying one or more of the three dimensions of a wireless signal — amplitude, phase and frequency. A tag ensures that the modified signal is still comprised of valid codewords that come the same codebook as the original excitation signal. We built a hardware prototype of FreeRider, and our empirical evaluations show a data rate of ∼60kbps in single tag mode, 15kbps in multi-tag mode, and a backscatter communication distance up to 42m when operating on 802.11g/n WiFi. 
