---
layout: post
title: "Screencast with Voila and convert videos for web"
description: "Make a screencast with Voila and convert the resulting .mov file into a .mp4 and .webm file to include them in the HTML5 video tag."
category: "Programming"
tags: [video]
---

I am creating the new version of the website for a elemntary school in Hamburg called [Grundschule NeugrabenOffene Ganztagsgrundschule (GBS)](http://preview.schule-neugraben.de/). The responsible person for the website at this school is a teacher called Steffi and quite ok on working with websoftware. The CMS I am using here is [Refinery CMS](http://refinerycms.com/). 

So to make the live easy for Steffi, I decided to create very small screencasts. Well, which one to choose here. As alwasy I need simple software with good results. RTFM is boring so it has to be intuitive. 

The search results at Google told me to check out [Voila](http://www.globaldelight.com/voila/). It is available through Apple's AppStore and has a price of 14.99$ at the moment. So I bought it.

The software is dead simple and the results of the screencasts are very good not say of very high quality. BTW: I am using a Speedlink Medusa NX headset with microphone (I have that for my job when I work form home for video-web-talks). After creating a screencast you are able to upload the screencast to Google Drive, Vimeo and others. So I uploaded them to Vimeo but unfortunatley, you are just able to upload 1 HD video per week in your free account. I hade fife ... sucks!

You can also export the screencasts .mov files. I decided to do so and convert them. Good old [ffmpeg](https://www.ffmpeg.org/) time - ding dong! The resulting files from Voila for my 4 Minute screencast is 139 MB. What I want is to share the video in a simple website like this:

    <html>
    <head>
    <title>Video Test</title>
    </head>
    <body>
    <video controls style="width:700px">
        <source src="Schule-Neugraben-CMS-Bild-einfuegen.mp4" type="video/mp4"/>
        <source src="Schule-Neugraben-CMS-Bild-einfuegen.webm" type="video/webm"/>
    </video>
    </body
    </html>

I need to convert the .mov file to an .mp4 file. I don't want to crop or change anything. The commandline looks like this:

    ffmpeg -i Schule-Neugraben-CMS-Bild-einfuegen.mov Schule-Neugraben-CMS-Bild-einfuegen.mp4

While converting, ffmpeg is using the H.264/MPEG-4 AVC codec. You could also add the parameter 

    -q:a [quality, INTEGER]

for audio quality or

    -q:v [quality, INTEGER]

for video quality. I ommited both because I wanted the best result.

The resulting .mp4 file is now 15 MB in size and the quality is still really good. The next step is to convert the .mp4 file into a .webm file. This is a format resulting of Google's [vp8 codec](http://en.wikipedia.org/wiki/VP8) and this is done with `libvpx`. If you don't have it already compiled into ffmpeg, you can simply reinstall ffmpeg with homebrew like so:

    brew reinstall ffmpeg --with-libvpx

Find more info about that at [Mozillas H.264 support in Firefox site at MDN](https://developer.mozilla.org/en-US/Apps/Build/Audio_and_video_delivery/H.264_support_in_Firefox) and at [http://www.webmproject.org](http://www.webmproject.org/).

The commandline looks like this:

    ffmpeg -i Schule-Neugraben-CMS-Bild-einfuegen_2.mp4 -strict -2 Schule-Neugraben-CMS-Bild-einfuegen.webm

The flag `-strict -2` is neccessary, because ffmpeg doesn't let you convert the file: _The encoder 'vorbis' is experimental but experimental codecs are not enabled, add '-strict -2' if you want to use it._ 
Ok - as you like!

The resulting .webm file is 9.4 MB in size. That's cool. And now you are able to visit the website shown above. We have two different files for the HTML5 video tag what will support most browsers. And if someone comes with Internet Explorer ... well - I personally don't care.

One note: converting the .mp4 file to .webm takes really long!



