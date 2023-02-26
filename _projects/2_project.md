---
layout: page
title: URL Shortner
description: A API that shortens the url entered by the user. Also, stores the searched url into database with SQLAlchemy. 
img: assets/img/url/1.jpg
importance: 2
category: work
---

This is a RESTful API written in Python that allows users to shorten long URLs. It uses a simple interface to accept long URLs from users and generates shortened links that can be used to redirect to the original URLs.

    Technologies used: 
        - Python (Flask)
        - SQLAlchemy
        - JavaScript
        - HTML
        - CSS 
        - Git 
        - JSON Web Tokens
        - passlib


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/url/1.jpg" title="registration page" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/url/2.jpg" title="welcome new user page" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A demonstration of a user registration interface for new users is being showcased.
</div>

The Python program has the following functionality:

1.   Accepting a URL from a user as input.

2.   Shortening the URL using <a href="https://shrtco.de/">shrtcode</a> API.

3.   Storing the shortened URL and user details(Searched URL and username) in a database.

<a href="https://github.com/yash-s0/url_shortner">Source Code</a>
<br><br>
<a href="https://github.com/yash-s0/url_shortner_frontend">Source Code (Frontend)</a>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/url/3.jpg" title="Take URL from user" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    In this section, users are provided with the option to input the URL they wish to shorten.
</div>
