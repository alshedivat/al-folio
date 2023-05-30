---
layout: page
title: Foot Process Width Segmentation
description: lorem ipsum
img: assets/img/podocyte.png
importance: 99
category: research
---

# Improved Foot Process Width Segmentation in Podocytes

Najafian Lab, UW Medicine
{: .fs-6 .fw-300 }

---

In this project, I worked on developing a specialized computer vision system to solve specific technical challenges in kidney pathology. Previous clinical work by other members of the lab demonstrates that the average distance between adjacent 'slits' on the membrane of foot processes in the glomerulus are strong predictive signals for Fabry disease. Obtaining this signal provides helpful information for patient diagnosis and prognosis. Computer vision methods are needed to automatically detect these slits on electron microscopy cross-sections. However, these slits are very small proportional to the complete mask size; therefore optimization is a difficult problem due to severe class imbalance. We propose two techniques - windowing and dynamic dilation - which significantly improve segmentation performance. These two methods are summarized below:

- **Windowing.** Given that slits are located along the membrane, a model can be trained first to segment the membrane; afterwards, a second model can be trained to segment on localized windows along the membrane. This both reduces class imbalance severity and excises redundant context.
- **Dynamic dilation.** A curriculum-learning approach is used to guide the segmentation model towards predicting precise slits: the masks are initially heavily dilated and blurred; then, gradually un-dilated and un-blurred over time. Dilating and blurring the masks diffuses the presence of slits and increases the strength of the learning signal.

**Abstract for "A novel approach to segment specialized annotations in electron microscopy images of podocyte cells."**: 

> Podocyte cells reside in the glomerulus of the kidney and aid in urine filtration. Images of podocytes can be obtained through electron microscopy; certain cell features visually indicated on these images can be used to quantify the extent to which the podocyte filtering function has been impaired. Certain morphological features, such as foot process width, have been shown to correlate with disease progression. The current gold standard for measuring morphological features involves human measurements with traditional imaging software, which takes 6-8 hours per biopsy. Deep convolutional neural networks can be used to significantly decrease the time and labor required to obtain this quantification by identifying cell features in electron microscopy images, as has been demonstrated in many other bioimaging problems. However, when annotations are locality-specific and small, standard convolutional neural network approaches yield mediocre results. We present a novel approach for the segmentation of locality-specific annotations in cellular images and demonstrate its superior performance in identifying cell features on podocyte images. Firstly, we show that the problem of modeling small annotations consistently in proximity to a cross-image cell feature, like a membrane, can be simplified into a two-step modeling process: one model segments the cross-image cell feature, and dependent model segments on smaller windows along the predicted feature segmentation. Secondly, we show that dynamically dilating the size of small annotations from an inflated representation down to its original size over the duration of training improves model generalization. These findings allow for more robust modeling of locality-specific small cell segmentation tasks beyond podocyte cell feature identification.

The manuscript for this work is in a deccelerated phase. I left the lab before the manuscript [will be] / [has been] completed.

<!-- - [Initial progress report](https://andre-ye.github.io/files/najafian/Custom_Distance_Loss_Report.pdf) from June 2021 -->
See [Undergraduate Research Symposium slides](https://andre-ye.github.io/files/najafian/URP%20Presentation.pdf){:target="_blank"} from May 2022, where this work was demonstrated in an oral presentation.

<iframe src="https://andre-ye.github.io/files/najafian/URP%20Presentation.pdf" width="100%" height="400" style="border:1px solid black;"></iframe>