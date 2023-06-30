---
layout: post
title: Generative simulation, a paradigm towards generalist robots
date: 2023-06-25
description: Theophile Gervet and Zhou Xian
categories: 
giscus_comments: false
related_posts: false
toc:
  sidebar: left
---

### TLDR

Today, robots excel as specialists in structured environments, such as the robot arms employed by Amazon for picking and packaging products within warehouses. 
However, the true potential of robotics lies in the realm of **generalist robots operating in unstructured environments**. 
Imagine mobile robots capable of assisting the elderly with showering, dressing, maintaining a clean home, or even preparing meals. 
These versatile robots must possess the ability to handle diverse tasks involving unfamiliar objects within new surroundings. 
Achieving such broad generalization necessitates **learning from large-scale and diverse data**. 

In robotics, three significant data sources come into play: passive Internet data (such as YouTube videos of humans doing daily activities that robots can emulate), real-world robot experience, and simulated robot experience. 
In this post, we’ll go through the distinct opportunities and challenges to scale each data source and conclude that the **most cost-effective approach lies in scaling simulated robot experience**. 
We can use the magic powers of **generative machine learning** models trained on Internet data to simulate the wide variety of tasks we might want robots to do (e.g., cleaning a sink, cooking a pizza) in the dizzying range of environments robots will need to operate in (e.g., a house kitchen, a hospital bedroom). 
This can dramatically enhance the scale and diversity of simulated robot experience, unlocking the **generalist robots** we need. 
You can find details in our [white paper](https://arxiv.org/abs/2305.10455).

### Where robots are today and where we want to take them

The prevailing robots of today predominantly excel as specialists in structured environments. Amazon warehouse robots are a perfect example: they do a single thing really well — for example, pick up products from bins — isolated as much as possible from the rest of the world.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/generative-simulation/1.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Imagine how much more broadly robots could be used if they were able to perform any physical labor in any environment, just like ChatGPT and its future iterations will soon be able to complete increasingly complex tasks about any domain in the virtual world. 
They could help your grandparents take a shower and dress up in the morning, transfer patients to hospitals, clean your home, or even improvise dinner with what’s in the fridge. 
**Most of the value of robotics will come from such generalist robots.**

So why are we not there yet? 
Well, robotics is really hard. 
Robots must be able to (1) perceive the world (similar to how our brains interpret visual and tactile information), (2) understand human intentions (for example, instructions in English), and (3) translate these into physical actions using motor controls. 
Accomplishing this reliably across diverse tasks and environments turns out to be extremely hard. 
This challenge is often called **Moravec’s paradox: the surprising realization that teaching machines uniquely human “high-level” abilities like abstract thought and reasoning can be relatively easier than “low-level” perception and motor control.** 
It explains why AI is mastering games or dialogue, but robots are conspicuously missing from this revolution. 
According to Moravec, this can be attributed to the fact that it’s harder for us to reverse engineer our sensorimotor skills that have evolved over billions of years than our language and abstract thinking are more recent developments, less than 100,000 years old. 
A more modern line or argument is that we have trillions of digitized words on the web to train language understanding, while we haven’t yet been able to gather the same scale and diversity of data to train perception and motor control.

### Scaling up robotics data is a proven path to get there

The most crucial lesson learned in machine learning in recent years is the significance of **broad generalization**. 
In the realm of robotics, this refers to the ability to handle novel human intentions, involving unfamiliar objects, within new environments. 
**The key to achieving this lies in training models on large-scale and diverse datasets.** 
Consider the language model powering ChatGPT, which learns from the vast expanse of text available on the Internet, or the text-to-image models underlying Midjourney, which leverage hundreds of millions of captioned images.

How can we reach this scale and diversity of data in robotics? 
There are three primary data sources that we can leverage: passive Internet data (such as YouTube videos showcasing human actions), real-world robot experience, and simulated robot experience. 
Let's delve into the opportunities and challenges associated with scaling each of these sources.

### Real-world robot experience

The most obvious source of data is real-world robot experience. 
There are two primary methods for teaching robots through experience. 
The first involves humans demonstrating tasks to the robot, typically through teleoperation, where the robot mimics the actions of expert human demonstrators. 
The second approach entails the robot attempting tasks independently, learning from trial and error, and focusing on the actions that yield successful outcomes.

As you can imagine, the first approach is **not very scalable**. 
It **requires a significant fleet of robots and considerable labor from human teleoperators**. 
Google explored this approach with the Everyday Robots project, collecting around 130,000 robot demonstrations with a fleet of 13 robots over a year and a half, ultimately yielding a system capable of executing only basic pick-and-place tasks in office kitchens. 
The project was discontinued as part of company-wide layoffs earlier this year.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/generative-simulation/2.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The second approach of allowing robots to autonomously explore the world and discover useful behaviors has the potential to alleviate some of the human labor requirements. 
However, it presents its own set of challenges. 
Ensuring **safe and efficient trial and error for robots remains an ongoing issue**. 
You can try randomly moving your arms and legs until you find something useful without hurting yourself and see for yourself that this is hard. 
Additionally, this approach still demands an initial investment and continuous maintenance of a large robot fleet.

This situation leads us to a conundrum: in order to gather sufficient real-world robot experience for training robots to perform a wide range of useful tasks, we need to deploy them at scale to users. 
But no user wants a robot that is not already able to do a wide enough range of useful things. 
This creates a classic **chicken-and-egg problem**, often addressed at the beginning of talks at robotics conferences.

One potentially promising solution to overcome this challenge is to focus on **training robots to excel at a small set of tasks, deploy them in real-world environments, and gather data to progressively expand their capabilities**. 
Tesla has adopted this approach with self-driving cars, and they may soon apply it to their humanoid robot as well. 
This strategy requires substantial upfront investment towards building a robot fleet. 
It is particularly suited for use cases where there is substantial value in performing a small set of tasks exceptionally well. 
Tesla's deployment of humanoid robots in factories, where there is a clear set of tasks that are valuable but not excessively difficult, aligns well with this approach.

However, it remains **uncertain whether this is the most effective path for deploying robots in homes or hospitals**. 
These environments may demand a minimum viable set of capabilities that is more challenging to achieve without an extensive amount of training data. 
Starting the iterative improvement loop necessary to broaden capabilities may face greater hurdles in these contexts.

### Passive Internet data

Our second source of data is the Internet. 
The Internet serves as an exceptional source of data due to its **unparalleled scale**: 5 billion humans using the Internet, many trillions of words written, 30,000 hours of YouTube videos uploaded every hour. 
We already use images on the Internet to train today’s computer vision systems and text on the Internet to train language understanding systems, deployed on robots and elsewhere. 
How else can we leverage Internet data for robotics? 

**YouTube videos, particularly those featuring human activities**, hold significant value. 
The robotics community is exploring two primary approaches to leverage these videos: **learning how humans interact with objects to accomplish daily tasks, and understanding how the world behaves**, including predicting the outcomes of actions prior to execution. 
Let's examine these approaches through an example.

Imagine standing in the kitchen of your friend’s house you’re visiting for the first time. 
Even without taking any specific actions, you already know how to interact with most objects and can anticipate how they’ll behave as you manipulate them. 
For instance, you instinctively know that opening the oven involves pulling its handle downwards while opening drawers requires pulling them outward and turning on the water involves rotating the tap sideways. 
This intuitive grasp of physics enables you to predict that pulling the oven handle upwards will yield no results.

Both of these capabilities are incredibly useful for robotics. 
Knowing how humans interact with objects to accomplish daily tasks can dramatically **accelerate the trial and error process for robots**, narrowing down the range of potential actions from limitless possibilities to a much smaller set of actions humans are likely to perform. 
The ability to anticipate outcomes of actions makes it possible to turn the question around and **identify the appropriate actions to achieve desired results**.

Naturally, this approach comes with its own set of challenges. 
Firstly, robots possess bodies that differ from humans, **necessitating adaptation** to effectively interact with objects. 
Secondly, while Internet videos can provide a general understanding of how to interact with an oven, remember your own experience attempting tasks for the first time, such as breaking an egg without shell fragments, chopping vegetables, opening an oyster, or flipping pancakes. 
Even if you watched a YouTube tutorial, you probably had a hard time and needed some trial and error. 
The same holds for robots: fine motor control requires either very precise demonstrations via teleoperation or trial and error. 
Passive learning from Internet data **can mitigate the need for extensive experience data and expedite its collection, but cannot remove the necessity of experience data completely**.

### Simulated robot experience

This brings us to our final data source: simulated robot experience. 
Instead of relying solely on real-world experience, can we gather experience by simulating robot interactions in virtual environments?

To grasp the opportunities and challenges associated with this approach, let's briefly delve into what a simulation entails. 
A simulator is a software tool that replicates real-world processes, such as a robot interacting with objects in its environment. 
It comprises **two main components: physics simulation and rendering**. 
The simulator keeps track of the states of objects within the simulated world, the physics simulation advances their states over time according to the laws of physics (e.g., accounting for gravity or collisions), and rendering generates visual representations of the world captured by sensors (e.g., the robot's cameras).

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/generative-simulation/3.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Collecting data in simulation offers several attractive advantages. 
First and foremost, simulators are **purely software-based**, which significantly reduces the frustrations and challenges associated with working with physical robot hardware. 
Robots are inherently slow and prone to breakdowns, making data collection in the real world a time-consuming and complex process. 
In contrast, data collection in simulation is **orders of magnitude faster** (think millions to billions of times) and **more cost-effective**. 
Instead of investing in a fleet of robots that you need to maintain over time, you can rent GPUs to run your simulations from cloud providers. 

Furthermore, investing in simulation allows for **reusability across iterations of a robot's design and even across different robots**. 
Once a simulated world is built, making modifications to a robot's sensors, end-effectors, or even introducing an entirely new robot can be achieved with just a few lines of code. 
On the other hand, in the real world, significant changes to a robot's hardware or design would render the painstakingly collected real-world data much less useful, requiring additional time and effort to collect new data.

From the perspective of a company developing robotics products, cheaper and faster data collection translates to **quicker product iterations** and improved time-to-market, as well as a **reduced burn-rate**. 
Investing in high-quality simulation not only facilitates data collection but also enables more efficient evaluation of trained robots. 
Real-world evaluation is time-consuming and often requires manual labor from human operators. 
Imagine how much slower software product teams would ship if their regression tests involved team members physically testing things. 
Of course, there’s no way around real-world testing for major updates to the robot hardware or machine learning systems, but not having to do this for every small tweak is a significant advantage.

Despite the promising advantages of simulation, there are critics who raise concerns about its application in robotics. 
One primary argument is the difficulty of transferring robot behaviors learned in simulation to the real world. 
This challenge stems from the accuracy of the simulator's core components. 
If the physics simulation is not precise enough, robots may exploit discrepancies between simulation and reality, resulting in nonsensical behavior when deployed in the real world. 
Similarly, if the rendering does not sufficiently resemble real-world images, the performance of machine learning algorithms can suffer when deployed in real-world scenarios.

However, it is important to note that **today's physics engines and renderers**, such as those developed by Nvidia for their Omniverse platform, have undergone decades of optimization and **are already proficient for a wide range of desired robotic tasks**, such as manipulating arbitrary solid objects. 
Moreover, these technologies **will continue to improve**, driven not only by robotics but also by applications in game and movie production, architecture and construction, and design and manufacturing.

One effective technique to address simulation-to-reality transfer challenges is to introduce randomization in areas where accurate simulation is uncertain. 
For instance, if the exact weight of a plate is unknown, the robot can be trained to manipulate plates with a range of different weights, which is likely to encompass the correct weight. 
This approach has yielded impressive results in simulation-to-reality transfer, as demonstrated by legged and humanoid robots learning to walk from scratch, among other notable achievements. 
With further advancements, we can anticipate more breakthroughs in this area.

The second argument against simulations pertains to their limited diversity in terms of environments and tasks. 
Traditionally, simulations were confined to the predefined scenes, objects, and tasks that were explicitly designed and built by engineers and designers. 
This restricted the range of diversity and the real-world messiness that simulations could capture. 
However, we are now at an inflection point where this limitation is poised to change.

**Generative machine learning** models trained on Internet data have the **potential to dramatically enhance the scale and diversity of simulation tasks, scenes, and object configurations**. 
These models, having learned from the vast expanse of the Internet, possess knowledge about relevant tasks in various domains, the objects typically encountered in those tasks, their arrangements, and the specific objectives to optimize during task completion. 
For example, if you ask GPT-4 about the tasks required to clean a kitchen, it can provide you with a list of tasks such as washing dishes, cleaning countertops, sweeping floors, and emptying the trash. 
Moreover, if you seek step-by-step instructions on how to sweep the floor, GPT-4 can tell you to locate the broom and dustpan, grasp the broom handle, initiate the sweeping motion from a corner of the floor, direct the debris toward the dustpan, and so forth. 
For subtasks like grasping the broom handle, it can generate realistic arrangements of the involved objects and establish an objective function to optimize, such as getting fingers of the robot hand around the broom handle and closing them.

Furthermore, advancements in text-to-3D models enable the generation of arbitrary simulatable 3D objects that can be seamlessly integrated into these tasks. 
This combination holds tremendous potential for expanding the breadth and diversity of simulation scenarios.

### Conclusion

The convergence of physics simulation and graphics with robotics and machine learning holds immense potential for advancing the field of robotics. 
As we aim to enable robots to transition from specialists in structured environments to versatile generalists in unstructured environments, it becomes evident that learning from large-scale and diverse data is crucial. 
Simulated data, fueled by generative ML models trained on Internet data, can provide a cost-effective means to scale up data collection and enhance the capabilities of robots.

To fully exploit this opportunity, it is essential to foster **collaboration** between the two traditionally distinct communities: **physics simulation and graphics, and robotics and machine learning**. 
By bringing together the expertise and insights from these fields, we can accelerate progress in robotics. 

If you share the excitement for this direction and would like to contribute or learn more, check out our [white paper](https://arxiv.org/abs/2305.10455) and reach out!

### Further reading

If you're curious about the topics in this post, below are a few representative works that shaped our thinking which you might find helpful.

**Scaling up real-world robot experience** \\
[RT-1: Robotics Transformer for real-world control at scale](https://ai.googleblog.com/2022/12/rt-1-robotics-transformer-for-real.html) \\
[Robotic deep RL at scale: Sorting waste and recyclables with a fleet of robots](https://ai.googleblog.com/2023/04/robotic-deep-rl-at-scale-sorting-waste.html)

**Leveraging the scale of passive Internet data** \\
[Affordances from Human Videos as a Versatile Representation for Robotics](https://vision-robotics-bridge.github.io/) \\
[Affordance Diffusion: Synthesizing Hand-Object Interactions](https://judyye.github.io/affordiffusion-www/) \\
[UniPi: Learning universal policies via text-guided video generation](https://ai.googleblog.com/2023/04/unipi-learning-universal-policies-via.html)

**Scaling up simulated robot experience** \\
Our white paper: [Towards Generalist Robots: A Promising Paradigm via Generative Simulation](https://arxiv.org/abs/2305.10455)
