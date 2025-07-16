---
layout: post
title: Brilliant and Simple - Filename-Based Sandbox Evasion
date: 2025-07-15 11:00:00-0400
inline: false
related_posts: false
---

What makes this so clever is that it doesn’t rely on heavy obfuscation or complex anti-analysis tricks. Instead, it leverages the fact that many sandboxes rename files to generic names like sample.exe, malware.tmp, or even a hash. The sample in question is a .lnk file (Windows shortcut) that uses a simple cmd one-liner to search for files that match a specific pattern — in this case: dir /b "Comp*.*k"

---

[Original Post](https://isc.sans.edu/diary/28708)


If the sample’s name has been changed (as sandboxes often do), this command will fail, and the script won't proceed to the next stage. Genius.

Xavier shows how this ultimately leads to a PowerShell iex (Invoke-Expression) command that tries to fetch further payloads from a C2 server, with the next stage hidden behind a Set-Cookie header. There’s even an embedded PNG image in the .lnk file that contains additional commands — a nice touch of steganography.

💡 Lesson learned: If you're analyzing malware, keep the original filename and path. Changing them might break the execution and hide what the sample is really trying to do.

This is one of those simple yet powerful tricks that reminds me how creative malware authors can be — and how small operational details (like how a file is named) can have a huge impact on analysis.

Thanks to @xme for sharing this — a truly elegant technique that’s easy to overlook!

#### Hipster list

<ul>
    <li>brunch</li>
    <li>fixie</li>
    <li>raybans</li>
    <li>messenger bag</li>
</ul>

Hoodie Thundercats retro, tote bag 8-bit Godard craft beer gastropub. Truffaut Tumblr taxidermy, raw denim Kickstarter sartorial dreamcatcher. Quinoa chambray slow-carb salvia readymade, bicycle rights 90's yr typewriter selfies letterpress cardigan vegan.

---

Pug heirloom High Life vinyl swag, single-origin coffee four dollar toast taxidermy reprehenderit fap distillery master cleanse locavore. Est anim sapiente leggings Brooklyn ea. Thundercats locavore excepteur veniam eiusmod. Raw denim Truffaut Schlitz, migas sapiente Portland VHS twee Bushwick Marfa typewriter retro id keytar.

> We do not grow absolutely, chronologically. We grow sometimes in one dimension, and not in another, unevenly. We grow partially. We are relative. We are mature in one realm, childish in another.
> —Anais Nin

Fap aliqua qui, scenester pug Echo Park polaroid irony shabby chic ex cardigan church-key Odd Future accusamus. Blog stumptown sartorial squid, gastropub duis aesthetic Truffaut vero. Pinterest tilde twee, odio mumblecore jean shorts lumbersexual.