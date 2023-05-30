---
layout: page
title: Confidence Contours
description: Data-centric uncertainty representation for medical semantic segmentation
img: assets/img/cc.png
importance: 50
category: research
---

Social Futures Lab, Allen School
---

- [Annotator Documentation](https://andre-ye.github.io/muadocs/){:target="_blank"}
- [Annotation Interface](https://mua.cs.washington.edu/){:target="_blank"}


Add original IJCAI paper + author response

Medical imaging is essential to timely and accurate medical diagnosis and prognosis. A wide number of noninvasive or minimally invasive imaging methods -- such as X-rays, Medical Resonance Imaging (MRI) scans, and Computed Tomography (CT) scans -- can capture the internal state of bodily systems along a large range of scales. Moreover, imaging techniques such as electron microscopy are also of significance to non-medical biological studies. Often, it is inefficient, time-consuming, or laborious for humans to manually identify features of interest, such as lesions, particular cell types, and other biological structures or aberrations in these scans. This is especially the case for high-resolution three-dimensional scans and features of interest which are very small in size compared to the field captured by the image(s). For this reason, there has long been interest in applying computer vision to medical imaging. Deep learning models have somewhat recently been applied to more challenging medical imaging problems which previous 'manual' computer vision approaches struggle on, including semantic segmentation. The standard objective of semantic segmentation is to associate each pixel in an input image with a class. Semantic segmentation is often used to automatically detect and 'draw'/'outline' features of interest by classifying each pixel of the image as belonging to a feature of interest or not. Such deep learning models have applications in the automated detection and precise localization of cells, lesions, tumors, and other specific biological structures.

However, often medical images are inherently ambiguous. To address contextual ambiguity, it is standard for one image to be annotated by several annotators, then compared and discussed. This high-labor process is inefficient and inconsistent. Uncertainty cannot be wholly resolved into certainty, and therefore it can also be difficult for the model to associate ambiguous images with the annotation collectively chosen by the human annotators after discussion. Establishing detailed rules also may not suffice in high-variation contexts, where rules fail to illustrate standards or protocols in novel situations. 

As such, there are many problems working with high-disagreement/ambiguous contexts:
- Annotators often disagree with each other, which leads to…
  - ...greater time spent reviewing and discussing disagreements.
  - ...a greater number of annotators or skill level needed to reconcile disagreements.
  - ...possibly uninformative or inaccurate annotations which do not reflect the complete context.
- Models trained on aggregated labels in high-disagreement contexts may develop un-robust representations and hit performance ceilings due to the inherent difficulty of modeling the average/median aggregated annotation (arbitrariness). (This assertion has strong precedent in literature around space).
- Even assuming a model can predict a standard annotation, the result may not be useful or fully accurate in a contextual sense. That is, in ambiguous contexts, the "correct answer" is not a single possibility but rather the space of possibilities.

More generally speaking - semantic segmentation tasks are an important part of computer vision, with key applications in robotics, scene interpretation, surveillance, and biology. These tasks often require human annotators to create segmentation maps identifying regions, boundaries, or bounding boxes corresponding to the original image. However, like many annotation problems, there are often nontrivial uncertainties associated with annotation that cannot be captured through vanilla annotation labels.

In response there is a large body of work which attempts to allow models to abstractly learn uncertainty from the dataset; that is, inferring uncertainty through understanding inconsistency within the concept space. That is, the redress is _model-oriented_. This tends to result in uninterpretable, complex, and domain-specific results. Why not, however, directly mark uncertainty into the image? This is easily understandable, accessible, and universal. It opens up the ways in which we can use uncertainty.

To propose a _data-oriented_ approach towards reconciling contextual ambiguity, we propose the _min/max_ annotation protocol. Each annotator begins by annotating the minimum set of pixels which they are completely sure satisfies a class; this is the _min_ hypothesis. Then, the annotator defines the _max hypothesis_ in terms of additions to the min hypothesis by lassoing in additional areas which may possibly be part of the class, but not areas which are certainly not. This forms three regions: the min hypothesis (pixels we are very confident are part of the class), the area in the max hypothesis but outside the min hypothesis (pixels which may be part of the class but for which we are not sure), and the area outside the max hypothesis (pixels we are very confident are not part of the class). Our research questions, in succint form, are as follows:

- RQ 1. Representative/informative capacity.
  - RQ 1a. Can a single annotator using the min/max procedure capture the range of disagreement of multiple annotators using the standard procedure?
  - RQ 1b. Does using the min/max procedure as opposed to the standard procedure reduce disagreement between annotations for a single image?
- RQ 2. User interaction.
  - RQ 2a. Is the min/max procedure usable to the user (relative to the standard procedure)?
	- RQ 2b. Is the min/max procedure efficient to use? More specifically, does it require minimally more labor and time to use the min/max as opposed to the standard procedure?
- RQ 3. Applicability to modeling.
  - RQ 3a. Does a deep computer vision model trained on min/max derived labels produce usable and robust predictions, compared to models trained on data annotated with the standard-procedure (and possibly to other benchmarked models)? Moreover, can we derive standard predictions from min/max-style predictions (showing min/max >> standard w.r.t information), e.g. a CV transformation on min/max yields high similarity w/ a standard prediction?
  - RQ 3b. Does a deep computer vision model trained on min/max annotated labels produce usable and robust predictions, compared to models trained on the same data annotated with the standard-procedure?

This work, therefore, has the potential to help both annotators and computer vision models to document and understand the inherent uncertainty of the world around us - whether that is in medicine, biology, self-driving cars, or beyond.

**Lab presentations**
- [Goldilocks for Images](https://andre-ye.github.io/files/sfl/Goldilocks for Images.pdf){:target="_blank"}. Given as an introduction during a lab meeting to the idea of uncertainty representation and theorizing visual uncertainty.
- [Medical Uncertainty Annotation](https://andre-ye.github.io/files/sfl/Medical Uncertainty Annotation.pdf){:target="_blank"}. Given as an update during a lab meeting to the chosen domain and demoing the application.
