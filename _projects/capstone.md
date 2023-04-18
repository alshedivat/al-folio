---
layout: page
title: capstone
description: region tracking for brain lesions. 
img: assets/img/nate/media/capstone_alt.jpg
importance: 1
category: older
---
{% if site.data.repositories.capstone %}
<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.capstone %}
    {% include repository/repo.html repository=repo %}
  {% endfor %}
</div>
{% endif %}
<br>
### Description
**Capstone** refers to the name of the final year design project at Queen's University in the Faculty of Engineering. The goal of this capstone project was to develop a region tracking algorithm that accurately identifies brain lesion contours from given a sequence of MRI or CT scans. Such a technology stands to benefit medical practioners and patients as expedient and reliable lesion identification allows for faster diagnoses.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/capstone_preprocessing.png" title="capstone_preprocessing" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Preprocessing the raw medical imaging data allows for more defined lesions geometries & better algorithm performance. 
</div>

In order to solve this challenge, principles from the calculus of variations were combined with the analysis of relevant lesion properties. The challenge was formulated as a optimization problem where functionals were designed to drive the corresponding Euler-Lagrange equations for the algorithm's evolution. 

$$
\begin{align*}
E[\overrightarrow{\gamma}] &= \alpha_{1} E_{1}[\overrightarrow{\gamma}] + \alpha_{2} E_{2}[\overrightarrow{\gamma}] + \alpha_{3} E_{3}[\overrightarrow{\gamma}],\quad \alpha_{i}\in \mathbb{R}_{>0} \text{ } \forall i\\ 
E_{1}[\overrightarrow{\gamma}] &= \oint_{\overrightarrow{\gamma}}ds \\ 
E_{2}[\overrightarrow{\gamma}] &= \int_{R_{\overrightarrow{\gamma}}}(I(x,y) - \mu_{i})^{2} - \int_{R_{\overrightarrow{\gamma}}}(I(x,y) - \mu_{o})^{2}\\
E_{3}[\overrightarrow{\gamma}] &= \left(\int_{R_{\overrightarrow{\gamma}}} dA - A^{*} \right)^{2}
\end{align*}
$$

<div class="caption">
    Excerpt of the derived functional driving the evolution of the level set surface. For the full derivation refer to the <a href="/assets/pdf/Capstone_Report.pdf" target="_blank" rel="noopener noreferrer">project report</a>. 
</div>


The algorithm converges to a 2D outline which minimizes a cost function over the MRI/CT image space and does so in a manner which satisfies the partial differential equations (PDEs) of the level set method. The shape it converges to is consequently determined to be the outline of the brain lesion.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/capstone_fullbrain.png" title="capstone_fullbrain" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/capstone_convergence.png" title="capstone_convergence" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Visualizing the iterative convergence of the zero level set to the contour of the brain lesion.
</div>

The algorithm was implemented in Python due its the high-level functionality and many third-party libraries for image analysis. A pipeline was created for the preprocessing of MRI/CT images in order to both reduce image complexity and facilitate identification. A flexible class structure for the "contour" was written and encodes all relevant information for the dynamics while promoting code-resuability. While the code performed the identification in the span of minutes, a late-stage implementation of the algorithm in Java offered significant time speedups which cut computation time in half compared to the Python version.

### Results
The proposed algorithm accomplishes:
* Automated labelling of brain tumours given an initial labelling of the lesion.
* Represents lesion geometry in the evolution of the algorithm.
* Area of Overlap of 34%-77% between automated and manually generated lesion contours.
* Algorithm runtime of 5-10 seconds on an image of ~100x100px. Java implementation cuts this computation time in half. 

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/nate/media/capstone_test.png" title="capstone_test" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Algorithm performance on a subset of test data. 
</div>
