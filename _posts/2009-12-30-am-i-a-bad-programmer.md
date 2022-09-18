---
layout: post
title: Am I still a bad programmer? About testing and refactoring!
date: '2009-12-30T02:16:00+01:00'
tags:
- unittesting
- refactoring
category: 'Programming'

---
Moin Moin,

<p>in an earlier post (<a href="http://blog.netzmeister-st-pauli.com/post/306975866/testing-php-apps-with-phpunit" target="_blank">PHPUnit - testing PHP apps</a>) I was posting the assumption, that I am a bad programmer. The reasons therefor has been the fact, that I don&#8217;t (unit) test the software I write. Is it still true? &#8230; Kind of!</p>

<p>Actually I did some steps in the direction to improve the quality of the code I write. The best thing to do at first is to ask people from whom I think they can help. The topic was &#8220;Testing&#8221;. I was speaking with Arne Blankerts about that and he offered his help during some nice evenings eating Tapas, drinking beer and speaking theoretically about OOP and Testing.</p>

<p>The decision was clear on one hand. I have to test my software / my code. On the other side - what does it help if I am the only one who is doing it while working on an app. And how do I convince my co-worker, that we have to test. I knew that it will become a challenge. And now, after some weeks &#8230;  I am the only one who is testing. Hey wtf! But step by step.</p>

<h3>How testing does not work</h3>

<p>I like to make little jokes about Java. And yes I will continue. Not only because of the fact, that other people are making jokes about PHP. I think the programming language is at a minimum responsible for bad written code. It is the pressure to get a project as fast as possible done, the money aspect and finally the hacker who is coding the software. You can write real bad code in PHP - but you can also do that in Java, C, Perl, Ruby, Python and so on. So let&#8217;s go on with making jokes because it&#8217;s just a game and makes the day funny.</p>

<p>In our company, we have some guys programming a real cool e-marketing software in Java. Markus Wolf is the team leader and knows a lot about testing. I asked him if he would write some slides for an in house training about testing. Some days later we sat together and he explained the principles about testing. Afterwards we went over to the practical part and &#8216;tried&#8217; to write the first tests for our software eUNIQUE. We are using ZEND Framework and it&#8217;s features - e.g the Registry pattern. Uhu - first mistake because hard to test. So we sat together for about three hours with the result of writing one test for one method. We were (and I am still) using PHPUnit. That&#8217;s testing? Simulating millions of objects (mock objects), including a whole framework, writing many lines to be able to write one $this-&gt;assertEquals(blabla, blub)? C&#8217;mon!</p>

<p>So what went wrong? Nothing at all! Really! Because the result, and more important the conclusion of our efforts were simple: the code is written as it is not easily testable. That means - the code is bad! And I am a bad programmer! That was what I was feeling. I had to change that.</p>

<h3>First step to be able to test</h3>

<p>I don&#8217;t like if others think I am a bad programmer. Would you like that? No! But what is even worse - I don&#8217;t like that I think I am a bad programmer. I had to change that. I had to change this situation not being happy and satisfied with my work. So my decision was to learn how to write better (cleaner) code.</p>

<p>When we were having holidays with friends in Denmark, I was reading Martin Fowlers book &#8220;Refactoring&#8221;. This is a real good book. During reading I often thought - yeah - this is the way it should be and man, you did stuff like that already without really knowing, that it is called refactoring. Maybe because of that fact, it was fun to read the book.</p>

<p>Beside that book I was reading Kent Becks &#8220;Test Driven Development&#8221; what was good also, but not that what I will be able to do. One aspect not being able to develop in TDD mode is the fact, that learning TDD is a bigger effort than writing Unit Tests after the production code is written (I come to that point later) and that a lot of code I work with is already written. But anyway - the book showed a real good concept and brought a lot of ideas. I will surely read it again.</p>

<p>And a third one: Robert C. Martin&#8217;s &#8220;Clean Code&#8221;. This book rocks! Everything you ever wanted to read about how to write a give names to variables, functions, classes, how to write functions and classes, how to comment your code, how to built a system and so on - it&#8217;s in this book. Maybe I like this one most.</p>

<p>The essence of these books (and the list is by no means finished) is the following:</p>

<i>How do I write code which is clean, well structured and testable?</i>

<p>Believe me - it&#8217;s a challange to reach that goal. A lot of experience is needed to be able to say: I can write clean code (the authors of the books have decades of experience). I am in the process of starting to write clean code (to all my future entrepreneur&#8217;s: this is a sign for a good programmer: interest of becoming better and willing to work on it!). And it&#8217;s a lot of fun and gives a lot of secureness.</p>

<p>The first step to be able to test code is refactoring. The situation I was speaking of a little before is a good example. The problems in our code are coupling and dependencies. One big target of refactoring is decoupling and less dependencies (if needed you want to use dependency injection). But shall I now write everything new or leave it like it is? Both is wrong! There are some examples in software history that companys died because they thought the only way to get better code is to write everything new. The problem: all the experience, the bugs and their fixes are gone. Writing the software means new bugs and no experience.</p>

<p>Leaving the code like it is also a bad idea. So in this situation I like Martin Fowlers view: refactor all the time in little steps. If looking to older code to understand what the code is doing (this is over 70% of what a programmer is doing each day) and if finding stuff which could be written better, do it. The idea is to find a good tradeoff between effort/time for doing it and the things you have been inteded to do when you hit this part of your code. If you have the feeling that it will take too long and it is too complicated to refactor the code part now, don&#8217;t do it right now.</p>

<p>More important is what to do with new code. I decided to make a cut. Now if I write code for a specific functionality:</p>

<ul><li>I check if the object(s) I created are well designed</li>
<li>I check if the methods are doing only one thing and are small enough</li>
<li>If not I refactor</li>
<li>If the object (or some dependent objects) are finished I write tests for them</li>
<li>If tests fail or code (a method) is not testable, I refactor until I can run the test and I have a green bar (or no errors on the shell)</li>
</ul><p>It&#8217;s as simple as this. Since I do this, the results are tremendous! I feel much more comfortable because the code is much better readable, easier and at least better.</p>

<p>So my conclusion and learning process was to understand, that reliable and good software needs to be unit tested. This is for sure not the only point to reach the target of good software but a fundamental one. I want to encourage every hacker to follow this target and tell im: fuckin&#8217; test your code!</p>

(this post is two months old and was not published because I wanted edit it later. After reading it I thought it&#8217;s worth publishing it &#8230;)
