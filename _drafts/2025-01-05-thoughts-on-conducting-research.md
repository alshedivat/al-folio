---
layout: distill
title: "Thoughts on Conducting Scientific Research: Let’s Get Started"
description: "How do we get started with scientific research, how do we begin, and what does it lead to in the end?"
tags: survey
giscus_comments: false
date: 2025-01-05
featured: true
bibliography: 2025-01-05-new-research-guide.bib

toc:
  - name: What is research?
  - name: What does the research process look like?
  - name: How can your research contribute to the community?
  - name: What should be included at the end of a research paper?
  - name: How does this apply to my scientific research?
    subsections:
      - name: A simple example
      - name: Advices from book's authors
  - name: So, that's it?
---

In my work and academic studies, I've read numerous research papers in the field of Computer Science. There are plenty advices on how to get started with reading a paper, and I believe I can do it really well over years. However, I have never given much thought to how to conduct research from scratch.

Last Sunday, I found the book _`Doing Research: A New Researcher's Guide`_ <d-cite key="Hiebert_2023"></d-cite> and spent days on reading the authors' guidance and advice. Although the examples in the book are unfamiliar with me since they are all within the domain of Education, the basic principles about research are logical and easy to understand. So I decided to write this article to document these insights for my future journey.

One key principle of conducting research is **continuously asking questions**, so it is a good idea to structure this article around a series of numerous questions. Let's get started.

---

## What is research?

If you're reading this article, I assume that you've sometimes been asked to "research" a topic whether in the school, university or even at work. We can probably agree that we don't need to understand clearly what the research is to complete the tasks. The asking of research should be, for instance, Conducting interviews to understand community behavior, Benchmarking the performance of a database system to determine the best specifications for an upcomming launch plan, etc. However, in this article, I only focus on the concept of "research" in the scientific world, and more precisely, on the concept of `scientific inquiry`.

> Scientific inquiry is a process, a particular way of finding out about something that involves a number of phases, that
> are formulating, testing, and revising hypotheses about phenomena of interest.

**From now on, I'll to use the term "research" or "study" for simplicity**. There are several key aspects that guide research in the right direction.

- **Testability**: The research is based on interacting with the real world, so it must be testable. At the begining of research, it's essential to plan carefully and have a clear understanding of how to test your idea or topic.
- **Observe and explain**: During research, we study how our idea interacts with the real world, and try to explain why it is and the way it is.
- **Iterative Thinking**: The goal of research is to refine and update everyone’s thinking by incorporating new and better information. The term "everyone" includes you, the research author, as you adjust your thinking based on the most logical and well-supported observations or outcomes. **This iterative process is what makes research a continuous cycle of learning and improvement**.

> Scientific inquiry does not let you pick and choose which data to believe; it _mandates_ that everyone update their
> thinking when the data warrant an update.

Note that the book's authors have mentioned term "hypotheses", we will go into detail in the next section.

## What does the research process look like?

Revisiting the definition of research from the previous section: _"Scientific inquiry is a process, a particular way of finding out about something that involves a number of phases, that are **formulating, testing, and revising hypotheses about phenomena of interest**"_. The highlighted phases in this definition also represent the fundamental steps of conducting research.

### Formulating Hypotheses

Firstly, let's talk about **hypotheses**. The book's authors state, _"We define a hypothesis to include both a prediction and a rationale. Both parts act in concert, and they provide different kinds of information."_. The hypotheses form the backbone of your study and the starting point of your research.

Research often begins by observing a problematic situation. You ask questions to understand and also make predictions to explain things. The more questions you ask and rationales you explore, the more you understand the problem. Once your thoughts are clear, you end up with hypotheses involves set of predictions and their supporting rationales. This process is refered to as **Formulating**.

<div class="row mt-3">
  {% include figure.liquid loading="eager" path="assets/img/post-new-research/Fig01.png" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>
<div class="caption">
  Hypotheses become clearer as you iteratively refine them through questioning, predicting, and reasoning (image from the book <d-cite key="Hiebert_2023"></d-cite>).
</div>

### Building Theoretical Frameworks

Once your hypotheses are established, you need to think about how to test and measure them in the real world. This's call **"Theoretical Frameworks"**, described as _"your set of custom-designed rationales for your predictions"_. Theoretical frameworks support and strengthen your hypotheses by providing a coherent argument that connects individual rationales and explains why your predictions are currently the best. Some points on your theoretical frameworks:

- Aligned with your hypotheses.
- Testable in the real world.
- Includes the selection of variables, mechanisms, and methods that contribute to the findings.

Since experiments can be conducted in various contexts/variables and mechanisms, and each choices of these can lead to separated outcomes. Therefore, careful planning and strong rationales are essential for making these choices. Just as with hypotheses, your theoretical framework should be iteratively refined as you conduct experiments.

### Revising Hypotheses

Finally, it's time to revise hypotheses of your research. Research is not a linear process; it involves constant refinement. After conducting experiments and analyzing findings, revisit your hypotheses to evaluate the correctness of your predictions and the strength of your rationales, and finetune them it possible. Don't worry when the findings is not as your expectation — discovering the unexpected is often the most exciting part of research!

The unexpected findings could be due to some reasons, **due to unfortunate choices** or **due to missing variables**. When this happens, you can choose to strengthen your theoretical frameworks, or to conclude your study with **discussions** about the limitation and future improvement.

<div class="row mt-3">
  {% include figure.liquid loading="eager" path="assets/img/post-new-research/Fig02.png" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>
<div class="caption">
   All the steps of a research study (image from the book <d-cite key="Hiebert_2023"></d-cite>).
</div>

## How can your research contribute to the community?

The contribution of a study can be analyzed through three key vectors: significance (the impact and the motivation to address the study's questions), contributions (how the study creates an impact), and implications (what we learn and how it informs or improves future work).

> What makes a study significant is that the theoretical framework and the predictions make clear how the study
> will increase the field's understanding toward achieving a goal of shared value; contribution lies in the value of its findings for revising the hypotheses, making clear what has been learned, what is now better understood.

As the book's authors mention, significance is established during the selection of topic and formulation of hypotheses, while contributions are revealed after obtaining the results. Lastly, implications are drawn as conclusions that highlight how the study improves community understanding and guides future research.

So the contributions are not limited to the results of the research. They also includes the hypotheses and theoretical frameworks, because all the predictions, rationales, data, variables, mindset and methods to test the hypotheses appropriately in the real world will be studied to conduct the next research.

## What should be included at the end of a research paper?

Most people recommend efficient strategies for reading a research paper, such as starting with the abstract, then the moving to the results.
But what does the results section include? The book's authors recommended to include the **Discussion** section in the end of paper, as this section is where the readers can identify the contribution of the study and determine whether they are helpful for their own work. This section involves:

- Starting with a brief summary of the main results, then move to presenting the contributions.
- Highlighting the limitations of unfortunate choices or variables or context (if applicable).
- Concluding with the implications of the study for methodological choices that could improve research, and how future studies could overcome the limitations identified above.

## How does this apply to my scientific research?

### A simple example

I asked `ChatGPT` to read through my writting and come up with an example in the field of Computer Science. While I don't focus on the correctness of the content, I find its understanding of the concepts and methods for conducting research quite impressive. Let's take a look.

---

#### Formulating Hypotheses

While working on optimizing neural network training, I observed that existing algorithms like SGD or Adam tend to stagnate in certain loss landscapes. This raised questions:

- Why do these algorithms fail in such scenarios?
- Can a new algorithm overcome these limitations and improve convergence rates?

Based on these questions, I hypothesized that introducing adaptive momentum adjustments based on gradient variance could mitigate stagnation and accelerate training. My prediction was that this adjustment would lead to faster convergence in non-convex loss landscapes. The rationale was grounded in gradient variance providing insights into the curvature of the loss function.

#### Developing Theoretical Frameworks

To test this hypothesis, I designed a theoretical framework that included:

- **Selection of variables**: Gradient variance and momentum coefficient as key parameters.
- **Mechanism**: A formula that adaptively adjusts momentum based on variance thresholds.
- **Methods**: Training on standard benchmark datasets (e.g., MNIST, CIFAR-10) with a range of neural network architectures to evaluate the algorithm's generalizability.

This framework ensured that my hypothesis was aligned with real-world experiments and could be iteratively refined.

#### Experimentation and Revision

After conducting initial experiments, the results showed mixed outcomes. While the new algorithm outperformed Adam in some scenarios, it failed in others. This led to further questions:

- Were there additional variables (e.g., learning rate scheduling) influencing performance?
- Did the datasets' characteristics affect the algorithm's behavior?

I revised my hypotheses to include these variables and refined the theoretical framework, adjusting the algorithm to account for dynamic learning rates. This iterative process gradually improved the algorithm's robustness.

#### Contribution to the Community

The research contributed to the community by:

- Proposing a novel adaptive optimization algorithm.
- Providing a detailed analysis of scenarios where it succeeded or failed, enriching the understanding of optimization challenges in deep learning.
- Identifying gaps for future research, such as the interplay between gradient variance and learning rate strategies.

#### Final Presentation

In the discussion section of the research paper, I:

- Summarized the algorithm's performance and its strengths.
- Highlighted limitations, such as computational overhead or specific failure cases.
- Proposed implications for future studies, including potential avenues for combining adaptive techniques with meta-learning approaches.

---

### Advices from book's authors

- **Write the evolving research paper** at the same time you are planning and conducting the study, includes your hypotheses, theoretical frameworks into the paper, and you can improve it as you refine the hypotheses by iteratively questioning and making predictions. It saves time and keep you in the right direction, and ensure all the things are carefully planned and coherant before conducting the tests and experiments. By the end of this process, you can clearly confirm that your research is feasible.
- **Keep an open mind**. Do not pick and choose which data to believe, keep an open mind and adjust the hypotheses according to the findings.
- **Conduct a pilot study** (a smaller-scale study) to accelerate the process of refining your predictions and rationales. This allows you to iterate and improve your research earlier.

> The primary activity that generates more specific and clearer hypotheses is searching and _reviewing literature_. You can return to the literature as often as you need to build your rationales.

## So, that's it?

Yes, that’s it. Note that this section should be titled "Conclusions", but I named it differently to align with the series of questions mentioned at the beginning. Once again, **conducting research is about continuously asking questions**.

I’d like to remind you that I am just a beginner in scientific research. However, reading this book and creating these notes has significantly helped me in planning how to conduct research, identifying what needs to be done, and understanding how the process should progress. For more details, I highly recommend reading the original book, _`Doing Research: A New Researcher's Guide`_ <d-cite key="Hiebert_2023"></d-cite>.
