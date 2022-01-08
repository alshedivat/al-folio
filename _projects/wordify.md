---
layout: page
title: Wordify
description: A webapp that makes it easy to identify words that discriminate categories in textual data.
img: assets/img/wordify.png
importance: 1
category: work
date: "2022-01-04" 
---

Wordify is a free and easy-to-use online text-analysis tool that allows everyone to use the Wordify algorithm proposed in [Wordify: A Tool for Discovering and Differentiating Consumer Vocabularies](https://academic.oup.com/jcr/article/48/3/394/6199426) by Hovy, Dirk and Melumad, Shiri and Inman, J. Jeffrey. I built this online tool in late 2019 when I joined the [MilaNLPLab](https://milanlproc.github.io/) of Dirk Hovy as a research assistant. Since then, I have kept maintaining it In early 2022 we deployed a new, more interactive version.


### Description
At a high level, Wordify makes it easy to identify words that discriminate categories in textual data. For example, to understand how consumer word use varies across contexts. More specifically, Wordify, uses randomized logistic regression (RLR) to identify the words that best discriminate texts drawn from different pre-classified corpora, such as posts written by men versus women, or texts containing mostly negative versus positive valence. 

In the paper, the authors present illustrative examples to show how the tool can be used for such diverse purposes as (1) uncovering the distinctive vocabularies that consumers use when writing reviews on smartphones versus PCs, (2) discovering how the words used in Tweets differ between presumed supporters and opponents of a controversial ad, and (3) expanding the dictionaries of dictionary-based sentiment-measurement tools. They show empirically that Wordify’s RLR algorithm performs better at discriminating vocabularies than support vector machines and chi-square selectors, while offering significant advantages in computing time. A discussion is also provided on the use of Wordify in conjunction with other text-analysis tools, such as probabilistic topic modeling and sentiment analysis, to gain more profound knowledge of the role of language in consumer behavior.

It currently supports the following languages: English, Italian, German, Spanish, Greek, Dutch, Portuguese, French, Danish, Lithuanian, Norvegian, Polish, Romanian, Russian, MultiLanguage, and Chinese.


### Useful links
You can find the code reposity on [Github](https://github.com/MilaNLProc/wordify-webapp-streamlit). The tool can be accessed on the [MilaNLPLab's server](https://wordify.unibocconi.it/), the [MilaNLPLab HuggingFace Space](https://huggingface.co/spaces/MilaNLProc/wordify), and [my personal HuggingFace Space](https://huggingface.co/spaces/pietrolesci/wordify).


### Implementation
Wordify is implemented entirely in Python. It is composed of 4 main parts and each part is built with domain-specific libraries. In particular:

- The UI: `streamlit`

- The IO: `pandas`

- The text pre-processing pipeline: `textacy`, `spacy`, and `vaex`

- The machine learning engine: `scikit-learn`

One of the most notable lessons-learned during the implementation is that using `vaex` to apply the computationally-heavy transformations to each text instance is the fastest solution. In particular, lemmatization with spacy is the slowest part of the text pre-processing pipeline. The suggested way to it speed-up, i.e. using the `nlp.pipe` method, is still too slow to allow for nice interactivity even on moderately large text files (5-10MB). To solve the issue, I surprisingly discovered that calling the `nlp` method to one instance at a time (!), but applying it using `vaex`, is super fast. So, I decided to "pay the price" of allocating time to cast `pandas` dataframes to `vaex`, and then back again, to gain the speed of applying the `nlp` method quickly. At a high level, I did the following

```python
df = ...  # pandas dataframe
text_column = ...  # name of the column containing text

# cast pandas dataframe to vaex dataframe
vdf = vaex.from_pandas(df)

# apply function element-wise using vaex
vdf["processed_text"] = vdf.apply(fn, arguments=[vdf[text_column]])

# cast back to pandas
df = vdf.to_pandas_df()
```

### Deployment
Deployment on the MilaNLPLab's server is done via git pulls - the app runs within a Docker container. Deployment on the HuggingFace Spaces is done via Github Actions.
