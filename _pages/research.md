---
layout: page
title: research
permalink: /research/
description: Growing collection of projects and amazing collaborators.
nav: true
---
___

## recent seminar series

**[Cornell Artificial Intelligence Seminar](https://www.cs.cornell.edu/content/parallel-computing-luxury-sine-qua-non-examples-biology-and-machine-learning), Cornell Bowers CIS Computer Science, Ithaca, NY, USA**, *Parallel Computing: From Luxury to Sine Qua Non — Examples from Biology and Machine Learning*, Fall 2022.

**SRI Seminar, [SRI International](https://sri.com/), Menlo Park, CA**, *Parallel Algorithms for De Novo Long Read Assembly using Sparse Linear Algebra*, Summer 2022.

**[CRPL Seminar](https://crpl.cis.udel.edu/), [Department of Computer and Information Sciences](https://www.cis.udel.edu/), University of Delaware**, *Sparse Matrices and High-Performance Computing Meet Biology*, Spring 2022.

**[Berkeley's International Genetically Engineered Machine (iGEM) Group](https://callink.berkeley.edu/organization/igematberkeley), University of California, Berkeley**, *BELLA: Berkeley Efficient Long-Read to Long-Read Aligner and Overlapper*, Spring 2022.

**[Computer Science and Engineering Colloqium](https://engineering.ucsc.edu/departments/computer-science-and-engineering), University of California, Santa Cruz**, *Sparse Matrices and High-Performance Computing Meet Biology*, Spring 2022.

**[Computer Engineering Colloqium](https://www.ece.ucsb.edu/events/all/2022/feb-16-wed-1000am-sparse-matrices-and-high-performance-computing-meet-biology), University of California, Santa Barbara**, *Sparse Matrices and High-Performance Computing Meet Biology*, Spring 2022.

**[SIAM Parallel Programming minisymposium on “Graph Algorithms in the ExaScale Era”](https://meetings.siam.org/sess/dsp_programsess.cfm?SESSIONCODE=73138), SIAM Parallel Programming 2022**, *Sparse Matrices and High-Performance Computing Meet Biology*, Spring 2022.

**[School of Computing and Information Systems Colloqium](https://memento.epfl.ch/event/ic-talk-sparse-matrices-and-high-performance-com-2/), The University of Melbourne**, *Sparse Matrices and High-Performance Computing Meet Biology*, Spring 2022.

**[Cornell Bowers CIS Colloqium](https://cis.cornell.edu/cornell-computing-information-science), Cornell University**, *Sparse Matrices and High-Performance Computing Meet Biology*, Spring 2022.

**[IC Seminar](https://memento.epfl.ch/event/ic-talk-sparse-matrices-and-high-performance-com-2/), EPFL IC**, *Sparse Matrices and High-Performance Computing Meet Biology*, Summer 2021.

___

## projects

**Genome sequence alignment using AI hardware:** Developing high-performance algorithms for genome analysis using AI hardware (e.g., Graphcore and Cerebras). The goal is to show that AI hardware can be effective for scientific computing.

**10 years later: cloud computing is closing the performance gap:** Computational sciences, such as computational cosmology, provide an important pool of first-class, large-scale problems. Although scientists have historically relied on the massive computational resources of High-Performance Computing (HPC) systems to run their software, in the last decade cloud computing has gained popularity among scientists as an alternative to HPC. Despite the extensive literature comparing HPC and cloud systems and promising results, the question of whether cloud computing can match HPC performance for a wide range of scientific applications is still open, and the answer may lead to a better design of cloud systems to promote scientific computing in the cloud.

[pdf2021](https://drive.google.com/file/d/1BmYea2f3svcwDNG2Qc3zj0JZIUY9PPyU/view?usp=sharing) \| [slides pdf](https://bit.ly/306PlZS) \| [slides pptx](https://bit.ly/3rgqTRF) \| [video](https://www.youtube.com/watch?v=B-SJkRlYSSc)

**Parallel *de novo* genome assembly using sparse matrices:** One of the most computationally intensive tasks in computational biology is *de novo* genome assembly, the decoding of the sequence of an unknown genome from redundant and erroneous short sequences. A common assembly paradigm identifies overlapping sequences, simplifies their layout, and creates consensus. Despite many algorithms developed in the literature, efficient assembly of large genomes is still an open problem. In this work, we present new parallel distributed memory algorithms for overlap detection and layout simplification steps for de novo genome assembly and implement them in [ELBA](https://github.com/PASSIONLab/ELBA) (formerly, diBELLA 2D). Our distributed memory algorithms for both overlap detection and layout simplification are based on linear-algebra operations over semirings using 2D distributed sparse matrices. In addition, other theoretical contributions can be found in the work [BELLA](https://www.biorxiv.org/content/10.1101/464420v5.full.pdf). 

[pdf2021](https://drive.google.com/file/d/1MNE96U3pL8TsbbVPJzW22Buo13LNY5hC/view?usp=sharing) \| [pdf2022](https://arxiv.org/pdf/2207.04350.pdf) \| [slides pdf](https://bit.ly/3beLtwh) \| [more slides pdf](https://drive.google.com/file/d/11D82QWCZO6G4aZnWK07hi0ZNS0_E1u1M/view?usp=sharing) \| [slides pptx](https://bit.ly/3sMcXPU) \| [github](https://github.com/PASSIONLab/ELBA) \| [video](https://www.youtube.com/watch?v=sKw-4Bvn86I)

**Linear algebra based long-read overlap detection and alignment:** In this work we introduce BELLA (the shared memory version of [ELBA](https://drive.google.com/file/d/1MNE96U3pL8TsbbVPJzW22Buo13LNY5hC/view?usp=sharing)) and demonstrate the feasibility of the k-mer-based approach through a mathematical model based on Markov chains. Our work provides a novel algorithm for pruning k-mers, which are unlikely to be useful for overlap detection and whose presence would only add unnecessary computational cost. Our reliable k-mers detection algorithm explicitly maximizes the probability of retaining k-mers that belong to unique regions of the genome. The optimal k-mer seed is selected using our binning mechanism, which uses k-mer positions within a read pair to estimate the length of overlap and "bin" k-mers to form a consensus. Finally, we develop and implement a new method to separate true alignments from false positives as a function of alignment score based on Chernoff bounds, and show that the probability of false positives decreases exponentially as the overlap length between sequences increases.

[pdf2021](https://drive.google.com/file/d/132i0RAKyIIWk_BEl1jpf9R_V5eVkKkxT/view) \| [slides pdf](https://drive.google.com/file/d/12f6SGveWHdK84LFpAPfJ05NsN3U1jxJT/view?usp=sharing) \| [github](https://github.com/PASSIONLab/BELLA) \| [video](https://player.vimeo.com/video/564790935)

**Distributed protein similarity search using sparse matrices:** Identification of similar protein sequences is a central step in many computational biology pipelines, such as homologous protein sequence recognition, generation of similar protein graphs for downstream analyses, functional annotation, and gene location. The performance and scalability of protein similarity search has proven to be a bottleneck in many bioinformatics pipelines due to the increase of cheap and abundant sequencing data. This work introduces a new distributed memory software: PASTIS, which is based on sparse matrix calculations for efficient identification of possibly similar proteins.

[pdf2020](https://arxiv.org/pdf/2009.14467.pdf) \| [pdf2022](https://drive.google.com/file/d/1JnGrxK75fhmvw0CPkftodgW6f1XY9nk6/view) \| [github](https://github.com/PASSIONLab/PASTIS) \| [video](https://www.youtube.com/watch?v=8C46RhPlJKg)

**BuDDI: a declarative Bloom language for CALM programming:** In this paper, we show through examples that Bloom is a suitable language beyond classical distributed computing. Based on these examples, we refine the current Bloom implementation, called Bud, and introduce a new language called BuDDI: Bud to enhance Distributed Data Independence. BuDDI hides the challenges of distributed computing from the programmer without compromising performance by using logically global tables.

[pdf2021](https://drive.google.com/file/d/19NnRRct_0myH5Yl7g8WhYBWVwrB60j0n/view?usp=sharing)

**A high-performance GPU-based x-drop long-read alignment algorithm:** Pairwise alignment is one of the most computationally intensive cores in genomic data analysis, accounting for more than 90% of the runtime for important bioinformatics applications. This method is particularly expensive for third generation sequences, as the analysis of sequences between 1Kb and 1Mb in length is very computationally intensive. Given the quadratic overhead of exact pairwise algorithms for long alignments, the community relies primarily on approximate algorithms that search only for high-quality alignments and stop early when none is found. In this work, we present the first GPU optimization of the popular x-drop alignment algorithm that we named LOGAN.

[pdf2020](https://arxiv.org/pdf/2002.05200.pdf) \| [github](https://github.com/albertozeni/LOGAN) \| [video](https://www.youtube.com/watch?v=m1PBeh9oC6E)

**On how to improve FPGA-based systems design productivity via SDAccel:** Custom hardware accelerators are often used to improve the performance of software applications in terms of execution times and reduce energy consumption. However, implementing a hardware accelerator and integrating it into the final system is a difficult and error-prone task. Both industry and academia are continuously developing Computer Aided Design (CAD) tools to assist the designer in the development process. The latest tool released by [Xilinx](https://www.xilinx.com/) aims to improve the hardware design experience by using the OpenCL standard to increase overall productivity and enable code portability. This work provides an overview of the potential of SDAccel and compares the design flow with other methods using two case studies from the field of bioinformatics.

[pdf2016](https://drive.google.com/file/d/1ThcZPJjMG-cnZRPTW1jgYgO_dNX_Iz49/view?usp=sharing)

**A hardware acceleration of a protein folding algorithm:** Protein folding is the physical process by which a sequence of amino acids in a protein folds into its tertiary structure, which determines the functionality of the protein.
There are several methods to perform this process, one of the most interesting is *ab initio* modeling. This method generates the 3D structure from energetic and geometric features.
However, despite the potential, companies are slowed down by the high computational requirements of the algorithm. Speeding up the execution time would be crucial to increase productivity in such industries.
In this work, we present an accelerated implementation of a *ab initio* protein folding algorithm, which is based on Monte Carlo simulation.

[pdf2016](https://drive.google.com/file/d/17-KlAbR8sEYMmSuumuIjyhs-tuyCqIWR/view?usp=sharing)

___

## collaborators

* Vivek Bharadwaj (UC Berkeley)
* Aydin Buluç (UC Berkeley, LBNL)
* Luk Burchard (Simula Research Laboratory)
* David Culler (UC Berkeley, Google)
* Lorenzo Di Tucci (Politecnico di Milano, Huxelerate)
* Saliya Ekanayake (Microsoft)
* Marquita Ellis (IBM)
* Can Firtina (ETH Zürich)
* Rolando Garcia (UC Berkeley)
* Elizabeth Koning (UIUC)
* Richard Lettich (UC Berkeley)
* Israt Nisa (AWS AI)
* Leonid Oliker (LBNL)
* Gabriel Raulet (LBNL)
* Daniel Rokhsar (UC Berkeley, Joint Genome Institute)
* Marco D. Santambrogio (Politecnico di Milano)
* Oguz Selvitopi (LBNL)
* Katherine Yelick (UC Berkeley, LBNL)
* Ed Younis (LBNL)
* Alberto Zeni (Politecnico di Milano)
