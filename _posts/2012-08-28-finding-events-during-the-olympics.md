---
layout: post
title:  Finding Events During the Olympics
date:   2012-08-28
description: How NLP can sometimes do something useful
tags: research analysis
---

I needed the event times for every game, tournament, and competition that
happened during the London 2012 Olympics. Thankfully the London 2012 website
posts all this information online. Sadly, this information isn’t posted
anywhere in an easy to utilize format. I was deeply hoping that there would be
a csv file describing when every event took place, but to no avail. Instead,
all I had access to was beautifully rendered web pages like below, which
graphically detail when each event began and end for each day.

![When Archery Events were happening in 2012](/assets/img/2012/olympics-archery-event-example.png)

This handy web page has all the information I need, but how easy is it to get
that information out?

## The raw event information

Well, let’s take a gander at the html used to describe each event:

{% highlight html linenos %}
 <li>
   <div class="barWrap disciplines">
     <!--s-u: ARM073900 - ARM073900-->
     <div style="left: 72px; width: 90px; height:19px; overflow:hidden;"
          class="bar ed_2012-08-30T12:30:00+01:00"
          id="bar-ARM073900"
          data-type="a_20120830090000 b_">
       <div class="barcnt m0">
         <a  href="/paralympics/archery/event/men-individual-recurve-w1-w2/phase=arm073900/index.html">
           <span class="bar-time">10:00 </span>
           <span class="bar-phasedesc">Ranking Round </span>
           <div class="bar-scheduleline">
             <div class="score"></div>
           </div>
         </a>
       </div>
     </div>
   </div>
 </li>
{% endhighlight %}

It’s pretty obvious when the event took place no?

Not really. They’ve crammed all the timing information into the second div
element using two different attributes: `class` and `data-type`. Furthermore,
they’ve also encoded the start time within a deeply nested span. *But* it gets
*better*. They use two *different* time zones and two different date formats,
the `class` attribute uses GMT+01:00 using a pretty readible format while the
`data-type` uses GMT+00:00 with a horribly mashed together format. But at
least, it’s a regular pattern. So we should be able to get everything we want
by treating this as xml and just extracting the attribute values for the nodes
we care about.

## The obvious way to extract those times

XML parsing is both pretty fast and easy, if you select the right language.
Let’s throw this into a simple xml parser and see what happens:

{% highlight scala linenos %}
import scala.xml.XML

val eventXml = XML.loadFile(args(0))
{% endhighlight %}

Parsing…parsing…parsing…

{% highlight java linenos %}
org.xml.sax.SAXParseException; lineNumber: 3; columnNumber: 299; The entity name must immediately follow the '&' in the entity reference.
    at com.sun.org.apache.xerces.internal.util.ErrorHandlerWrapper.createSAXParseException(ErrorHandlerWrapper.java:198)
    at com.sun.org.apache.xerces.internal.util.ErrorHandlerWrapper.fatalError(ErrorHandlerWrapper.java:177)
    at com.sun.org.apache.xerces.internal.impl.XMLErrorReporter.reportError(XMLErrorReporter.java:441)
    at com.sun.org.apache.xerces.internal.impl.XMLErrorReporter.reportError(XMLErrorReporter.java:368)
    at com.sun.org.apache.xerces.internal.impl.XMLScanner.reportFatalError(XMLScanner.java:1375)
    at com.sun.org.apache.xerces.internal.impl.XMLScanner.scanAttributeValue(XMLScanner.java:824)
    ...
{% endhighlight %}

So, it looks like XML parsing this beast is both slow and higly error prone.
What else could we do? We could try using a more accurate or graceful xml
parser that’s built to deal with html’s malformities, but I’ll leave out story
of how that doesn’t work well in this case either. Instead, we’ll do something
even more silly.

## In rolls javascript

Obviously someone code path out in the world has to be capable of handling this
html mess. Otherwise it’d never show in a browser. But what’s the shortest path
for doing this? Hacking through either the Firefox source code or the [Chromium
source code ](https://src.chromium.org/viewvc/chrome/)both sound like longest
path solutions to me. In comes the magic of Javascript.
[jQuery](https://jquery.com/) is able to single handedly take an html file,
turn it into a [Document Object
Model](https://en.wikipedia.org/wiki/Document_Object_Model) structure, and let
you run queries over it, not only does this work in a few lines of code, it’s
super fast.

### A quick setup

*But*, first you have to do a little setup to run all this outside of a
browser. The easiest system I found was [node.js](https://nodejs.org/en/). To
setup, all you have to do is grab a tarball, I used [this
one](http://nodejs.org/dist/v0.8.8/node-v0.8.8.tar.gz), untar it, and added the
binaries to your path:

```bash
wget http://nodejs.org/dist/v0.8.7/node-v0.8.7.tar.gz
tar -xvzf node-v0.8.7.tar.gz
export $PATH:`pwd`/node-v0.8.7-linux-x86/bin/node
export $PATH:`pwd`/node-v0.8.7-linux-x86/bin/npm
```

And to get jQuery setup for node.js, it’s as easy as running:

```bash
npm install jquery
```

Only hitch is that you have to run this from the root directory where you’ll be
running your processing, but that’s a minor problem.

### Parsing Power!

Now that our javascript runtime environment is setup with the library we need,
it’s time to get into the meat of the code. The approach is pretty simple:

1.  parse a html file using jquery
1.  Find the nodes with the `bar` id nested within a div having a `disciplines`
    id.
1.  Get the `class` and `data-type` attributes from the div we got back and
    handle one of three cases:

    1.  The `class` attritube tells us all we need
    1.  `class` and `data-type` include timing information
    1.  the `data-type` attribute tells us all we need.

So let’s code that up! First, import the js libraries you need.


{% highlight javascript linenos %}
/// Import jquery library.
var $ = require('jquery');
// Import file system library.
var fs = require('fs');
{% endhighlight %}

Now parse the javascript to get a DOM structure:

{% highlight javascript linenos %}
fs.readFile(process.argv[2], function(err, data) {
    // Throw any errors found.
    if (err) throw err;
    // Convert the raw data to text.
    var html = data.toString();

    // More coming shortly!
{% endhighlight %}

So far so easy, breezy. Now comes the challenging part: grabbing the div’s
holding the timing info we need and checking for the funny ways [london
2012](www.london2012.com/index-olympic.html) decided to encode that
information:

{% highlight javascript linenos %}
    // Navigate the html to find all div elements with the "disciplines" class
    // and the children of these elements with the "bar" class.  These elements
    // define the time of each event.
    var barElemens = $(html).find(".disciplines").children(".bar")
    // For each bar element found, extract the start time and end time.  The
    // start time is the text within the span having a ".bar-time" class and the
    // end time is the second class label of each element.
    barElemens.each(function(i) {
        // Convert the index to an element in the array.
        var elem = barElemens[i];
        var classAttr = $(elem).attr("class");
        var dataType = $(elem).attr("data-type");
        if (dataType == "") {
            // If the data-type attribute is empty, then we know that both the
            // start and end times are stored in the class attribute, albeit in
            // an utterly horrible and wretched format that uses two different
            // timezones and two different formats.
            console.log(classAttr);
        } else if (dataType.substr(-1) == "_") {
            // If the data-type ends with an underscore, we know that the start
            // time is in the text and the end time is in the class attribute.
            // So report that.
            console.log(classAttr + " " + $(elem).find(".bar-time").text());
        } else {
            // Otherwise, the data-type has the full time range for the event,
            // so just report that, even though it's in a different format.
            console.log(dataType);
        }
    });
}); // This ends the original jquery call to parse the html file
{% endhighlight %}

And that’s it. With jQuery and node.js, I have significantly more comments than
actual code, mostly to describe my new understanding of the api’s and data
based logic processing that no human should have to decifer through code.

### Actually getting the data

Actually downloading the data requires a few simple tricks that are worth
noting, just in case anyone ever wants to duplicatet this whole shebang.

First, london 2012 doesn’t let you do a normal `wget` call, it requires a user
agent. So, every request looks like this:

```
userAgent="Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092416 Firefox/3.0.3"
wget --user-agent=$userAgent $url
```

Now we just need to figure out the pattern for each sport. For once, london
2012 makes that part easy. Their uer’s use just two key values: the sport you want and the day you want, so here’s a little bit of bash to extract all that (and save everything in an easier to use file name:

```
sports="judo gymnastics-artistic fencing tennis archery"
julyDays=`seq  25 31 | while read day; do echo $day-july; done`
augDays=`seq 1 12 | while read day; do echo $day-august; done`
userAgent="Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092416 Firefox/3.0.3"
resultDir=tmpHtmlData

# Define a helper function to return the full url based on the sport and day.
# This is just to make changing the url easier.
function olympicsUrl() {
    echo http://www.london2012.com/$sport/schedule-and-results/day=$day/all-day.html 
}

# Now iterate through every sport.
for sport in $sports; do
    # And every day of the olympics.
    for day in $julyDays $augDays; do
        # And do a simple wget request.  Since each page has the same html file
        # name, the -O bit saves the html output to a file based on the sport
        # and day for easier management.
        wget --user-agent=$userAgent -O $tmpHtmlData/$sport-$day.html `olympicsUrl`
    done
done
```

And voila, you have all the sports you want for each day of the olympics. You
can no easily power through all those files with this dandy bit of code:

```
for sport in $sports; do
    for html in $resultDir/*$sport*.html; do
        node src/main/javascript/ExtractTimes.js $html
    done > olympics.$sport.times.txt
done
```
