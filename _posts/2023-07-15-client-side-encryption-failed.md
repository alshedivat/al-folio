---
layout: distill
published: true
title: Bug Bounty - Bypass client-side encryption
date: 2022-07-15 11:09:00+0700
description: Writeup for one of private bug bounty related to client-side encryption bypass
tags: bb
# tags: distill formatting
categories: write-ups
thumbnail: assets/img/bb/bb-2.png # change this
giscus_comments: true
related_posts: true
featured: false

authors:
  - name: Dwiki Kusuma
    url: "https://twitter.com/qlkwej"
    affiliations:
      name: qlkwej
toc:
  - name: TL;DR
  - name: Problem
  - name: Attack vectors
  - name: Solution


---


{% details Disclaimer %}
I am not an active bug bounty hunter, I do bug bounty for fun and validating my theory after office hours.
Feedback /  comments / PRs are welcome :)
{% enddetails %}

## TL;DR
This writeup is about bypassing client-side encryption. The approach is similar to my previous CTF write-up [The Try Zone](https://qlkwej.github.io/write-ups/2022/06/06/the-try-zone.html).

I will call the company `evilcorp` and the application `evilapp` for the sake of privacy.

*** 

## Problem
During testing on `evilapp` I notice a unique business flow. When I login to the application by inserting my phone number (`STEP 1`), it return an encrypted HTTP response. But when I input the password, my email address is auto-filled in the HTTP request analyzed in BurpSuite but it's not visibile in front-end. It means the response is decrypted before it used in the `STEP 2`

Another weird thing is, my phone number isn't validated yet but why the email address is returned ? 🤔
I did deeper and analyzing the encryption flow. I found that the encryption is using AES-128-CBC with a static key and IV. The key and IV is stored in the javascript file.

***

## Attack vectors

To exploit this issue, I create a simple nodejs script to decrypt the HTTP response. The script is using the same encryption algorithm and key/IV as the application.
I redacted several info in the script for the sake of privacy.


<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/bb/bb-1.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Submit it to the bugbounty provider, and they triage it.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/bb/bb-2.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
***



## Solution
I suggest several recommendation to fix the issue to `evilcorp`, such as:
1. Implementing captcha (i.e., google captcha) to prevent automated script enumeration
2. Don't return sensitive information, such as email address, passwordExpired info. The encryption is useless since the key, and iv are hardcoded in client side.
3. Change the login flow, by using phone number and password directly or email address and password directly. Don't mix it.
4. Or, add validation after user inserting their phone-number. Such as: unqiue code sent to user's phone number, or email address. To confirm if the phone number is belongs to the current user.


***

