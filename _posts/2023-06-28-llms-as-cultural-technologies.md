---
layout: post
title: LLMs as cultural technologies, from conveying knowledge to creating it? 
date: 2023-10-30
description: Theophile Gervet
categories: 
giscus_comments: false
related_posts: false
toc:
  sidebar: left
---
### LLMs as cultural technologies

What distinguishes humans from other animals is our ability to create knowledge ([useful explanations of the world](https://theophilegervet.github.io/book_notes/the-beginning-of-infinity/)) and [pass it on culturally](https://theophilegervet.github.io/book_notes/the-secret-of-our-success/). A useful perspective on current LLMs is as powerful [cultural technologies](https://arxiv.org/abs/2305.07666), like writing, the printing press, the Internet, and language itself, that enhance cultural transmission. From this perspective, **progress on LLMs as cultural technologies is currently our best lever on the rate of human progress**.

### LLMs are becoming the best way to access existing knowledge

Until 2022, the go-to way for humans to access existing knowledge was browsing the Internet through Google search (to find relevant articles, books, StackOverflow posts, etc.). **LLM-based tools like ChatGPT or Perplexity are quickly overtaking Google search. Why?**

Let's step through the answer to this question from the perspective of a researcher or a software engineer, as I can most easily speak to this from personal experience. This should apply more broadly to any other professions that require access to existing knowledge. LLM-based tools
- **Better understand my questions**
    - **Understand (more of) my context** (the problem I'm trying to solve, my code, my data) - I can give a lot more of this context in ChatGPT's chat interface than I ever could in Google's search query, although there is a lot of room for improvement, as we'll discuss later
    - **Enable back-and-forth conversation** to refine the question
- **Directly answer questions**instead of indirectly providing links to potential answers
    - **Aggregate answer components** from various sources - provide both a code snippet that looks like a StackOverflow answer and an explanation paragraph that looks like documentation
    - **Adapt the answer to my specific context** - provide code snippets that directly solve my problem with my specific variables instead of a link to a relevant StackOverflow answer

The only potential downside of current LLM-based tools for accessing existing knowledge is that they can hallucinate answers. In practice, this hasn't been much of an issue in my day-to-day work with ChatGPT. Perplexity already addresses this problem by making retrieval and citations first-class citizens. But we'll need more work in this direction.

### How can we make LLMs even better as gateways to existing knowledge?

We should enable LLMs to
- **Directly integrate with daily tools** to understand user context better - read the code repository for my project on GitHub, the draft of the paper I'm writing in Overleaf, the conversations with my collaborators on Slack, the learning curves for my training runs in WandB, etc.
- **Understand other modalities** (images, videos, audio) as well as language - ChatGPT is already setting a high bar for images and audio, although it's not nearly as good at image understanding as it is at text understanding yet
- **Synthesize** large amounts of information 
    - **Summarize** large sources - an entire book or code repository from the perspective of a specific question
        - What does David Deutsch tell us about the nature of human knowledge and the place of humans in the universe in his book [The Beginning of Infinity](https://theophilegervet.github.io/book_notes/the-beginning-of-infinity/)?
        - Can you give me concrete guidelines about how to most effectively build an audience on Twitter based on the [open-source algorithm](https://github.com/twitter/the-algorithm-ml)?
    - **Connect the dots** across various sources of information, reason about commonalities and differences, provide perspective
        - From all robotics conference proceedings of the past couple of years, what are the most compelling examples of training robot policies in simulation and transferring them to real robots? What are common challenges and solutions?
        - Ideally, we'd want to push this to even higher levels of abstraction: From all ML conference proceedings of the past five years and citations of these papers, what are commonalities across ideas that have had a large impact on the field? Across the ones that have been forgotten? Which lines of work have made or will make other ones obsolete?
    - **Process (much) longer input context windows** to be able to ingest all this information - we should be able to take as input an entire book (100K+ words), an entire GitHub repository (1M+ tokens), all papers at a conference (40M+ tokens)
- **Teach rather than answer** - act like a personal teacher who adapts explanations to my current level of understanding, propose exercises to better master a topic
- **Search proactively** for relevant information - proactively recommend what papers and books to read given my interests and current projects
- **Eliminate hallucinations** - we should be able to trust the answers we get from LLMs at least as much as we trust answers from credible sources via Google Search
    - We're pretty close for simple queries that Google Search could answer, but this will become much more challenging as we move to complex synthesis of large amounts of information

The improvements above fall into two buckets:
- What can likely be done with more scale and more engineering: integrate with daily tools, understand images and videos as well as text, search proactively for relevant information
- What is likely to require new ideas: teach rather than answer, synthesize large amounts of information, eliminate hallucinations in this context

### How can LLMs create new knowledge?

To answer this question, it's helpful to think through how humans create knowledge. 

Our best epistemology from [Poppers](https://www.goodreads.com/book/show/61550.The_Logic_of_Scientific_Discovery), later refined by [Deutsch](https://theophilegervet.github.io/book_notes/the-beginning-of-infinity/), tells us that, **at the highest level of abstraction, knowledge progresses through unjustified conjectures, which are then criticized**. Individual researchers conjecture new explanations of the world / solutions to problems, and the scientific community criticizes them, whether it be through a formal peer review process, by identifying a flaw in a proof, generating contradictory experimental results, deciding whether to cite a paper or not, etc. Like genetic evolution, knowledge evolves by iterative variation (new explanations / solutions to problems) and selection (criticism and experimentation).

But concretely, what does a researcher do day-to-day? A researcher splits time between two fundamental activities:
- **Outer loop: problem-finding**
    - **Learn about the field**: read papers, watch talks, talk with colleagues
    - **Synthesize the state of the field and identify promising research directions** by answering questions like: What are commonalities across ideas that have had a large impact on the field or have been forgotten? Which lines of work will make other ones obsolete? What unsolved problems unlock the most important applications?
    - **Concretize a research direction into a specific problem to solve** by answering questions like: What is the simplest version of this problem that captures the essence of the idea? What is the best benchmark to convincingly demonstrate this idea to the community?
- **Inner loop: problem-solving**
    - **Break down a complex problem into sub-problems**
    - **Conjecture a solution to a subproblem**: reason by analogy to find solutions that worked for similar problems, write code to implement the solution
    - **Run experiments to test the conjecture**: write code to run the experiments, run experiments, analyze the results
    - Iterate

Problem-finding is often the most challenging skill to learn. Experienced researchers excel at this outer loop, while they might get rusty at the inner loop as they progress in their careers and delegate more of it to students and collaborators. 

This outer loop is primarily about accurately synthesizing the state of existing knowledge. This should make it evident that **being excellent as a gateway to existing knowledge is already flirting with creating new knowledge**. This should give you pause if you dismissed LLMs as imitation machines that are fundamentally unable to create new knowledge. Isn't making it 100x easier for humans to create new knowledge already a form of creating new knowledge?

Of course, beyond the synthesis of the state of existing knowledge, other abilities would be very handy to assist researchers in their other daily tasks:
- **Criticize:** poke holes in an argument, offer a counter-argument, identify flaws in a proof, missing experimental data to support a claim, etc. - act like a good reviewer
- **Write code:** implement a solution to a subproblem or the code to run experiments
- **Design experiments:** design experiments to test a hypothesis
- **Analyze results:** interpret experimental results and draw conclusions
- **Communicate results:** write a paper, design a talk, write a blog post, etc.
