---
layout: page
title: ETL Pipeline using Spark
description: Building ETL Pipeline using Spark
img: 
importance: 4
category: Data Engineering
---

*You can find the full code in [here](https://github.com/DanielDaCosta/spark-etl)*

ETL pipeline using Spark that loads data from s3, processes the data into analytics tables, and loads them back into s3.

# AWS Credentials

We are using aws as environment variables in this repo:
```bash
export AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY>
export AWS_DEFAULT_REGION=<YOUR_REGION>
```

# EMR Cluster and Pyspark Job

The EMR set up was done through the console, you can check the tutorial on this [link](https://www.youtube.com/watch?v=gOT7El8rMws) or [here](https://www.youtube.com/watch?v=r-ig8zpP3EM)

# References

- https://www.youtube.com/watch?v=gOT7El8rMws
- https://www.youtube.com/watch?v=r-ig8zpP3EM

