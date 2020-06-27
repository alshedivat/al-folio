---
layout: post
title: Transduction of physical stimuli into neural activity
date: 2019-04-22 11:12:00-0400
description: Examples, cells and receptors, common themes.
---


[Perception][perception] can be defined (in a short and neat way) as *the sensory experience of the world*.  

In this short (and - I hope - just as neat) essay, I would like to discuss the crucial part of the process of perception called "Transduction". 

# Introduction
## What is transduction?
Transduction is a process of conversion of physical or chemical stimulus into electrical impulse (action potential).

![Transudiction input and output](/assets/img/2019-04-22-01.svg)

In other words, the process of transduction can be treated as a "magic box" converting **input** (physical or chemical phenomena) into **output** (neuronal electric activity) through **a series of molecular events**. We can think of such a system as an **[AD][ad] converter**.
 So, before we dive into biochemical machinery "magic box", let's discuss what can come in and what should come out of such a system.   

## Possible Inputs 

### Electromagnetic wave (Vision) 
Through the work of Max Planck, Albert Einstein, Louis de Broglie, Arthur Compton, Niels Bohr, and many others, the current scientific theory holds that [all particles exhibit a wave nature][quantum] and vice versa.
This Wave-particle duality means, that in some sense photon, and an electromagnetic wave is just a different representation of this same unity. This fact determines how photons can differ from each other because the electromagnetic wave can be described by its [amplitude, frequency, and phase][electro].

But how these quantities are related to visible light and accompanying phenomena?
>[Light is an electromagnetic wave that can be seen by the typical human.][lightbook]

**"Can be seen"** refers to the frequency of a wave. A typical human eye will respond to wavelengths from about [400 to 700 nanometers][krotkie]. This corresponds to a frequency band of 405–790 THz. What's more, the frequency of a light wave is [related to its color][lightbook]. 

Some colors (red, orange, yellow, green, blue, and violet) are described by only one frequency. They are called "monochromatic". 
Other, "polychromatic" colors and a white light itself are described by many different frequencies. 

The amplitude of a light wave is [related to its **intensity**][lightbook] which is a light wave's power density. This is an absolute value. Subjective light wave intensitive perceived by the average human eye is called **Brightness**.

Phase differences are not perceived per se but can [produce visible interference effects][interf].

### Chemical Particles (Taste and Smell)

Both Smell and taste are based (mostly) on sensations caused by chemicals. For example, fragrance particles are usually small (>200[Da][da]), volatile, and fat-soluble. On the other hand, the human tongue can distinguish only five flavors: sweet, salty, sour, bitter, and umami. However, one should not forget that the taste impression is also the structure and texture of the food, which draws mechano- and prioprio-receptors to work.

### Medium pressure (Sound)
This case is again about waves, but with a couple of differences. 
 Sound waves are **Longitudinal** which means that particles in a medium (eg. air) are rhythmically compressed and decompressed. It's in contrast to **Transverse** waves, where medium goes up and down (like waves on the water). Sound also requires a medium that affects the parameters of the wave itself. 

 Again, parameters related to wave plays a crucial role. Frequency is described as **Note** (for example 261.625Hz is called "Middle C") and is perceived  by human in a range of [20-20'000Hz][ear]. Speech is in a range of [250-4000Hz][krotkie] which corresponds to the highest frequency resolution area for a human ear. 
 
 Amplitude(pressure) is rescaled and logarithmically transformed into [decibels][decib]. The threshold of hearing is set as **0dB** . Values above **130dB** [cause pain][ear].   

### Mechanical and thermal forces (Touch)
[Touch][touch] is simply a mechanical pressure. It means that sound can also be perceived by somatosensory receptors. Also, the concept of temperature is uncomplicated as well - it's an average of kinetic energy amount owned by particles coming into contact with the skin. Unfortunately, the simplicity of concepts leads to several different receptors. Heat is good, but too much of it should lead to pain, etc. 


## Output (Neural coding) 
As we mention in an introduction, the transduction process can be thought of as an AD converter. It leads to an obvious conclusion, that the output must be in the form of a "digital signal" - and indeed, this is how the brain works. However, the coding method itself is not at all simple, because there's a great variety of information which must be coded just with the frequency and neural cell localization.

### Static and dynamic coding

Sensory fibers can be divided into two categories: **slow** and **fast** 
adapting. Slow adaptive receptors are responsible for the perception of a stimulus that lasts a long time, acting evenly until its completion. The time window in which the neuron is excited corresponds to the duration of the stimulus, and the impulses frequency carries information about its intensity. In turn, fast adapting receptors, since they quickly lose sensitivity, carry information about the change in the intensity (or the fact of appearance) of the stimulus.

### How it works ?

In this example obtained from [here][krotkie], three types of slow and fast adapting mechanoreceptors are exposed to the same stimulus.
[Ruffini's bodies][rufini], as a slowly adaptive receptor, respond throughout the stimulus with a frequency proportional to its intensity.
[The Meissner corpuscles][tactile] adapt quickly and react only when the stimulus changes, at the same time coding the speed of skin deformation.
[Pacinie's corpuscles][pacini] are synthesized the fastest, resulting in the very fact that the stimulus is accelerated.

<img src="/assets/img/2019-04-22-02.png" alt="Static and dynamic coding" width="600"/>

A wide range of receptors makes it possible to encode information about variety of characteristics of an external stimulus.

### Intensity coding

>[The intensity of stimuli is related to an average frequency of action potential firing][krotkie].

This relation is usually linear (the highest the value is, the more frequent spikes are) but not always. For example, hearing hair mechanoreceptors have logarithmic characteristics that allow the reception of stimuli on a very wide scale. 



### Population coding

Despite several possibilities arising from action potential **frequency modulation**, there are still some features (eg. skin temperature distribution) for which one-cell coding is not enough. More sophisticated information must be coded by the joint activities of many nerve cells. This is called [population coding][pop].

# Anatomy and biochemistry of senses 
Finallt, it's time to open the magic box. As we have seen, the specificity of processed stimuli varies greatly, which translates into a variety of solutions.

# Smelling. Olfactory system

## Olfactory epithelium
Olfactory signal transduction occurs in the [olfactory epithelium][olf] located in the upper part of the nasal cavity. Receptor cell dendrites called **olfactory cilia** form subgroups contains from six to twelve units, protruding from the surface of the **epithelial layer**. Only in mammals, about 1'000 different types of fragrance receptors have been identified.  Each such substance can interact (to varying degrees) with two to six different types of receptors, resulting in nearly 10'000 distinct smells.

## Smell Transduction

At the biochemical level, the following process occurs:
1. The fragrance molecule becomes bound to the receptor
2. Increase in cAMP concentration
3. Opening of non-specific cyclic nucleotide gated cationic channels
4. Intense ion (Na, K, Ca) flow
5. Depolarization of olfactory cilia on the dendrite of the olfactory receptor neuron
6. Release of action potential on the axon hillock
7. Digitalised signal is transmitted through the olfactory nerve. 

<img src="/assets/img/2019-04-22-03.png" alt="Smell transduction" width="600"/>

# Taste. Gustatory system

## From the tongue from the taste buds
The taste is processed on the tongue. More specifically, attention should be paid to **lingual papillae** in which there are **taste buds**. At their tops, there are **flavor openings** that direct the particles to **microvilli**, where taste transduction occurs.

There are two categories of receptors. **Metabotropic** receptors are responsible for the impression of bitter, sweet, and umami.
In contrast, **ionotropic** receptors correspond to the sour and salty taste.

**Ionotropic** receptors can directly depolarize the cell. Sour taste (Single proton) are detected by blocking of the potassium channel, which prevents potassium ions from flowing to the outside. In turn, sodium ions found in salty foods are directly caught by epithelial sodium channels.

In **metabotropic** receptors depolarisation is indirect, it occurs through signaling cascade. Taste molecules are bound to matching receptors which triggers G proteins to stimulate the release of phospholipase C. This enzyme breaks [PIP2][pip2] particle bonds into secondary messenger IP3 and DAG. IP3 binds to calcium channels in the **endoplasmatic reticulum** which releases calcium into the cytosol. This fact triggers a couple of different mechanisms leading to cell depolarization.

<img src="/assets/img/2019-04-22-04.png" alt="Taste transduction" width="600"/>

When the cell begins to depolarize, it releases glutamate, which stimulates the afferent nerve.  

# Vision
[olf]: https://en.wikipedia.org/wiki/Olfactory_epithelium
[pip2]: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3496677/
[pacini]: https://link.springer.com/chapter/10.1007%2F978-1-4615-8699-9_15
[tactile]: https://en.wikipedia.org/wiki/Tactile_corpuscle
[rufini]: https://medical-dictionary.thefreedictionary.com/Ruffini+corpuscle
[ad]: https://en.wikipedia.org/wiki/Analog-to-digital_converter
[pop]: https://en.wikipedia.org/wiki/Neural_coding#Population_coding
[decib]: https://en.wikipedia.org/wiki/Decibel
[da]: https://en.wikipedia.org/wiki/Dalton_(unit)
[touch]: https://www.ncbi.nlm.nih.gov/books/NBK21661/
[ear]: http://hyperphysics.phy-astr.gsu.edu/hbase/Sound/earsens.html
[interf]:https://doi.org/10.1103/PhysRev.159.1084
[krotkie]: https://isbnsearch.org/isbn/9788301138059
[quantum]: https://en.wikipedia.org/wiki/Wave%E2%80%93particle_duality
[lightbook]: https://physics.info/light/
[amboss]: https://www.youtube.com/watch?v=pO2x4bsdK9w
[perception]: https://www.verywellmind.com/perception-and-the-perceptual-process-2795839
[electro]:https://byjus.com/physics/characteristics-of-em-waves/
