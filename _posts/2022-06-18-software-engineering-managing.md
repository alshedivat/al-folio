---
layout: post
comments: true
title: Software Engineering Management
date: 2022-06-18 18:00:00
description: Compilation of heuristics, tips and observations since starting my software engineering management journey.
---

# What is engineering management?
> “I have discovered a truly remarkable description of what management is which this margin is too small to contain.”

I made the “career change” from IC (Individual Contributor) to TLM (Tech Lead Manager) around 2013, and I believe that there are no formulaic actions and everyone learns their own way, which is why all these classes and books on management are all vague — you can’t say in situation X, always do Y. (But… there are good heuristics to lean on). In any case, this is my retrospective of “oh, here’s what current me would have told younger me six years ago”. (I probably would have ignored current me. What does he know anyway?)

When I first started being a manager, I remember the constant anxiety if I was doing the “right” thing, or in the times of crisis, or perhaps most interestingly, in the times of inaction, if what I did even mattered. Over time though, I have learnt the following heuristics:

  - Read widely (to figure out what resources are out there) but don’t fret about being a know-it-all
  - Develop principles / rules of thumb
  - Take classes / learn specific topics as needed
  - Find a mentor, or at least a cat to talk to — it helps
  - Get over the fact that management (in a big co environment) is necessary and it’s not going away

The difficult thing about software engineering management is that there is no right answer, but even as you walk your own path, it doesn’t hurt to use a guide written by others who have walked a similar path — just don’t expect it to be the same path.

# Long-term vs Short-term Planning
I have a theory that a major part of management is balancing act between goals of varying time range — long-term (visioneering) and short-term (problem-solving).

Visioneering: Creating visions on a brighter future, and how we will get there. In this task, you are striving to interrupt the status quo and exploit opportunities.

Problem-Solving: Triaging and fixing issues. In this task, you are striving to stabilize the situation, or to iteratively improve the current arrangement, but not to fundamentally change the rules.

Management is knowing when and how to visioneer, or to problem solve.

# Do we need management?
Yes, at a certain point.

Assumption: To scale decisions, you need a team and a team at scale needs management.

A thought experiment should bear this out: a team of one does not need a manager. In fact that would be … extremely unproductive. A team of two also doesn’t need a manager, and if it does have a manager, I pity the engineer. At some point though, when the communication and prioritization overhead is greater than the communication bandwidth between individual contributors, then a (good) manager is needed. The tipping point is a function of the project and the abilities of the engineers, but it exists. At least this is the lie I convince myself that my job is essential — make your own story up as needed, but get over the fact that management is needed. It exists.

In a smaller team, the [Tech Lead Manager](http://matt-welsh.blogspot.com/2013/04/running-software-team-at-google.html) is a hybrid role — you are both an IC and a manager.

# Someone’s gotta do it, or why I do it
Software engineering management is often hidden from plain sight, but that doesn’t mean that it’s not present. In fact, it’s almost always essential to the success (or failure) of projects, whether or not I knew that it was going on. This means that somebody is going to do it anyway — that person might as well be me. It seems like hurbis to say that -- but I know that I will try my best at this taking everyone's interest into account.

If “management” is going to decide how to resolve conflicts, shape the goals, decide how the team executes, not to mention handling performance reviews and compensation, then I very much prefer to give it my best shot, rather than to assume someone else is going to give it their best shot. But that’s just me.

# The 10,000 Hour Rule
Management is a skill, or at the very least a learned reaction based on good pattern recognition. Sometimes when I doubt a statement (like the one I just made), I look for examples at extreme ends of the scale. I think about examples of great management leading to great success. I can also recall projects that went nowhere due to poor management.

Good managers make it seem so easy — show up at a meeting, make a decision, reap the rewards. That’s probably the most infuriating part that stands out when times look bad — why is it so darn hard for me to get this right?

# How to do it?

## The One Rule — Learn Your Principles
This is the most important heuristic for me by a mile: Make up principles as you go along.

In the beginning, I handled each new decision with a fresh perspective: how to encourage more innovation in the team? How to load-balance triaging of the steady stream of bugs? What to do about the office being too cold?

Such intense decision-making takes mental energy which can be hard to recognize, but early on I would often leave work after a day’s worth of meetings and wonder why I was so tired — all I did was attend meetings!

But I recall when I first learnt how to drive a car. All of the stimuli and rules to remember (check your blind spot! Check your rear mirror! Look ahead! Scan for pedestrians!) — that was overwhelming. However, over time, driving became an automatic behavior as I learnt what to pay attention to (and what not to), and also how to react without consciously thinking about it.

Take the time when you are in a novel situation to assess and devise a principle to abide by moving forward. Observe the outcome of the decision and revise the principle as needed.
  
## Time / task management Strategies
You are going to have more things to do than time permits. These tasks range from minor (email person X information about a project) to major (start a project with a scope that affects the company from scratch), and if you are not deliberate about it, you will get overwhelmed.

## No monkeys on your back
If you don’t know about the monkey, here’s the [HBR article](https://hbr.org/1999/11/management-time-whos-got-the-monkey) about it written in 1974. But the gist is that you are spending mental energy keeping track of TODOs (or “monkeys”). You want a zero-monkey-on-back policy. In the original article, the suggestion is to punt it to the team member to keep track and follow up, and to do everything face-to-face, which doesn’t apply to our situation. In any case, the article never quite addresses that we are sandwiched between pointy heads and team mates — we get monkeys thrown to us too. What to do about it?

Rule of Thumb: Keeping track of TODOs is hard-work, punt it to a system, and worry about your current task.

Hack: Pick your favorite TODO system ([Google Search](http://lmgtfy.com/?q=todo+system)), but my hacks are:

  - Read through email periodically and label it with a special label (e.g., 1TODO to make it sort as the first label in gmail). 1TODO is visited at free-time slots to pick up tasks.
  - Since most of my TODOs are in email (from pointy heads), and I don’t want to create a separate repository of TODOs, I write my TODOs by emailing myself (TODOs <date>) which gets the 1TODO label automatically via gmail.
  - Don’t try to think remember things to do — any TODO goes to task system. Keep those monkeys off your mind.

## 1:1 Meeting Notes
“I had something I wanted to discuss you with, but I can’t recall it right now…” or,

“Wasn’t there something we were going to follow up on from our last discussion?” or,

“When and where are you going off for your vacation again?”

These are statements which I often made in 1:1s. I loathe these situations, not least of which it makes me feel that my memory is fading when it is really too much information than my puny brain can bear, but more critically it breaks the “No monkeys on your back” heuristic as it often creates the onus to follow up.

Hack: Create a doc with 1:1 meeting notes that you add to (for things you want to discuss), follow up notes (for things you want to talk about next meeting), and personal anecdotes.

# Making Good Decisions

## Delegating
To grow as an effective leader, you will need to delegate more, because practically speaking there comes a point at which there are either too many projects, or the project has gotten too big to keep it all in your head. Delegation is tricky as you don’t want to end up micromanaging and cancelling the benefits of delegation.

## What’s the goal?
Most importantly, what’s the goal of the delegation?

This is an important question for me — if I don’t know what the goal is, how will the team figure out what I want? In the beginning, I tended to be less thoughtful about what I delegated, especially for goals that were “edicts” from the management chain. However, the team looks for guidance from the manager, so be clear what you want. Furthermore, it helps to tailor the goals depending on who you are delegating to — senior engineers just need the end goal (get X done!) whereas junior engineers need the project broken down into smaller tasks (get X done by doing Y first, then Z, …)

## State your delegation intention and goals clearly
Be explicit in stating delegation intentions to the team or person. Whether or not it should be stated to the team or a person depends on the project — for a goal like writing design doc where it can sharded across a team I have found that it is often OK to ask the team to write one, and let them figure out who does what. When I want to grow a TL, I will explicitly call out a person as the stakeholder for the delegation.

For a goal like execution on a project, the goals should be tailored to the level of the person — break the project down for junior engineers, ask for thoughts from senior engineers.

## When to course correct?
This is where this becomes more of an art than a science. Since you don’t get to see the big picture, don’t expect to triage and debug problems directly. Instead, you need to use a multitude of signals to decide if progress is being made and when a course correction is needed.

Status Update: The team should already expect to give updates on their tasks, most often during a regular 1:1. However treat these more like status updates and be careful not to micromanage here. In these sessions, look for changes and deltas. If there is no progress, check if there are good reasons why there isn’t and remember to follow up next session.

Cross-validation: If the delegation is across a team, it is also good to cross-check with all team members. Make sure that all team members are on the same page for progress, and also have regular syncs with external stakeholders (other leads, PMs, etc.) and to get a sense.

Artifacts: Look for artifacts like code reviews, documents, decks, etc. Those are helpful to decide on progress without needing to get explicit signals from teammates. Often it is convenient to ask the team to give an overview presentation to the group / team.

## When you have to course correct
Figure out what went wrong — this is when management is beneficial. For example, if it’s due to imprecise specifications, then clarify. And if it’s due to external blocking, then help to unblock.

Focus on opportunities rather than problems. A rule of thumb is to have more opportunities than problems, and to put the best people on the opportunities.

Solving problems prevent disaster, but succeeding in new opportunities produces impact and growth. As a leader, you are most valued for your wins, not for minimizing losses.

## Management classes
In the leadership and management classes I have taken, they often tell you all about this great framework which accumulates in acronyms that you are supposed to remember and apply at the right moment — everything is so perfectly laid out, with all the variables and consequences spelt out in the classroom that it feels “right” there and then, but the moment you step out to real life, faced with an actual crisis (and everything feels like a crisis when you are actually managing), all of that goes out of the door.

> "Everybody has a plan until they get punched in the mouth." — Mike Tyson

Over time I have softened my stance for leadership and management classes, but mainly around when I should take them. Since I have a hard time absorbing and changing my management style on a whim, I found that taking a class or reading about a topic when I am facing or about to face an issue helps me the best.

Heuristic: read and learn broadly, but don’t worry about incorporating all concepts at the same time.
