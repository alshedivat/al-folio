---
layout: page
title: Diffusion Model
description: Toward Better Feature Preserving in Text-to-Image Synthesis Based on DreamBooth
img: assets/img/DreamBooth/preview.png
importance: 1
category: course
---

__Collaborators: @Kaiwen Hu, @Yinzhou Wang__

We investigated the problem of personalized text-to-image synthesis in this project. The personalized text-to-image synthesis takes in several captured images of an instance and generate novel renditions of them in different contexts while maintaining their key features and achieving high fidelity. For example, the user could take 4 photos of a particular dog, and feed the photos to the synthesis model for training. Then the model would generate images of the dog swimming in a pool if the user inputs the text “a $$[v]$$ dog swimming in a pool”. Here, the “$$[v]$$” is an unique identifier either obtained from training process or defined by the user, which functions to keep the characteristics (features) of the input dog.

Based on a cool work in this domain named DreamBooth, we incorporated a variational autoencoder (VAE) to mitigate a critical limitation---DreamBooth may change some the appearance/features of the input object due to the prompted context, in order to generate images with higher fidelity.

For more details, please check out the project report below

<a href="{{ assets/pdf/ESE546_report.pdf | prepend: '/assets/pdf/ESE546_report.pdf' | relative_url }}" class="btn btn-sm z-depth-0" role="button">PDF</a>
