---
layout: post
title: Ruby code analyzing rake tasks
date: '2012-07-08T17:15:00+02:00'
tags:
- rails
- ruby
- analyzing
- codesmells
category: 'Programming'

---
<p><strong>Moin Moin,</strong></p>

<p>while writing Ruby code for the last three years now, I think I have a solid knowledge, how Ruby code and projects should be written. But who am I to think, that I do everything perfect. No. I know, that there are always flaws in my code, your code, everybody&#8217;s code.</p>

<p>That&#8217;s the reason why there are code metric and analyzing tools for each programming language. For Ruby there are also several. I started using four of them. For convenience purposes, I created a small git repository with some rake tasks. You can find it <a href="https://github.com/andywenk/ruby_code_analyzer_rake_tasks" target="_blank">here on github</a>. I used it in the sample output below.</p>

<h3>reek</h3>

<p><a href="https://github.com/troessner/reek/wiki" target="_blank">https://github.com/troessner/reek/wiki</a></p>

<p>reek is an awesome code smell detector written by <a href="https://twitter.com/kevinrutherford" target="_blank">Kevin Rutherford</a> and now maintained by <a href="https://github.com/troessner/reek" target="_blank">Timo Rößner</a>. It actually is looking for code smells like Duplication, Long Method, Large Class, Simulated Polymorphism and the like. <a href="https://github.com/troessner/reek/wiki/Code-Smells" target="_blank">Check out the code smells Wiki page </a>for more info. I strongly recommend optimizing your code to avoid these smells.</p>

<p><strong>sample output</strong></p>

<pre>
$ rake analyzer:reek

Running reek and find code smells

app/controllers/application_controller.rb -- 2 warnings:
  ApplicationController has no descriptive comment (IrresponsibleModule)
  ApplicationController#render_500 has the name 'render_500'
   (UncommunicativeMethodName)
app/controllers/news_controller.rb -- 2 warnings:
  NewsController has no descriptive comment (IrresponsibleModule)
  NewsController#save_newsletter_registration calls flash 3 times
   (DuplicateMethodCall)
</pre>

<h3>rails_best_practices</h3>

<p><a href="http://rails-bestpractices.com" target="_blank">http://rails-bestpractices.com</a></p>

<p>rails_best_practices is a tool to check the quality of Rails code. It is written by <a href="https://twitter.com/flyerhzm" target="_blank">@flyerhzm</a>. It tells you, where you can optimize your Rails code by providing detection for e.g. MoveModelLogicIntoModelReview, RemoveUnusedMethodsInControllersReview, ReplaceComplexCreationWithFactoryMethodReview and many others.</p>

<p><strong>sample output</strong></p>

<pre>
$ rake analyzer:rails_best_practices

Running rails_best_practices and inform about found issues

Source Codes:  100% |ooooooooooo| Time:   0:00:02
app/models/image.rb:11 - change Hash Syntax to 1.9
app/models/image.rb:19 - change Hash Syntax to 1.9
app/controllers/pages_controller.rb:59 - move model logic into
  model (page use_count &gt; 4)
app/controllers/admin/galleries_controller.rb:20 - remove
  unused methods (Admin::GalleriesController#create)
</pre>

<h3>flay</h3>

<p><a href="http://ruby.sadi.st/Flay.html" target="_blank">http://ruby.sadi.st/Flay.html</a></p>

<p>First of all, I really like the website of the <a href="http://ruby.sadi.st/About_Us.html" target="_blank">RubySadists</a>. I guess these two guys have a lot of fun working on Ruby projects.</p>

<p>flay is detecting structural similarities in your code. The found issues are good candidates for refactoring.</p>

<p><strong>sample output</strong></p>

<pre>
$ rake analyzer:flay

Running flay and and analyze code for structural similarities

flay app/*

1) Similar code found in :defn (mass = 87)
  app/controllers/admin/images_controller.rb:11
  app/controllers/admin/news_controller.rb:19
  app/controllers/admin/uploads_controller.rb:31

2) Similar code found in :defn (mass = 78)
  app/controllers/admin/galleries_controller.rb:45
  app/controllers/admin/news_controller.rb:40
  app/controllers/admin/uploads_controller.rb:41
</pre>

<h3>flog</h3>

<p><a href="http://ruby.sadi.st/Flog.html" target="_blank">http://ruby.sadi.st/Flog.html</a></p>

<p>This also a library from the RubySadists. It simply shows you shitty code. This is a good starting point to rethink what the heck you have coded ;-). As an indicator, a number is used to show how ugly the code at the found line is. The higher the number, the worse it is.</p>

<p><strong>sample output</strong></p>

<pre>
rake analyzer:flog

Running flog and find the most tortured code

flog -cad app/models/*.rb
 130.7: flog total
     4.4: flog/method average

    11.8: Image#none
     2.5:   assignment
     2.3:   branch
     1.5:   max
     1.4:   sorting
     1.3:   +
     1.2:   nil?
     1.1:   before_save
     1.1:   mount_uploader
     1.1:   validates
     1.1:   belongs_to
     1.1:   attr_accessible
     0.4:   lit_fixnum

     8.1: Image::json_data                 app/models/image.rb:17
     1.6:   array_of_images_with_id_and_path
     1.4:   []
     1.4:   joins
     1.2:   where
     1.2:   new
     1.2:   assignment
     1.2:   to_json

     8.0: ImageSorter#change_position      app/models/image_sorter.rb:26
     2.8:   sorting
     2.4:   assignment
     2.4:   update_image
</pre>

<h3>summary</h3>

<p>These four code metric tools are just a few out of a bunch of tools. But it&#8217;s always the same. It&#8217;s better than nothing. And here&#8217;s a challange: try to fix all found issues in one of your smaller projects. How longe did it take? A day? A week? A month? The most important part of the story is the fact, that you will remember what you did wrong the next time you open your code editor and start hacking on a Ruby project.</p>

<p>Cheers</p>

<p>Andy</p>

<p>EDIT: you can see the analyzer in action here: <a href="http://shelr.tv/records/4ffa15da9660805a7a000005" target="_blank">http://shelr.tv/records/4ffa15da9660805a7a000005</a></p>
