# Panexperiment Galactic Science group website

## How to edit homepage

[Edit `_pages/about.md`](https://github.com/galsci/galsci.github.io/blob/master/_pages/about.md)

## How to edit other pages

Browser the [`_pages` folder](https://github.com/galsci/galsci.github.io/tree/master/_pages)

## How to add a new post in the blog

Go to the [`_posts` folder](https://github.com/galsci/galsci.github.io/tree/master/_posts)

Add a file -> Create a new file

Name it with the date and a short version of the title, i.e. `2022-06-22-journal-club-ame-cbass.md`

At the top, add the metadata, this is in YAML format, tags are space separated:

```
---
layout: post
title: Journal Club - AME polarization and C-BASS
description: Daniel Herman and Stuart Harper
tags: journal-club
---
```

Then write below in Markdown

## How to add images

It is not easy to resize in markdown, so better upload an image of the right size initially.

Make sure the image is below a few hundred Kb, then upload it to:

[`assets/img`](https://github.com/galsci/galsci.github.io/tree/master/assets/img)

then in any markdown file include it with:

```
![my image](/assets/img/filename.png)
```

## How to add publications

Edit [`_bibliography/papers.bib`](https://github.com/galsci/galsci.github.io/blob/master/_bibliography/papers.bib)

* Add `selected={true}` to the citation to have it included in the homepage.
* Add `arxiv={xxxx.xxxxxx}` to have the ARXIV button added to the page
* Make sure it has a `url` attribute so that the URL button is prepopulated
* Make sure that the paper name doesn't include a URL (Like an Arxiv link)

Also modify [`_pages/publications.md`](https://github.com/galsci/galsci.github.io/blob/master/_pages/publications.md) to include the publication year if not included already.
