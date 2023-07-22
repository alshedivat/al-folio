---
layout: distill
published: true
title: Web - BlinkerFluids Writeup
date: 2022-05-25 11:09:00+0700
description: Writeup for BlinkerFluids Challenge. Cyber Apocalypse CTF 2022 - Intergalactic Chase
tags: ctf
# tags: distill formatting
categories: write-ups
thumbnail: assets/img/cyber-apocalypse-ctf-2022/blinker-1.png # change this
giscus_comments: true
related_posts: true
featured: true

authors:
  - name: Dwiki Kusuma
    url: "https://twitter.com/qlkwej"
    affiliations:
      name: qlkwej
toc:
  - name: Challenge Description
  - name: Problem
  - name: Attack vectors
    subsections:
      - name: Checking the package.json
  - name: Solution
  - name: Lesson Learned
    subsections:
      - name: Checking the potential pdf engine by the Server response (blackbox)
      - name: Potential SSTI on the pdf engine (blackbox)
      - name: Potential XSS on the pdf engine (blackbox)

---


{% details Disclaimer %}
I am not a CTF addict nor maniac, I do CTF for fun and learning purpose. 
So, if you are looking for a writeup that is very detailed and easy to understand, I suggest you to find another writeup. 

This writeup is just a note for myself and maybe for someone who is looking for a hint to solve the challenge.
Feedback /  comments / PRs are welcome :)
{% enddetails %}


## Challenge Description

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/blinker-1.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Upon checking the challenge description, we are given a short description about the challenge.

> Once known as an imaginary liquid used in automobiles to make the blinkers work is now one of the rarest fuels invented on Klaus' home planet Vinyr. The Golden Fang army has a free reign over this miraculous fluid essential for space travel thanks to the Blinker Fluids corp. Ulysses has infiltrated this supplier organization one of the HR departement tools and needs your help to get into their server. Can you help him?  

Let start the challenge by visiting the given link.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/blinker-2.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

It's an invoice web application, let's take a look.

*** 

## Problem

This challenges provide us with a source code, so we can check the source code to find the vulnerability.


```javscript
<!-- the file on main.js -->


    $(document).ready(function() {
        listInvoice();
        $('#create-btn').on('click', showForm);
        $('#save-btn').on('click', addInvoice);
        window.easyMDE = new EasyMDE({element: $('#markdown_content')[0], renderingConfig: {singleLineBreaks: false}});
    });

    const showForm = () => {
        $('#invoices_view').hide();
        $('#markdown_view').slideDown();
    }

    const populateTable = (data) => {
        tRow = `<tr>
                    <td>${data.invoice_id}</td>
                    <td>${data.created}</td>
                    <td><a href="/static/invoices/${data.invoice_id}.pdf" target="_blank">PDF</a></td>
                    <td><a href="#" onclick="removeInvoice('${data.invoice_id}')">Delete</a></td>
                </tr>`;
        $('#invoice-list').append(tRow);
    }

    const listInvoice = async () => {
        await fetch('/api/invoice/list', {
            method: 'GET'
        })
        .then((response) => response.json()
            .then((data) => {
                if (response.status == 200) {
                    for (let row of data) {
                        populateTable(row);
                    }
                    return;
                }
            }))
        .catch((error) => {
            console.log(error);
        });
    };

    const removeInvoice = async (invoice_id) => {
        await fetch('/api/invoice/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({invoice_id}),
        })
        .then((response) => {
            location.reload();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const addInvoice = async () => {

        $('#save-btn').prop('disabled', true);

        let card = $('#resp-msg');
        card.hide();

        let loading = $('#loading_view');
        loading.show();
        $('.pdf_frame').hide();

        let markdown_content = window.easyMDE.value();

        if ($.trim(markdown_content) === '') {
            $('#save-btn').prop('disabled', false);
            card.text('Please add some content first!');
            card.attr('class', 'alert alert-danger');
            card.show();
            loading.hide();
            return;
        }

        await fetch('/api/invoice/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({markdown_content}),
            })
            .then((response) => response.json()
                .then((data) => {
                    if (response.status == 200) {
                        window.setTimeout(function() {
                            loading.hide();
                            location.reload();
                            }, 2500);
                            return;
                    } else {
                        loading.hide();
                        card.text(data.message);
                        card.attr('class', 'alert alert-danger');
                        card.show();
                    }
                }))
            .catch((error) => {
                loading.hide();
                card.text(error);
                card.attr('class', 'alert alert-danger');
                card.show();
            });
    }
```

What I found from the source code:
1. Path of the invoice is `/static/invoices/${data.invoice_id}.pdf`
2. API to delete the invoice `await fetch('/api/invoice/delete', {...}`
3. API to add the invoice `await fetch('/api/invoice/add', {...}`

***

## Attack vectors
Let's use the application as it is, and see what we can do with it.
We can create the invoice, delete the invoice, and see the invoice.

<!-- image here -->
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/blinker-3.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The potential threat of this application is the engine to render the invoice. 
- How the engine works?

Will discuss more on the obstacle later in `lesson-leared` section.

After several attempt, finnaly I found the potential starting point to exploit the application.

### Checking the package.json

In package.json we can see the details of package that used in the application, one of the package that cought my attention is `md-to-pdf`. Because it's the `engine` to compile the invoice to pdf.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/blinker-8.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Checking the version `md-to-pdf` is `v4.1.0` it has a critical security issue based on synk information.<d-footnote>https://snyk.io/advisor/npm-package/md-to-pdf</d-footnote>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/blinker-9.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Digging depper on `md-to-pdf` package, I found the package was vulnerable to a Remote Code Execution with 9.8 score which indicate the severity is critical.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/blinker-11.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

To validate the assumption, I try to create a simple payload to check if the application is vulnerable to RCE by calling the Burp collabolator server with `curl` command.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/blinker-12.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

It's confirmed that the application is vulnerable to RCE.
***



## Solution

Because I'm too lazy to use VPS to exploit this issue, I use Burp Collaborator instead, another alternative can use https://webhook.site/

First, I try to read the `/etc/passwd` If we can retrieve it, it means we can read any file in the server.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/blinker-13.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Then, I check the file in the current working directory (CWD) and one level above the CWD. I found the `flag.txt` file

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/blinker-14.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Read the flag.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/blinker-15.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

flag: `HTB{bl1nk3r_flu1d_f0r_int3rG4l4c7iC_tr4v3ls}`


***

## Lesson Learned

I learn several things from this challenge:

### Checking the potential pdf engine by the Server response (blackbox)
I didn't check the source code yet, on this point I guess the engine is related to node.js application and I found this article<d-footnote>https://www.smashingmagazine.com/2019/04/nodejs-express-api-markdown-html/</d-footnote>. I thought the application is using `showdown` markdown parser. Later I found it's a rabbit hole, since it's not used in `package.json`.

### Potential SSTI on the pdf engine (blackbox)

I didn't check the source code yet, on this point I guess there is a potential SSTI issue during the renderring process. I try several SSTI payload such as `{ { 7*7 } } <% 7*7 %> #{7*7}` etc. 

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/blinker-4.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

None of them work. I thought the application is vulnerable. Later I found it's a rabbit hole, because it using `nunjucks` template language for javascript but it used in front-end not in back-end 

### Potential XSS on the pdf engine (blackbox)
I didn't check the source code yet, on this point I guess there is a potential XSS issue during the renderring process. I try several XSS payload using `<iframe>` tag. 

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/blinker-6.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cyber-apocalypse-ctf-2022/blinker-6.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

It works, but with no impact and not related to this challenge, so I skiped it.