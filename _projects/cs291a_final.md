---
layout: page
title: Designing, Implementing, and Stress Testing an E-Commerce Website
project_page: true
description: CMPSC 291A Final Project
img: assets/img/CS291A_Final_Cover.png
importance: 2
category: Class Projects
github: https://github.com/saikumarysk/HackOverflow
report_pdf: cs291a_final_report.pdf
---

In this project, we created our mock e-commerce website, "eKirana."
We added dummy users, sellers, products, ratings, authentication, and comments, mimicking the state of a functional e-commerce website.
We used vanilla Ruby on Rails hosted on AWS, backed up by the Postgres database for the production environment.
The project's main aim was not the website itself but how well the website could handle the incoming requests from the users and still serve with low latency.

<div class="row">
    <div class="col-sm mt-md-0">
        {% include figure.html path="assets/img/ekirana_home.jpeg" title="UI For eKirana" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A look at the simple GUI of the website
</div>

For generating user requests, we utilized Tsung, a load testing framework that allows us to use authentication and control over which users query requests.
Using an exponentially increasing number of users, we tested five user flows for a total of 8 mins each to test the rigidity of the website.
We used the metric to minimize the number of 5XX response codes and maximize the number of 2XX and 3XX response codes on average.
By reducing the number of 5XX response codes, and using various optimizations such as pagination, N+1 query optimization, caching, and indexing, we were able to stabilize the website using basic AWS configuration.

But even then, the worst-case latency exceeded 300 seconds.
To decrease this, we tried vertical and horizontal scaling. We explored several configurations of application, load-balancing, and database servers offered by AWS to find the proper configuration that will handle user requests varying from 2 - 1024 users per second.
We finally found the suitable configuration with an average latency of < 100 milliseconds.
We then interpolated the cost of maintaining the service and optimal configuration for user arrival rate.

<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.html path="assets/img/request_mean_500k.png" title="Final Average Latency" class="img-fluid rounded z-depth-1" %}
    </div>
	<div class="col-sm mt-2 mt-md-0">
        {% include figure.html path="assets/img/user_arrival_rate.jpeg" title="Cost per hour per user arrival rate" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Final Average Latency and Cost/hr for eKirana
</div>

<div class='social'>
<div class="contact-icons">
  Source Code: <a href="{{ page.github }}" title="GitHub"><i class="fab fa-github"></i></a>
  Report: <a href="{{ page.report_pdf | prepend: 'assets/pdf/' | relative_url}}" target="_blank" rel="noopener noreferrer"><i class="fas fa-file-pdf"></i></a>
</div>
</div>
