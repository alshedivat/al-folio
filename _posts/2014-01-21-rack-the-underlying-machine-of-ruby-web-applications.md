---
layout: post
title: Rack - the underlying machine of Ruby web applications
date: '2014-01-21T00:40:37+01:00'
tags:
- rack
- ruby
category: 'Programming'

---
<p>Moin Moin,</p>

<p>I you have ever wondered how a Ruby web applications/frameworks like Rails, Sinatra or Padrino work, you should understand what Rack is doing.</p>

<p>Rack was created 2007 by Christian Neukirchen (<a href="http://chneukirchen.org/blog/archive/2007/02/introducing-rack.html" target="_blank">inital blog post</a>). Rack does this:</p>

<p><em>"Rack aims to provide a minimal API for connecting web servers and web frameworks."</em></p>

<p>Pratik Naik wrote a nice thread with some <a href="http://m.onkey.org/ruby-on-rack-1-hello-rack" target="_blank">basic examples</a>. You should read it.</p>

<p>Actually I had problems installing Mongrel so I simply changed to <em>Thin</em> and used a <em>Gemfile</em> and an <em>.rvmrc</em> file for convenience. I put the code together in a mini project called airforec_one. Please note the typo in the name :).</p>

<p><strong>.rvmrc</strong></p>

<pre><code>rvm use ruby-2.0.0-p353@airforec_one --create
</code></pre>

<p><strong>Gemfile</strong></p>

<pre><code>source "https://rubygems.org"

gem 'rack'
gem 'thin'
</code></pre>

<p><strong>init.rb</strong></p>

<pre><code>require 'rubygems'
require 'rack'
require 'thin'

class HelloMrPresident
  def call(env)
    [200, {"Content-Type" =&gt; "text/html"}, "Hey this is the president. Whazz up?"]
  end
end

Rack::Handler::Thin.run HelloMrPresident.new, :Port =&gt; 3000
</code></pre>

<p>Now run the code:</p>

<pre><code>ruby init.rb
Thin web server (v1.6.1 codename Death Proof)
Maximum connections set to 1024
Listening on 0.0.0.0:3000, CTRL+C to stop
</code></pre>

<p>And open <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></p>

<p>What you see is the beginning of your career as a Ruby web framework developer. But just if Rails is too heavy, Sinatra is too less and Padrino is too young.</p>

<p>Cheers</p>

<p>Andy</p>
