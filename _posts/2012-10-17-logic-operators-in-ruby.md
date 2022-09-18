---
layout: post
title: Logic operators in Ruby
date: '2012-10-17T16:00:00+02:00'
tags: [ruby, operators]
category: 'Programming'

---
<h1>Moin Moin,</h1>

<p>sometimes it&#8217;s really helpful to use a REPL to make things clear while coding. So you could use the awesome <a href="http://repl.it/" target="_blank"><a href="http://repl.it/" target="_blank">http://repl.it/</a></a> Ruby shell or simply open your terminal and use <a href="http://www.ruby-lang.org/en/documentation/quickstart/" target="_blank">irb</a> or <a href="http://pryrepl.org/" target="_blank">pry</a>. I did it today with my colleague Jan to remember who logical operators work for Ruby.</p>

<h4>1. What is the result when I use &amp;&amp; for two arrays?</h4>

<pre>
[1] pry(main)&gt; [1,2] &amp;&amp; [3,4]
=&gt; [3, 4]
</pre>

<p>The reason is, that here you check if both expressions are true. Ruby checks if the first expression is true and then checks if the second is also true. If yes, the last checked expression is returned. If you would examine another array as the last one (e.g. [5,6]), this one would be returned. Obviously if any of the expressions would be nil, nil would be the result.</p>

<h4>2. What is the result when I use || for two arrays?</h4>

<pre>
[2] pry(main)&gt; [1,2] || [3,4]
=&gt; [1, 2]
</pre>

<p>Here the first result is returned because the whole expression is returning true if at least one expression is true. If the first expression would be nil, the second would be returned.</p>

<h4>3. What is the result when I use &amp; for two arrays?</h4>

<pre>
[3] pry(main)&gt; [1,2] &amp; [3,4]
=&gt; []
</pre>

<p>It&#8217;s an empty array because the logic AND is checking, if one or more values of the array (in this case) are present in both arrays. So the next example shows that:</p>

<pre>
[4] pry(main)&gt; [1,2] &amp; [2,3,4]
=&gt; [2]
</pre>

<p>Got it? Just think of the possibilities you have with that small size of code. For example you could use this operation to find all the unique values which are present in the first array AND the second array:</p>

<pre>
[5] pry(main)&gt; [1,2,2] &amp; [3,3,2,2,4]
=&gt; [2]

[6] pry(main)&gt; [1,2,2,3] &amp; [3,3,2,2,4]
=&gt; [2, 3]
</pre>

<h4>4. What is the result when I use | for two arrays?</h4>

<pre>
[7] pry(main)&gt; [1,2] | [3,4]
=&gt; [1, 2, 3, 4]
</pre>

<p>The logic OR is returning all results from expression one and two. The result in this case (!) is the same like you would add both arrays but for sure these are two different things!</p>

<pre>
[8] pry(main)&gt; [1,2] + [3,4]
=&gt; [1, 2, 3, 4]
</pre>

<p>And here is a real nice thing when using logic OR. Look at this:</p>

<pre>
[9] pry(main)&gt; [1,2,2] | [3,3,4]
=&gt; [1, 2, 3, 4]
</pre>

<p>Nice and obvious. The logic OR is returning all unique values from array one and two. Now the difference to the + operator is clear:</p>

<pre>
[10] pry(main)&gt; [1,2,2] + [3,3,4]
=&gt; [1, 2, 2, 3, 3, 4]
</pre>

<p>Have fun!</p>

<p>Cheers</p>

<p>Andy</p>
