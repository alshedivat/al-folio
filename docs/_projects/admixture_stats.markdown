---
layout: page
title: admixture and rapid human evolution
description: developing methods and statistics tailored for populations with mixed ancestry
img: /assets/img/admixture_diagrams-10.jpg
importance: 1
---

**This is an ongoing project as part of my dissertation thesis**

Natural selection impacts human attributes from lactase persistence to high altitude adaptation. This is typically thought of as a slow and ancient process. In reality, we are still evolving. Humans continuously encounter new environments and selective pressures, especially as a result of recent migrations in the past few centuries. However, evidence for recent genetic adaptation is scarce because classical methods and statistics are ill-suited for short time frames.

Human migrations also brought previously separated populations together and formed new populations with genetic ancestry from both—termed “admixed populations” (e.g. in the Americas, the Middle East, and South Asia). Admixed populations provide a unique opportunity to study recent human adaptation. A source population can contribute beneficial mutations if it is previously adapted to an environment similar to that of the newly admixed population. Thus, by already having a beneficial mutation in the gene pool, the admixed population is primed to adapt quickly to its new environment.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/admixture_diagrams-13.jpg' | relative_url }}" alt="" title="example image"/>
    </div>
</div>
<div class="caption">
    Diagram displaying chromosomes sampled from populations. Left: neutral scenario; right: selection scenario. Chromosomes are painted by genetic ancestry. A source population (red or blue) can provide a beneficial allele (green) to a recently admixed population. After some generations, the beneficial allele will quickly rise in frequency and alter the patterns of genetic ancestry along the chromosome beyond neutral expectations.
</div>

Although admixed populations are common among modern human populations, there are few methods to confidently detect genetic signatures of adaptation in these groups. There is need for analyses tailored to these populations to characterize adaptation ongoing in humans and its impact on genetic variation or disease risk.

Instead of using classical methods, my work leverages genetic ancestry information. In our [recently published study](https://elifesciences.org/articles/63177){:target="_blank"}, we designed new statistics and a combination of computational methods specific to populations with mixed ancestry. Using these novel methods, we detected evidence of adaptation to malaria in just 20 generations (~500 years) in the human population of Cabo Verde. This constituted one of the strongest strengths of selection ever recorded in human history.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/elife-fig2c.png' | relative_url }}" alt="" title="example image"/>
    </div>
</div>
<div class="caption">
    Fig. 2c from  <a href="https://elifesciences.org/articles/63177" target ="_blank">Hamid et al. 2021</a>. Using our new ancestry-based summary statistic, <i>iDAT</i>, which is designed to detect signatures of recept adaptation in admixed populations, we find that the malaria protective <i>DARC</i> locus (red dot) is an outlier in a genome-wide scan for selection.
</div>

This research has been featured in the press:

- [Malaria threw human evolution into overdrive on this African archipelago](https://today.duke.edu/2021/01/malaria-threw-human-evolution-overdrive-african-archipelago){:target="_blank"}, 2021
- [People in Cape Verde evolved better malaria resistance in 550 years](https://www.newscientist.com/article/2254915-people-in-cape-verde-evolved-better-malaria-resistance-in-550-years/){:target="_blank"}, 2020

The next steps for this project include extending these methods to other admixed populations, comparing the dynamics of our new statistics and classical statistics in admixed populations to better understand their respective limitations, and [designing computer vision methods](https://imanhamid.github.io/projects/selection_scan) that leverage ancesty information for genome-wide scans for variants under selection.