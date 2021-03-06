---
layout: page
title: projects
permalink: /projects/
description: Growing collection of my projects.
nav: true
---
___

## current projects

**Unraveling the performance gap between HPC and cloud computing:** Computational sciences, such as computational cosmology, provide an important pool of first-class, large-scale problems. Although scientists have historically relied on the massive computational resources of High-Performance Computing (HPC) systems to run their software, in the last decade cloud computing has gained popularity among scientists as an alternative to HPC. Despite the extensive literature comparing HPC and cloud systems and promising results, the question of whether cloud computing can match HPC performance for a wide range of scientific applications is still open, and the answer may lead to a better design of cloud systems to promote scientific computing in the cloud.

[pdf](https://drive.google.com/file/d/1BmYea2f3svcwDNG2Qc3zj0JZIUY9PPyU/view?usp=sharing) \| [slides](https://bit.ly/306PlZS)

**Parallel *de novo* genome assembly:** One of the most computationally intensive tasks in computational biology is *de novo* genome assembly, the decoding of the sequence of an unknown genome from redundant and erroneous short sequences. A common assembly paradigm identifies overlapping sequences, simplifies their layout, and creates consensus. Despite many algorithms developed in the literature, efficient assembly of large genomes is still an open problem. In this work, we present new parallel distributed memory algorithms for overlap detection and layout simplification steps for de novo genome assembly and implement them in [diBELLA 2D](https://github.com/PASSIONLab/diBELLA.2D). In addition, other theoretical contributions can be found in the work [BELLA](https://www.biorxiv.org/content/10.1101/464420v5.full.pdf).

[pdf](https://drive.google.com/file/d/1MNE96U3pL8TsbbVPJzW22Buo13LNY5hC/view?usp=sharing) \| [slides](https://bit.ly/3beLtwh) \| [github](https://github.com/PASSIONLab/diBELLA.2D) \| [video](https://www.youtube.com/watch?v=bJky-GMFob4)

**Distributed protein similarity search using sparse matrices:** Identification of similar protein sequences is a central step in many computational biology pipelines, such as homologous protein sequence recognition, generation of similar protein graphs for downstream analyses, functional annotation, and gene location. The performance and scalability of protein similarity search has proven to be a bottleneck in many bioinformatics pipelines due to the increase of cheap and abundant sequencing data. This work introduces a new distributed memory software: PASTIS, which is based on sparse matrix calculations for efficient identification of possibly similar proteins.

[pdf](https://arxiv.org/pdf/2009.14467.pdf) \| [github](https://github.com/PASSIONLab/PASTIS) \| [video](https://www.youtube.com/watch?v=8C46RhPlJKg)

___

## past projects

**A high-performance GPU-based x-drop long-read alignment algorithm:** Pairwise alignment is one of the most computationally intensive cores in genomic data analysis, accounting for more than 90% of the runtime for important bioinformatics applications. This method is particularly expensive for third generation sequences, as the analysis of sequences between 1Kb and 1Mb in length is very computationally intensive. Given the quadratic overhead of exact pairwise algorithms for long alignments, the community relies primarily on approximate algorithms that search only for high-quality alignments and stop early when none is found. In this work, we present the first GPU optimization of the popular x-drop alignment algorithm that we named LOGAN.

[pdf](https://arxiv.org/pdf/2002.05200.pdf) \| [github](https://github.com/albertozeni/LOGAN) \| [video](https://www.youtube.com/watch?v=m1PBeh9oC6E)

**On how to improve FPGA-based systems design productivity via SDAccel:** Custom hardware accelerators are often used to improve the performance of software applications in terms of execution times and reduce energy consumption. However, implementing a hardware accelerator and integrating it into the final system is a difficult and error-prone task. Both industry and academia are continuously developing Computer Aided Design (CAD) tools to assist the designer in the development process. The latest tool released by [Xilinx](https://www.xilinx.com/) aims to improve the hardware design experience by using the OpenCL standard to increase overall productivity and enable code portability. This work provides an overview of the potential of SDAccel and compares the design flow with other methods using two case studies from the field of bioinformatics.

[pdf](https://drive.google.com/file/d/1ThcZPJjMG-cnZRPTW1jgYgO_dNX_Iz49/view?usp=sharing)

**A hardware acceleration of a protein folding algorithm:** Protein folding is the physical process by which a sequence of amino acids in a protein folds into its tertiary structure, which determines the functionality of the protein.
There are several methods to perform this process, one of the most interesting is *ab initio* modeling. This method generates the 3D structure from energetic and geometric features.
However, despite the potential, companies are slowed down by the high computational requirements of the algorithm. Speeding up the execution time would be crucial to increase productivity in such industries.
In this work, we present an accelerated implementation of a *ab initio* protein folding algorithm, which is based on Monte Carlo simulation.

[pdf](https://drive.google.com/file/d/17-KlAbR8sEYMmSuumuIjyhs-tuyCqIWR/view?usp=sharing)
