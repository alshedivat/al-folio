---
layout: post
title: Very simple JS tab script
date: '2009-07-05T00:00:00+02:00'
tags:
- javascript
- prototype
category: 'Programming'

---
Moin Moin,

actually I needed a simple tab script for a page with tabbed navigation. Because coding is fun I decided to write my own, very simple tab script. In this case I used <a href="http://www.prototype-js.org" target="_blank">prototype</a>. The whole thing is for a little picture gallery which you can see here: <a href="http://www.woodheads.de/docs/picsframe.html." target="_blank">http://www.woodheads.de/docs/picsframe.html.</a> This is a page from my friends of my hometown in southern Germany. My job is to extend the existing code.

There are two <em>div</em> areas marked with a <em>id</em>. The name of the <em>id</em> starts with <em>page_</em> as an identifier. prototype has a nice method to get all elements with a special attribute. In this case I grab the <em>div</em> elements having a <em>id</em> with <em>$$(&#8216;div[id]&#8217;)</em>. That makes it possible to iterate over the grabed div&#8217;s and handle only the needed objects - choosen with a simple regex.

This is the basic HTML structure:

<pre>&lt;span onclick="Pics.change_page('lutterhaus')"&gt;Lutterhaus&lt;/span&gt; |
&lt;span onclick="Pics.change_page('plankstadt')"&gt;Plankstadt&lt;/span&gt;

&lt;div id="page_plankstadt" style="display:none"&gt;
  &lt;div id="pic_gallery"&gt;
    &lt;div class="pics"&gt;
      &lt;img id="1" onclick="Pics.show_pic(this.id,'pla');" src="/img/1_th.jpg" alt="#" /&gt;&lt;br /&gt;
      &lt;img id="2" onclick="Pics.show_pic(this.id,'pla');" src="/img/2_th.jpg" alt="#" /&gt;&lt;br /&gt;
    &lt;/div&gt;
    &lt;div style="float:left;" id="pla" class="big_pic"&gt;&lt;img src="/images/1.jpg" /&gt;&lt;/div&gt;
    &lt;div class="pics"&gt;
      &lt;img id="3" onclick="Pics.show_pic(this.id,'pla');"src="/img/5_th.jpg" alt="#" /&gt;&lt;br /&gt;
      &lt;img id="4" onclick="Pics.show_pic(this.id,'pla');"src="/img/6_th.jpg" alt="#" /&gt;&lt;br /&gt;
    &lt;/div&gt;
    &lt;div style="clear:both"&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;div id="page_lutterhaus" style="display:none"&gt;
  &lt;div id="pic_gallery"&gt;
    &lt;div class="pics"&gt;
      &lt;img id="5" onclick="Pics.show_pic(this.id,'pla');" src="/img/5_th.jpg" alt="#" /&gt;&lt;br /&gt;
      &lt;img id="6" onclick="Pics.show_pic(this.id,'pla');" src="/img/6_th.jpg" alt="#" /&gt;&lt;br /&gt;
    &lt;/div&gt;
    &lt;div style="float:left;" id="lutt" class="big_pic"&gt;&lt;img src="/images/1.jpg" /&gt;&lt;/div&gt;
    &lt;div class="pics"&gt;
      &lt;img id="7" onclick="Pics.show_pic(this.id,'pla');"src="/img/7_th.jpg" alt="#" /&gt;&lt;br /&gt;
      &lt;img id="8" onclick="Pics.show_pic(this.id,'pla');"src="/img/8_th.jpg" alt="#" /&gt;&lt;br /&gt;
    &lt;/div&gt;
    &lt;div style="clear:both"&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>

And here the JavaScript code:
<pre>&lt;script language="javascript"&gt;
  var Pics = {
    show_pic: function(id,area) {
      $(area).innerHTML = '&lt;img src="/images/' + id + '.jpg" /&gt;';
    },
    change_page: function(show) {
      // get the div elements with attribute id
      var elem = $$('div[id]');

      // iterate over the div elements
      for(i = 0; i &lt; elem.length; i++) {
        // id does not match page_
        if(!elem[i].id.match(/^page_/)) continue;
        // we ignore the page to be choosen
	if(elem[i].id == 'page_' + show) continue;

	// all matched elements will be hidden
	elem[i].style.display = 'none';
      }

      // only the page we want to see is set to display
      $('page_' +  show).style.display = 'block';
    }
  }
&lt;/script&gt;</pre>

I think this is quiet simple and very lightweight. For sure <a href="http://script.aculo.us/" target="_blank">scriptaculous</a> and <a href="http://www.jquery.com" target="_blank">jQuery</a> (yes - and many other librarys) offer ready to go solutions for tabbed pages. But sometimes you just need a minimum of what these librarys can do and it&#8217;s faster to write it by yourself.

Extending this for your needs hould be more than simple.

Andreas
