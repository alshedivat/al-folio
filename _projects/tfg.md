---
layout: page
title: VR Navigation and Segmentation
description: Undergraduate Thesis. Research and development of different navigation techniques in collaboration with Sagrada Familia, and segmentation of collaborators with low-resolution images.
img: assets/img/projects/tfg/teaser.jpg
importance: 3
category: university
---

View the undergraduate thesis (Spanish) [here](../../assets/pdf/TFG_Jose_Luis.pdf)

Currently there is a wide variety of techniques to navigate virtual environments with virtual reality headsets, the most common problems in navigation are cybersickness and spatial disorientation. When working with collaborative virtual reality, several users share physical and virtual space, therefore, the visual representation of users is important to facilitate interaction and avoid collisions.

This work presents an application that allows the connection of multiple users to a collaborative virtual environment, where different navigation
techniques and visual representation of users have been studied, developed and evaluated. The application allows multiple users to navigate in the same
virtual environment, as well as the interaction between participants. 

The navigation techniques presented offer a good balance between flexibility of movement, and the induction of dizziness or spatial disorientation.
Also, techniques have been developed to know the position of the other participants at all times, as well as where they are looking and pointing in
order to facilitate communication, avoid collisions and achieve more natural interactions.

In this project I developed a client-server architecture to allow multiple users to connect to the same scene.

We researched and developed different navigation techniques that were used by the Sagrada Familia's architects. We developed techniques that allowed architects freely explore the
scene while knowing were other collaborators are located (free fly, ghost avatar, video camera), and other more restrictive techniques for creating safe demonstrations for less experienced users (teleport, waypoints, etc.)

![](../../assets/img/projects/tfg/avatar.jpg)
![](../../assets/img/projects/tfg/teleport.jpg)
![](../../assets/img/projects/tfg/videocamera.jpg)
<p align="center">
  <img 
    width="794"
    height="239"
    src="../../assets/img/projects/tfg/waypoints.jpg"
  >
</p>

We also explored segmentation of other users to position them in the VR environment. We used the two low-resolution cameras provided by the HTC VIVE Pro. We explored and developed
some classic algorithms such as inundation (color and depth-based) and SLIC segmentation (Kruskal's algorithm). We developed some algorithms on the GPU using Compute Shaders to speed up the execution.

![](../../assets/img/projects/tfg/slic.jpg)

Finally, we designed and implemented with Tensorflow a neural network that was able to segment a human person using simple primitives and OpenPose.

<p align="center">
  <img 
    width="693"
    height="273"
    src="../../assets/img/projects/tfg/teaser.jpg"
  >
</p>
![](../../assets/img/projects/tfg/openpose.jpg)
![](../../assets/img/projects/tfg/nn.jpg)