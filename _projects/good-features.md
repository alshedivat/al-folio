---
layout: project
title: A Good Feature Extractor Is All You Need for Weakly Supervised Pathology Slide Classification
description: 
img: assets/img/publication_preview/histaug.png
figure: https://raw.githubusercontent.com/georg-wolflein/histaug/master/assets/overview.png
importance: 1
venue: 
authors:
  - name: Georg Wölflein
    institutions: [1, 2]
    url: https://georg.woelflein.eu
  - name: Dyke Ferber
    institutions: [2, 3]
    url: https://www.klinikum.uni-heidelberg.de/personen/dyke-ferber-9789
  - name: Asier R. Meneghetti
    institutions: [2]
    url: https://scholar.google.com/citations?user=GnhtOGMAAAAJ
  - name: Omar S. M. El Nahhas
    institutions: [2]
    url: https://scholar.google.com/citations?user=tE9cPywAAAAJ
  - name: Daniel Truhn
    institutions: [4]
    url: https://www.lfb.rwth-aachen.de/en/institute/team/truhn
  - name: Zunamys I. Carrero
    institutions: [2]
    url: https://scholar.google.com/citations?user=I_G3fPgAAAAJ
  - name: David J Harrison
    institutions: [1,5]
    url: https://risweb.st-andrews.ac.uk/portal/en/persons/david-james-harrison(6bb6c114-15d1-4b0d-9091-8ce3ce9c2c7d).html
  - name: Ognjen Arandjelović
    institutions: [1]
    url: https://risweb.st-andrews.ac.uk/portal/en/persons/oggie-arandelovic(fdd98ab1-564a-42a3-bf0c-fab7afbbd63c).html
  - name: Jakob N. Kather
    institutions: [2, 3, 6]
    url: https://kather.ai/
institutions:
  - id: 1
    name: School of Computer Science, University of St Andrews
  - id: 2
    name: EKFZ for Digital Health, TU Dresden
  - id: 3
    name: University of Heidelberg
  - id: 4
    name: University Hospital Aachen
  - id: 5
    name: Lothian NHS University Hospitals
  - id: 6
    name: University Hospital Dresden
links:
  paper: https://arxiv.org/abs/2311.11772
  code: https://github.com/georg-wolflein/histaug
  video: https://www.youtube.com/watch?v=Tst4XtaT9RE
abstract: Stain normalisation is thought to be a crucial preprocessing step in computational pathology pipelines. We question this belief in the context of weakly supervised whole slide image classification, motivated by the emergence of powerful feature extractors trained using self-supervised learning on diverse pathology datasets. To this end, we performed the most comprehensive evaluation of publicly available pathology feature extractors to date, involving more than 8,000 training runs across nine tasks, five datasets, three downstream architectures, and various preprocessing setups. Notably, we find that omitting stain normalisation and image augmentations does not compromise downstream slide-level classification performance, while incurring substantial savings in memory and compute. Using a new evaluation metric that facilitates relative downstream performance comparison, we identify the best publicly available extractors, and show that their latent spaces are remarkably robust to variations in stain and augmentations like rotation. Contrary to previous patch-level benchmarking studies, our approach emphasises clinical relevance by focusing on slide-level biomarker prediction tasks in a weakly supervised setting with external validation cohorts. Our findings stand to streamline digital pathology workflows by minimising preprocessing needs and informing the selection of feature extractors.
tldr: We perform a comprehensive empirical study on weakly supervised whole slide image classification, showing (i) stain normalisation is unnecessary no matter the choice of feature extractor, and (ii) which publicly available feature extractors are best.
---

# Citation

If you would like to cite our work, please use:

```bibtex
@misc{wolflein2023good,
    title   = {A Good Feature Extractor Is All You Need for Weakly Supervised Pathology Slide Classification}, 
    author  = {W\"{o}lflein, Georg and Ferber, Dyke and Meneghetti, Asier Rabasco and El Nahhas, Omar S. M. and Truhn, Daniel and Carrero, Zunamys I. and Harrison, David J. and Arandjelovi\'{c}, Ognjen and Kather, Jakob N.},
    journal = {arXiv:2311.11772},
    year    = {2023},
}
```

# Acknowledgements

GW is supported by Lothian NHS. 