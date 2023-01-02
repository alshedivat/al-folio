---
layout: page
title: Quora Question Pairs
description: Can you identify question pairs that have the same intent?
img: assets/img/smai/quora.png
importance: 4
category: course
---

##### Objective:

Given two Quora questions, determine whether they are similar or not using various traditional ML and DL models with an extensive feature engineering.

##### Dataset:

The dataset is taken from the [Quora Question Pairs competition on Kaggle](https://www.kaggle.com/c/quora-question-pairs). The dataset contains 404,290 question pairs with a label that denotes whether the two questions are similar or not. The dataset is split into a training set and a test set. The training set contains 363,861 question pairs, while the test set contains 40,429 question pairs.

##### Approach:

The approach is divided into three parts:

1. Linear Models (with Unigrams, Bigrams, and Trigrams)
    1. Logistic Regression
    2. Linear SVM
2. Tree-based Models
    1. Decision Trees
    2. Random Forest
    3. XGBoost
3. Deep Learning Models
    1. CBOW + MLP
    2. GloVe + LSTM
    3. GloVe + BiLSTM
    4. GloVe + LSTM + Attention
    5. GloVe + BiLSTM + Attention
    6. BERT (Best Model)

$$\rightarrow$$ *More details can be found in the [project report](https://github.com/rodosingh/SMAI-IIITH/blob/main/Projects/Team-25_Abraca-Data/Team-25_SMAI_Final_Report_Abraca-Data.pdf) as well as the [project repo](https://github.com/DhavalTaunk08/smai_project).*