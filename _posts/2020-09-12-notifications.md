---
layout: post
title: Discord notification using CloudWatch Alarms, SNS and AWS Lambda
date: 2020-09-12 11:12:00-0400
description: Alarms exist to notify us when our system behaves in an unexpected way, which warrants manual intervention to correct. 
---

Alarms exist to notify us when our system behaves in an unexpected way, which warrants manual intervention to correct. When we have multiple systems in a production environment and an error passes unnoticed, the consequences can be catastrophic.

An alarm should be created when the system cannot automatically recover, and human intervention is required. If an alert happens to occur too frequently it might lead to longer response time or even get missed.

In this article, we will be building an alarm notification pipeline for an AWS Lambda function. For that will be using 3 AWS Services: AWS Lambda, Simple Notification Service (SNS), and CloudWatch. The goal is to send a notification to a Discord Channel when a CloudWatch Alarm is triggered.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/notifications.png' | relative_url }}" alt="" title="SNS Notifications Architecture"/>
    </div>
</div>
<div class="caption">
    Designed using Lucidchart: https://www.lucidchart.com
</div>

***

You can check the full blog post on my Medium at Towards Data Science: [Discord notification using CloudWatch Alarms, SNS and AWS Lambda](https://towardsdatascience.com/discord-notification-using-cloudwatch-alarms-sns-and-aws-lambda-71393861699f)

<!-- This theme supports rendering beautiful math in inline and display modes using [MathJax 3](https://www.mathjax.org/) engine. You just need to surround your math expression with `$$`, like `$$ E = mc^2 $$`. If you leave it inside a paragraph, it will produce an inline expression, just like $$ E = mc^2 $$.

To use display mode, again surround your expression with `$$` and place it as a separate paragraph. Here is an example:

$$
\sum_{k=1}^\infty |\langle x, e_k \rangle|^2 \leq \|x\|^2
$$

You can also use `\begin{equation}...\end{equation}` instead of `$$` for display mode math.
MathJax will automatically number equations:

\begin{equation}
\label{eq:caushy-shwarz}
\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
\end{equation}

and by adding `\label{...}` inside the equation environment, we can now refer to the equation using `\eqref`.

Note that MathJax 3 is [a major re-write of MathJax](https://docs.mathjax.org/en/latest/upgrading/whats-new-3.0.html) that brought a significant improvement to the loading and rendering speed, which is now [on par with KaTeX](http://www.intmath.com/cg5/katex-mathjax-comparison.php). -->
