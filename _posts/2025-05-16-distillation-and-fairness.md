---
layout: distill
title: "Beyond Compression: How Knowledge Distillation Impacts Fairness and Bias in AI Models"
description: "A summary of our research exploring the effects of knowledge distillation on how deep neural networks make decisions, particularly in terms of fairness and bias."
thumbnail: assets/img/publication_preview/fairness-distillation.png
tags: distillation fairness bias ml compression
date: 2025-05-16
featured: false
toc: true
related_posts: true
pretty_table: true
chart:
  echarts: false
  plotly: true

authors:
  - name: Aida Mohammadshahi
    url: "http://github.com/aidamohammadshahi"
    affiliations:
      name: University of Calgary
  - name: Yani Ioannou
    url: "https://yani.ai"

bibliography: 2025-05-16-distillation.bib

# _styles: >
#   d-article table th, d-article table td {
#     font-size: 12px;
#     padding: 2px 8px;
#     border-spacing: 5px;
#   }
# _styles: >
#     th {
#         text-align: center;
#         vertical-align: middle !important;
#     }
#     td {
#         text-align: center;
#     }
#     .table-responsive {
#         margin-top: 20px;
#     }
#     caption {
#         caption-side: top;
#         text-align: left;
#         font-weight: bold;
#         margin-bottom: 10px;
#     }
_styles: >
    .MJX-TEX,
    .MJX-TEX * {
        font-family: "Times New Roman";
    }
    
---

## TL;DR
Knowledge Distillation (KD) is a technique used to compress large AI models into smaller, more efficient versions. For example, DeepSeek R1 with 671 billion parameters <d-cite key="DeepSeek2024v3"></d-cite>, was distilled into smaller, more manageable versions that are easier to deploy in real-world applications.

While distillation often succeeds in maintaining overall accuracy, our recently accepted Transactions in Machine Learning Research (TMLR) paper, "[What's Left After Distillation? How Knowledge Transfer Impacts Fairness and Bias](https://openreview.net/forum?id=xBbj46Y2fN)" <d-cite key="Mohammadshahi2025distillation"></d-cite> explores how the distillation process affects model decisions, particularly in terms of fairness and bias. We found that:
* The distillation temperature significantly influences the biases of the student model relative to the teacher model, and a smaller student model trained from scratch.
* Higher distillation temperatures generally lead distilled models that make more fair decisions, to improved group fairness and individual fairness.
* Surprisingly, distilled models can sometimes be fairer than their larger teacher counterparts!
* This research highlights the need to consider fairness implications when using KD, especially in sensitive applications like hiring or loan approvals.

## Introduction: Knowledge Distillation

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/distillation_teachertostudent_simple.svg" title="Distillation of a smaller student from a larger teacher model." class="img-fluid rounded z-depth-0" %}
    </div>
</div>

Large models, like DeepSeek R1 with 671 billion parameters <d-cite key="DeepSeek2024v3"></d-cite>, are often distilled into smaller, more manageable versions (e.g., 1.5-70B Llama models) that are easier to deploy in real-world applications. This process, known as Knowledge Distillation (or just distillation) <d-cite key="Hinton2015distilling"></d-cite>, aims to transfer the "knowledge" from a large "teacher" model to a smaller "student" model, often preserving overall performance like test accuracy. 

While distillation often succeeds in maintaining overall accuracy, our recenly accepted Transactions in Machine Learning Researc (TMLR) paper, "[What's Left After Distillation? How Knowledge Transfer Impacts Fairness and Bias](https://openreview.net/forum?id=xBbj46Y2fN)" <d-cite key="Mohammadshahi2025distillation"></d-cite>, takes a deeper dive into understanding how distillation affects the decisions made by a model, through the lens of fairness and bias.
This is particularly important as AI systems are increasingly used in sensitive areas like hiring, loan applications, and medical diagnosis, where fairness is crucial.

**Does the distilled student model treat all groups and types of data the same way the teacher did, or does the process introduce new, potentially harmful, biases?** To grasp the implications of KD, let's first revisit some core concepts.


## Understanding Knowledge Distillation:


### Neural Networks as Function Approximators

At their heart, neural networks are powerful function approximators. They learn a function $f$ that maps an input $\mathbf{x}$ to an output $y$ (or a probability distribution $p$ over possible outputs in classification tasks),

$$ f(\mathbf{x}) = y ,$$

where $f$ is the model, $\mathbf{x}$ is the input (like an image or text), and $y$ is the output (like a label or a probability distribution). The goal of training is to minimize the difference between the model's predictions and the true labels, often using a loss function like cross-entropy.

### The Concept of "Dark Knowledge"

<div class="row align-items-center">
    <div class="col-xl mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/distillation_softtargets_catdogairplane.png" class="img-fluid rounded z-depth-0" %}
    </div>
</div>    
<div class="row align-item-center justify-content-center" markdown=1>

$$\require{colorv2} \Large f(\textcolor{red}{\mathbf{x} \textrm{: image of cat}}) = \{ \textcolor{green}{\textrm{dog: } 0.09}, \textcolor{red}{\textrm{cat: } 0.9}, \textcolor{blue}{\textrm{airplane: } 0.01}\}$$

</div>

Trained models, especially large ones, learn much more than just how to map inputs to correct labels. They capture a rich, nuanced understanding of the data's structure and relationships. For example, an ImageNet model doesn't just learn to identify a "cat"; it also implicitly learns that a cat is more similar to a "dog" than to an "airplane". In this example, the model is 90% confident the center image is of a cat, while 9% confident the image is of a dog and only 1% confident that the image is of an airplane. This richer information, beyond the direct class predictions alone, is often termed "dark knowledge" <d-cite key="Hinton2015distilling"></d-cite>.

### The Role of Temperature in Softmax
In classification, the raw outputs of a neural network (logits, $z$) are typically converted into probabilities using the softmax function. Knowledge distillation introduces a "temperature" parameter ($T$) into this softmax calculation:

$$ p_i = \frac{\exp(z_i/T)}{\sum_j \exp(z_j/T)}. $$

When $T=1$ (standard softmax), the output probabilities are often very sharp, with the correct class having a probability close to 1 and others close to 0 (a "hard" distribution). As $T$ increases, the probability distribution becomes "softer," meaning the probabilities for incorrect classes become larger, revealing more of the teacher's "dark knowledge" about class similarities. 

For example with a temperature of $T=1$, the softmax output for an input $\mathbf{x}$ might be a probability distribution over three classes (dog, cat, airplane):

$$\require{colorv2} \Large f(\textcolor{red}{\mathbf{x}}, T=1) = \{\textcolor{green}{0.09}, \textcolor{red}{0.9}, \textcolor{blue}{0.01}\},$$

while at a higher temperature of $T=10$, the output might be less confident in the its predictions:

$$\require{colorv2} \Large f(\textcolor{red}{\mathbf{x}}, T=10) = \{\textcolor{green}{0.4}, \textcolor{red}{0.5}, \textcolor{blue}{0.1}\}.$$

<!-- 
```echarts
{
  "responsive": true,
  "tooltip": {},
  "xAxis": {
    "data": ["Dog", "Cat", "Airplane"]
  },
  "yAxis": {p(x)},
  "series": [
    {
      "name": "dog",
      "type": "bar",
      "data": [0.4]
    },
    {
      "name": "cat",
      "type": "bar",
      "data": [0.5]
    },
    {
      "name": "airplane",
      "type": "bar",
      "data": [0.1]
    }
  ]
}
``` -->
<!--  
```plotly
{
  "data": [
    {
      "x": ["Dog", "Cat", "Airplane"],
      "y": [0.4, 0.5, 0.1],
      "mode": "bar"
    }
  ],
}
``` -->

### The Distillation Process

In standard training, a student model learns by minimizing a cross-entropy loss based on the "hard" target labels. In knowledge distillation <d-cite key="Hinton2015distilling"></d-cite>, the student learns from two sources:
1.  The **cross-entropy loss** with the ground truth ("hard") labels.
2.  A **distillation loss** (often Kullback-Leibler divergence) that encourages the student's "soft" predictions (obtained using a higher temperature $T$) to match the teacher's "soft" predictions (also obtained using temperature $T$).

These two losses are typically combined using a weighting hyperparameter $\alpha$:

$$ L_{KD} = \alpha L_{hard} + (1 - \alpha) L_{soft}, $$

where $L_{hard}$ is the cross-entropy loss with hard labels and $L_{soft}$ is the distillation loss with soft labels.

While in previous work the effect of $\alpha$ on fairness was studied <d-cite key="Chai2022fairness"></d-cite>, this work focuses on the effect of the distillation temperature $T$ on bias and fairness.

## Beyond Accuracy: Does the Student Learn the Same Function?
<div class="row  bg-white">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/distillation_teachertostudentfunctions.svg" title="Distillation of a smaller student from a larger teacher model can learn different functions." class="img-fluid rounded z-depth-0" %}
    </div>
</div>

While knowledge distillation often maintains the overall generalization performance (test accuracy) of the teacher model <d-cite key="Hinton2015distilling"></d-cite>, a crucial question arises: Does this mean the student model has learned approximately the *same function* as the teacher?.

The answer is: not necessarily. Accuracy is an aggregate measure over many samples. It's possible for the student ($g(\mathbf{x})$) to learn a different function than the teacher ($f(\mathbf{x})$) while still achieving similar overall accuracy.

This divergence matters because if the student learns a different function, it may also learn different **algorithmic biases** than the teacher, even if the original teacher model was carefully analyzed for fairness. 

## Research Deep Dive: Unpacking the Impact of Distillation

This concern prompted the research questions behind our work <d-cite key="Mohammadshahi2025distillation"></d-cite>:

### Research Questions
1.  Which specific classes are significantly affected by the distillation process in terms of their accuracy?
2.  How does varying the distillation temperature ($T$) impact the class-level biases of the student model?
3.  What is the effect of distillation temperature on **group fairness** (ensuring equitable outcomes across different demographic groups)?
4.  How does distillation temperature influence **individual fairness** (ensuring similar individuals receive similar predictions)?

### Analyzing Class-wise Bias

<div class="row align-items-center justify-content-center text-center bg-white">
    <div class="col-lg mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/distillation_distilledvsnondistilledstudent.svg"  title="Student vs. Non-Distilled Student" class="img-fluid rounded z-depth-0" %}
        <div class="caption">Figure: In order to better understand the effect of Knowledge Distillation, and to control effects on bias/fairness of model size, we compared a Distilled Student (DS) to a Non-Distilled Student (NDS), i.e. a student trained with distillation from a teacher compared to a student model trained from random initialization with the same dataset.</div>
    </div>
</div>

To understand which classes are affected, we can compared model predictions across a dataset. They defined disagreement between two models, $f$ and $g$, for an input $\mathbf{x}_n$ using a comparison metric (CMP) similar to approaches in works like <d-cite key="Fort2019deepensembles"></d-cite>:

$$ CMP(f(\mathbf{x}_n), g(\mathbf{x}_n)) = \begin{cases} 0 & \text{if } f(\mathbf{x}_n) = g(\mathbf{x}_n) \\ 1 & \text{if } f(\mathbf{x}_n) \neq g(\mathbf{x}_n) \end{cases} $$

This disagreement was analyzed on a per-class basis, comparing the (teacher vs. distilled student) and (non-distilled student vs. distilled student). A non-distilled student (trained from scratch on hard labels) served as a baseline.

### Probing Group Fairness

<div class="container align-items-center justify-content-center text-center bg-white">
    <div class="row">
        <div class="col-lg mt-3 mt-md-0">
            {% include figure.liquid loading="eager" path="assets/img/distillation_demographicparity.svg"  title="Demographic Parity" class="img-fluid rounded z-depth-0" %}
            <div class="caption">Demographic Partity</div>
        </div>
        <div class="col-lg mt-3 mt-md-0">
            {% include figure.liquid loading="eager" path="assets/img/distillation_equalizedodds.svg" title="Equalized Odds" class="img-fluid rounded z-depth-0" %}
            <div class="caption">Equalized Odds</div>
        </div>
    </div>
    <div class="row text-center justify-content-center">
        <div class="caption">Figure: Group fairness metrics used in our analysis.</div>
    </div>
</div>

A more direct concern is when changes in model behavior lead to unfair outcomes for different demographic groups. The research <d-cite key="Mohammadshahi2025distillation"></d-cite> investigated two standard group fairness notions:

* **Demographic Parity:** Aims for the probability of a positive outcome ($Y=1$) to be the same across different sensitive groups $A=a$ and $A=b$ (e.g., men vs. women being hired).
  
    $$ P(\hat{Y}=1 | A=a) = P(\hat{Y}=1 | A=b) $$
  
    This is often measured by the **Demographic Parity Difference (DPD)**, where DPD=0 indicates perfect fairness under this definition.
    
    $$ DPD = \max_{a \in A} P(\hat{Y}=1 | A=a) - \min_{a \in A} P(\hat{Y}=1 | A=a) $$

* **Equalized Odds** <d-cite key="Hardt2016equality"></d-cite>: Aims for the true positive rate and false positive rate to be similar across different groups, given the true label $Y=y$ (e.g., qualified men and qualified women having equal hiring rates).
    
    $$ P(\hat{Y}=1 | Y=y, A=a) = P(\hat{Y}=1 | Y=y, A=b) $$
  
    This is measured by the **Equalized Odds Difference (EOD)**, where EOD=0 is ideal.

These metrics were evaluated on datasets with known demographic attributes:
* **CelebA** <d-cite key="Liu2015celeba"></d-cite>: Celebrity faces with attributes like gender and age, used for tasks like "smiling" prediction.
* **Trifeature** <d-cite key="Hermann2020shapes"></d-cite>: A synthetic dataset with controlled shapes, textures, and colors, used to isolate the effect of feature difficulty.
* **HateXplain** <d-cite key="Mathew2021hatexplain"></d-cite>: A dataset for hate speech detection, with annotations for targeted communities.

### Investigating Individual Fairness

Beyond group-level fairness, our study <d-cite key="Mohammadshahi2025distillation"></d-cite> also examined **individual fairness**: the principle that similar individuals should receive similar outcomes. This was quantified using a metric based on the Lipschitz condition proposed by Dwork et al. <d-cite key="Dwork2012fairness"></d-cite>, where smaller values indicate better individual fairness:

$$ \mathcal{I}(f) = \mathbb{E}_{(\mathbf{x},\mathbf{x}') \sim P} \left[ \frac{|f(\mathbf{x}) - f(\mathbf{x}')|}{d(\mathbf{x},\mathbf{x}')} \right] . $$

Intuitively this metric captures whether a model provides consistent predictions for semantically similar inputs.


## Key Findings and Insights

Our research <d-cite key="Mohammadshahi2025distillation"></d-cite> yielded several important findings regarding the interplay of knowledge distillation, temperature, and fairness. 


### Class-wise Bias: An Uneven Impact

<div class="container text-center align-items-center justify-content-center mx-auto" markdown=1>
<div class="caption">
Table: Class-wise Bias and Distillation. The number of statistically significantly affected classes comparing the class-wise accuracy of *teacher vs. Distilled Student (DS) models*, denoted #TC, and *Non-Distilled Student (NDS) vs. distilled student models*, denoted #SC for the ImageNet dataset.
</div>

| Model   | Temp | ResNet50/ResNet18 ||| ViT-Base/TinyViT |||
| |  | Test Top-1 Acc. (%) | #SC | #TC | Test Top-1 Acc. (%) | #SC | #TC |
| :------ | :--- | :-----------------------------------: | :-------------------: | :-------------------: | :-----------------------------------: | :--------------------: | :--------------------: |
| Teacher | -    | 76.1 &plusmn; 0.13                    | -                     | -                     | 81.02 &plusmn; 0.07                   | -                      | -                      |
| NDS     | -    | 68.64 &plusmn; 0.21                   | -                     | -                     | 78.68 &plusmn; 0.19                   | -                      | -                      |
| DS      | 2    | 68.93 &plusmn; 0.23                   | 77                    | 314                   | 78.79 &plusmn; 0.21                   | 83                     | 397                    |
| DS      | 3    | 69.12 &plusmn; 0.18                   | 113                   | 265                   | 78.94 &plusmn; 0.14                   | 137                    | 318                    |
| DS      | 4    | 69.57 &plusmn; 0.26                   | 169                   | 237                   | 79.12 &plusmn; 0.23                   | 186                    | 253                    |
| DS      | 5    | 69.85 &plusmn; 0.19                   | 190                   | 218                   | 79.51 &plusmn; 0.17                   | 215                    | 206                    |
| DS      | 6    | 69.71 &plusmn; 0.13                   | 212                   | 193                   | 80.03 &plusmn; 0.19                   | 268                    | 184                    |
| DS      | 7    | 70.05 &plusmn; 0.18                   | 295                   | 174                   | 79.62 &plusmn; 0.23                   | 329                    | 161                    |
| DS      | 8    | 70.28 &plusmn; 0.27                   | 346                   | 138                   | 79.93 &plusmn; 0.12                   | 365                    | 127                    |
| DS      | 9    | 70.52 &plusmn; 0.09                   | 371                   | 101                   | 80.16 &plusmn; 0.17                   | 397                    | 96                     |
| DS      | 10   | 70.83 &plusmn; 0.15                   | 408                   | 86                    | 79.98 &plusmn; 0.12                   | 426                    | 78                     |

</div>

<div class="container">
    <div class="row">
        <div class="col-md mt-3 mt-md-0">
            {% include figure.liquid loading="eager" path="assets/img/distillation_fig2_a.svg" title="CIFAR-10 using T=9" class="img-fluid rounded z-depth-0"  zoomable=true %}
        </div>
        <div class="col-md mt-3 mt-md-0">
            {% include figure.liquid loading="eager" path="assets/img/distillation_fig2_b.svg" title="SVHN using T=7" class="img-fluid rounded z-depth-0"  zoomable=true %}
        </div>
    </div>
    <div class="caption">
        Figure: Class-wise Disagreement. Disagreement between a ResNet-56 teacher and ResNet-20 (left) non-distilled/(right) distilled student for (a) CIFAR-10 using T= 9 and (b) SVHN using T= 7. The diagonals are excluded since here both models predict the same class without any disagreement.
    </div>
</div>

Class-wise bias experiments were conducted across various datasets (CIFAR-10/100, SVHN, Tiny ImageNet, ImageNet) and model architectures (ResNets, ViTs) <d-cite key="Mohammadshahi2025distillation"></d-cite>. In order to understand the effect of distillation on a student model, we compared the distilled student model to both the teacher model and a non-distilled student model (trained from scratch on hard labels).

Distillation does not affect all classes uniformly; a significant percentage of classes can experience changes in accuracy. The distillation temperature $T$ influences which model (teacher or non-distilled student) the distilled student's biases more closely resemble. Higher temperatures tend to align the student more with the teacher's class-specific performance patterns <d-cite key="Mohammadshahi2025distillation"></d-cite>.

Our study <d-cite key="Mohammadshahi2025distillation"></d-cite> found that a change in class bias by itself isn't inherently good or bad; its implications depend on the application context, leading to the analysis of the impact on decisions, i.e., group and individual fairness.

### Group Fairness: Temperature Matters

<div class="container">
    <div class="row">
        <div class="col-xl mt-3 mt-md-0">
            {% include figure.liquid loading="eager" path="assets/img/distillation_fairness_celeba_gender.svg"  class="img-fluid rounded z-depth-0" %}
        </div>
    </div>
    <div class="row">
        <div class="col-xl mt-3 mt-md-0">
            {% include figure.liquid loading="eager" path="assets/img/distillation_fairness_celeba_race.svg"  class="img-fluid rounded z-depth-0" %}
        </div>
    </div>
    <div class="row">
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.liquid loading="eager" path="assets/img/distillation_fairness_legend.svg" class="img-fluid rounded z-depth-0" %}
        </div>
    </div>
    <div class="caption">
        Figure: Combined graphs showing EOD/DPD decreasing with increasing temperature for CelebA image dataset. 
    </div>
</div>

<div class="container">
    <div class="row">
        <div class="col-xl mt-3 mt-md-0">
            {% include figure.liquid loading="eager" path="assets/img/distillation_fairness_hatexplain.svg" class="img-fluid rounded z-depth-0" %}
        </div>
    </div>
    <div class="row">
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.liquid loading="eager" path="assets/img/distillation_fairness_legend.svg" class="img-fluid rounded z-depth-0" %}
        </div>
    </div>
    <div class="caption">
        Figure: Combined graphs showing EOD/DPD decreasing with increasing temperature for the HateXplain language dataset. 
    </div>
</div>

Across all three datasets (CelebA, Trifeature, HateXplain) and for both computer vision and NLP tasks, a consistent trend emerged <d-cite key="Mohammadshahi2025distillation"></d-cite>:
* **Increasing the distillation temperature ($T$) generally leads to improved group fairness** in the student model, as measured by lower DPD and EOD values.
* Remarkably, in some instances, the **distilled student model (especially at higher temperatures) can become fairer than the original, larger teacher model**.

#### Very High Temperatures

<div class="container">
    <div class="row">
        <div class="col-xl mt-3 mt-md-0">
            {% include figure.liquid loading="eager" path="assets/img/distillation_fairness_hatexplain_all.svg" class="img-fluid rounded z-depth-0" %}
        </div>
    </div>
    <div class="row">
        <div class="col-sm mt-3 mt-md-0">
            {% include figure.liquid loading="eager" path="assets/img/distillation_fairness_legend.svg" class="img-fluid rounded z-depth-0" %}
        </div>
    </div>
    <div class="caption">
        Figure: Combined/representative graphs showing EOD/DPD decreasing with very high temperatures for HateXplain. 
    </div>
</div>

Of course at higher levels of temperature, the model's predictions become more uniform, which can lead to a loss of accuracy. Our study found that while distillation a moderately high temperature (e.g., $T=10$) can lead to improved fairness, very high temperatures (e.g. $T>10$) can lead to a significant drop in accuracy and fairness.

### Individual Fairness: Consistency Improves
Similar to group fairness, our study <d-cite key="Mohammadshahi2025distillation"></d-cite> found a **clear improvement in individual fairness with increased distillation temperature** across the tested datasets. This suggests that higher temperatures not only help in equitable group outcomes but also in making the model's predictions more consistent for similar inputs.

<div class="container text-center align-items-center justify-content-center mx-auto" markdown=1>
<div class="caption">
Table: Individual Fairness Metrics Across Datasets. Individual fairness scores for teacher, Non-Distilled Student (NDS), and Distilled Student (DS) models across CelebA, Trifeature, and HateXplain datasets. For DS models, scores are reported for varying temperature values $T$.
</div>

| Model   | Temp | CelebA (ResNet-50 / ResNet-18) | Trifeature (ResNet-20 / LeNet-5) | HateXplain (Bert-Base / DistilBERT) |
| :------ | :--- | :-------------------------------------------------------: | :--------------------------------------------------------: | :----------------------------------------------------------: |
| Teacher | --   |                          0.0407                           |                          0.016                           |                           0.0320                           |
| NDS     | --   |                          0.1240                            |                          0.0462                          |                           0.1078                           |
| DS      | 1    |                          0.1130                            |                          0.0422                          |                           0.0994                           |
| DS      | 2    |                          0.1040                            |                          0.0407                          |                           0.0985                           |
| DS      | 3    |                          0.0908                           |                          0.0393                          |                           0.0927                           |
| DS      | 4    |                          0.0906                           |                          0.0387                          |                           0.0882                           |
| DS      | 5    |                          0.0886                           |                          0.0384                          |                           0.0823                           |
| DS      | 6    |                          0.0799                           |                          0.0377                          |                           0.0768                           |
| DS      | 7    |                          0.0753                           |                          0.0356                          |                           0.0727                           |
| DS      | 8    |                          0.0712                           |                          0.0349                          |                           0.0689                           |
| DS      | 9    |                          0.0701                           |                          0.0341                          |                           0.0681                           |
| DS      | 10   |                          0.0697                           |                          0.0338                          |                           0.0654                           |

</div>

## Conclusion: Distillation, A Double-Edged Sword?

Knowledge distillation is a pervasive technique, likely affecting decisions made by models we interact with daily. This research <d-cite key="Mohammadshahi2025distillation"></d-cite> highlights that while KD is valuable for model compression, its effects are more nuanced than simply preserving accuracy.
* Distillation temperature significantly influences model bias and fairness across various models, datasets, and even modalities (vision and language).
* Higher distillation temperatures tend to produce fairer student models, sometimes even surpassing the teacher in fairness metrics.

This is a critical finding, as the effect of distillation temperature on fairness had not been extensively studied before <d-cite key="Mohammadshahi2025distillation"></d-cite>.

## Future Directions

These findings <d-cite key="Mohammadshahi2025distillation"></d-cite> open up several avenues for future investigation:
* Can knowledge distillation, particularly with careful tuning of temperature, be actively used as a method to *improve* model fairness?
* What are the trade-offs involved when using higher distillation temperatures, which are less common in current practice focused primarily on accuracy? Does it affect other aspects like robustness or calibration?
* How do these fairness dynamics play out in the context of even larger models, such as modern Large Language Models (LLMs) like DeepSeek <d-cite key="DeepSeek2024v3"></d-cite>?

Understanding these aspects will be crucial for the responsible development and deployment of distilled AI models.

{% twitter https://x.com/Aidamo27/status/1912626418867196160 %}

