---
layout: project
title: HoechstGAN
description: Virtual Lymphocyte Staining Using Generative Adversarial Networks
img: assets/img/publication_preview/hoechstgan.png
figure: https://raw.githubusercontent.com/georg-wolflein/hoechstgan/master/img/hoechstgan_notex.svg
importance: 1
venue: WACV 2023
authors:
  - name: Georg Wölflein
    institutions: [1]
    url: https://georg.woelflein.eu
  - name: In Hwa Um
    institutions: [2]
    url: https://risweb.st-andrews.ac.uk/portal/en/persons/in-hwa-um(0ac978a2-6ef8-4397-bc36-f920a77696a3).html
  - name: David J Harrison
    institutions: [2, 3]
    url: https://risweb.st-andrews.ac.uk/portal/en/persons/david-james-harrison(6bb6c114-15d1-4b0d-9091-8ce3ce9c2c7d).html
  - name: Ognjen Arandjelović
    institutions: [1]
    url: https://risweb.st-andrews.ac.uk/portal/en/persons/oggie-arandelovic(fdd98ab1-564a-42a3-bf0c-fab7afbbd63c).html
institutions:
  - id: 1
    name: School of Computer Science, University of St Andrews
  - id: 2
    name: School of Medicine, University of St Andrews
  - id: 3
    name: Division of Laboratory Medicine, Lothian NHS University Hospitals, Edinburgh
links:
  paper: https://openaccess.thecvf.com/content/WACV2023/html/Wolflein_HoechstGAN_Virtual_Lymphocyte_Staining_Using_Generative_Adversarial_Networks_WACV_2023_paper.html
  code: https://github.com/georg-wolflein/hoechstgan
  poster: /assets/pdf/hoechstgan_poster.pdf
  video: https://www.youtube.com/watch?v=ZSGeX33TeEM
  dataset paper: https://www.mdpi.com/2306-5729/8/2/40
  dataset: https://www.ebi.ac.uk/biostudies/bioimages/studies/S-BIAD605
abstract: The presence and density of specific types of immune cells are important to understand a patient's immune response to cancer. However, immunofluorescence staining required to identify T cell subtypes is expensive, timeconsuming, and rarely performed in clinical settings. We present a framework to virtually stain Hoechst images (which are cheap and widespread) with both CD3 and CD8 to identify T cell subtypes in clear cell renal cell carcinoma using generative adversarial networks. Our proposed method jointly learns both staining tasks, incentivising the network to incorporate mutually beneficial information from each task. We devise a novel metric to quantify the virtual staining quality, and use it to evaluate our method.
tldr: We present a means of translating a cheap type of chemical staining to multiple more expensive ones using generative adversarial networks.
---

# Data

Our dataset is available in the [BioImage Archive](http://www.ebi.ac.uk/bioimage-archive) under accession number [S-BIAD-12345](https://www.ebi.ac.uk/biostudies/bioimages/studies/S-BIAD605).
We have published an accompanying [article](https://www.mdpi.com/2306-5729/8/2/40) in the _Data_ journal that contains a detailed description of the dataset.

# Citation

If you would like to cite our work, please use:

```bibtex
@inproceedings{hoechstgan,
  title = {HoechstGAN: Virtual Lymphocyte Staining Using Generative Adversarial Networks},
  author = {W\"{o}lflein, Georg and Um, In Hwa and Harrison, David J and Arandjelovi\'{c}, Ognjen},
  booktitle = {Proceedings of the IEEE/CVF Winter Conference on Applications of Computer Vision (WACV)},
  month = {January},
  year = {2023},
  pages = {4997--5007}
}

@article{hoechstgan_dataset,
  title = {Whole-Slide Images and Patches of Clear Cell Renal Cell Carcinoma Tissue Sections Counterstained with {Hoechst} 33342, {CD3}, and {CD8} Using Multiple Immunofluorescence},
  author = {W\"{o}lflein, Georg and Um, In Hwa and Harrison, David J and Arandjelovi\'{c}, Ognjen},
  journal = {Data},
  volume = {8},
  year = {2023},
  month = {February},
  number = {2},
  article-number = {40}
}
```

# Acknowledgements

GW is supported by Lothian NHS. This project received funding from the European Union’s Horizon 2020 research and innovation programme under Grant Agreement No. 101017453 as part of the KATY project. This work is supported in part by the Industrial Centre for AI Research in Digital Diagnostics (iCAIRD) which is funded by Innovate UK on behalf of UK Research and Innovation (UKRI) (project number 104690).
