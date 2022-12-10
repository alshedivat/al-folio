---
layout: page
title: ciphers of the times
description: An DH exploration of Victorian-era news, novels, and their intersections.
img: assets/img/ciphers_background.jpg
importance: 1
category: public scholarship
---
<strong>Ciphers of <em>The Times</em></strong> is a SSHRC-funded research project that investigates the Agony Column of <em>The Times</em> and its influence on Victorian society and literature. Using an interdisciplinary methodology of computational analysis and close reading we seek to interrogate and expand existing understandings of how the newspaper featured in and informed the composition and readers response to Victorian novels.
<div>
</div>
This project culminated in a joint physical-virtual exhibition, “News and Novel Sensations,” curated in conjunction with the McGill Library from January-March 2023.
---
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/ciphers_logo_rectangle.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Ciphers of *The Times* logo
</div>

**Newspaper Novels**

What is a newspaper novel? It is by no means a settled genre. Neither exclusively novels about newspaper culture nor stories published serially in periodicals, the newspaper novel is a hybrid form that sits at the intersection of 19th-century popular media.  [Jessica Valdez](https://english.hku.hk/people/Faculty/64/Dr_Jessica_Valdez), a scholar of Victorian literature, has put the question of a definition as such, challenging us to "consider novelistic representations of the newspaper and news discourse as sites of experimentation, where novelists tested out and imagined different scenarios for how print media might enter real life.”

Although fictional, Victorian sensation novels drew heavily from contemporary sources, borrowing and expanding upon stories published in the newspaper. We categorize newspaper novels into three groups based on the function of the newspaper within them. In some, newspaper culture shapes the setting of the story, such as in George Eliot’s *Middlemarch* (1871) or Israel Zangwill’s *Children of the Ghetto* (1892). In others, newspapers directly drive the plot, as in Ann Brontë’s *Agnes Grey* (1847) or Braddon’s *Lady Audley’s Secret*. In still others, the form or structure of the novel approximates that of a newspaper itself, as in Andrew Forrester’s *The Female Detective* (1864). Some novels, however, do not fit neatly into any one category. In Charles Dicken’s *The Pickwick Club* (1836), in addition to a plot that follows a rag-tag bunch of reporters, the near-episodic nature of the novel offers readers an experience reminiscent of perusing the newspaper and encountering various stories in sequence.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/ac_background.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>

**The Agony Column**

“A whole romance contained in four little lines”, “seven words [that] gave a three volume novel in a nutshell” — such are the descriptions that 19th-century commentators gave to the collection of personal advertisements known as the 'Agony Column.' Found on the front page of daily Victorian newspapers, the column published individual, largely anonymous contributions sent in by writers from across the British Empire. Though the Agony Column took its name in the early 1850s from the numerous complaints and indiscretions voiced within, over the course of the latter 19th-century it evolved into a public forum for Victorian citizens to communicate with family and friends and, in some cases, engage in clandestine and cryptic correspondences.

Noting the popularity of the column, editors, such as those at the widely read *Times*, placed the advertisements on the cover of the newspaper, second only to shipping information and marriage and death notices. Typically a few dozen words in length, the agony ads were read by lovers, criminals, students, and entertainment seekers alike.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/app_ss.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/pos_ss.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Screenshots from the <a href="https://ciphersdataviz.shinyapps.io/app-1/">Shiny App</a> coded to visualize the results of the classification model.
</div>

**The Data**

The digital exhibition explores data gathered from two decades of agony ads — some 6000+ newspaper issues — between 1860 and 1879, at the height of the Agony Column’s popularity. Much of the analysis and visualizations to follow represents the results of a classification model used to explore instances of intertextual exchange and divergence between the newspaper, Victorian novels, and the so-called newspaper novel, a genre of fiction which incorporates elements of newspaper style or culture. With 220 novels spanning the from 1800 to 1920, our corpus is a small but representative example of the kinds of novels that Victorians were bound to encounter in their reading lives.

{% raw %}
```perl
'project_rec_2feat' <- #define formula for classification in a recipe
  recipe(corpus ~ text + tag, #we are interested in how both raw text
                              #and POS tags influence classification
         data = corpus_train) #this recipe will be trained on 80% of our corpus

'project_rec_2feat_ngrams' <- project_rec_2feat %>% #add tokenizing steps to recipe
  step_tokenize(text:tag,
                columns = c("text", "tag"),
                token = "words") %>% #tokenize
  step_ngram(tag,
             columns = c("tag"),
             num_tokens = 2,
             min_num_tokens = 2) %>% #min defaults to 3, changed to prevent inequality
  step_tokenfilter(text:tag,
                   columns = c("text", "tag"),
                   max_tokens = 1e3) %>% #override filter that limits the number of unique sentences
  step_tfidf(text:tag,
             columns = c("text", "tag"))
```
{% endraw %}

Archival image files of *The Times* were sourced through *The Times* Digital Archive, a Gale-Cengage resource. Optical character recognition (OCR), a process of image-to-text conversion, was completed using Transkribus and with generous support from READ-COOP. We would like to offer thanks to Gallica (Jean-Philippe Moreux) for consulting on data extraction. Data on the Victorian novels was sourced from Project Gutenberg, txtlab's NOVEL450 data set, and HUM19UK.
