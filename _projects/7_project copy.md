---
layout: page
title: rdbms data modeling
description:
img: /assets/img/rdbms_schema.png
importance: 2
category: Data Engineering
---

*You can find the full code in [here](https://github.com/DanielDaCosta/rdbms-data-modeling)*

## Database Schema

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/rdbms_schema.png' | relative_url }}" alt="" title="RDBMS tables"/>
    </div>
</div>


## Files
- *database.ini*: database credentials(*host, database, user, password, port*)
- *create_tables.py*: run script to create database tables described on the image above
- *etl.py*: run script to tranfer all the data from folder `data` to database
- *sql_queries.py*: all queries
- *etl.ipynb*: step-by-step tutorial on how to prepare the data for insertion

## Usage

1. Starting local PostgreSQL instance:
```
docker-compose up
```

You can edit your database credentials in `database.ini`

2. Create the database running:
```
python create_tables.py
```

3. (optional) Run ETL.ipynb in order to check the full pipeline

4. Run `elt.py`: it will read and process all the files from `song_data` and `log_data`, loading them into the database

## Details

The data insertion is done using three different approaches from `psycopg2` library:

- copy_from
- execute(simple insertition statement)
- executemany

