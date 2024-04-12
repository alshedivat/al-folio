---
layout: post
title: Obsidian 001
author: Zhihao
description: Obsidian, Zotero and Knowledge Management
date: 2022-08-26
tags:
  - Obsidian
  - PKM
categories:
  - notes
lang: eng
publish: true
toc: 
beginning: true
---

Obsidian is a note system that works on local Markdown files. Here, in this screenshot we can tell, there is a file pane on the left where all notes and folders are there. On the right, Obsidian provides notes in graph view:

![](https://obsidian.md/images/screenshot.png)

> The human brain is non-linear: we jump from idea to idea, all the time. Your second brain should work the same. In Obsidian, making and following **connections** is frictionless. Tend to your notes like a gardener; at the end of the day, sit back and marvel at your own knowledge graph.

That is amazing. Imagine that we read an article, have some notes, and drop it into Microsoft Word. How could we find it again? Have you read Wikipedia for the whole day just like a monkey exploring a forest ,clicking on one article after another? The note system should be a puzzle card of a well-structured knowledge system, acting as you second brain.


## 1 Ideas behind

### Organizing Information by PARA Method

By using PARA, there is no more confusion about where to put my files or folders. There are many <d-cite key="\1"></d-cite>(<d-cite key="\1"></d-cite>(https://fortelabs.co/blog/para/)) have an introduction in detail about PARA method. The key function of PARA is sorting information according to actionability, so that leading to a more organized and efficient daily workflows.

> <d-cite key="\1"></d-cite>- PARA
> 
> !<d-cite key="\1"></d-cite>(https://i0.wp.com/cdn-images-1.medium.com/max/800/1*i6I0M5kaZUOwIfq5q5W4mQ.jpeg?w=900&ssl=1)
> 
> P.A.R.A. stands for **Projects — Areas — Resources — Archives**, the four top-level categories that encompass every type of information you might encounter in your work and life.
> 
>  **Project** 
> - **A project has a *goal* and deadline**.
> - Examples: Complete app mockup; Develop project plan; Execute business development campaign; Write blog post; Finalize product specifications; Attend conference
> 
> **Area**
> -  **A area has a standard to be maintained**, which bad or good you are responsible for. You will continuously work on that to improve your ***performance***.
> - Examples: Health; Finances, Professional Development; Travel; Hobbies; Friends; Apartment; Car; Productivity; Direct reports; Product Development; Writing
> 
> **Resource** 
> - examples: habit formation; project management; transhumanism; coffee; music; gardening; online marketing; SEO; interior design; architecture; note-taking
> 
> **Archives** 
> - examples: projects that have been completed or become inactive; areas that you are no longer committed to maintaining; resources that you are no longer interested in.
> 

![](https://i0.wp.com/cdn-images-1.medium.com/max/800/1*qng-pJJUdoENmYs_3HiISg.jpeg?w=900&ssl=1)

### Getting Things Don (GTD)

After turning your goals into projects, we need to accomplish it by spending our time. How can we arrange our daily life, to balance the study, life, work and family? Here I introduced the book *Getting Things Done*. I highly recommend this <d-cite key="\1"></d-cite>(https://www.youtube.com/watch?v=ODhHTngIMJE) to learn the basic ideas of GTD.

The natural steps of emerging of ideas are capturing, processing and doing. Thus, GTD suggests:
- Establishing an *inbox* to capture all ideas, and free up your brain. The more empty of your mind, the more smooth of your mind, called <d-cite key="\1"></d-cite>(https://en.wikipedia.org/wiki/Flow_(psychology)).
- *Clarifying and organizing* your ideas. 
	- First, we make sure the next step of the plan is **actionable**. 
	- Eisenhower Matrix uses two dimensions, urgent and important, to divide tasks.

In obsidian, we have the <d-cite key="\1"></d-cite>(https://github.com/delashum/obsidian-checklist-plugin) to implement the GTD system. What I do is tagging all tasks with `todo/ing`, `todo/next`, `todo/someday`, `todo/inbox`. And <d-cite key="\1"></d-cite>(https://github.com/obsidian-tasks-group/obsidian-tasks) help you mark and organize them.

!<d-cite key="\1"></d-cite>(https://assets.asana.biz/m/6f89f3691b3dffaa/original/inline-leadership-eisenhower-matrix-4-2x.jpg)

### Kanban Project Management

<d-cite key="\1"></d-cite>(https://github.com/mgmeyers/obsidian-kanban) is the way to visualize your workflows, so that you can better manage it. For any projects, you have several long-term goals, or short-term goals.

![](https://talentvis.com/files/images/blog/2022/05/what-you-need-to-know-about-kanban-board.jpg)



## 2 Obsidian Resources

### Hotkeys (MacOS: `Cmd + *`)
- Do anything by `Ctrl + P`
- Quicker switch by `Ctrl + O`
- Insert links by `Ctrl + K` 
- Graph view by `Ctrl + G`
- Edit/View mode by `Ctrl + E`
- Create links by `[[]]`
- New note by `Ctrl +N`
- New note from templates by `Alt + N`

### Tutorials - Obsidian Hub
<d-cite key="\1"></d-cite>(https://publish.obsidian.md/hub/00+-+Start+here)

## 3 Workflows for Academics

<d-cite key="\1"></d-cite>(https://betterhumans.pub/obsidian-tutorial-for-academic-writing-87b038060522)
<d-cite key="\1"></d-cite>(https://medium.com/@alexandraphelan/an-academic-workflow-zotero-obsidian-56bf918d51ab)

#### Read and Annotate in Zotero PDF Reader
- Using different color to annotate the reading materials.

#### Scratch Annotation by Zotero Integration
-  <d-cite key="\1"></d-cite>(https://github.com/mgmeyers/obsidian-zotero-integration) supports to scratch annotations (text and image) into obsidian notes with specific templates. It's worth to read the docs carefully. 
-  It also supports citations, bibliographies, notes directly from Zotero.

#### Cite References
- Using Zotero integration to cite
- <d-cite key="\1"></d-cite>(https://github.com/mgmeyers/obsidian-pandoc-reference-list)

#### Export Notes into Any Formats
- Export by Pandoc plugin
	- to docx: https://zhuanlan.zhihu.com/p/395193554
	- to tex-pdf: <d-cite key="\1"></d-cite>(https://github.com/Wandmalfarbe/pandoc-latex-template)
