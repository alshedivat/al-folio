---
layout: post
title: Creating a Git Repository of an R Project
date: 2023-05-24 11:12:00-0400
description:
header-includes:
   - \usepackage{amsmath}
tags: r programming
categories: r
---


In this tutorial, I will demonstrate the simplest way to maintain a Git repository of an Rproject from RStudio. 

------------------------------------------------------------------------------------------

To get started, please download the interface [Github Desktop](https://desktop.github.com). 

------------------------------------------------------------------------------------------

Then, launch RStudio and create a New Project.

**New Project $$\rightarrow$$ New Directory $$\rightarrow$$ Project Type New Project**

{% include figure.html path="assets/img/git_r2.jpeg" class="img-fluid rounded z-depth-1" %}

When doing so, make sure to enable Git by checking the box “Create a git repository”, and I would recommend to check the box [renv](https://rstudio.github.io/renv/articles/renv.html), but it is not necessary. Provide a helpful name for the repository. 

------------------------------------------------------------------------------------------

In the **GitHub Desktop**, click on the **Add** button in the upper left corner and select **Add Existing Repository**.

{% include figure.html path="assets/img/git_r.jpeg" class="img-fluid rounded z-depth-1" %}

After that is done, open **GitHub Desktop** and you will see that you can **published** this Repository on **Github**. This will create the Repository directly on Github.

You can push any changes in the repository, by clicking the "Push" button to get your RProject into Github.

------------------------------------------------------------------------------------------

Hope this helps!
