---
layout: post
title: Rails - debugging with pry
date: '2012-05-27T00:00:00+02:00'
tags:
- rails
- debugging
- irb
- pry
category: 'Rails'

---
<p>Moin Moin,</p>

<p>debugging is one of the things a developer has to do most. One case is e.g when the customer is reporting a bug. Another one is when we are developing new software or features.
Debugging is different in different languages. If you are coding Java, then it is pretty sure you are using Eclipse. It is offering a pretty good debugger inside the GUI. Developing JavaScript apps is less painless, since there are the great in-browser developer tools for <a href="https://www.google.com/intl/en/chrome/browser/" target="_blank">Google Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/" target="_blank">Mozilla Firefox</a>.</p>

<p>Debugging in <a href="http://rubyonrails.org/" target="_blank">Rails</a> is not a pain in the ass. The <a href="http://rubygems.org/gems/ruby-debug" target="_blank">ruby-debug gem</a> is quite good. You have to start the local server with -u or &#8212;debugger. The debugger is stopping the program execution where you set the &#8216;debugger&#8217; method in your code. Inside the Rails log, there are then all the known debugger commands like &#8216;n&#8217; for next, &#8216;c&#8217; for continue and so on, available. In most cases this kind of &#8216;print_f&#8217; debugging is sufficient. There are some caveats or even shortcomings. Sometimes the scope of the debugger is wrong and you have to stop/start the server to fix this.</p>

<p>Recently I stumbled upon an alternative for irb (the ruby interactive shell). It is called pry and can be found <a href="http://pry.github.com/" target="_blank">here</a>. The tool is super awesome and I strongly recommend that you give it a try. Here is a good <a href="http://railscasts.com/episodes/280-pry-with-rails" target="_blank">RailsCast from Ryan Bates</a>.</p>

<p>The steps you have to do are simple:</p>

<pre><code> gem install pry pry-doc
</code></pre>

<p>In your Gemfile add:</p>

<pre><code> group :development do
   gem 'pry'
   ...
 end
</code></pre>

<p>Don&#8217;t forget to run bundle install afterwards.</p>

<p>Now set the following to any place in your code - here is some example code from an AR model:</p>

<pre><code> def printer_with_qraex_product
   printers = {}

   printer = select_printer
   total = printer.length

   printer = select_printer(true)
   printer.each do |p|
     cartridge = Cartridge.select('DISTINCT(qraexid)').where("printer_id=?
       and printer_group=?", p.id, group)[0]
     printers[p.name] = {qraexid: cartridge.qraexid}
   end
   binding.pry
   {:printer =&gt; printers, :total =&gt; total}
end
</code></pre>

<p>'binding.pry' is the same as you would use 'debugger'. It is stopping the execution BUT also opening the pry shell and showing the code around the binding to pry:</p>

<p><img src="http://media.tumblr.com/tumblr_m4ngcjjxHr1qa0m1w.png" alt=""/></p>

<p>The cool thing is, that you now can access all the variables and methods in this scope:</p>

<pre><code> [1] pry(#&lt;Printer&gt;)&gt; total
 =&gt; 2
 [2] pry(#&lt;Printer&gt;)&gt; printer
 =&gt; [#&lt;Printer id: 37693, name: "Color InkJet CP 1160"&gt;,
   #&lt;Printer id: 37694, name: "Color InkJet CP 1700"&gt;]
 [3] pry(#&lt;Printer&gt;)&gt;
</code></pre>

<p>You can continue the execution of the program by entering &#8216;exit-all&#8217;</p>

<h4>Conclusion</h4>

<p>pry is an awesome tool - not only for debugging but also (and mainly) for inspecting objects. Give it a try and you will see, that as here discussed, debugging is much more efficient and fun.</p>
