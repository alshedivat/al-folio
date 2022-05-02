---
layout: page
title: SPyQL
description: SQL with Python in the Middle
img: assets/img/spyql_logo2.png
importance: 1
category: tools
github: https://github.com/dcmoura/spyql
---

[SPyQL](https://github.com/dcmoura/spyql) is SQL with Python in the middle, an open-source project fully written in Python for making command-line data processing more intuitive, readable and powerful. Try mixing in the same pot:

* a SQL SELECT for providing the structure;
* Python expressions for defining transformations and conditions;
* the essence of awk as a data-processing language;
* the JSON handling capabilities of jq.

## How does a SPyQL query look like?

```
IMPORT pendulum AS p
SELECT
    (p.now() - p.from_timestamp(purchase_ts)).in_days() AS days_ago,
    sum_agg(price * quantity) AS total
FROM csv
WHERE department.upper() == 'IT' and purchase_ts is not Null
GROUP BY 1
ORDER BY 1
TO json
```

Simple, readable, and, as with all SPyQL programs, it's an 1-liner. In a single statement, we are:
1. reading a CSV (of purchases) with automatic header detection, dialect detection, type inference and casting,
2. filtering out records that do not belong to the IT department or do not have a purchase timestamp
3. summing the total purchases and grouping by how many days ago they happened,
4. sorting from the most to the least recent day and
5. writing the result in JSON format.

All this without loading the dataset into memory.

SPyQL will change data-processing in the terminal, making it accessible to anyone who knows a little-bit of Python and understands the basics of a SQL SELECT. On the other hand, it will give super-powers to experienced users. The possibilities are endless as you can import any Python library, and pipe data from/to any command-line tool. From querying APIs and Kafka, to write to files or databases, SPyQL will be the tool of choice for processing data in the command-line!

## Testimonials

<blockquote>
I'm very impressed - this is some very neat pragmatic software design.
— Simon Willison, Creator of Datasette, co-creator of Django
</blockquote>


<blockquote>
I love this tool! I use it every day...
— Alin Panaitiu, Creator of Lunar
</blockquote>

<blockquote>
Brilliant tool, thanks a lot for creating it and for the example here!
— Greg Sadetsky, Co-founder and CTO at Decibel Ads
</blockquote>


## Pointers

* [Repo @ GitHub](https://github.com/dcmoura/spyql)
* [Demo video](https://vimeo.com/danielcmoura/spyqldemo)
* [Slides from FOSDEM22](https://fosdem.org/2022/schedule/event/python_spyql/attachments/slides/5054/export/events/attachments/python_spyql/slides/5054/spyql_fosdem22_slides.pdf)