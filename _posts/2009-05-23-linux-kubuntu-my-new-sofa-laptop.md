---
layout: post
title: Linux Kubuntu - my new sofa machine
date: '2009-05-23T00:00:00+02:00'
tags:
- kubuntu
- linux
- via-unichrome
category: 'Server'

---
Moin Moin,

after having some fuckups with Windows XP and not having the ability to code in a well known environment, I decided to trash Windows XP and install Kubuntu. Why? &#8216;Cause it&#8217;s nice. It brings all the advantages from Ubuntu based on Debian and has the really cool looking KDE. I never used it before but after some hours working and looking at it, I am satisfied.

I have a RaLink RT2500 WLAN adapter onboard and also a PCI Buffalo card. No problem. Kubuntu offers the option to install the drivers in the Application Launcher &gt; System &gt; Hardware Drivers. Cool!

Next step was to get the grafic chipset work. Hm - that costs me some google searches but it&#8217;s also really simple. The openchrome driver is on board by default since Ubuntu 8.04. The only thing I had to do is activate it and write some extra stuff into the xorg.conf. By the way - I have one of those Via Unichrome PM800 onboard grafic chipsets. Here is what I had to change in xorg.conf:

<pre>$ vi /etc/X11/xorg.conf
Section "Device"
        Identifier      "Configured Video Device"
        Driver          "openchrome"
EndSection

Section "Screen"
        Identifier      "Default Screen"
        Monitor         "Configured Monitor"
        Device          "Configured Video Device"

        Subsection "Display"
                Depth           8
                Modes           "1024x768" "800x600"
                ViewPort        0 0

                Depth           16
                Modes           "1024x768" "800x600"
                ViewPort        0 0

                Depth           24
                Modes           "1024x768" "800x600"
                ViewPort        0 0
        EndSubsection
EndSection</pre>

After that stop the display manager kdm and restart it. That&#8217;s it.

Take care if you find stuff concerning the Via Unichrome driver. This is really all you have to do. No complicated installation processes as described a lot.

So for me this is really a cool Linux. I am going to setup the rest of my needed stuff and then forget about all that never ending installation nights &#8230;

Andy
