---
layout: post
title: 'Rails ActiveRecord: difference between size and length when using DISTINCT'
date: '2012-09-19T00:16:09+02:00'
tags: [rails, active-record]
category: 'Rails'

---
<p>Moin Moin,</p>

<p>actually I had a somehow strange behaviour in a quite costly SQL query. I am using pagination and there fore have to fire the query two times. One time without LIMIT and OFFSET and the second time with both of them. The full code can be found here:</p>

<p><a href="https://gist.github.com/3746191" target="_blank"><a href="https://gist.github.com/3746191" target="_blank">https://gist.github.com/3746191</a></a></p>

<p>I was wondering why the pagination is not correct. So I examined it. As you can see in row 16 and 17, I figured out that there is a difference between using size and length for the result of select_printer without LIMIT and OFFSET. So how does the SQL query look like. First I show the query for size:</p>

<pre>
=# SELECT COUNT(*)
FROM "printers"
INNER JOIN "manufacturers" ON "manufacturers"."id" = "printers"."manufacturer_id"
INNER JOIN "printer_cartridges" ON "printer_cartridges"."printer_id" = "printers"."id"
WHERE "manufacturers"."shortname" = 'brother'
AND "printer_cartridges"."printer_group_id" = 19;
 count
-------
   104
(1 row)
</pre>

<p>The result is 104 records. So Rails is simply not using my originally provided DISTINCT statement but instead using COUNT(*). Actually this is not what I want.</p>

<p>Let&#8217;s see the difference when using length:</p>

<pre>
=# SELECT DISTINCT printers.id, printers.name
FROM "printers"
INNER JOIN "manufacturers" ON "manufacturers"."id" = "printers"."manufacturer_id"
INNER JOIN "printer_cartridges" ON "printer_cartridges"."printer_id" = "printers"."id"
WHERE "manufacturers"."shortname" = 'brother'
AND "printer_cartridges"."printer_group_id" = 19 ORDER BY printers.name;
 id  |    name
-----+------------
[...]
(25 rows)
</pre>

<p>25 records is the correct result! I have no clue, why there is this difference. Do you have an idea?</p>

<p>Btw - if you are calculating pages like I did it in line 26 using ceil, be aware that you have to cast both total and per_page to a float because 25 / 20 is 1 when both are integers ;-).</p>

<p>Cheers</p>
