---
layout: page
title: CUDA Sphere Marching
description: Simple Sphere Marching implementation on CUDA
img: assets/img/projects/sphere_marching/teaser.jpg
importance: 2
category: university
---

This project was developed as a final assessment for the Graphics Cards and Accelerators undergraduate course. We were free to choose a topic to implement using CUDA.

Ray tracing algorithms are widely used in graphics rendering, based on casting rays from the camera position to a direction in the scene to determine the color of the image to be rendered. In this project, for each pixel a ray is casted and we calculate the colliding object to determine the color of the pixel.

The scene is represented with distance functions, and Sphere Marching is used to calculate the intersection of each ray with the scene. This algorithm allows to accelerate the ray-scene intersection from the properties of the distance functions.

When evaluating distance functions, we can use blending functions to create interesting dynamic blending between objects:

<video width="960" height="540" controls>
  <source src="../../assets/img/projects/sphere_marching/Blending.mp4" type="video/mp4">
</video>

We also cast rays towards the lights of the scene to determine if the object is in shadow or under the effect of one or more lights:

<video width="960" height="540" controls>
  <source src="../../assets/img/projects/sphere_marching/Illumination.mp4" type="video/mp4">
</video>

By casting more rays, we can create reflective surfaces:

<video width="960" height="540" controls>
  <source src="../../assets/img/projects/sphere_marching/Reflection.mp4" type="video/mp4">
</video>

Finally, since we are using distance functions and Sphere Marching, it is easy to create infinite patterns of objects:

<video width="960" height="540" controls>
  <source src="../../assets/img/projects/sphere_marching/Spheres.mp4" type="video/mp4">
</video>