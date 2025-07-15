---
layout: post
title: Brilliant and Simple: Filename-Based Sandbox Evasion – A Hidden Gem
date: 2025-07-15 20:00:00-0000
inline: false
related_posts: false
---

While digging through some malware analysis write-ups yesterday, I stumbled across a fantastic blog post by Xavier Mertens (@xme) that really impressed me. It highlights a sandbox evasion technique that is both incredibly simple and surprisingly effective — and it all comes down to just the filename of the sample!

---

[Original Post](https://isc.sans.edu/diary/28708)

What makes this so clever is that it doesn’t rely on heavy obfuscation or complex anti-analysis tricks. Instead, it leverages the fact that many sandboxes rename files to generic names like sample.exe, malware.tmp, or even a hash. The sample in question is a .lnk file (Windows shortcut) that uses a simple cmd one-liner to search for files that match a specific pattern — in this case: dir /b "Comp*.*k"

If the sample’s name has been changed (as sandboxes often do), this command will fail, and the script won't proceed to the next stage. Genius.

Xavier shows how this ultimately leads to a PowerShell iex (Invoke-Expression) command that tries to fetch further payloads from a C2 server, with the next stage hidden behind a Set-Cookie header. There’s even an embedded PNG image in the .lnk file that contains additional commands — a nice touch of steganography.

💡 Lesson learned: If you're analyzing malware, keep the original filename and path. Changing them might break the execution and hide what the sample is really trying to do.

This is one of those simple yet powerful tricks that reminds me how creative malware authors can be — and how small operational details (like how a file is named) can have a huge impact on analysis.

Thanks to @xme for sharing this — a truly elegant technique that’s easy to overlook!