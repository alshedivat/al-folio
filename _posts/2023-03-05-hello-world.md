---
layout: post
title: The importance of building things by yourself
date: 2023-03-05 12:59:00-0400
description: An anecdote of continous development
categories: opinion
related_posts: false
---
Hi,

In this initial post, I want to draft the development of my <a href="https://github.com/SteffenHaeussler/fastapi_skeleton"> FastAPI</a>.

At the beginning of my career as a Data Scientist, I ran into the typical problem of model deployment to production.
In a team of two scientists, I had the chance to write a micro-service <a href="https://github.com/SteffenHaeussler/flask_skeleton">with Flask from scratch</a> out of necessity.

My first service followed strongly the example of <a href="https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world"> Miguel Grinbergs great tutorial</a>. The reason was simple, I couldn't code at this time. Besides no experience and the great help of my co-workers, I could write a production-ready micro-service in a few weeks with the following features:

<ul>
    <li>endpoint versioning</li>
    <li>proper error handling</li>
    <li>background streaming to s3 via kafka</li>
    <li>config dependent on the deployment environment</li>
    <li>prometheus integration</li>
    <li>multiple workers/deployments</li>
</ul>

This basic Flask app ran for more than 3 years in production for multiple projects, before I converted it into <a href="https://github.com/SteffenHaeussler/fastapi_skeleton"> FastAPI</a>.
With more experience, my skeleton supports now:

<ul>
    <li>proper logging in multi-threaded and asynchronous code</li>
    <li>multi-stage docker build</li>
    <li>a response timer</li>
    <li>poetry integration</li>
</ul>

To summarize, this micro-service is rock solid for model serving or handling stateless requests.

This skeleton works as a swiss army knife for me over many years. In a very urgent case of firefighting, it helped me to write an app and put it into production in two weeks. Also, I could transfer the main ideas of this micro-service to other deployment services like kserve. Thanks to FastAPIs integration of OpenAPI, I used it several times to orchestrate discussions between teams for designing APIs.

With the continuous development of this API over several years, I grew as an engineer and became more confident in my skill set. This development was only possible due to the additional effort at the beginning of my career. Afterward, the slow incremental improvement took place over the years whenever I hit some limitations. Independent of your current skill set, take responsibility and build things, even if you don't know how. You will learn on your way and it is fun!



