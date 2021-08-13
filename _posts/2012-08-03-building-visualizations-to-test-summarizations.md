---
layout: post
title:  Building Visualizations to Test Summarizations
date:   2012-08-03
description: Fun Visualizations
tags: research visualization
---

I’m currently working on interesting on-line methods for summarizing streams of
documents. The basic idea is that documents come hurtling into your inbox at a
startling rate and you’d like a quick, easy, online method to summarize that
they’re about. A lot of approaches to text summarization use an offline
approach, meaning that those methods inspect all the documents. That’s not
practical, especially if you want to, oh say, do this thing on all the tweets
about the ongoing 2012 Olympics in London. So my goal is to work up a good
enough algorithm for doing this process completely online. Even though it sadly
won’t be working well enough to actually run online while the Olympics is going
on (I’m still working on said algorithm), it could be pretty cool.


However, figuring out if you’re doing something right or wrong on many million
tweets about 50 different sports is kind of challenging. So while i’m gathering
ton of data to process, and then processing it all, I figured I should design a
night UI for exploring the results. Being a terrible UI guy I thought I could
never pull it off, but thanks to the magicians behind Crossfilter and
[D3.js](https://d3js.org/), it turned out to be pretty easy. The result of my
UI wizardry is currently here.  And while there’s quite a lot more to add, such
a way to select other sports or other summarization methods, it does the bulk
of what I want:

1.    It builds histograms of tweet’s based on three dimensions: the date, the
      hour, and the “cluster” of the tweet.
1.    It lets you select sub-regions of these dimensions and automatically
      updates the histograms for other selection files. So if you put a range
on the day, you can see the histograms according to hour and cluster for that
date range.
1.    Given a range, you can also see the most representative, or summary,
      tweets for the most frequent clusters in that range. There’s still a
little bit missing, I should really be ordering the summaries by their time,
but that’ll come later.

As complicated as all that initially sounds, I barely had to write any
JavaScript on my own, which is truly fortunate since I barely know JavaScript.

## The joy of making that UI.

Since I know next to nothing about JavaScript, D3.js, and Crossfire, I did a
lot of hacking, console debugging, and total guessing to make this beast work.
So here’s a quick rundown on what these three things are doing together and how
they synergize into my current app. There’s still quite a bit I don’t know, so
i’ll mostly focus on what I figured out in my hackings.

### Loading that dataset

Cross filter arrays of key-valye javascript objects, which can be easily pulled
out of Comma Separated Files. However, those initial object arrays are totally
untyped, so you need to do some processing to shuffle values out of raw strings
into something more usable. I’m currently using two styles of data: 1) one
format that simple records the time of a tweet and it’s cluster identifier and
2) one that records the cluster identifier, the time of the first tweet in that
cluster, the time of the average tweet in that cluster, and the summary tweet.
They’re pretty simple and look like this:

```
Date,Time,Group
07272344,1343400289,1
07272351,1343400698,2
07272351,1343400706,3
```

and

```
StartTime,MeanTime,Group,Summary
1343458794,1343400289,1,I cannot wait for the swimming diving and gymnastics #London2012
1343458793,1343400698,2,Hey @mdoolittle #olympics day today. I hope we'll have comments from you esp. 4 #gymnastics parts! ;) I'm an EX-gymnast too(it shows!lol)
1343458791,1343400706,3,looking forward to the opening ceremony tonight just disappointed that SABC wont be showing much gymnastics #Olympics2012
```

D3 makes this super easy to handle. All you do is call `d3.csv(fileName,
callback)`. In my example, this turns out to be:

{% highlight javascript linenos %}
d3.csv("/crossfilter/tweet.gymnastics.particle.mean.all.splits.json", function(summaries) {
    // Add in types to the summaries.
    summaries.forEach(function(d, i) {
       d.index = i;
       d.group = parseInt(d.Group);
       d.startTime = parseTime(d.StartTime);
       d.meanTime = parseTime(d.MeanTime);
    });
{% endhighlight %}

and

{% highlight javascript linenos %}
d3.csv("/crossfilter/tweet.gymnastics.particle.mean.all.groups.json", function(tweets) {
    // Add in types to the tweets.
    tweets.forEach(function(d, i) {
        d.index = i;
        d.group = parseInt(d.Group);
        d.time = parseDate(d.Date);
        d.date = parseTime(d.Time);
    });
{% endhighlight %}

### Crossing the filters on that data

Once you’ve got data loaded, you gotta do something with it, no? Crossfilter
lets you do some super powerful things with very little work. The primary job
of cross filter is to take your array of objects and let you select different
dimensions to act as keys in that array. Initially your key is just the index
of the array. But after calling dimension on a crossfiltered object, you can
select any variable in your object to be a key. Since I wanted three charts,
that means I need three keys: 1) a key on the day, 2) a key on the hour, and 3)
a key on the cluster id. I also want counts for the number of tweets in the
bins corresponding to each dimension. That sounds like a lot of work, but it’s
as easy as this:

{% highlight javascript linenos %}
// Create the crossfilter over the tweets.
var tweet = crossfilter(tweets),
    // This groups all tweets together.
    all = tweet.groupAll(),
    // Select the day of the tweet as a dimension and compute the counts.
    date = tweet.dimension(function(d) { return d3.time.day(d.date); }),
    dates = date.group(),
    // Select the hour of the tweet as a dimension and compute the counts.
    hour = tweet.dimension(function(d) { return d.date.getHours() + d.date.getMinutes() / 60; }),
    hours = hour.group(Math.floor),
    // Select the cluster id of the tweet as a dimension and compute the counts.
    cluster = tweet.dimension(function(d) { return d.group; }),
    clusters = cluster.group();
{% endhighlight %}

That’s it! All you need is two lines to select a dimension for your chart and
compute the data for the histogram. Easy Breezy.

### Charting those groups

Now that you’ve got some dimensions set up and some counts to go along with
them, it’s time to plot those fine numbers. For each chart you want, all you
have to do is note what dimension you want to use, provide the summary counts,
put some limits on the plots, then apply all that to some plotting object like
a bar graph. I’m just using bar charts, but this other crossfilter example
gives some sweet alternatives you can re-use.

{% highlight scala linenos %}
// The first chart tracks the hours of each tweet.  It has the
// standard 24 hour time range and uses a 24 hour clock.
barChart().dimension(hour)
          .group(hours)
          // Setup the type of dimension you want and the range of values that
          // are valid.  Note that I'm still a little fuzzy on this part.
          .x(d3.scale.linear()
                     .domain([0, 24])
                     .rangeRound([0, 10 * 24])),
{% endhighlight %}

### Printing the tweet summaries

The fun part is printing all the summaries for the tweets that have been
selected. The original Crossfilter example was pretty simple, it just printout
out the actual rows being selected in the histograms. But I wanted to do
something more complicated. I wanted to figure out which clusters existed in
the selection, get the summaries attached to each cluster (and only one copy of
the summary per cluster), and then organize the summaries by date. Not knowing
javascript, that sounded kinda hard. In my candy land language, [Scala][7],
it’s pretty easy to do with some groupBys and maps, but does javascript have
all this? YES! Turns out the clusters object` computed to print the histogram
has nearly everything I want, the collection of cluster identifiers found in
the current filter selection. And since all arrays in JavaScript have a map
operator, I can get the array of summaries I so desperately desired.

{% highlight javascript linenos %}
// Map each of the top clusters to their corresponding summaries.
// Note that the entries in clusters use group identifiers starting at 1, so we
// have to subtract by 1 to make them valid indices.
var clusterSummaries = clusters.top(40).map(function(d) {
    return summaries[d.key-1];
});
{% endhighlight %}

Next comes the cool part, creating a hierarchy on the cluster summaries based
on the date. These two lines together do that magic:j

{% highlight javascript linenos %}
var nestByDate = d3.nest().key(function(d) { return d3.time.day(d.startTime); });
// Group the summaries by their date.
var tweetsByGroup = nestByDate.entries(clusterSummaries);
{% endhighlight %}

The first line creates an object that will nest any array of items with a
startTime attribute according to their day and the second line runs that nester
over the cluster summaries to get a mapping from days to arrays of summaries
occuring on each day. Using that nested object, you can build a table of tweet
summaries for each day by attaching the data object to the list div holding
those tables:

{% highlight javascript linenos %}
// For each day's summaries, add them as a table with the date as
// the header.
div.each(function() {
  // This binds the date nested group of tweet summaries to the `.date` element
  // of the `summary-list div.
  var date = d3.select(this)
               .selectAll(".date")
               .data(tweetsByGroup, function(d) { return d.key; });

  // This appends a new `.date` and `.day` div for each item in the nested list
  // the summary's start time as the title for the list.
  date.enter()
      .append("div")
      .attr("class", "date")
      .append("div")
      .attr("class", "day")
      .text(function(d) { return formatDate(d.values[0].startTime); });

  date.exit().remove();

  // This binds each entry in the nested list, i.e. the list of summaries for
  // each day, to the divs created above.  This way each div, titled with a
  // particular day, has the array of summaries found on that day.
  var summary = date.order()
                    .selectAll(".summarylist")
                    .data(function(d) { return d.values; },
                         function(d) { return d.index; });

  // This creates a new `.summarylist` div to surround the summaries.
  var summaryEnter = summary.enter()
                            .append("div")
                            .attr("class", "summarylist");

  // This creates a new '.summary' div for each summary to place in the list.
  summaryEnter.append("div")
              .attr("class", "summary")
              .text(function(d) { return d.Summary; });

  summary.exit().remove();

  summary.order();
});
{% endhighlight %}

And that’s it! Again, easy breazy.

## Setting up the divs for the stuff you want

The last thing you need whenever you’re going to be mashing data into a website
via D3 is some divs to host that data. For my application, I need just two
types of divs: charts to hold the histograms and tables to hold the summaries.
These look like:

{% highlight xml linenos %}
<div id="charts">
  <div id="hour-chart" class="chart">
    <div class="title">Time of Day</div>
  </div>
  <div id="cluster-chart" class="chart">
    <div class="title">Cluster</div>
  </div>
  <div id="date-chart" class="chart">
    <div class="title">Date</div>
  </div>
</div>

<div id="lists">
  <div id="summary-list" class="list"></div>
</div>
{% endhighlight %}

They’re pretty dead simple. One chart for each histogram I’m plotting and a
general div for the lists. The lists will get populated with more divs
dynamically based on how many dates fall into a selected range.

## Creating the data to put in this app

o how did I get all these tweets? And how did I split them up into different
clusters? That’s secret for now, but if my current research project is looking
good, that’ll be come the topic of a new research paper, and if not, i’ll be
the topic of a blog post describing what failed! So stay tuned!

