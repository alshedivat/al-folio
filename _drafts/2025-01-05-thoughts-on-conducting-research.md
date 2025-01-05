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

In my job and academic study, I've read a lot of research papers in Computer Science field. There are many advices on how to get started on reading a paper, and I believe I can do it really well throughout years of working. But I have no clearly thought of how to conduct the research from scratch.

Last Sunday, I found the book _`Doing Research: A New Researcher's Guide`_ <d-cite key="Hiebert_2023"></d-cite> and spent days on reading the guide and advice from the authors. Although the examples in the book are not family with me since they all are in Education domain, but the basic principles about research are quite logical and easy to understand. So I write this articles to note to myself, for my future journey.

One of the principles of conducting research is **continuously asking questions**, so it is a good idea to structure this articles in a series of 5 questions. Let's get started.

---

## What is research?

If you're reading this articles, I guess you should sometimes be asked to "research" a topic in the school, university or even at your work, and we could all agree that we don't need to known clearly what the research is to complete the tasks. The asking of research should be, for examples, Conducting interviews to understand community behavior, Benchmarking the performance of a database system to find the best specs for the upcomming launching plan, etc. But in this article, I only focus on the term "research" in the scientific world, and more pointedly, it's `scientific inquiry`.

> Scientific inquiry is a process, a particular way of finding out about something that involves a number of phases, that
> are formulating, testing, and revising hypotheses about phenomena of interest.

**From now on, I prefer to use the term "research" for short**. There are some aspects to guide a research on to the right direction.

- The research is based on interacting with the real world, so it must be testable. At the begining of research, we need to plan carefully and understand clearly about how to test your idea/topic in our research.
- While doing research, we study how our idea interact with the real world, and try to explain why it is and the way it is.
- The result of research is to update everyone’s thinking in response to more and better information. The term “everyone” includes you, the author, as you adjust your thinking based on the best rationale for the outcomes or observations. This is why we can say that **research is an iterative process**.

> Scientific inquiry does not let you pick and choose which data to believe; it _mandates_ that everyone update their
> thinking when the data warrant an update.

Note that the book's authors mentioned about term such as hypotheses, we will go into detail in the next section.

## What does the research process look like?

Revising the definition of research from previous section: _"Scientific inquiry is a process, a particular way of finding out about something that involves a number of phases, that are **formulating, testing, and revising hypotheses about phenomena of interest**"_, the highlight parts in this definition are also the phases of conducting research.

Firstly, let's talk about **hypotheses**. The book's authors said _"We define a hypothesis to include both a prediction and a rationale. Both parts act in concert, and they provide different kinds of information."_. The hypotheses are the backbone of your study, is the starting point of your research.

Generally, you come up with a research when observing a problem situation occur, you make some questions to understand and also make predictions to explain things. The more questions you make and more rationales you try to explain things, the more you understand the problem. After have a clearly thought of that, you come up with hypotheses involves set of predictions and rationales. This process is called **Formulating**. The Fig. 1 show that the hypotheses become more clearer everytime you iteratively make questions, predicts and try to explain things.

After getting your hypotheses, you need to think about how to test and measure them in the real world, this's call **"Theoretical Frameworks"**, which is _"your set of custom-designed rationales for your predictions"_, which support and strengthen your predictions and rationales. To be more clear, it is a coherent argument that threads together the individual rationales and explains why your predictions are the best predictions at this time. Some points on your theoretical frameworks:

- Aligned with your hypotheses.
- Able to experiment in the real world.
- Includes the selection of variables, mechanisms, and methods that contribute to the findings.

Because of the experiment can be conducted in various contexts/variables and mechanisms, and each choices of these can lead to separate outcomes, you need to carefully plan and a strong rationale on making the choice. As the hypotheses, you need to iteratively strengthen your framework while conducting experiment.

Next, it's time to revise hypotheses of your research. Yes, we do not only iteratively strengthen hypotheses and theoretical frameworks, we need to finetune the overall process. Whenever you get the expermental findings, revise the correctness of your predictions and the strong of your rationales, and finetune them it possible. Don't worry when the findings is not as your expectation, isn't finding something new is the motivation that people conduct the research, right?

The unexpected findings could be due to some reasons. It could be **due to unfortunate choices** or **due to missing variables**. If that happens, you can choose to strengthen your theoretical frameworks, or to wrap it up with **discussion** about the limitation and future improvement, we will detail it later.

Fig 2 Show the all the parts of a research study.

## How can your research contribute to the community?

We can determine the contribution of a study into 3 vectors: significance (the impact, is there any motivation to answer the study's questions), contributions (how it impact) and implications (what we learn and improve).

> What makes a study significant is that the theoretical framework and the predictions make clear how the study
> will increase the field's understanding toward achieving a goal of shared value; contribution lies in the value of its findings for revising the hypotheses, making clear what has been learned, what is now better understood.

As the book's authors mentioned, the significance can be determined when choosing topic and doing hypotheses whereas the contributions are presented after the results. Finally, the implications is added as the conclusions about how the study help improve the community understanding and yield the future study.

So the contributions are not only the results of the research, it also includes the hypotheses and theoretical frameworks, because all the predictions, rationales, data, variables, the mindset and methods to appropriately test the hypotheses in the real world will be studied to conduct the next research.

## What should be included at the end of a research paper?

Most people recommend the efficient way to read a paper, for examples, we first read the abstract, then the results, etc.
So, what is included in the result section? The book's authors recommended to include the **Discussion** section in the end of paper, as this section is where the people find the contribution of the study, and see if that help them on their study. This section involves:

- Beginning with a brief summary of the main results, then move to presenting the contributions.
- Point out the limitations of unfortunate choices or variables or context (if exists).
- Conclude with the implications of the study for methodological choices that could improve research, and how future studies could overcome the limitations identified above.

## How does this apply to my scientific research?

### A simple example

I asked `ChatGPT` to read through my writting and make an example in the Computer Science domain. I don't care about the correctness of the content, but how ChatGPT understand the concept and method on conducting research is quite good. So let's see.

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

- Write the evolving research paper at the same time you are planning and conducting the study, includes your hypotheses, theoretical frameworks into the paper, and you can improve it during strengthening hypotheses by iteratively questioning and making predictions. It saves time and keep you in the right direction, and ensure all the things are planned carefully and coherance before conducting the test and experiment. In the end of this, you can confirm to yourself that your research is doable.
- Do not pick and choose which data to believe, keep an open mind and adjust the hypotheses according to the findings.
- You can always do plot study (study on the smaller data) to speedup your predictions and rationales and make a new iteration earlier.

> The primary activity that generates more specific and clearer hypotheses is searching and _reviewing literature_. You can return to the literature as often as you need to build your rationales.

## So, that's it?

Yes, that's it. Note that this section should be titled "Conclusions", but I named it as this to form the series of questions as mentioned in the beginning. Again, conducting research is **continuously asking questions**.

Reminding that I am just a beginner in the scientific research. But reading this book and making this note help me a lot on planning to conduct research, determining what I should do and how it should go. To get more detail, reading the original book _`Doing Research: A New Researcher's Guide`_ is highly recommendation.
