---
layout: distill
published: true
title: Web - The Try Zone
date: 2022-05-16 11:09:00+0700
description: Writeup for The Try Zone Challenge USCyberGames
tags: ctf
# tags: distill formatting
categories: write-ups
thumbnail: assets/img/uscybergames/cyber-1.png # change this
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
  - name: Solution


---


{% details Disclaimer %}
I am not a CTF addict nor maniac, I do CTF for fun and learning purpose. 
So, if you are looking for a writeup that is very detailed and easy to understand, I suggest you to find another writeup. 

This writeup is just a note for myself and maybe for someone who is looking for a hint to solve the challenge.
Feedback /  comments / PRs are welcome :)
{% enddetails %}

## TL;DR
This writeup is about The Try Zone challenge from USCyberGames. To get the flag we need to exploit the client-side validation on the obfuscated javascript file.

## Challenge Description

URL: https://uscybercombine-try_zone_challenge.chals.io/

Author: Lauren Delwiche

*** 

## Problem

By visiting the URL, we will see a web application with a login page. But, we don't have the credential to login.
The interesting part was, no server-side HTTP request initiated from the client to the server. It means the application is using a client-side validation 🤔

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/uscybergames/cyber-1.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

***

## Attack vectors

It's highlightly possible to exploit the client-side validation. But, before we do that, we need to understand the application first.

```javascript

(function(_0x118b98, _0x335091) {
    var _0x4be5ec = a0_0x427a
      , _0x22668d = _0x118b98();
    while (!![]) {
        try {
            var _0x284930 = parseInt(_0x4be5ec(0x168)) / 0x1 + -parseInt(_0x4be5ec(0x16d)) / 0x2 * (-parseInt(_0x4be5ec(0x174)) / 0x3) + -parseInt(_0x4be5ec(0x176)) / 0x4 + parseInt(_0x4be5ec(0x169)) / 0x5 + -parseInt(_0x4be5ec(0x16c)) / 0x6 * (parseInt(_0x4be5ec(0x16e)) / 0x7) + parseInt(_0x4be5ec(0x173)) / 0x8 * (-parseInt(_0x4be5ec(0x170)) / 0x9) + parseInt(_0x4be5ec(0x171)) / 0xa;
            if (_0x284930 === _0x335091)
                break;
            else
                _0x22668d['push'](_0x22668d['shift']());
        } catch (_0x3d73e0) {
            _0x22668d['push'](_0x22668d['shift']());
        }
    }
}(a0_0x202b, 0x62c4e));
function authenticate() {
    var _0x3199d5 = a0_0x427a
      , _0x316b93 = document[_0x3199d5(0x16f)](_0x3199d5(0x175))[_0x3199d5(0x167)];
    _0x316b93 === _0x3199d5(0x16a) ? alert(_0x3199d5(0x16b)) : alert(_0x3199d5(0x172));
}
function a0_0x427a(_0x156085, _0x9e0729) {
    var _0x202b2d = a0_0x202b();
    return a0_0x427a = function(_0x427a41, _0x15227a) {
        _0x427a41 = _0x427a41 - 0x167;
        var _0xd1a30 = _0x202b2d[_0x427a41];
        if (a0_0x427a['eUCHSe'] === undefined) {
            var _0x50c8f8 = function(_0x316b93) {
                var _0x204747 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';
                var _0x4c5916 = ''
                  , _0x305af8 = '';
                for (var _0x2ba3d9 = 0x0, _0x41150e, _0x20834c, _0x1f1f98 = 0x0; _0x20834c = _0x316b93['charAt'](_0x1f1f98++); ~_0x20834c && (_0x41150e = _0x2ba3d9 % 0x4 ? _0x41150e * 0x40 + _0x20834c : _0x20834c,
                _0x2ba3d9++ % 0x4) ? _0x4c5916 += String['fromCharCode'](0xff & _0x41150e >> (-0x2 * _0x2ba3d9 & 0x6)) : 0x0) {
                    _0x20834c = _0x204747['indexOf'](_0x20834c);
                }
                for (var _0x26c4e4 = 0x0, _0x432f0a = _0x4c5916['length']; _0x26c4e4 < _0x432f0a; _0x26c4e4++) {
                    _0x305af8 += '%' + ('00' + _0x4c5916['charCodeAt'](_0x26c4e4)['toString'](0x10))['slice'](-0x2);
                }
                return decodeURIComponent(_0x305af8);
            };
            a0_0x427a['NoXrAA'] = _0x50c8f8,
            _0x156085 = arguments,
            a0_0x427a['eUCHSe'] = !![];
        }
        var _0x415787 = _0x202b2d[0x0]
          , _0x211fcd = _0x427a41 + _0x415787
          , _0x5d78bf = _0x156085[_0x211fcd];
        return !_0x5d78bf ? (_0xd1a30 = a0_0x427a['NoXrAA'](_0xd1a30),
        _0x156085[_0x211fcd] = _0xd1a30) : _0xd1a30 = _0x5d78bf,
        _0xd1a30;
    }
    ,
    a0_0x427a(_0x156085, _0x9e0729);
}
function a0_0x202b() {
    var _0x1041cd = ['ndG2mZu1rgXQs3rn', 'mtq3ntG3mhbOBMXJwa', 'C2L4BMf0Aw9UC2nOyw1WAw9UCW', 'DxnJz3TJBdeZBNrFCZfKm19HDxrOx2i0zf8Xzdm0Fq', 'mtm4DNHuCxPo', 'mJi2mZrrC1zkzgm', 'nZGZnZLdDLnSEe0', 'z2v0rwXLBwvUDej5swq', 'mJmYmtfuzK5Qvui', 'mJe5mdu3meXPzg5eCq', 'u29YCNKSihrOyxqGAxmGBM90ignVCNjLy3qUifrswsbHz2fPBIbYDwDNzxiH', 'odCYyvLdzM9y', 'm1nRB0zdzq', 'CgfZC3DVCMq', 'mJC0odeYBKDZswPs', 'DMfSDwu'];
    a0_0x202b = function() {
        return _0x1041cd;
    }
    ;
    return a0_0x202b();
}
```


The code above is the obfuscated javascript code from the application. While it's hard to read the code, but we can guess the potential variable name and the login flow on this application.

See the red square in the picture below, it's the potential logic to check the login flow.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/uscybergames/cyber-2.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

***



## Solution
Set a breakpoint on the potential logic above, and `watch` the `_0x316b93`, `_0x3199d5` variable.
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/uscybergames/cyber-5.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

We found the potential password is `sixnationschampions`.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/uscybergames/cyber-4.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

we can control the logic to show the potential flag, by double clicking on the `alert(_0x3199d5(0x16b))`.

flag: `uscg{cl13nt_51d3_15_4_b4d_1d34}`


***

