---
layout: distill
title: How E-commerce Dataset look like and what can we do?
description: an example of analysis and modeling data in E-commerce
date: 2022-08-29

authors:
  - name: Khanh H. Le
    url: "https://lekhanhh.github.io/"
    affiliations:
      name: FPT-Software, HCMC

bibliography: 2018-12-22-distill.bib

toc:
  - name: Preface
  - name: Data preparation
  - name:
      Data cleaning
      # subsections:
      #   -name: Basic cleaning
      # subsections:
      #   -name: Special StockCode
  - name:
      Data Understanding, Data Featuring, Data Visualizing & Data Modeling
      # subsections:
      #   -name: "C" pattern
      # subsections:
      #   -name: Process cancelled Order
      # subsections:
      #   -name: Plot Order by country
      # subsections:
      #   -name: Modelling
      # subsections:
      #   -name: RFM
      # subsections:
      #   -name: Distribution of Customer spending
      # subsections:
      #   -name: Density
      # subsections:
      #   -name: KMean
  - name: Conclusion

# If you use this post as a template, delete this _styles block.
_styles: >
  .fake-img {
    background: #bbb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }
  .fake-img p {
    font-family: monospace;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }
---

**NOTE:**
A simple note

## Preface

In this blog, we're given a E-commerce dataset, let's see what E-commerce dataset look like, what kind of problem we have to face, and how to solve it.

---

## Data preparation

Read dataframe using pandas, import necessary library for future use.
<d-code block language="python">
import pandas as pd
import matplotlib as mpl
import numpy as np
import matplotlib.pyplot as plt
import datetime
%matplotlib inline
data_path = '../data/project_1_udacity_e-commerce.csv'
df = pd.read_csv(data_path, encoding= 'unicode_escape')
df.sample(10)
</d-code>

---

## Data cleaning

Paste code and img later

## Data Understanding, Data Featuring, Data Visualizing & Data Modeling

---

Paste code and img later

Group 0 : Customers recently buy at high frequency and the amount buying is amazing (average 10000) <br>
Group 1 : Customers shopped for a long time, rarely shop with a decent amount, we shoud try to acquire these customer by trying to figure out why they churned <br>
Group 2 : Customers from last month, regularly and highly purchased. <br>

## Conclusion

This blog just show how to pre-process with E-commerce dataset, show one algorithm that help customer segementation for further use.
With this Dataset, we can apply customer churn rate prediction/ detect factor that affect customer churning.
Moreover, we can build a customer porfolio of a business to deeper understand our customer, therefore, build a suitable plan for acquiring new customer with same porfolio, retrieve current customer and build relationship with customer.
