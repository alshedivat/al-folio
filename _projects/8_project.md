---
layout: page
title: NoSQL with Apache Cassandra
description: Database modeling in Apache Cassandra
img: /assets/img/cassandra_schema.png
importance: 3
category: Data Engineering
---

*You can find the full code in [here](https://github.com/DanielDaCosta/nosql-apache-cassandra)*

Database modeling in Apache Cassandra

# Structure
## Files

- images
- etl.ipnyb: Contains all elt code
- event_data/: contains csv files that will be used to populate our database

## Database Schema

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/cassandra_schema.png' | relative_url }}" alt="" title="Cassandra tables"/>
    </div>
</div>

# Usage
Setting cassandra instance with docker:

```bash
docker run --name cassandra-db -p 9042:9042 -d cassandra:latest;
```

Run the script `elt.ipynb` in order to populate the database.

# References

- https://www.youtube.com/watch?v=s1xc1HVsRk0&list=PLalrWAGybpB-L1PGA-NfFu2uiWHEsdscD
- https://hub.docker.com/_/cassandra
