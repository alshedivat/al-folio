---
layout: page
title: Basketball Suite
description: A Training Plan Generator for Basketball to pick the right exercises. It also helps you to track and rate good plans, for better reusability.
img: /assets/img/panthers-suite-screenshot2.png
importance: 1
---

## [Github Repository](https://github.com/ChamsToure/basketball-suite)


    ---
    Tech Stack: Python, Flask, oauth2client, gspread, google sheets
    ---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/panthers-suite-screenshot1.png' | relative_url }}" alt="" title="example image"/>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/panthers-suite-screenshot2.png' | relative_url }}" alt="" title="example image"/>
    </div>
</div>

## Features
- All of the exercises and data is stored in google sheets
- Add, edit or delete data via google sheets
- You can choose the category and the intensity of the training session
- Display the last 5 generated plans
- Rate plans

## Required Python packages
- Flask
- flask-bootstrap
- flask-wtf
- gspread
- oauth2client
- To install all packages at once:
    ```
    pip install flask flask-bootstrap flask-wtf gspread oauth2client
    ```
- To use gspread properly, you have to authenticate to enable API access. Here is the [documentation](https://gspread.readthedocs.io/en/latest/oauth2.html)

## How to use
1. Create a document named "exercises"
2. Each sheet in the document represents a list of exercises
3. Each entry in the list is a complete exercise with the following properties:
    - Name, Category, Level, Description
4. The example.png shows an example file
5. Change the categories to your needs in the service.py file at line 17

