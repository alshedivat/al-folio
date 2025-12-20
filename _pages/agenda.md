---
layout: page
title: agenda
permalink: /agenda/
description:
nav: true
nav_order: 1
---

Some of the ideas I have been mulling on.
Please see [PhD SOP](https://andre-ye.org/assets/pdf/phd-sop.pdf){:target="_blank" class="bubble-link"} for one aspect of my interests, and [great articles I've been reading](https://andre-ye.org/me-like/articles/){:target="_blank" class="bubble-link"}.
**Still under construction.**



<div class="agenda-card">
<div class="agenda-title">Rewards and Judgments on Qualitative AI Work</div>
<div class="agenda-description">As AI ventures into domains like creative writing, journalism, and philosophy, I am struck by the sense that although we cannot entirely formalize the correctness of a piece of AI work, we still can judge AI work as "better" or "worse" (of course, possibly with <a href="https://www.nytimes.com/2025/12/03/magazine/chatbot-writing-style.html" target="_blank">more complex descriptors</a>). In fact, much of the work of literary critics, philosophers, and essayists in general is to reflexively critique and develop an understanding of the normative form of the essay in their domain, to gesture at these senses of better and worse. What does this look like for AI? What is the role that humans will play in co-producing AI that writes <i>really well</i>?</div>
</div>

<div class="agenda-card">
<div class="agenda-title">Qualitative Knowledge Certification</div>
<div class="agenda-description">One of the most powerful uses of LLMs is to apply existing and produce new qualitative knowledge --- they are able to operate in the world of senses, vibes, liminal words. But why should we trust what knowledge these models produce? No, trust isn't the right word --- more like, what are the kinds of reasons we would want to believe in the knowledge these models produce, and what are the methods for structuring model outputs with those reasons? We can draw from the methodology of the social sciences and the humanities: what are the reasons why we would believe (or trust, or be intruiged by, or entertain, ...) what a historian, philosopher, literary theorist, etc. has to say? How can we 'certify' qualitative knowledge application and production, one of the most distinctive features of LLMs as a social technology?</div>
</div>



<div class="agenda-card">
<div class="agenda-title">Machine Concept Definition</div>
<div class="agenda-description">
The computational abstractions which have been useful for the field of interpretability may be useful abstractions for defining concepts.
Therefore, in an "interpretability as interaction" paradigm, concept definition does not only have to look like explaining something to someone, "thinking in your own head", or writing an essay, but also in <i>discovering the right language model internals</i> that capture a concept (e.g. vectors, sparse autoencoder features).
Can we represent the concepts we yearn to capture by finding the right set of sparse autoencoder features, or latent vectors, or whatever other relevant internal language model construct? What interaction tools would we need to capture our mushy and complex thoughts into these mushy and complex computational constructs?
Is there a future where I text my friend not words, nor emojis, but some a cluster of sparse autoencoder features because it more dynamically captures what I mean? Maybe one where these features become neologisms in a new iteration of human language?
Is there a future where we write "constitutions" for AI not in terms of human language, but by identifying internal LM representations and mechanisms that we can control and clamp on?
Machine concept definition is about finding the right kinds of constructs and tools for better human-machine communication.
</div>
</div>

<div class="agenda-card">
<div class="agenda-title">Socratic Topologies</div>
<div class="agenda-description">Thinking through a concept is like mapping out space --- figuring out how different areas of land, levels of elevation, features of the landscape, borders, etc. position and act in relation to each other. Humans have expressed these maps in free-form writing for centuries. Now that AI is here and ready to help, we give these maps to them in free-form writing. And to say the least, they are subpar. From an interaction standpoint, it's hard for AI to intervene in a transparent and multiscalar way. From a content standpoint, AI can be sycophantic or "miss the point". Maybe what we need is not "better AI assistants" per se (whatever that means) but a map format which is better conducive towards concept AI tools. Imagine a basic format: every concept map consists of nodes, which have text associated with them, and directed edges, which are predefined conceptual relations (e.g., "A supports B", "A contradicts B", "unlike A, B", "A is similar to B", "A is a metaphor for B") mined from conceptual literature (history, philosophy, etc.). Below the surface, each node corresponds to a vector embedding, and as the user builds out the graph, we can get the user's sense of contradiction, support, metaphor, etc. in terms of vector differentials. We can then use these to suggest possible connections between nodes, suggest possible tensions (e.g. different senses of relations), transitive contradictions, areas to add to the network that would maximize variance, etc. One can also imagine that many of the natural language operations studied in NLP like "summarization" which are inherently conditioned on user goals could be made much more transparent (e.g., summarization on this graph could be a principled method of edge contraction in a way specified by the user).</div>
</div>

<div class="agenda-card">
<div class="agenda-title">Parallel Human-AI Interactions</div>
<div class="agenda-description">What if your AI interrupted you? What interactions with AI were not just turn-by-turn conversations but had multiple simultaneous tracks of conversation, just like with humans (implicit cues, subtext, body language, environment information, etc.)?</div>
</div>

<div class="grabbag-section">
<div class="grabbag-header">Grabbag of ideas</div>
<div class="grabbag-grid">
<div class="grabbag-item">Systematic human-AI evaluation as a social computing problem</div>
<div class="grabbag-item">Algorithms and interfaces for multiscalar human oversight</div>
<div class="grabbag-item">Emphasizing human deliberation in the often overlooked "interpretation" stage of AI Constitutions (to draw from the legal analogy)</div>
</div>
</div>



<!-- 

### exciting ideas and directions
Kernels of research ideas I'm excited about.
If any of these excite you too, please shoot me an email at `andreye [at] uw [dot] edu`!

AI Tools for Thought / Textual Social Sciences
- Proactively asking great questions is a core part of thinking. Being asked a challenging question is how humans become conscious of what they don't know they don't know -- we're intellectually "caught off guard". But it's very difficult to ask great questions. How can AI systems do it?
- Critical learning often takes the practical form of figuring out what words mean. (Think philosopy 101: figuring out what "metaphysics", "contingency", "normative" mean.) Formal definitions are only a scaffold. The real conceptual grasp of the term comes from reading a multitude of texts which cross-reference and build up the term. Can LMs introduce "new" words developing "new" concepts, and thus contribute towards human "intelligence augmentation"?

Digital Tools for Metaphilosophy
- Expanding the modalities in which we do philosophy beyond the text document
- Data sheets are a now a commonplace practice for machine learning datasets to contextualize where they are coming from, their methodology, and their limitations. Can we extract and deploy "metaphilosophy data sheets"?
- Can intelligent tools and interfaces help bridge intellectual divides in philosophy (e.g. analytic-continental, canon-periphery)?

Philosophical meditations on AI
- An exploration of what "selfhood" means for AI -- what does it mean when models say "As an AI language model..."? What might it mean to negate the [sycophantic, servile, mirror-like nature](https://arxiv.org/pdf/2402.07350.pdf){:target="_blank"} many current language models have been aligned to?
- Critique of the utilitarian priority of "preferences" in alignment, mayhaps borrowing from the Frankfurt School.
- The kind of thing [Borges and AI](https://arxiv.org/pdf/2310.01425.pdf){:target="_blank"} does, but with someone like Baudrillard, Nietzsche, Foucault.
- Developing Vilém Flusser's notion of technical images for computer vision. See: [Into the Universe of Technical Images](https://www.are.na/block/3080997){:target="_blank"}.
- Theorizing if computer vision (and/or language modeling) is guilty of what Donna Haraway calls the 'god trick', and building information systems which reflect Haraway's maxim that objectivity is partial perspective. See: [Situated Knowledges: The Science Question in Feminism and the Privilege of Partial Perspective](){:target="_blank"} and [A Cyborg Manifesto](){:target="_blank"}. ["Situated Cameras, Situated Knowledges"](https://arxiv.org/pdf/2307.00064.pdf){:target="_blank"} is a great start.
- What happens if we take Iris Murdoch's notion of 'moral vision' literally? Murdoch says that "moral differences are differences in vision" -- what we need is not a "renewed attempt to specify the facts but rather a fresh vision". What does this mean for computer vision? -->


