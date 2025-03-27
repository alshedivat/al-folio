---
layout: post
title: "The Unspoken Ineffectiveness of AI Agents"
date: 2025-03-01 04:00:00
description: "Wait, where's my UBS deposit??"
tags: ['AI Agents', 'LLMs', 'GenAI']
---

- [1. Introduction](#1-introduction)
- [2. You put AI Agents in production, and then...](#2-you-put-ai-agents-in-production-and-then)
- [3. The Autonomy Landscape](#3-the-autonomy-landscape)
- [4. Conclusion: AGI when??](#4-conclusion-agi-when)
- [Appendix A: Why do AI multi-agent frameworks like CrewAI and AutoGen work?](#appendix-a-why-do-ai-multi-agent-frameworks-like-crewai-and-autogen-work)



# 1. Introduction

I feel that this blog post might be almost too late... *Why?* Things are moving too fast! We now have reasoning models, and in my experience, **Claude 3.7 - Thinking** may have increased the ratio between (*this mtfk knows stuff, let him cook*) and (the unbearable sadness of seeing it be the dumbest dude) by an order of magnitude. So, by the time you finish reading this blog post, it might already be outdated.

Now, getting over my little rant, one may start to focus on the title of this blog post and ask oneself:

<p style="text-align: center;"><strong><i><span style="color: #FF3636;">
"But, what do AI Agents even mean?"
</span></i></strong></p>

And that's a great question! Unfortunately, there is no straightforward answer. The best I can offer is: it depends on who you are and who you are talking to. So, if you find yourself in one of these categories:

<div markdown="1">
* **Selling something to someone** (startup founder?): an AI Agent is anything that **seems** intelligent or automated; it could even be people in the background manually doing tasks.
* **You code / Have some Software Engineering experience**: an AI Agent can be any LLM-based or enhanced application, usually something that wasn't possible before with "classical" software.
* **You are deep in GenAI and LLMs**: whether you're a hobbyist or a seasoned ML engineer, for you, an AI Agent is not just about LLMs but also about the degree of autonomy they possess. An AI Agent is an LLM-based application where the LLM creates and adapts its workflow or graph. This aligns with the [definition from LangChain/graph folks](https://blog.langchain.dev/what-is-an-agent/).
* <details markdown="1"><summary><b>You are an RL practitioner</b></summary>
  For you, things can be even more interesting. You might even argue that ChatGPT is already an agent! 

  <img src="/assets/img/posts/2025-03-ineffectiveness-of-ai-agents/chatbots-are-rl-agents.png" alt=" Diagram on how chatbots can be viewed as RL agents" width= "50%" style=" display: block; margin-left: auto; margin-right: auto;">
  <p style="text-align: center; margin-top: 0.5em;">Figure 1: Diagram showing LLMs as RL agents</p>
  
  You can say that chatbots:
  <ul>
    <li><strong>Perceive the environment</strong>: they consider the message history between them and you;</li>
    <li><strong>Act in the environment, changing it</strong>: if you don't think so, just ask GPT 4.5 this: <em> "What important truth do you think most people refuse to acknowledge, and why do you think they avoid facing it?" </em>. If you feel changed or moved, remember that you are a part of the world observation space.</li>
  </ul>
  </details>
</div>

In my opinion, the best definition is the one for software developers: **AI Agents are LLM-based or enhanced applications**. This broad definition helps us, as a society, understand each other better, from ML researchers to non-tech people.

<div style="text-align: center;">
    <img src="/assets/img/posts/2025-03-ineffectiveness-of-ai-agents/ai-agents-by-the-author.png" alt="AI Agents by the author" style="max-width: 50%; height: auto;">
</div>
<p style= "text-align: center; margin-top: 0.5em;">Figure 2: AI Agents bar, as seen by the author</p>


# 2. You put AI Agents in production, and then...

... they suck, hahahahaha 🤣. Yeah, man, **LLMs suck**; they are not all-mighty as many of us feel at the beginning. While the "*vibes*" might be strong at first, nothing kills the *vibes* quite like real-world interaction.

So, *what can we do then?* The answer is to take away their freedom. Don't expect them to handle all the reasoning and planning on their own, nor should you expect them always to write runnable code. Instead, give the LLM tasks that are as simple as possible.

<div style="text-align: center;">
    <img src="/assets/img/posts/2025-03-ineffectiveness-of-ai-agents/first-ai-agents.png" alt="Devs fighting LLM bugs" style="max-width: 50%; height: auto;">
</div>
<p style= "text-align: center; margin-top: 0.5em;">Figure 3: Developers dealing with LLMs on a typical Friday afternoon</p>

As you gain more experience with AI Agents in production, it becomes increasingly clear how to work with LLMs effectively: you reduce their autonomy and develop the AI Agent to resemble more traditional software. This realization might prompt you to consider...

# 3. The Autonomy Landscape

Alright, so LLMs are now a part of the ~*modern*~ software stack and are being used everywhere. But how should you use them? The answer, of course, is that it **depends**. The key lies in finding the balance between **<span style="color: green;">flexibility/autonomy</span>** and **<span style="color: darkblue;">control/reliability</span>**.

<div style="text-align: center;">
    <img src="/assets/img/posts/2025-03-ineffectiveness-of-ai-agents/the-autonomy-landscape.png" alt="The AI Agents autonomy landscape or tradeoff" style="max-width: 80%; height: auto;">
</div>
<p style= "text-align: center; margin-top: 0.5em;">Figure 4: The autonomy landscape (or trade-off) for AI Agents</p>

I hope Figure 4 clarifies this point: the more autonomy you grant to the LLM, the further to the right you find yourself on the graph. However, with increased autonomy comes unpredictability.

Therefore, your AI Agent solution can fall into one of these categories:

1. **Code**: This isn’t really an AI Agent; your solution is traditional code or software. It's predictable, testable, and well-known to humankind.
2. **LLM Call/Chain**: Your solution is almost traditional software, but now and then, you call an LLM, perhaps to extract or clean data/text. Your chain could even consist of a simple sequence of discrete LLM calls, as shown in Figure 5.

    <img src="/assets/img/posts/2025-03-ineffectiveness-of-ai-agents/example-llm-workflow.png" alt="Example LLM workflow" width="60%" style="display: block; margin-left: auto; margin-right: auto;">
    
    <p style="text-align: center; margin-top: 0.5em;">Figure 5: Example LLM Chain for generating research insights</p>

3. **Router**: Here, your solution becomes a bit more complex than a simple chain. You introduce branching or a router LLM that decides which next step to take based on the input. The next step could even involve other workflows or agents! This approach remains reasonably controlled while offering greater flexibility to handle various types of inputs and scenarios.

    <img src="/assets/img/posts/2025-03-ineffectiveness-of-ai-agents/llm-as-router.png" alt="Example LLM as a router" width="40%" style="display: block; margin-left: auto; margin-right: auto;">

    <p style= "text-align: center; margin-top: 0.5em;">Figure 6: Graphical representation of an LLM as a router</p>

4. **Full Autonomy/AI Agents for real**: In this scenario, you allow the LLM to decide the workflow. Questions like, <i> "Should I move forward with the document or ask for a second review?" </i> or <i> "Should I ask for human feedback?" </i> come into play. In these cases, you hand off the heavy lifting to the agent: it needs to reason, plan, and adapt... <abbr title= "Relax dude, I know AGI has arrived and we live in a utopia, I wrote this on 2025-03-27, just chill...">Do I really need to say that this is asking too much of these models?</abbr>
  
The truth is, the closer your application resembles traditional software, the better your outcomes. You would have:

1. **Better predictability**: Code is, in most cases, quite deterministic, and humans can follow its branching behavior.
2. **A longer history of coding**: It's a well-established technology, making debugging and troubleshooting straightforward.
3. **Security and compliance**: Code can be audited line by line for vulnerabilities and regulatory compliance.

Don't get me wrong; it's a marvel to see an AI Agent make the right decisions and navigate the right steps in a complex workflow. However, this doesn't happen as frequently as we might wish. Initially, you should go on an AI Agent project by granting complete autonomy to the LLM. Still, soon, you will discover that providing structured workflows, guardrails, and checks enhances its performance and may even make new use cases a reality.

***But aren't we being too harsh on the LLMs?*** Yes, I believe we are!! Humans often rely on predefined workflows in their work environments, commonly called Standard Operating Procedures (SOPs) or simply "how-to" guides. Additionally, humans sometimes struggle with open-ended tasks where they must devise steps and adapt along the way.

# 4. Conclusion: AGI when??

Things are moving fast; you might find yourself outdated just by spending time reading this blog post instead of *vibe coding* with Gemini 2.5 Pro ~*GOD MODE*~. Jokes aside, the TLDR is: **Don't overly rely on LLM capabilities; give them structure, high-level tools, and output checks**. Doing this will make you happier, and your clients will be happier.

Full autonomy is the dream, but what will we build when it finally arrives? Will AI Engineers have any moat? Won't the AGI providers + thin wrappers suffice for clients?

Will AGI solve everything? I'm not sure... We often provide a lot of context to newcomers in our companies. Will AGI be able to ingest this context like a human? Some may only label it AGI when it can, but is the average human significantly better than today's leading models? (excluding spatial/physical reasoning). Do you even believe that the average human possesses good common sense?


# Appendix A: Why do AI multi-agent frameworks like CrewAI and AutoGen work?

This section may be too small for a standalone blog post, but it fits nicely here as we talk about autonomy and workflows. We consistently observe that multi-agent workflows with LLMs outperform single conversations with a few back-and-forth exchanges, and... this is expected!

One thing to keep in mind about pre-trained-focused LLMs (e.g., GPT-4o, Claude 3, and Llama, not o1, R1, Claude 3.7-thinking) is that they have consumed all the data from the internet and are not just knowledge artifacts but also cultural ones! They encapsulate human behavior across various scenarios and contexts. 

So, when multi-agent frameworks like [CrewAI](https://github.com/crewAIInc/crewAI) and [AutoGen](https://github.com/ag2ai/ag2) are employed, they usually enforce:

* **Role playing**: Assigning each agent a specific role and background, e.g., *"You are a marketing specialist with over 10 years of experience."*
* **Reflection**: This typically occurs because one agent acts as the "manager" or "reviewer" of another agent's output.

These two points represent well-known best practices when using LLMs. But why is this the case? Because they simulate human processes that are known to yield better results, such as reviewing each other's [code PRs](https://chatgpt.com/share/67e4abc9-2068-800a-8f07-23d7264a0298) and gathering multi-perspective opinions on subjects (similar to "group chat rooms" that these frameworks provide). However, one valuable lesson learned over time is that **while multi-agent systems with a lot of autonomy perform better than a single LLM using a [ReAct workflow](https://www.promptingguide.ai/techniques/react), they do not outperform an LLM workflow designed by domain experts.**

<div style="text-align: center;">
    <img src="/assets/img/posts/2025-03-ineffectiveness-of-ai-agents/react-maw-wwhf.png" alt="AI Agents workflow designs" style="max-width: 70%; height: auto;">
</div>
<p style= "text-align: center; margin-top: 0.5em;">Figure 7: ReAct vs. Multi-agent systems with full autonomy vs. Domain-expert-based workflow.</p>