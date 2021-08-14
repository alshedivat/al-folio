---
layout: post
title:  "Puzzle Time: Transforming Names"
date:   2012-04-23
description: How to solve puzzles with code
tags: puzzles
---

This post starts what will hopefully be a new trend: computational solutions to
[NPR’s Sunday Puzzle](https://www.npr.org/2012/04/22/151120151/a-puzzle-worthy-of-don-draper). In this weeks puzzle, we have to

>  Think of a common man’s name in four letters, one syllable. Move each letter
>  exactly halfway around the alphabet. For example, A would become N, N would
>  become A, and B would become O. The result will be a common woman’s name in
>  two syllables. What names are these?

Word puzzles can often be pretty hard for automated computer programs. This is
in part what made IBM’s Watson so darn cool. But thankfully this week’s puzzle
is amazingly simple for a program, in fact, i’d even say it’s ideal for a
program. To solve it, just need two simple steps:

1.  Gather a bunch of male and female names
1.  Process the male names as noted to see if we have any matching female names

Step 1 is perhaps the hardest since it requires gathering not only names, but
common names in english. However, [this](https://namecensus.com/male_names.htm)
handy site has done the work for us.  Here they have listings of common English
names based on a variety of
categories: region, ranking, gender, alphabetical, etc. For our purposes, we’ll
just grab the a long list of the most frequent male and female names from [here](https://namecensus.com/male_names.htm)
and [here](https://namecensus.com/female_names.htm). All the names are nicely
laid out in a table with a pretty regular format. In fact the format is so
regular we can write a [regular
expression](https://en.wikipedia.org/wiki/Regular_expression) for it. Here’s an
example of the table:

```xml
<table align="left" CELLPADDING="3" CELLSPACING="3" style="table1">
<tr bgcolor="F5FDD9"><td><b>Name&nbsp;&nbsp;</td><td><b>% Frequency&nbsp;&nbsp;</td><td><b>Approx Number&nbsp;&nbsp;</td><td><b>Rank&nbsp;&nbsp;</td></tr>
<tr bgcolor="white"><td>AARON</td><td>0.24</td><td> 350,151 </td><td>77</td></tr>
<tr bgcolor="white"><td>ABDUL</td><td>0.007</td><td> 10,213 </td><td>831</td></tr>
<tr bgcolor="F5FDD9"><td>ABE</td><td>0.006</td><td> 8,754 </td><td>854</td></tr>
<tr bgcolor="white"><td>ABEL</td><td>0.019</td><td> 27,720 </td><td>485</td></tr>
<tr bgcolor="white"><td>ABRAHAM</td><td>0.035</td><td> 51,064 </td><td>347</td></tr>
<tr bgcolor="white"><td>ABRAM</td><td>0.005</td><td> 7,295 </td><td>1053</td></tr>
<tr bgcolor="F5FDD9"><td>ADALBERTO</td><td>0.005</td><td> 7,295 </td><td>1040</td></tr>
<tr bgcolor="white"><td>ADAM</td><td>0.259</td><td> 377,871 </td><td>69</td></tr>
```

Regular right? It’s so darn simple we can use some simple command line tools to clean it up:

```sh
cat female_names_alpha.htm | grep '<tr bgcolor="' | sed "s/.*<td>\([A-Z]\+\).*/\1/" | tail -n +2 > female_names.txt
```

If we downloaded the female names into `female_names_alpha.htm`, the first part
will simply print out the contents of the html page to standard out. The second
part, the grep command, will catch all rows in the table, which thankfully have
the same start prefix. Part three extracts the names nestled in a row element.
And finally the tail part eliminates the first row of the table, e.g. the head
row, which grep accidentally catches. This’ll grab us a ton of names.

So what’s next? Well, we have a bunch of male and female names. But we’ve got
too many, namely we have names that clearly won’t work as they have too many or
too few letters. So let’s so some more cleaning, but this time in scala:

```scala
val maleNames = Source.fromFile(args(0)).getLines.filter(_.size == 4)
```

This dandy line reads the text from the file and filters out any lines that
have more than four characters. Since our initial processing placed each name
on a line, this in effect removes any names with more than four letters. If we
do this with the female names, we’ll have lists of common four letter names for
the two genders. For later use, we’ll also turn the female names into a set by
calling `.toSet` on the list.

Last, we can do the transformation on each male name to see if it’s a valid female name and then print out any combinations that match. The next three lines do this slickly:

```scala
maleNames.map(w => (w, w.map(l => (((l-'A'+13) % 26) + 'A').toChar).toString))
         .filter( bg => femaleNames.contains(bg._2))
         .foreach(println)
```

This works in three steps. First, the map call transforms each male name into a
tuple which consists of the original male name, and then a potential female
name by sliding up each letter in the name by 13 letters. With ascii
characters, this is done just by first grounding the letter to 0, by
subtracting the char value for A, adding 13, and then rolling over the value to
be back in the range of the 26 letter characters by taking the modulo (%) and
finally bumping the character value into the range of real ascii characters by
adding A. That’s all done in the first line. Step two is to simply throw out
any generated female names that don’t show up in our list of female names, done
by line 3. And the final line just prints out any matches we get. With our name
lists, this turns out to be:

```
(ERIN,REVA)
(EVAN,RINA)
(GLEN,TYRA)
(IVAN,VINA)
(RYAN,ELNA)
```

The rules of the game stipulated that the male name had to have one syllable
and the female name has to have two. We didn’t code for this at all since that
parts slightly more complicated, and since our pre-processing reduced the set
of options down to five, we can easily pick out a valid answer. In this case,
“Glen” and “Tyra” or “Ryan” and “Elna” look like valid responses. I’d vote for
the first pair since I haven’t heard “Elna” in forever.
