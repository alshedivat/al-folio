---
layout: post
title: Rating TV Shows Using Linear Regression
description: The M Score
tags: data, code
giscus_comments: true
date: 2024-03-09
featured: true

authors:
  - name: Roman Yefimets

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).
toc:
  - name: Equations
    # if a section has subsections, you can add them as follows:
    # subsections:
    #   - name: Example Child Subsection 1
    #   - name: Example Child Subsection 2
  - name: Citations
  - name: Footnotes
  - name: Code Blocks
  - name: Interactive Plots
  - name: Layouts
  - name: Other Typography?

---

A few days ago, I was browsing throw my numerous streaming services looking for a new show to start. `The Blacklist` peaked my interest, as I had seen pop up before and never really gave it a shot. But 10 seasons, now that's a commitment. Not wanting to jump into it right away, I went to see what Reddit had to say. It seemed the consensus was that the show started out well, but just was not worth finishing, as the writing declined in quality. Others suggested that `Person of Interest` would be a better watch. 

An idea began forming in my mind: What if I could use individual episode ratings to get a better picture of how a show performs over time? IMDB had just the data that I needed, but it turns out they don't like handing out API access for personal use. They did however, send me an email pointing me to their [free data set](https://datasets.imdbws.com/), which allowed me to download the needed data in `tsv` format. How neat. With a simple python conversion to `csv` I was easily able to import the data sets into my local MySQL database using `DBeaver`.  

*Using the csv files was actually sufficient as first to get charts going with `Matplotlib`, but sql became much more efficient later when aggregating.*

## Plotting the Data

Using the episode ratings, I plotted my first chart.

{% include figure.liquid loading="eager" path="assets/img/graphs/blacklist-scatter.png" class="img-fluid rounded z-depth-1" %} 

This data might be interesting to look at, but it did not help me with my ultimate goal, which was to compare these results to other tv shows. Enter linear regression.

*"Linear regression is a statistical model which estimates the linear relationship between a scalar response and one or more explanatory variables."* - [Wikipedia](https://en.wikipedia.org/wiki/Linear_regression)

Simple put, It helps us draw a linear line that best fits a set of points. The **slope** of that line is what we are untimely trying to find. 

You are hopefully familiar with the slope-intercept form of the equation for a straight line. 

$$
y = mx + b
$$

Given that all the points in our data set fall on a straight line, this equation is useful to find the slope. However, we need something a little more complex to fit our scattered points.

$$
\beta =  \frac{\sum_{i=1}^n (x_i-\bar{x})(y_i-\bar{y})}{\sum_{i=1}^n (x_i-\bar{x})^2}
$$

Here, $$\beta$$ is the slope of the fitted line. From this point on, lets refer to it as the `M score`

Lets imagine there is a TV show that only aired 2 episodes. The first episode got a rating of 0/10 and the second episode got a rating of 10/10. 
This would give us an `M score` of 10. Similarly, if the ratings were reversed the `M score` would be -10. Thus we have our limits $$-10 \leq M \leq 10$$. A score of $$0$$ would mean that every episode in the show got the same rating. Interesting, the `M score` for most tv shows is very close to $$0$$. 

Lets take a look at `The Blacklist`. Its `M score` is $$-0.0034$$. So it would seem that the consensus was correct, the show seems to slowly degrade overtime, but not by much.

{% include figure.liquid loading="eager" path="assets/img/graphs/blacklist-regression.png" class="img-fluid rounded z-depth-1" %} 

So how does `Person of Interest` compare? It has an `M score` of $$0.0062$$, which is much better than `The Blacklist`, so again the consensus seems to match. 

{% include figure.liquid loading="eager" path="assets/img/graphs/person-of-interest-regression.png" class="img-fluid rounded z-depth-1" %} 


## Exploring the Data

Next lets look at some of the outliers.

Looks like the show `One Night Stand Up` wins with a `M Score` of `8.0` and the show with the lowest `M Score` of `-7.7` is `The Playboy Morning Show`


| Title | Year | M Score | Episode Count |
|:-------------:|:--------------:|:--------------:| :----: |
| One Night Stand Up     |    2008    |       8.0 | 2 |  



{% include figure.liquid loading="eager" path="assets/img/graphs/one-night-stand-regression.png" class="img-fluid rounded z-depth-1" %}   

| Title | Year | M Score | Episode Count |
|:-------------:|:--------------:|:--------------:| :----: |
| The Playboy Morning Show     |    2010    |       -7.7 | 2 |

{% include figure.liquid loading="eager" path="assets/img/graphs/playboy-show-regression.png" class="img-fluid rounded z-depth-1" %}   


This data is not very helpful because its looking at shows that only have ratings for 2 episodes. I don't necessary want to filter out shows with low episode counts, because there are a lot of great shows that have less than 10 episode. I do however, want to filter out shows that do not have a lot of ratings, and just look at more of the popular shows. 

```sql
SELECT --select all data from our view
	slopes.tconst,
	primaryTitle,
	startYear,
	slope,
	slopes.totalVotes as totalEpisodeVotes,
	slopes.runtimeMinutes,
	title_ratings.numVotes as totalShowVotes,
	slopes.averageRating as episodeAverageRating,
	title_ratings.averageRating as tvShowRating,
	episodeCount
FROM 
	slopes 
	INNER JOIN title_ratings on slopes.tconst = title_ratings.tconst
AND slopes.totalVotes > 50000 -- include shows with total episode ratings count > 50,000
AND title_ratings.numVotes > 50000 -- include shows with total title ratings > 50,000
ORDER by slope desc
```

Our new winners become `King the Land` with a high `M Score` of `0.3560294117647058`, and `The Witcher` with a low of `-0.1436086956521739`. The show that came closest to have an `M score` of `0` was `NCIS`, with a score of `-0.0000054995461956`.

| Title | Year | M Score | Episode Count | IMDB Rating| 
|:-------------:|:--------------:|:--------------:| :----: | :--: |
| King the Land    |    2023    |       0.35602.. | 16 | 5 |

| Title | Year | M Score | Episode Count | IMDB Rating| 
|:-------------:|:--------------:|:--------------:| :----: | :--: |
| The Witcher   |    2019    |       -0.14360.. | 24 | 8 |

| Title | Year | M Score | Episode Count | IMDB Rating| 
|:-------------:|:--------------:|:--------------:| :----: | :--: |
| NCIS   |    2003    |       -0.00000549 | 461 | 7.8 |



## Conclusion

Here are the top 100 shows with the highest and lowest `M Score`.

| Title | Year | M Score | Episode Count | IMDB Rating| 
|:-------------:|:--------------:|:--------------:| :----: | :--: |


<style>
    table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        border:2px solid;
    }
  th{
      border:2px solid #000000;
  }
  td{
      border:1px solid #000000;
  }
</style>