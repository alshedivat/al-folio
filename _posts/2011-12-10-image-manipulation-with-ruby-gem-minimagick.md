---
layout: post
title: Image Manipulation with Ruby gem MiniMagick
date: '2011-12-10T23:12:00+01:00'
tags:
- ruby
- rubygems
- imagemagick
- minimagick
- carrierwave
category: 'Programming'

---
<p>Moin Moin,</p>

<p>in a recent project, I have to resize uploaded images because the images have to be shown in a gallery. The user who uploads the image likes comfort, so I started to use</p>

<p><a href="https://github.com/jnicklas/carrierwave" target="_blank">https://github.com/jnicklas/carrierwave</a></p>

<p>for handling the upload and</p>

<p><a href="https://github.com/probablycorey/mini_magick" target="_blank">https://github.com/probablycorey/mini_magick</a></p>

<p>to resize the images in the upload process. MiniMagick is a wrapper for the cli tool</p>

<p><a href="http://www.imagemagick.org/" target="_blank">ImageMagick</a></p>

<p>well known for its huge image editing possibilities</p>

<p>If you just need basic resizing, carrierwave can do the job for you as well.</p>

<p>Here&#8217;s a simple example (taken from the github site). The script is called magic.rb and there is a image called input.jpg in the same folder. where I run the script:</p>

<pre>
#!/usr/bin/env ruby

require 'rubygems'
require 'mini_magick'

image = MiniMagick::Image.open("input.jpg")
image.resize "100x100"
image.write  "output.jpg"
puts "width: #{image[:width]}"
puts "height: #{image[:height]}"
puts "compression: #{image["%Q"]}"
</pre>

<p>The output is:</p>

<pre>
duke@Macintosh:~/workspace/programming/ruby/MiniMagick$ ./magic.rb
width: 71
height: 100
compression: 99
</pre>

<p>Simple! But the one thing I wanna point you to is the following line in magic.rb:</p>

<pre>
puts image["%Q"]
</pre>

<p>This is cool, because you can use the format options provided by ImageMagick. You can find a list of all options at</p>

<p><a href="http://www.imagemagick.org/script/escape.php." target="_blank">http://www.imagemagick.org/script/escape.php.</a></p>

<p>So again a cool gem which saves hours of work!</p>

<p>Cheers</p>

<p>Andy</p>
