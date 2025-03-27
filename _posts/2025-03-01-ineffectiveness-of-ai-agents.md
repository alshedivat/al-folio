---
layout: post
title: "The Unspoken Ineffectiveness of AI Agents"
date: 2025-03-01 04:00:00
description: "Wait, where's my UBS deposit??"
tags: ['AI Agents', 'LLMs', 'GenAI']
---

- [1. Introduction](#1-introduction)
- [2. You put AI Agents in production and then...](#2-you-put-ai-agents-in-production-and-then)
- [3. The Autonomy Landscap](#3-the-autonomy-landscap)
- [4. Conclusion: AGI when??](#4-conclusion-agi-when)
- [Apendix A: Why AI multi-agent frameworks like CrewAI and AutoGen works?](#apendix-a-why-ai-multi-agent-frameworks-like-crewai-and-autogen-works)



# 1. Introduction

I feel that this blog post might be almost too late... *Why?* Things are
moving too fast! We now have reasoning models and in my experience 
**Claude 3.7 - Thinking** may had increase in a order of magnitude the 
ratio between = (*this mtfk knows stuff, let him cook*) / (the unberable
sadness of seeing it be the dumbest dude).
So, by the time you finish reading this blog post it might be already 
outdated.

Getting over my little rant one may start to focus on the title of this blogpost
and ask oneself: 

<p style="text-align: center;"><strong><i><span style="color: #FF3636;">
"But, what do AI Agents even mean?"
</span></i></strong></p>

And that's a good question! Which does not have
a good answer. The best I can give is: it depends on who you are and with who you
are talking to. So, if you are:

<div markdown="1">
* **Selling something to someone** (startup founder?): an AI Agent is
  anything you that **seems** intelligent/automated, can be even people on
  the background manually doing tasks.
* **You code / Have some Software Enginnering experience**: an AI Agent
  can be any LLM-based/enhanced application, usually something that wasn't
  possible before with "classical" software.
* **You are deep in GenAI and LLMs**: you may be a hobbist or a seasonal
  ML engineer. For you, an AI Agent is not only about LLMs but the degree
  of autonomy they have, for you an AI Agent is a LLM-based application
  where the LLM creates and adapts it's workflow/graph. (this follow
  the [definition of LangChain/graph folks](https://blog.langchain.dev/what-is-an-agent/))
* <details markdown="1"><summary><b>You are an RL practitioner</b></summary>
  For you things can be even funnier, you may even say the ChatGPT is already an agent!
  <img src="/assets/img/posts/2025-03-ineffectiveness-of-ai-agents/chatbots-are-rl-agents.png" alt="Diagram on how chatbots can be viewed as RL agents" width="50%" style="display: block; margin-left: auto; margin-right: auto;">
  
  <p style="text-align: center; margin-top: 0.5em;">Figure 1: Diagram showing LLMs as RL agents</p>
  
  You can say that chatbots:
  <ul>
    <li><strong>Perceives the environment</strong>: message history between it and you;</li>
    <li><strong>Acts in the environment, changing it</strong>: if you don't think so, ask
    gpt 4.5 this: <em>"What important truth do you think most people refuse
    to acknowledge, and why do you think they avoid facing it?"</em>. If
    you feel changed/moved, remember that you are a tiny part of the whole world.</li>
  </ul>
  </details>
</div>

In my opinion the best definition is the one for software developers:
**AI Agents are LLM-based/enhanced applications**. I think this definition
is broad and easy for us as a society to understand each other, from ML
researchers to non-tech folks.

<div style="text-align: center;">
    <img src="/assets/img/posts/2025-03-ineffectiveness-of-ai-agents/ai-agents-by-the-author.png" alt="AI Agents by the author" style="max-width: 50%; height: auto;">
</div>
<p style="text-align: center; margin-top: 0.5em;">Figure 2: AI Agents bar, as seen by the author</p>


# 2. You put AI Agents in production and then...

... they suck hahahahaha 🤣. Yeah man, **LLM sucks**, they are not all mighty
as a lot of us feel at the beginning, "*vibes*" might be strong at the beginning
but nothing better to kill the *vibes* than real world interaction.

*What can we do then??* \
You take away their freedom, don't expect than to do all the reasoning,
all the planning, you don't expect it to always write runnable code, you
give the LLM work that is as simple as possible.

<div style="text-align: center;">
    <img src="/assets/img/posts/2025-03-ineffectiveness-of-ai-agents/first-ai-agents.png" alt="Devs fighting LLM bugs" style="max-width: 50%; height: auto;">
</div>
<p style="text-align: center; margin-top: 0.5em;">Figure 3: Developers dealing with LLMs in a normal Friday afternoon</p>

With more and more experience with AI Agents in production it becomes clear how
you should deal LLMs: you reduce their autonomy and make the AI Agent 
more like traditional software. This learning might make you think about...

# 3. The Autonomy Landscap

Ok, LLMs now make part of the ~*modern*~ software stack, they are being 
used everywhere, but, how should you use them? The answers is obviously
**depends**, and the choice lies on the idea for balancing the trade-off
between **<span style="color: green;">flexibility/autonomy</span>** with 
**<span style="color: darkblue;">control/reliability</span>**.

<div style="text-align: center;">
    <img src="/assets/img/posts/2025-03-ineffectiveness-of-ai-agents/the-autonomy-landscape.png" alt="The AI Agents autonomy landscape or tradeoff" style="max-width: 80%; height: auto;">
</div>
<p style="text-align: center; margin-top: 0.5em;">Figure 4: The autonomy landscape (or trade-off) for AI Agents</p>

I hope Figure 4 is clear: the more autonomy you give to the LLM more on the
right of the graph you are, but with this autonomy, comes unpredictibality.

So, your AI Agent solution can be:

1. **Code**: not really an AI Agent, your solution is traditional code/software,
   it's predictable, testable and well-known for human-kind;
2. **LLM Call/Chain**: your solution is almost traditional software, but
   here and there you call an LLM, for example, to extract/clean data/text.
   Your chain may be even just a sequence of discrete LLM calls such as in Figure 5.

    <img src="/assets/img/posts/2025-03-ineffectiveness-of-ai-agents/example-llm-workflow.png" alt="Example LLM workflow" width="60%" style="display: block; margin-left: auto; margin-right: auto;">
    
    <p style="text-align: center; margin-top: 0.5em;">Figure 5: Example LLM Chain for generating research insights</p>

<ol start="3">
    <li><strong>Router</strong>: your solution is a bit more complex than a simple chain, you have branching, or a router, that decides which next step to take based on the input. The next step can be even other workflows or agents!! This is still very controlled but gives more flexibility to handle different types of inputs/scenarios;
    </li>
    <br>
  <img src="/assets/img/posts/2025-03-ineffectiveness-of-ai-agents/llm-as-router.png" alt="Example LLM as a router" width="40%" style="display: block; margin-left: auto; margin-right: auto;">

  <p style="text-align: center; margin-top: 0.5em;">Figure 6: Graphical representation of an LLM as a router</p>

    <li>
    <strong>Full Autonomy/AI Agents for real</strong>: this is when you
    let the LLM decide the workflow. <i>"Should I move forward with the document
    or ask for a second review?"</i>, <i>"Should I ask for human feedback?"</i>, etc.
    On these cases you handoff the heavy lifting the agent: it needs to reason, to
    plan, to adapt... <abbr title="Relax dude, I know AGI has arrived and we live in a utopia, I've wrote this on 2025-03-27, just chill...">do I need to say it's asking too much of these models??</abbr>
    </li>
</ol>

The truth is that the closer your application is to traditional software, the better.
If it you have:
1. **Better predicatibility**: code is, in most cases, pretty deterministic
   and humans can follow their branching behavior.
2. **Humans have being coding for a longer time**: is a well stablelish tech,
  debugging and troubleshooting is straightforward;
3. **Security and compliance**: code can be audited line by line for
   vulnerabilities and regulatory compliance;

Don't get me wrong, is a marvel to see an AI Agent take the right decisions, 
the right steps in a complex workflow, but this doesn't happen as frequently 
as we might wish. You definitely should start an AI Agent project given the
complete autonomy to the LLM but soon you will discover that giving structured
workflows, guardrails and checks makes it perform better, or even make a 
new use case a reality.

***But aren't we being too harsh with the LLMs?*** Yes, I do think we are!!! 
Humans frequently rely on predifined worflows on their work environment, 
they are often called Standard Operating Procedure (SOP) or simply "how-to" 
guides. Humans also suffer sometimes on open-ended tasks where they need
to come up with the steps and adapt along the way.

# 4. Conclusion: AGI when??

Things are moving fast, you probably got outdated by spending time reading
this blog post instead of vibe coding with Gemini 2.5 Pro ~*GOD MODE*~. 
Jokes apart the TLDR is: **Don't overly rely on LLM capabilities,
give them structure, high-level tools and output checks**. Doing this you 
will be happier and your clients will be happier.

Full autonomy is the dream, but, what will we build when it arrives?
Will AI Engineers have any moat? Won't the AGI providers + thin wrappers
be enough for the clients?

Will AGI solve it all? I'm not sure... Many times we give a lot of context
to new comers in our companies. Will AGI be able to ingest this context
as a human? Some people will only call it AGI when it can, but, is the
average human much better than today's leading models? (excluding spacial/physical
reasoning). Do you even believe that the average human has good common sense?


# Apendix A: Why AI multi-agent frameworks like CrewAI and AutoGen works?

This section was too small of a subject for a solo blog post and I feel it
kinda fits here, as we are talking about autonomy and workflows. We constantly
see that multi-agent workflows with LLMs perform better than single conversations
with a few back and forth, and... this is expected!!

A thing that we should have in mind about pre-trained-focused LLMs (e.g. GPT4o, 
Claude 3, and Llama, not o1, R1, Claude 3.7-thinking) is that they consumed
all the internet data and are not only knowledge artifacts but also cultural ones! 
They capture human behavior in many scenarios and places. 
So, when multi-agent frameworks such as [crewAI](https://github.com/crewAIInc/crewAI) 
and [AutoGen](https://github.com/ag2ai/ag2) they usally enforce:

* **Role playing**: give each single agent and role and background, e.g. *"You 
  are a marketing specialist with more the 10 years of experience"*;
* **Reflection**: usually happens because some agent is the "manager" or
  "reviewer" of some task output.

The two points above are well know good practices when using LLMs! Ok, but
why? Because they simulate human processes well known to give better output
such as reviewing each others [code PRs](https://chatgpt.com/share/67e4abc9-2068-800a-8f07-23d7264a0298)
and getting multi-view opinion on subjects (like on a "group chat rooms"
that these frameworks provide). But, what good lesson you'll get with time 
is that **although multi-agent systems with a lot autonomy performs better than
a single LLM with [ReAct workflow](https://www.promptingguide.ai/techniques/react)
it does not perform better than a LLM workflow designed by domain experts.**

<div style="text-align: center;">
    <img src="/assets/img/posts/2025-03-ineffectiveness-of-ai-agents/react-maw-wwhf.png" alt="AI Agents workflow designs" style="max-width: 70%; height: auto;">
</div>
<p style="text-align: center; margin-top: 0.5em;">Figure 7: ReAct vs Multi-agents systems with full autonomy, and domain-expert based workflow.</p>