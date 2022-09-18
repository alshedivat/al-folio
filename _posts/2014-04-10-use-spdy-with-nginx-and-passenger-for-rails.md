---
layout: post
title: "Use SPDY with Nginx and Passenger for Rails"
description: "Use SPDY with Nginx and Passenger for Rails"
category: 'Server'
tags: [nginx, rails]
---

I am using [Passenger](https://www.phusionpassenger.com/) with [Nginx](http://nginx.org/) to serve Rails applications. Although I was thinking about moving to [Puma](http://puma.io/) because of some technical reasons, I still think that Passenger is a solid, prooved and good webserver for Rails applications.

As you already know, we are waiting for [HTTP/2](http://http2.github.io/) and [SPDY](http://en.wikipedia.org/wiki/SPDY). SPDY is basically the same as HTTP but does always include TLS encryption and is able to use multiplexing (plus other cool features). This means parallel transfer of assets because only one connection per client is required. Woot!

Passenger does not include SPDY from scratch but Phusion is providing a patched binary you can integrate. As of this writing, the binary does support SPDY/2. Here is a list how to integrate the binary. I assume you have compiled Nginx with Passenger. Please do read first the whole list and start the work afterwards.

##1. Follow the guide

Hongli Lai ([@honglilai](https:/twitter.com/honglilai)) has written a guide, how to use Nginx and SPDY. Read the steps here: [Use Nginx + SPDY, without compiling Nginx and without a recent OpenSSL](http://blog.phusion.nl/2013/08/21/use-nginx-spdy-without-compiling-nginx-and-without-a-recent-openssl/) but do not start immediately.

I am not sure why the title has "without a recent OpenSSL" because you will see later, that the tests for the Heartbleed bug do pass.

##2. Follow these steps

We do have a working Nginx installation already, so there is no need to install Nginx (as stated in the guide). What we need is the patched binary and replace the existing one. I have asked Hongli in the comments below the post about why there is no nginx tar anymore. It is just renamed. Hongli has upgraded the blog post thankfully. Here is what you need to do:

#### a. Add the deb source from Phusion to your sources.list.

On Ubuntu, simply add a file in the _sources.list.d_ directory

    touch /etc/apt/sources.list.d/passenger.list

and add this content:

    deb https://oss-binaries.phusionpassenger.com/apt/passenger precise main

####b. Upgrade your system

    sudo apt-get update
    sudo apt-get upgrade

You MAY receive ERRORS. Don't worry and keep on going.

####c. Download the binary

As of this writing it is the source below. It may be different when you read this post. You can simply check [https://oss-binaries.phusionpassenger.com/binaries/passenger/by_release](https://oss-binaries.phusionpassenger.com/binaries/passenger/by_release). It is VERY important, that the binaries version is the exact same version as of your Nginx installation.

    curl -O https://oss-binaries.phusionpassenger.com/binaries/passenger/by_release/4.0.41/webhelper-1.4.7-x86_64-linux.tar.gz
    curl -O https://oss-binaries.phusionpassenger.com/binaries/passenger/by_release/4.0.41/webhelper-1.4.7-x86_64-linux.tar.gz.asc

####d. Get the developers gpg key and verify the tar archive

    gpg --recv-keys AC40B2F7
    gpg --verify  webhelper-1.4.7-x86_64-linux.tar.gz.asc

No errors should show up.

####e. Extract the archive and rename the binary to nginx

As written in the guide by Hongli, Phusion renamed the binary to PassengerWebHelper. Simply rename it to _nginx_.

    tar xzvf webhelper-1.4.7-x86_64-linux.tar.gz
    mv PassengerWebHelper nginx

####f. Copy the binary to the correct place. It may be different in your system depending on where you have installed Nginx

    sudo cp /usr/sbin/nginx nginx.original
    sudo /etc/init.d/nginx stop
    sudo cp nginx /usr/sbin/

####g. Update your Nginx vhost configuration.

For the regarding SSL domain, yop need to add the keyword _spdy_ to the _listen_ directive:

    listen 443 default_server ssl spdy deferred;

####h. Restart nginx

    sudo /etc/init.d/nginx restart

####i. Check if SPDY is activated

    http://spdycheck.org/#www.YOUR_DOMAIN.com

####j. Check that the doamin is not vulnerable agints the Heartbleed bug

    http://filippo.io/Heartbleed/#www.YOUR_DOMAIN.com

If everything works, you should now have SPDY support for your Rails application. Go and check out the parallel transfer of the sources in your browsers developer toolbar and enjoy :-)


