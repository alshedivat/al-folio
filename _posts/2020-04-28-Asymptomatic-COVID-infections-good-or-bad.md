---
title: "Asymptomatic transmission could be good or bad, depending on changes in transmisibility"
description: "A paper written to model SARS-CoV-1 raises questions for me about asymptomatic transmission of SARS-CoV-2 "
toc: false
comments: true
layout: post
hide: false
search_exclude: false
categories: [epidemiology, paper_review, covid19]
author: Jason Fleischer
---

# Asymptomatic individuals with SARS-CoV-2

One of the striking things about this epidemic (for me) is the increasing evidence that a metric ton (that's a scientific term, y'all) of infected people may be completely asymptomatic. And I'm not talking about people who are infected who later develop the symptoms as the disease progresses. I'm talking about people who are carriers but never display symptoms, even far after the normal incubation period.

There are several places where an outbreak has occurred in a closed population that can be instensely studied.  Several are ships: the Diamond Princess cruise ship, the American aircraft carrier Roosevelt, and the French aircraft carrier de Gaulle. Interestingly, the first one is mostly old people, while the last two are mostly young people.  It's well known at this point that age is the biggest single risk factor for serious complications and death; and the asymptomatic rate of the navy ships is around 50-60% where as its more like 40% for the cruise ship full of old people. There are also other well-studied populations/locations, and some of these have  asymptomaticity estimates into the 80% range!

{% twitter https://twitter.com/EricTopol/status/1252356183077208082?s=20 %}

An interesting recent [summary of these natural experiments can be found from TSRI authors D. Oran and E. Topol](https://www.scripps.edu/science-and-medicine/translational-institute/about/news/sarc-cov-2-infection/index.html). TL;DR They estimate that the true underlying asymptomatic rate might be in the 40% range. I'm thinking that there probably are very different asymptomatic rates for different age groups, and that could be very important if we're going to make models for the purpose of decisions making about stay at home restrictions and closures of businesses and recreation.

# SEIAR model of Hsu and Hsieh, Bulletin of Mathematical Biology (2008) 70: 134–155

In reading up on epidemiology of SARS-CoV-2, I thought it's probably a great idea to start with models of SARS Original&trade; (ain't nothing like the real thing, baby!)  I quickly found [this 2008 paper from Hsu and Hsieh](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.442.4906&rep=rep1&type=pdf). In it they extend a normal SEIR compartmental model to include asymptomatic individuals.

Some may ask, what's a compartmental model? It's just a lumped population model using differential equations.  Everyone who is **S**usceptible to the virus goes in one pot, everyone **E**xposed goes in another pot, the **I**nfected go into another, and a final pot for those who have been **R**emoved either by recovering or death. The diff eqs model how quickly people move between the pots. The rate of infection is controlled by several parameters, but dictated by how many people are in the *I* pot.  More infected people means more new exposed.  [Here's a quick explainer with math and plots](https://www.idmod.org/docs/hiv/model-seir.html) (from which i'm stealing the diagram below)

![SEIR model diagram](https://www.idmod.org/docs/hiv/_images/SEIR-SEIRS.png)

As with all models, this kind makes assumptions and has limitations. For example, SEIR models need extension to capture the spatial spread of disease (a person is just as likely to get infected by someone far away,  as they are by a neighbor), or to deal with young vs. old as different subpopulations.

H+H add a new compartment to the model, filled with people who remain asymptomatic until they remove/recover. The critical result they have is this:

> Conditions are given for bistability of equilibria to occur, where trajectories with distinct initial values could result in either a major outbreak where the disease spreads to the whole pop- ulation or a lesser outbreak where some members of the population remain uninfected. This dynamic behavior did not arise in a SARS model without asymptomatic infective class

In plain English, they asked the question "does adding asyptomatic people to an outbreak make the situation better or worse?", and the answer was "it depends."  Depending on parameters, either the outbreak went until everyone was infected, or it stopped before that with a significant chunk of the population never being exposed to the disease.

Why? Consider that asymptomatic people could  spread the disease more easily, because they wouldn't stay home/wear a face mask/be careful. Or they might hardly spread it at all because they aren't coughing and sneezing. The effect on the outbreak depends critically on the interaction of parameters that represent the transmissibilty of asymptomatic vs. normal symptomatic infectious people.

Also notable to me is that in some parameter regimes, the asymptomatic cases fall to 0 last, meaning a change in conditions, like the lifting of restrictions, could potentially reignite an outbreak from them.

Now finally, consider [this March 20 paper by Li et al. on SARS-CoV-2 spread in China](https://science.sciencemag.org/content/early/2020/04/24/science.abb3221). They looked at the spread of the virus within China from Jan 10 - Feb 8. They estimate that

1. Around 80%+ of carriers are asymptomatic
2. Asymptomatics are around half as good at transmitting the virus to others as normal-symptomatic people 
3. Because of their higher prevelance, asymptomatics are responsible for the vast majority of infections, in spite of their lower transmissibility

This naturally raises the question of what happens when you do an analysis in the style of H+H on the mdoel from Li et al.  I am not a real epidemiology modeler, just a data scientist / computational modeler used to working with biological research. Also I'm stuck at home with a preschooler and I shouldn't even have taken the hour off from my real work to write this blog post.  Anyone out there interested in this?

# A thought experiment

What happens in cases where an asymptomatic person is brought into close contact with a susceptible person.  Like nursing homes, where a caretaker is often lifting old people in and out of bed?  Or when bars reopen and people pair off joyously because they haven't had the chance in weeks?  Something much different than when asymptomatic people pass by each other in a grocery store 6 ft away.

My current daydream is the idea of a metapopulation SEIAR style model with subpopulations representing different age groups. Exploring the parameters of ineraction beween the age groups as well as asymptomatic transmission. And yeah, we need data about asymptomaticity that includes age information.

I'd love to see more modeling of this kind being used for decision making about restrictions.  I'd love to see people do things to combine age group models and asymptomatic models.  Is anyone already doing it that I'm not aware of?



