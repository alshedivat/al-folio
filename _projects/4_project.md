---
layout: page
title: Search Engine for News
description: "A SEARCH ENGINE BUILT ONTOP OF NELAGT-2002 DATASET PROVIDED BY HARVARD INDEXING AROUND 150K
DOCUMENTS."
img: assets/img/search.png
importance: 3
category: OpenSource
---

# About The Project

    Simple Python based web server to answer search queries.
    To set it up you need to install some python libraries (refer to setmeup.txt)
    Run RUNSERVER.PY
    Then cd into UI and enter the following code "npm run start"
    Before searching anything please make sure you have created lexicon/forward index/ inverted index
    Upload file optionis given on search page

# Working

    Everythig starts with document uploadation.
    Soon after you upload document the lexicon,
    forward & inverted index are created.

# Lexicon

    Lexicon is stored in dictionary/hashtable

# Forward Index

    After lexicon generation, inverted index in created.
    As searching is done on inverted index, therefore
    while creating forward index we eliminated duplicates
    by creating buckets on docID.

# Inverted Index

    For generating Inverted Index the dataset is divided, multiple(2)
    threads are created and temporary inverted index is created,
    afterward we combine these temporay index. After combining temporary
    indexex are deleted. Information about hitlists canbe obtained from
    forward index.

# Search

    For searching enter the required word or phrase in text box,
    that word or phrase(if phrase divide in small words) is
    passed to invereted index to get result.

# Frontend

    Frontend is mostly in HTML, CSS & React

# Backend

    Backend is in Python.

[link to the repo](https://github.com/EggsyOnCode/search-engine-news)
