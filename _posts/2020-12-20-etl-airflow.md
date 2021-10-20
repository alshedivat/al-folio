---
layout: post
title:  Building an ETL pipeline with Airflow and ECS
date: 2020-12-20 21:01:00
description: ETL is an automated process that takes raw data, extracts and transforms the information required for analysis, and loads it to a data warehouse.
---

ETL is an automated process that takes raw data, extracts and transforms the information required for analysis, and loads it to a data warehouse. There are different ways to build your ETL pipeline, on this post we’ll be using three main tools:

* **Airflow**: one of the most powerful platforms used by Data Engineers for orchestrating workflows.
* **AWS ECS/Fargate**: a container management service that makes it easy to run, stop, and manage your containers.
* **AWS s3**: AWS simple storage service.

The architecture that we will be building follows the schema bellow:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/ETL_architecture.png' | relative_url }}" alt="" title="ETL Architecture"/>
    </div>
</div>
<div class="caption">
    Architecture schema, using AWS, Docker and Airflow. Designed using Lucid.app
</div>

***

You can check the full blog post on my Medium at Towards Data Science: [Building an ETL pipeline with Airflow and ECS](https://towardsdatascience.com/building-an-etl-pipeline-with-airflow-and-ecs-4f68b7aa3b5b)