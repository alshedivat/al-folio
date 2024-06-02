---
layout: page
title: Manipulation of Deformable Objects
description: such as cables and ropes
img: assets/img/publication_preview/yu2023global.gif
importance: 1
category: work
related_publications: true
---

## Overview

Deformable linear objects (DLOs), such as cables, wires, and ropes, are prevalent in various everyday manipulation scenarios. Distinguished from rigid objects, deformable objects exhibit strong deformation natures, complex models, and significant individual differences. These present new challenges when using existing robotic manipulation methods and necessitate manual intervention in practical applications. 
We focus on the robotic dexterous manipulation of DLOs. By addressing scientific problems such as constrained global modeling and real-time dexterous policy solving, we aim to achieve autonomous and intelligent manipulation of DLOs by dual-arm robots. 

We establish a complete manipulation framework involving DLO modeling, whole-body moving and shaping, and precise terminal manipulation. 
The main research includes large deformation modeling and efficient model learning, whole-body shape control and global planning in constrained environments, and precise terminal manipulation based on visual and tactile sensing. 
We seek to comprehensively address open challenges arising from the strong deformation and high variability of DLOs, such as model uncertainty, high dimension, multiple constraints, under-actuation, visual occlusion, and generalization difficulties. 

## In-Hand Following of Deformable Linear Objects Using Dexterous Fingers With Tactile Sensing

* 12/2023 - 03/2024
* [[Website](https://mingrui-yu.github.io/DLO_following/)]

<iframe width="800" height="450" src="https://mingrui-yu.github.io/DLO_following/main_1080p.mp4" title="24_DLO_Following" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> </iframe>

Most research on deformable linear object (DLO) manipulation assumes rigid grasping. However, beyond rigid grasping and re-grasping, in-hand following is also an essential skill that humans use to dexterously manipulate DLOs. In this work, inspired by how humans use fingers to follow DLOs, we explore the usage of a generic dexterous hand with tactile sensing to imitate human skills and achieve robust in-hand DLO following. To enable the hardware system to function in the real world, we develop a framework that includes Cartesian-space arm-hand control, tactile-based in-hand 3-D DLO pose estimation, and task-specific motion design.

## Generalizable Global Manipulation of Deformable Linear Objects in Constrained Environments

* 10/2022 - 10/2023
* [[Website](https://mingrui-yu.github.io/DLO_planning_2/)]

<iframe width="800" height="450" src="https://mingrui-yu.github.io/DLO_planning_2/final_whole.mp4" title="23_DLO_planning" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> </iframe>

This article focuses on the global moving and shaping of DLOs in constrained environments by dual-arm robots. The main objectives are 1) to efficiently and accurately accomplish this task, and 2) to achieve generalizable and robust manipulation of various DLOs. To this end, we propose a complementary framework with whole-body planning and control using appropriate DLO model representations. Experiments demonstrate that our framework can accomplish considerably more complicated tasks than existing works. It achieves a 100% planning success rate among thousands of trials with an average time cost of less than 15 second, and a 100% manipulation success rate among 135 real-world tests on five different DLOs.

## Dual-Arm Manipulation of Deformable Linear Objects with Whole-Body Obstacle Avoidance

* 04/2022 - 09/2022
* [[Website](https://mingrui-yu.github.io/DLO_planning/)]

<iframe width="800" height="450" src="https://www.youtube.com/embed/X3WslgHU4VE" title="Dual-Arm Manipulation of Deformable Linear Objects with Whole-Body Obstacle Avoidance" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Manipulating deformable linear objects (DLOs) to achieve desired shapes in constrained environments with obstacles is a meaningful but challenging task. We propose a coarse-to-fine framework to combine global planning and local control for dual-arm manipulation of DLOs, capable of precisely achieving desired configurations and avoiding potential collisions between the DLO, robot, and obstacles. Both simulations and real-world experiments demonstrate that our framework can robustly achieve desired DLO configurations in constrained environments with imprecise DLO models, which may not be reliably achieved by only planning or control.

## Learning to Estimate 3-D States of Deformable Linear Objects from Occluded Single-Frame Point Clouds

* 04/2022 - 09/2022

<iframe width="800" height="450" src="https://mingrui-yu.github.io/videos/ICRA23_DLO_perception_video.mp4" title="23_DLO_perception" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> </iframe>

We focus on learning to robustly estimate the states of DLOs from single-frame point clouds in the presence of occlusions using a data-driven method. Simulation and real-world experimental results demonstrate that our method can generate globally smooth and locally precise DLO state estimation results even with heavily occluded point clouds, which can be directly applied to real-world robotic manipulation of DLOs in 3-D space.

## Global Model Learning for Large Deformation Control of Deformable Linear Objects

* 02/2021 - 08/2022
* [[T-RO Website](https://mingrui-yu.github.io/shape_control_DLO_2/)] [[ICRA Website](https://mingrui-yu.github.io/shape_control_DLO/)]

<iframe width="800" height="450" src="https://www.youtube.com/embed/Gh5ncipo2SA" title="Global Model Learning for Large Deformation Control of Elastic Deformable Linear Objects" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

We propose a coupled offline and online data-driven method for efficiently learning a global deformation model, allowing for both accurate modeling through offline learning and further updating for new DLOs via online adaptation. We also propose a convex-optimization-based controller and analyze the system’s stability using the Lyapunov method. Detailed simulations and real-world experiments demonstrate that our method can efficiently and precisely estimate the deformation model, and achieve large deformation control of untrained DLOs in 2D and 3D dual-arm manipulation tasks better than the existing methods. learning.


