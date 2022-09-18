---
layout: post
title: More website performance boosting
date: '2010-01-12T01:14:00+01:00'
tags:
- yslow
- performance
- apache2
category: 'Server'

---
<h3>Moin,</h3>

<p>Kyle Simpson (<a href="http://www.twitter.com/gettify" target="_blank">@gettify</a>) asked me via twitter if I would like to be a BETA tester for his new service <a href="http://www.2static.it" target="_blank">2static.it</a>. For sure I was testing. Actually the private BETA will last for 7 to 14 days.</p>

<p>It&#8217;s &#8221; &#8230;  a free service for improving the page-load performance of your site by addressing one specific performance detractor &#8212; cookies on static asset requests.&#8221;. If you are using YSLow this is the point &#8220;Use cookie-free domains&#8221;. I was setting this up and it works perfectly. I will post about it later.</p>

<p>Watching YSlow giving me better and better grades for my personal website <a href="http://www.nms.de" target="_blank">http://www.nms.de</a>, I thought it would be cool to go further and also make some more adjustments. The next step was to set expire headers. The point in YSlow is &#8220;Add expires headers&#8221;. This is as simple as this:</p>

<pre>
&lt;FilesMatch "\.(ico|pdf|flv|jpg|jpeg|png|gif|js|css|swf)$"&gt;
    Header set Expires "Thu, 15 Apr 2020 20:00:00 GMT"
&lt;/FilesMatch&gt;
</pre>

<p>Place this in your apache2.conf or VhostContainer and restart apache. Now apache is setting an expire header for the matched files in the far future. But be careful. You now have to rename the files when you update them. This should not be that difficult. You could add a version number for example.</p>

<p>Another issue are ETags. In YSlow this is &#8220;Configure entity tags (ETags)&#8221;. ETags are used for checking out if a ressource in the browsers cache is the same than on the server. If you are not using this meachanisim, the advice is to turn it off - either in your apache conf or in the VhostContainer:</p>

<pre>
FileETag none
</pre>

<p>The other rules are more onpage optimization (beside &#8220;Use a Content Delivery Network (CDN)). With a little luck, you will get a B or A grade - yeah ;-)</p>

<p>Andy</p>
