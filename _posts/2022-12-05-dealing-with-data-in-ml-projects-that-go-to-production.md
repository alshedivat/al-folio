---
layout: post
title: "Dealing with data in ML projects that go to Production"
date: 2022-12-05 04:00:00
description: Analysis of problems and tools at our disposal
tags: ['MLOps', 'Spark']
---
- [1. Introduction](#1-introduction)
- [2. Do you need data version control?](#2-do-you-need-data-version-control)
- [3. Tools for dealing with data in ML projects](#3-tools-for-dealing-with-data-in-ml-projects)
  - [3.1 Git, Git-LFS](#31-git-git-lfs)
  - [3.2 Data Version Control (DVC)](#32-data-version-control-dvc)
  - [3.3 Delta Tables (Databricks)](#33-delta-tables-databricks)
  - [3.4 Honorable mentions](#34-honorable-mentions)
- [4. Conclusion](#4-conclusion)


# 1. Introduction

"Data" in a Machine Learning (ML) project can mean many things:
* The train/validation/test data needed to train/validate/test a machine learning model;
* A special/proprietary tokenizer for Natural Language Processing (NLP) projects;
* A not-so-small map between entities/variables;
* An "auxiliary" model, usually static, as the ones used for generating embeds, object detection, etc;
* and more...

In this blog post "data" will have this loose definition: any file/artifact that usually is not produced by the developer, having a very wide range of sizes (from KB in case of small data sets to GB in case of big NLP models).

With that in mind, a Data Scientist (DS) or Machine Learning Engineer (MLE) should have a solution to store, version, and deploy the data. In an enterprise setting these concerns becomes the questions:
1. Where is the data stored? How can we configure the access control?
2. Can we have version control? Do we even need that? 
3. Deployment to Production and syncs with the Development environment. Do we need environments synced?

<p style="margin-bottom:0;">
    <details><summary>(click to expand) <strong>Suggestion when starting</strong></summary>
    
    When working on an ML project beyond a Proof of Concept (POC), consider building a list of all data dependencies (not only the external ones).

    </details> 
</p>


# 2. Do you need data version control? 

From the questions raised in the introduction, you may be thinking: *Do I even need such a thing as version control on all my data?*

The not-so-surprising answer is: **It depends.**

What is the motivation for data version control then?

1. Incident recovery and rollbacks;
2. Model training and data pipelines reproducibility;
3. Bonus: doing a historic data analysis going into the past.

Ok ok, it seems like good capabilities to have, at least for the second point, a crucial one from the ML operations (MLOps) point of view. But having it for all data maybe be troublesome and add no real value. So, **what are the cases in that version control is not necessary?**

* If the data doesn’t change frequently or doesn't change at all;
* If new data is only appended, not deleted or updated;
* If the data changes frequently and the updates make more sense being modeled (e.g. receiving events from external sources that it is not reliable, it makes more sense to have all events in a table with their timestamp)


# 3. Tools for dealing with data in ML projects

With the objective of answering the 3 starting questions, some of the following tools you may consider.

## 3.1 Git, Git-LFS

1. **Where is the data stored?** On the GIT remote servers, being external providers (e.g. [Github](https://github.com/), [Gitlab](https://about.gitlab.com/), [Gitbucket](https://gitbucket.github.io/), [Bitbucket](https://bitbucket.org/product)...) or self-provided.
2. **Can we have version control?** Very strong and familiar version control for developers.
3. **Deployment and sync between environments?** Given most projects relies on container images, having the data with the code is the easiest way to deploy it between environments, just needs to deploy the container image.

Other points to consider:
* :white_check_mark: Strong versioning and very difficult history deletion;
* :white_check_mark: Data format agnostic;
* :x: Container image size: depending on the data size the Continous Delivery (CD) pipelines will slow down and might break due to disk space usage;
* :x: Default data comparison: you will need to download both file versions and compare if the format is not human-readable. Examples of human-readable: CSV and JSON. Examples of not human-readable: binary and parquet;
* :x: Max file size of 100 MB on default git and 10 GB on git-lfs.

## 3.2 Data Version Control ([DVC](https://dvc.org/))


1. **Where is the data stored?** It accepts many [backends](https://dvc.org/doc/command-reference/remote/add#supported-storage-types) (this is pretty awesome by the way).
2. **Can we have version control?** Yes, very git-like.
3. **Deployment and sync between environments?** Just like git you may do a "`git pull`" with a flag.

Other points to consider:

* :white_check_mark: Git-like interface;
* :white_check_mark: Data format agnostic;
* :white_check_mark: Ability to use multiple backends;

*Personal note: It is a great tool for migrating from the limitations of Git and Git-LFS, but not so good for big data environments.*

## 3.3 Delta Tables (Databricks)

1. **Where is the data stored?** Multiple backends, usually some data lake (ADLS, S3, etc).
2. **Can we have version control?** Yes, delta history.
3. **Deployment and sync between environments?** Needs to be implemented.

Other points to consider:

* :white_check_mark: Easy data comparison: For example, one can use in the same SQL query multiple table versions;
* :white_check_mark: Can configure retain policy and when to run VACUUM commands, so we can control the period of the data history, consequently, its size;
* :white_check_mark: :x: Better suited to be used with Spark;
* :x: Easy table deletion history;
* :x: Fixed data format: tables.



## 3.4 Honorable mentions

**[MLflow](https://www.mlflow.org/)**: best option when thinking about versioning models;

**[Pachyderm](https://www.pachyderm.com/)**: core feature is to run and version data-driven pipelines. Seems to want to do many things at once, too convoluted to be used to solve the starting three problem;

**[LakeFS](https://lakefs.io/)**: versions the whole data lake, seems like a tool for a company's data teams.

**[Dolt](https://www.dolthub.com/)**: a SQL database that feels like a git repository. The problem is that it is a database in itself, too big of a solution.


# 4. Conclusion

Given my experiences and analysis of this article, my rules of thumb are:

* For data below 100 MB use GIT, for bigger than that, although you could use GIT-LFS, it slows down and may break CD pipelines. GIT is robust and time-proven, also,  deploying data in environments is automatic as we usually build container images with all files of the code repository.

* For bigger data, give preference to Delta Tables as we can control table history range and consequently its size. As our team usually works with Spark, DVC does not show to be too much compelling when compared to Delta tables.
