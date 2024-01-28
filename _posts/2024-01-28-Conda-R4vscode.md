---
layout: post
title: **"Installing R in Conda Env and Easy Use with VScode"**
date: 2024-01-28
description: A better way to control the R version for different projects and easy use with the VScode console
tags: code
categories: site-posts
giscus_comments: true
related_posts: true
published: true
toc:
  sidebar: left
# beginning: true
---
There is already a useful [Webpage](https://astrobiomike.github.io/R/managing-r-and-rstudio-with-conda) describing general steps. 
However, I would prefer to summarize it below with an easy way to use in VScode.

## **Setting up a Conda Environment with R**
Can either install R by creating a new conda environment
```shell
conda create -n ENVNAME -c conda-forge r-base=R-VERSION
```
or install R directly within an activated conda environment
```shell
conda install -c conda-forge r-base=R-VERSION
```

## **Installing Essential Packages for VScode-R**
The R Essentials bundle contains approximately 200 of the most popular R packages for data science, 
including the `IRKernel`, `dplyr`, `shiny`, `ggplot2`, `tidyr`, `caret`, and `nnet`. 
It is good enough to install this package for using R with conda env.
Apart from that, `httpgd`, `languageserver` and `radian` are also three useful packages for **VScode-R** as stated in the R extension info.
To quickly install them together with R Essentials, I uploaded a package bundle `r-4vscode` for easy installation:
```shell
conda install -c demiwlw r-4vscode
```
Now you can simply execute `radian` (or `r` if you add an alias for `radian`) in the terminal to 
open the R console in the activated conda environment!

> ##### TIP
> To set alias for radian, execute
> ```echo 'alias r="radian"' >> ~/.zshrc && source ~/.zshrc``` (for MacOS)
> To create a simple custom bundle metapackage that contains several popular programs and their dependencies:\
 ```conda metapackage custom-bundle 0.1.0 --dependencies PACKAGES --summary "My custom bundle"```\
 Then we can share the new metapackage by uploading it to the channel on [anaconda.org](https://anaconda.org/).
{: .block-tip }
