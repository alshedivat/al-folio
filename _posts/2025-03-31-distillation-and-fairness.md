---
layout: distill
title: "Beyond Compression: How Knowledge Distillation Impacts Fairness and Bias in AI Models"
description: "A summary of our research exploring the effects of knowledge distillation on class-wise accuracy and fairness metrics in deep neural networks."
img: assets/img/publication_preview/fairness-distillation.png
tags: distillation fairness bias ml compression
date: 2025-03-31
featured: true

authors:
  - name: Aida Mohammadshahi
    url: "http://github.com/aidamohammadshahi"
    affiliations:
      name: University of Calgary
  - name: Yani Ioannou
    url: "https://yani.ai"

bibliography: 2025-03-31-distillation.bib

# Table of contents based on the blog post's structure
toc:
  - name: A Quick Look at Knowledge Distillation
  - name: The Hidden Costs - Accuracy Isn't the Whole Story
  - name: What Did the Study Find?
    subsections:
      - name: "Distillation's Uneven Hand: Not All Classes Are Treated Equally"
      - name: "The Temperature Dial: Tuning for Bias?"
      - name: "Fairness in the Spotlight: Can Distillation Help?"
      - name: Individual Fairness Also Gets a Boost
  - name: Why This Research Is Important
  - name: Looking Ahead

---

Knowledge Distillation <d-cite key="hinton2015distilling"></d-cite> is a popular technique in the world of Deep Neural Networks (DNNs). Think of it as a skilled artisan (the "teacher" model) passing down their knowledge to an apprentice (the "student" model). The goal is usually to create a smaller, faster student model that performs almost as well as the larger, more complex teacher. This is incredibly useful for deploying AI on devices with limited resources, like your smartphone.

While distillation often succeeds in maintaining overall accuracy, our recent paper, "[What's Left After Distillation? How Knowledge Transfer Impacts Fairness and Bias](https://openreview.net/forum?id=xBbj46Y2fN)" <d-cite key="mohammadshahi2025leftafterdistillation"></d-cite>, takes a deeper dive into understanding how distillation affects the decisions made by a model, through the lens of fairness and bias.
This is particularly important as AI systems are increasingly used in sensitive areas like hiring, loan applications, and medical diagnosis, where fairness is crucial.

**Does the distilled student model treat all groups and types of data the same way the teacher did, or does the process introduce new, potentially harmful, biases?**

### A Quick Look at Knowledge Distillation

In traditional training, a neural network learns by comparing its predictions to the correct answers (hard targets). For example, if it's a cat image, the "cat" label is 1 and all other animal labels are 0.

Knowledge distillation introduces a twist. The student model also learns from the teacher model's "wisdom." Instead of just knowing the correct label, the student also pays attention to *how confident* the teacher is about various incorrect labels. For instance, the teacher might be 90% sure an image is a "cat," but also think there's a 5% chance it's a "dog" and a 2% chance it's a "fox." These nuanced probabilities are called "soft targets".

A key ingredient in generating these soft targets is the **temperature (T)** hyperparameter. When T=1, the probabilities are standard. As T increases, the probability distribution becomes "softer," meaning the probabilities of incorrect classes become higher, revealing more about the teacher's generalization patterns. The student model is then trained using a combination of the true labels (classification loss) and these soft targets from the teacher (distillation loss).

### The Hidden Costs: Accuracy Isn't the Whole Story

Most research on distillation has focused on whether the student model maintains the teacher's overall accuracy. However, as the authors of this paper point out, overall accuracy can mask underlying problems. What if the student model becomes less accurate for specific subgroups of data, or if it starts making unfair decisions for certain demographic groups? This is especially critical as AI models are increasingly used in sensitive areas like loan applications, hiring, and medical diagnosis.

### What Did the Study Find?

The researchers conducted a thorough empirical study to see how distillation affects class-wise accuracy (how well it performs on individual categories) and fairness.

#### 1. Distillation's Uneven Hand: Not All Classes Are Treated Equally

Even when working with balanced datasets (where each class has a similar number of examples), the study found that distillation doesn't impact all classes uniformly. In fact, for datasets like CIFAR-100, Tiny ImageNet, and ImageNet, **as many as 41% of classes were statistically significantly affected by distillation** when comparing the accuracy of specific classes between the teacher and the distilled student, or between a distilled student and a non-distilled student model.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/distillation_fig2_a.svg" title="CIFAR-10 using T=9" class="img-fluid rounded z-depth-0"  zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/distillation_fig2_b.svg" title="SVHN using T=7" class="img-fluid rounded z-depth-0"  zoomable=true %}
    </div>
</div>
<div class="caption">
    Figure 2: Class-wise Disagreement. Disagreement between a ResNet-56 teacher and ResNet-20 (left) non-distilled/(right) distilled student for (a) CIFAR-10 using T= 9 and (b) SVHN using T= 7. The diagonals are excluded since here both models predict the same class without any disagreement.
</div>

#### 2. The Temperature Dial: Tuning for Bias?

The distillation temperature (T) plays a crucial role. The study found that:

* **Higher temperatures tend to make the distilled student's class biases align more closely with the teacher model**. In other words, the student starts to "think" more like the teacher regarding which classes it finds easier or harder.
* Conversely, at lower temperatures, the distilled student's biases are often closer to a student model trained from scratch without any teacher guidance.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/distillation_fig3.svg" title="SVHN using T=7" class="img-fluid rounded z-depth-0" %}
    </div>
</div>
<div class="caption">
    Figure 3: Temperature vs. Test Accuracy/Class Bias - Number of non-distilled vs. distilled student significantly affected classes (S.S.C.) and teacher vs. distilled student significantly affected classes (T.S.C.) by distillation in CIFAR-100 and ImageNet datasets, alongside changes in distilled student's test accuracy over various temperatures.
</div>

#### 3. Fairness in the Spotlight: Can Distillation Help?

The paper delves into algorithmic fairness, which is about ensuring that an AI model's predictions don't disproportionately harm or benefit certain groups. They used common fairness metrics like:

* **Demographic Parity Difference (DPD):** This measures if the likelihood of a positive outcome (e.g., being approved for a loan, or in the paper's examples, an image being classified as "smiling") is the same across different demographic groups (e.g., different age groups or genders).
* **Equalized Odds Difference (EOD):** This is a stricter metric. It checks if the true positive rates and false positive rates are similar across different demographic groups.

The findings here were quite interesting:

* **Increasing the distillation temperature generally *improves* the fairness of the distilled student model** according to these metrics, for datasets like CelebA, Trifeature, and HateXplain.
* In some cases, the **distilled student model can even become *fairer* than the original teacher model**, especially at higher temperatures! This suggests the distillation process, particularly with higher temperatures, might help the student pay more attention to demographic attributes and lead to more equitable outcomes.
* However, this trend doesn't continue indefinitely. At very high temperatures (e.g., T=20, 30, 40), the teacher's soft targets become too uniform and less informative, which can negatively impact both accuracy and fairness.

[Placeholder for Figure 4: Evaluation of Fairness Metrics for Distilled Students in Computer Vision (CV) - Equalized Odds Difference (EOD) and Demographic Parity Difference (DPD) for CelebA and Trifeature datasets across different temperatures, comparing distilled student, teacher, and non-distilled student models.]

[Placeholder for Figure 5: Evaluation of Fairness Metrics for Distilled Students in Natural Language Processing (NLP) - Equalized Odds Difference (EOD) and Demographic Parity Difference (DPD) for the HateXplain dataset concerning gender and race attributes across different temperatures.]

[Placeholder for Table 2: Fairness Metrics and Distillation - Performance (Test Accuracy, EOD, DPD) of teacher, Non-Distilled Student (NDS), and Distilled Student (DS) models on Trifeature and CelebA datasets with a range of temperatures.]

[Placeholder for Table 3: Fairness Metrics and Distillation for HateXplain - Performance (Test Accuracy, EOD, DPD) of Teacher, Non-Distilled Student (NDS), and Distilled Student (DS) models with varying temperatures T on the HateXplain dataset for gender and race demographic attributes.]

#### 4. Individual Fairness Also Gets a Boost

Beyond group fairness, the study also looked at **individual fairness**, which means that similar individuals should receive similar predictions. They found that higher distillation temperatures also tended to improve the individual fairness of the student model.

[Placeholder for Table 4: Individual Fairness Metrics Across Datasets - Individual fairness scores for Teacher, Non-Distilled Student (NDS), and Distilled Student (DS) models across CelebA, Trifeature, and HateXplain datasets for varying temperature values T.]

### Why This Research Is Important

This study provides crucial insights:

* **Awareness of Hidden Biases:** It highlights that model compression techniques like distillation, while useful for efficiency, can have complex and uneven impacts on how a model treats different types of data and demographic groups.
* **Temperature as a Tool:** The distillation temperature isn't just a technical detail; it can be a lever to potentially improve fairness. However, there's a trade-off to consider, as extreme temperatures can hurt overall performance and fairness.
* **Caution in Sensitive Applications:** For AI systems used in areas with significant societal impact, it's not enough to just check overall accuracy after distillation. A deeper analysis of class-wise performance and fairness is essential.

### Looking Ahead

"What's Left After Distillation?" reminds us that as we build more sophisticated AI, understanding the nuances of our techniques is paramount. While knowledge distillation is a powerful tool for creating efficient models, this research underscores the need to carefully evaluate its effects on bias and fairness to ensure AI is developed and deployed responsibly. The authors express hope that their insights will inspire further advancements in the responsible use of distillation in real-world applications.

---
# Appendix

### More Resources

{% twitter https://x.com/Aidamo27/status/1912626418867196160 %}
