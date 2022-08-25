---
title: On Campus Matcher App
category:
- work
layout: page
description: A mobile app that aims to make university students more social.
img: assets/img/ocm_cover.png
importance: 1
---

University students mostly
suffer from establishing new
social interactions. On
Campus Matcher is a mobile
app that aims to make
university students more
social. Using our app, students
can find new friends from their
sections with similar interests. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/ocm1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/ocm2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/ocm3.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
  OCM app takes section informations from their weekly schedules of people and compares their sections and matches people by looking at their section.  
  Our app uses schedules of people and compares their free hours and matches people by looking at their section. If two people have more than one section in common for the same lessons, it matches these people.  
  The app also has an interest-based matching system and it is tied strongly to schedule-based matching. It basically takes one’s interests, basketball, and tennis for example, as input and matches people with similar interests who have similar free time in their schedule.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/ocm-tech.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    main technologies we used in our project
</div>
    Used <b>Java</b> as main language, developed database using <b>Firebase</b>, used OpenCV and Firebase API for CV purposes. Managed the project using
<b>Github</b>, <b>Github Projects</b>.

{% if site.data.repositories.github_users %}
<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for user in site.data.repositories.github_users %}
    {% include repository/repo_user.html username=user %}
  {% endfor %}
</div>
{% endif %}

---

## GitHub Repositories

{% if site.data.repositories.github_repos %}
<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.html repository=repo %}
  {% endfor %}
</div>
{% endif %}

