---
layout: post
comments: true
title: Effective delegation by visioneering
date: 2022-06-19 10:00:00
description: Visioneering is such a great word 
---

As a software engineering manager and a growing slate and scale of projects to lead, I have made delegation decisions largely based on intuition or just observing what other managers were doing.

Sure, there are management books which espouse theory, but let’s be honest — they make it sound more complicated than it needs to be, and I read them, but I just didn’t grok them. Take this this gem about [goal setting in business](https://en.wikipedia.org/wiki/Goal_setting#In_business):
> In business, goal setting encourages participants to put in substantial effort. Also, because every member has defined expectations for their role, little room is left for inadequate, marginal effort to go unnoticed.
>
> Managers cannot constantly drive motivation, or keep track of an employee’s work on a continuous basis. Goals are therefore an important tool for managers, since goals have the ability to function as a self-regulatory mechanism that helps employees prioritize tasks.

This doesn’t help me though: I need a playbook with specifics on how to structure and delegate effectively for software engineering projects that somehow relate back to the theory. How exactly do you go about this?

Here’s my take: _visioneering_.

# Visioneering
I loosely define visioneering as the series of actions to take to build up a shared vision and long term goals for the team. At its core, visioneering consists of three parts:

  1 Defining a desirable and attainable goal
  2 Communicating and getting consensus on the goal
  3 Empowering teammates to achieve that goal 

## 1. Defining a desirable and attainable goal
Setting challenging yet attainable goals with high impact. As a line manager, the goal given might be quite specific — “Get accuracy to at least 90%” or “Build a deployable system that does X, Y, and Z”. But even with such specifics there is often still large components to design and implement.

As a director where you are given larger areas of focus, your goal is to set the direction of the project and team — “We will build a better ranking system by first scaling our data collection pipeline and building a robust evaluation metrics”.

You should spend enough time to have a coherent topline goal, and to move onto the next step of communicating the goal, perhaps with the more senior members of the team at first, and to come back to refining your goal as you get more inputs and insights from others.

## 2. Communicating and getting consensus on the goal
A good rule of thumb as a manager is that you can’t never over-communicate. Even if you think you are repeating the same goal too many times, you would be surprised at how teammates appreciate being engaged in discussions about goals multiple times as they develop different perspectives over time. This is particularly true for big pivots in directions.

In my experience, as the scope of the goal becomes more abstract, more of the effort should be spent discussing on why the goal is important. This is because with specificity engineers tend to gravitate towards problem-solving immediately, as opposed to more abstract goals which invite questions. (*)

(*) Correlation is not causation of course, and another plausible explanation is that having larger scope problems correlates with higher level thinking and working with more senior engineers who tend to be better at questioning the whys of projects.

There are three specific ways I like to communicate goals: A) one-pagers, B) presentations, and C) in-person discussions.

A) One-pagers: Write down your ideas and goals in prose concisely. This helps both the recipient (short and sweet summary), and yourself (collect your thoughts).

B) Presentations: Communicates your thoughts effectively in a group setting, also good to have presentations which are easily shared with partners and leadership to convey expectations. (Let’s be honest, the pointy-heads aren’t going to read your one-pagers)

C) In-person discussions: Nothing beats face-to-face discussions to solicit honest and useful feedback.

## 3. Empowering teammates to achieve that goal
If the scope of the project is small enough, implementation can start immediately, but once the project grows to an effort requiring a team over multiple weeks or months, this is where I would have called “delegation” previously would start as an external observer.

Here’s my heuristic: you ask your team (or specific individuals) to write down how they are going to achieve the end goal (e.g., a design doc). And in fact if the project is still large enough, it could even be another visioneering task for them.

Why do this? [Goal-commitment](https://en.wikipedia.org/wiki/Goal_setting#Employee_motivation):
> Goal-commitment, the most influential moderator, becomes especially important when dealing with difficult or complex goals. If people lack commitment to goals, they lack motivation to reach them. To commit to a goal, one must believe in its importance or significance.

By writing down in a document the ideas and steps, the team member feels more ownership of the process, and there should be processes in the organization that allow the design document to be shared internally so that it gets reviewed by others. This also empowers the teammate to get agreement on the next steps and allows for more effective implementation.
