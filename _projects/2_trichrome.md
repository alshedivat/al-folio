---
layout: page
title: virtual trichrome
description: synthesis of trichrome stains from H&E
img: assets/img/3.jpg
importance: 2
category: ongoing
---

![he2tri](/assets/img/vtri.gif)

### Scientific Premise:

That a set of generative adversarial networks can trained with imperfectly registered image pairs to convert H&E stains to trichrome stains.

### Motivation:

Non-alcoholic steatohepatitis (NASH) is a prevalent liver inflammation disease that affects over 16 million US adults. Patients diagnosed with NASH have no alcoholic, genetic, metabolic, or medication-based causes for hepatitis and typically experience progressive liver injury and fibrosis. NASH can lead to cirrhosis which places a significant financial toll on the healthcare system. Fibrosis progression is typically assessed via liver biopsy. Pathologists then use H&E and trichrome stains of the tissue to determine the extent of NASH. The process of staining, destaining, and restaining the same tissue regions can be time-consuming, expensive, and inaccurate.

Advances in generative adversarial networks (GANs) offer a potential solution to this issue. GANs use two neural networks to generate images. The first neural network creates an image of the target type, while the second neural network discriminates whether or not a given image is real or generated. GANs such as CycleGAN and Pix2Pix have been able to effectively convert images of similar objects into each other. An increasing number of medical studies have used GANs to synthetically stain tissue.

As a result, GANs are a promising method to synthetically generate trichrome stains of tissue from H&E stains. However, one issue with using Pix2Pix for this purpose has been the imperfect registration and artifacts in paired images. These issues inflate the L1 loss, which causes "hallucinations" in the generated images. Still, Pix2Pix and CycleGAN are promising platforms to synthetically stain tissues. We believe that a generative model that incorporates paired training images and reconstruction loss will allow it to retain the structural accuracy of Pix2Pix, while also reducing hallucinations through cycle-consistency.

### Aims/Goals:

1. To acquire whole slide images (WSI) of well-registered paired H&E and trichrome stains of liver biopsies.
2. To train a generative model that performs synthetic H&E and trichrome stains without hallucinations.
3. To validate the model against the diagnoses of pathologists.

### Approach:

**WSI:**
- Obtain 100+ liver biopsies from Dartmouth-Hitchcock Medical Center
    - Perform paired H&E and trichrome stains on adjacent slides of tissue (separated by ~5 micrometers)
- Preprocess WSI data
    - Register paired WSI with PathFlow-MixMatch algorithm
    - Inspect and discard paired images with significant registration issues (tearing, artifacts, distortion, etc)

**Synthetic stains:**
- Implement interface for reading WSI input data
- Implement code for multiple modified models
    - Modify CycleGAN to utilize information stored within paired images
    - Attach two Pix2Pix models to ensure cycle-consistency and add reconstruction loss
    - Downweight the effect of the L1 loss in Pix2Pix
    - Grayscale input/output stains
    - Add loss function based on fixed, pre-trained encoder
- Train all models on 20-40 paired WSI
    - Use crops of the WSI with dimensions of 256x256 / 512x512 (on the order of 10<sup>5</sup> training images)
- Test models on representative slides
    - Reconstruct entire WSI through synthetic stains of crops

**Validation:**
- Compare performance of modified models to naive CycleGAN/Pix2Pix performance
    - Compare results to sliding window classifier for fibrosis
- Validate synthetic stains with pathologists
    - Determine the best model through visual inspection of synthetically stained representative slides (4-5 WSI)
    - Use the best model to synthetically stain all images (100+ WSI)
    - Send these images to pathologists for staging
    - Ensure blind testing for pathologist validation

### Deliverables:

1. Dataset of 100+ well-registered pairs of H&E and trichrome WSI stains
2. Refactored PyTorch implementation of CycleGAN and Pix2Pix that can read WSI input data
3. Multiple modified CycleGAN/Pix2Pix models
4. CycleGAN/Pix2Pix model that perform synthetic stains without hallucinations
5. Validation by pathologists 
