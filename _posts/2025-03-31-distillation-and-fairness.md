---
layout: distill
title: "Beyond Compression: How Knowledge Distillation Impacts Fairness and Bias in AI Models"
description: "A summary of our research exploring the effects of knowledge distillation on class-wise accuracy and fairness metrics in deep neural networks."
thumbnail: assets/img/publication_preview/fairness-distillation.png
tags: distillation fairness bias ml compression
date: 2025-03-31
featured: false
toc: true
related_posts: true
pretty_table: true

authors:
  - name: Aida Mohammadshahi
    url: "http://github.com/aidamohammadshahi"
    affiliations:
      name: University of Calgary
  - name: Yani Ioannou
    url: "https://yani.ai"

bibliography: 2025-03-31-distillation.bib

# _styles: >
#   d-article table th, d-article table td {
#     font-size: 12px;
#     padding: 2px 8px;
#     border-spacing: 5px;
#   }
_styles: >
    th {
        text-align: center;
        vertical-align: middle !important;
    }
    td {
        text-align: center;
    }
    .table-responsive {
        margin-top: 20px;
    }
    caption {
        caption-side: top;
        text-align: left;
        font-weight: bold;
        margin-bottom: 10px;
    }


---

Knowledge Distillation <d-cite key="Hinton2015distilling"></d-cite> is a popular technique in the world of Deep Neural Networks (DNNs). Think of it as a skilled artisan (the "teacher" model) passing down their knowledge to an apprentice (the "student" model). The goal is usually to create a smaller, faster student model that performs almost as well as the larger, more complex teacher. This is incredibly useful for deploying AI on devices with limited resources, like your smartphone.

While distillation often succeeds in maintaining overall accuracy, our recent paper, "[What's Left After Distillation? How Knowledge Transfer Impacts Fairness and Bias](https://openreview.net/forum?id=xBbj46Y2fN)" <d-cite key="Mohammadshahi2025distillation"></d-cite>, takes a deeper dive into understanding how distillation affects the decisions made by a model, through the lens of fairness and bias.
This is particularly important as AI systems are increasingly used in sensitive areas like hiring, loan applications, and medical diagnosis, where fairness is crucial.

**Does the distilled student model treat all groups and types of data the same way the teacher did, or does the process introduce new, potentially harmful, biases?**

{% twitter https://x.com/Aidamo27/status/1912626418867196160 %}


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

<div class="caption">
Table 1: Class-wise Bias and Distillation. The number of statistically significantly affected classes comparing the class-wise accuracy of *teacher vs. Distilled Student (DS) models*, denoted #TC, and *Non-Distilled Student (NDS) vs. distilled student models*, denoted #SC.
</div>
<!-- 
| Model   | Temp | CIFAR-100 ResNet56/ResNet20  ||| CIFAR-100 DenseNet169/DenseNet121 ||| ImageNet ResNet50/ResNet18 ||| ImageNet ViT-Base/TinyViT |||
| | | Test Acc. (%) | #SC | #TC | Test Acc. (%) | #SC | #TC | Test Top-1 Acc. (%) | #SC | #TC | Test Top-1 Acc. (%) | #SC | #TC |
| :----- | :-- | :-----: | :-----: | :-----: | :-----: |  :-----: | :-----: |  :-----:  |  :-----:  |  :-----:  |  :-----:  |  :-----:  |  :-----:  |
| Teacher | -    | 70.87 &plusmn; 0.21                       | -                               | -                               | 72.43 &plusmn; 0.15                               | -                                   | -                                   | 76.1 &plusmn; 0.13                             | -                            | -                            | 81.02 &plusmn; 0.07                            | -                           | -                           |
| NDS     | -    | 68.39 &plusmn; 0.17                       | -                               | -                               | 70.17 &plusmn; 0.16                               | -                                   | -                                   | 68.64 &plusmn; 0.21                            | -                            | -                            | 78.68 &plusmn; 0.19                            | -                           | -                           |
| DS      | 2    | 68.63 &plusmn; 0.24                       | 5                               | 15                              | 70.93 &plusmn; 0.21                               | 4                                   | 12                                  | 68.93 &plusmn; 0.23                            | 77                           | 314                          | 78.79 &plusmn; 0.21                            | 83                          | 397                         |
| DS      | 3    | 68.92 &plusmn; 0.21                       | 7                               | 12                              | 71.08 &plusmn; 0.17                               | 4                                   | 11                                  | 69.12 &plusmn; 0.18                            | 113                          | 265                          | 78.94 &plusmn; 0.14                            | 137                         | 318                         |
| DS      | 4    | 69.18 &plusmn; 0.19                       | 8                               | 9                               | 71.16 &plusmn; 0.23                               | 5                                   | 9                                   | 69.57 &plusmn; 0.26                            | 169                          | 237                          | 79.12 &plusmn; 0.23                            | 186                         | 253                         |
| DS      | 5    | 69.77 &plusmn; 0.22                       | 9                               | 8                               | 71.42 &plusmn; 0.18                               | 8                                   | 9                                   | 69.85 &plusmn; 0.19                            | 190                          | 218                          | 79.51 &plusmn; 0.17                            | 215                         | 206                         |
| DS      | 6    | 69.81 &plusmn; 0.15                       | 9                               | 8                               | 71.39 &plusmn; 0.22                               | 8                                   | 8                                   | 69.71 &plusmn; 0.13                            | 212                          | 193                          | 80.03 &plusmn; 0.19                            | 268                         | 184                         |
| DS      | 7    | 69.38 &plusmn; 0.18                       | 10                              | 6                               | 71.34 &plusmn; 0.16                               | 9                                   | 7                                   | 70.05 &plusmn; 0.18                            | 295                          | 174                          | 79.62 &plusmn; 0.23                            | 329                         | 161                         |
| DS      | 8    | 69.12 &plusmn; 0.21                       | 13                              | 6                               | 71.29 &plusmn; 0.13                               | 11                                  | 7                                   | 70.28 &plusmn; 0.27                            | 346                          | 138                          | 79.93 &plusmn; 0.12                            | 365                         | 127                         |
| DS      | 9    | 69.35 &plusmn; 0.27                       | 18                              | 9                               | 71.51 &plusmn; 0.23                               | 12                                  | 9                                   | 70.52 &plusmn; 0.09                            | 371                          | 101                          | 80.16 &plusmn; 0.17                            | 397                         | 96                          |
| DS      | 10   | 69.24 &plusmn; 0.19                       | 22                              | 11                              | 71.16 &plusmn; 0.21                               | 14                                  | 10                                  | 70.83 &plusmn; 0.15                            | 408                          | 86                           | 79.98 &plusmn; 0.12                            | 426                         | 78                          |
 -->
<!-- 
<div class="caption">
Table 1: Class-wise Bias and Distillation. The number of statistically significantly affected classes comparing the class-wise accuracy of *teacher vs. Distilled Student (DS) models*, denoted #TC, and *Non-Distilled Student (NDS) vs. distilled student models*, denoted #SC for the CIFAR-100 dataset.
</div>

| Model   | Temp | ResNet56/ResNet20 ||| DenseNet169/DenseNet121 |||
|  | | Test Acc. (%) | #SC | #TC | Test Acc. (%) | #SC | #TC |
| :------ | :--- | :-----------------------------: | :-------------------: | :-------------------: | :-------------------------------------: | :-------------------------: | :-------------------------: |
| Teacher | -    | 70.87 &plusmn; 0.21             | -                     | -                     | 72.43 &plusmn; 0.15                       | -                           | -                           |
| NDS     | -    | 68.39 &plusmn; 0.17             | -                     | -                     | 70.17 &plusmn; 0.16                       | -                           | -                           |
| DS      | 2    | 68.63 &plusmn; 0.24             | 5                     | 15                    | 70.93 &plusmn; 0.21                       | 4                           | 12                          |
| DS      | 3    | 68.92 &plusmn; 0.21             | 7                     | 12                    | 71.08 &plusmn; 0.17                       | 4                           | 11                          |
| DS      | 4    | 69.18 &plusmn; 0.19             | 8                     | 9                     | 71.16 &plusmn; 0.23                       | 5                           | 9                           |
| DS      | 5    | 69.77 &plusmn; 0.22             | 9                     | 8                     | 71.42 &plusmn; 0.18                       | 8                           | 9                           |
| DS      | 6    | 69.81 &plusmn; 0.15             | 9                     | 8                     | 71.39 &plusmn; 0.22                       | 8                           | 8                           |
| DS      | 7    | 69.38 &plusmn; 0.18             | 10                    | 6                     | 71.34 &plusmn; 0.16                       | 9                           | 7                           |
| DS      | 8    | 69.12 &plusmn; 0.21             | 13                    | 6                     | 71.29 &plusmn; 0.13                       | 11                          | 7                           |
| DS      | 9    | 69.35 &plusmn; 0.27             | 18                    | 9                     | 71.51 &plusmn; 0.23                       | 12                          | 9                           |
| DS      | 10   | 69.24 &plusmn; 0.19             | 22                    | 11                    | 71.16 &plusmn; 0.21                       | 14                          | 10                          | -->

<div class="caption">
Table 1: Class-wise Bias and Distillation. The number of statistically significantly affected classes comparing the class-wise accuracy of *teacher vs. Distilled Student (DS) models*, denoted #TC, and *Non-Distilled Student (NDS) vs. distilled student models*, denoted #SC for the ImageNet dataset.
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

<!-- 
<div class="container-fluid">

    <p class="main-caption">Class-wise Bias and Distillation</p>
    <p>The number of statistically significantly affected classes comparing the class-wise accuracy of <em>teacher vs. Distilled Student (DS) models</em>, denoted #TC, and <em>Non-Distilled Student (NDS) vs. distilled student models</em>, denoted #SC.</p>

    <h4>CIFAR-100 Results</h4>
    <div class="table-responsive">
        <table class="table table-striped table-bordered table-hover">
            <thead class="thead-dark">
                <tr>
                    <th rowspan="2">Model</th>
                    <th rowspan="2">Temp</th>
                    <th colspan="3">ResNet56/ResNet20</th>
                    <th colspan="3">DenseNet169/DenseNet121</th>
                </tr>
                <tr>
                    <th>Test Acc. (%)</th>
                    <th>#SC</th>
                    <th>#TC</th>
                    <th>Test Acc. (%)</th>
                    <th>#SC</th>
                    <th>#TC</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Teacher</td>
                    <td>-</td>
                    <td>70.87 &plusmn; 0.21</td>
                    <td>-</td>
                    <td>-</td>
                    <td>72.43 &plusmn; 0.15</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>NDS</td>
                    <td>-</td>
                    <td>68.39 &plusmn; 0.17</td>
                    <td>-</td>
                    <td>-</td>
                    <td>70.17 &plusmn; 0.16</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>2</td>
                    <td>68.63 &plusmn; 0.24</td>
                    <td>5</td>
                    <td>15</td>
                    <td>70.93 &plusmn; 0.21</td>
                    <td>4</td>
                    <td>12</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>3</td>
                    <td>68.92 &plusmn; 0.21</td>
                    <td>7</td>
                    <td>12</td>
                    <td>71.08 &plusmn; 0.17</td>
                    <td>4</td>
                    <td>11</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>4</td>
                    <td>69.18 &plusmn; 0.19</td>
                    <td>8</td>
                    <td>9</td>
                    <td>71.16 &plusmn; 0.23</td>
                    <td>5</td>
                    <td>9</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>5</td>
                    <td>69.77 &plusmn; 0.22</td>
                    <td>9</td>
                    <td>8</td>
                    <td>71.42 &plusmn; 0.18</td>
                    <td>8</td>
                    <td>9</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>6</td>
                    <td>69.81 &plusmn; 0.15</td>
                    <td>9</td>
                    <td>8</td>
                    <td>71.39 &plusmn; 0.22</td>
                    <td>8</td>
                    <td>8</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>7</td>
                    <td>69.38 &plusmn; 0.18</td>
                    <td>10</td>
                    <td>6</td>
                    <td>71.34 &plusmn; 0.16</td>
                    <td>9</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>8</td>
                    <td>69.12 &plusmn; 0.21</td>
                    <td>13</td>
                    <td>6</td>
                    <td>71.29 &plusmn; 0.13</td>
                    <td>11</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>9</td>
                    <td>69.35 &plusmn; 0.27</td>
                    <td>18</td>
                    <td>9</td>
                    <td>71.51 &plusmn; 0.23</td>
                    <td>12</td>
                    <td>9</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>10</td>
                    <td>69.24 &plusmn; 0.19</td>
                    <td>22</td>
                    <td>11</td>
                    <td>71.16 &plusmn; 0.21</td>
                    <td>14</td>
                    <td>10</td>
                </tr>
            </tbody>
        </table>
    </div>

    <h4>ImageNet Results</h4>
    <div class="table-responsive">
        <table class="table table-striped table-bordered table-hover">
            <thead class="thead-dark">
                <tr>
                    <th rowspan="2">Model</th>
                    <th rowspan="2">Temp</th>
                    <th colspan="3">ResNet50/ResNet18</th>
                    <th colspan="3">ViT-Base/TinyViT</th>
                </tr>
                <tr>
                    <th>Test Top-1 Acc. (%)</th>
                    <th>#SC</th>
                    <th>#TC</th>
                    <th>Test Top-1 Acc. (%)</th>
                    <th>#SC</th>
                    <th>#TC</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Teacher</td>
                    <td>-</td>
                    <td>76.1 &plusmn; 0.13</td>
                    <td>-</td>
                    <td>-</td>
                    <td>81.02 &plusmn; 0.07</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>NDS</td>
                    <td>-</td>
                    <td>68.64 &plusmn; 0.21</td>
                    <td>-</td>
                    <td>-</td>
                    <td>78.68 &plusmn; 0.19</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>2</td>
                    <td>68.93 &plusmn; 0.23</td>
                    <td>77</td>
                    <td>314</td>
                    <td>78.79 &plusmn; 0.21</td>
                    <td>83</td>
                    <td>397</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>3</td>
                    <td>69.12 &plusmn; 0.18</td>
                    <td>113</td>
                    <td>265</td>
                    <td>78.94 &plusmn; 0.14</td>
                    <td>137</td>
                    <td>318</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>4</td>
                    <td>69.57 &plusmn; 0.26</td>
                    <td>169</td>
                    <td>237</td>
                    <td>79.12 &plusmn; 0.23</td>
                    <td>186</td>
                    <td>253</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>5</td>
                    <td>69.85 &plusmn; 0.19</td>
                    <td>190</td>
                    <td>218</td>
                    <td>79.51 &plusmn; 0.17</td>
                    <td>215</td>
                    <td>206</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>6</td>
                    <td>69.71 &plusmn; 0.13</td>
                    <td>212</td>
                    <td>193</td>
                    <td>80.03 &plusmn; 0.19</td>
                    <td>268</td>
                    <td>184</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>7</td>
                    <td>70.05 &plusmn; 0.18</td>
                    <td>295</td>
                    <td>174</td>
                    <td>79.62 &plusmn; 0.23</td>
                    <td>329</td>
                    <td>161</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>8</td>
                    <td>70.28 &plusmn; 0.27</td>
                    <td>346</td>
                    <td>138</td>
                    <td>79.93 &plusmn; 0.12</td>
                    <td>365</td>
                    <td>127</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>9</td>
                    <td>70.52 &plusmn; 0.09</td>
                    <td>371</td>
                    <td>101</td>
                    <td>80.16 &plusmn; 0.17</td>
                    <td>397</td>
                    <td>96</td>
                </tr>
                <tr>
                    <td>DS</td>
                    <td>10</td>
                    <td>70.83 &plusmn; 0.15</td>
                    <td>408</td>
                    <td>86</td>
                    <td>79.98 &plusmn; 0.12</td>
                    <td>426</td>
                    <td>78</td>
                </tr>
            </tbody>
        </table>
    </div>

</div> -->

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