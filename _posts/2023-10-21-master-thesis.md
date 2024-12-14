---
layout: post
title: My Master Thesis
date: 2023-10-21
description: My Master degree thesis in University of Tehran
tags:
  - Thesis
  - Machine Learning
  - Electrical Capacitance Tomography
categories: education
giscus_comments: true
toc:
  sidebar: right
featured: false
related_posts: false
datatable: true
#redirect: /assets/pdf/example_pdf.pdf
---
☑︎ _update: I defensed on Oct 21th, 2023_

Hi there


Several days ago, I decided to create a new post here on my website to write share my thesis advancement.

First, I would like to share some terms of thoughts that going around in my mind.

If you would like to read the main section → [#Thesis](#thesis)


## My Background


In Iran, there is entrance named Konkour ([Persian](https://en.wikipedia.org/wiki/Persian_language): کنکور; from the [French](https://en.wikipedia.org/wiki/French_language) [_Concours_](https://en.wiktionary.org/wiki/concours#Noun)) ([**read from wikipedia**](https://en.wikipedia.org/wiki/Iranian_University_Entrance_Exam)). I was studying in a public school (as named in wikipedia) and got accepted to enter University of Tabriz in 2016.


I’m that type of guys which focus on subjects that I like, so because of that, I studied only some specific courses during high school very well, so I couldn’t get a great score. (in Konkour, we have to study lots of courses. for example: Persian literature, Islamic education, Arabic and English in general section and Mathematics, Physics and Chemistry in specialized section) so, I liked math and physics in high school and I studied them very well, so the lack of other courses, lowered my scores


## Bachelor


In university, it took time for me to get comfortable with new situation (I lived in Meymeh, a small town a hundred kilometers away from Esfahan).


In forth semester, [Dr. Hossein Behfar](https://www.researchgate.net/profile/Hossein-Behfar) invited interested students to go further in Electronics and have one/two groups and work constantly under his supervises. That was my first step in applied electronics and fundamental of my future projects.


In sixth semester, our electronic groups broke up and I was looking for ways to earn back my interactions with projects and team works. Short while after, I met [Dr. Hossein Navid](https://www.researchgate.net/profile/Hossein-Navid) who help me to find my way and introduced me to [Precision Agriculture group](http://infoag.ir/en/). I worked on two project under name of this group. meanwhile, I was working on a class project for course “Mechanical Engineering Design” with four great students from our class.


You can check [project section for more details](https://alirezad.ir/projects/).


Maybe one day, I’ll write a brief post about my bachelor degree but for now It time to write about Master degree.


## Master


My Master degree journey started in 2020, several month after Corona Virus lockdown, just after I finished my bachelor. First two semesters were lecture based, and due to lockdown, I had no interaction with university environment.


Finally, we could stay in dormitories with cautions and I got in touch with academic environment. I met my supervisor (who I talked to him before, during lockdown) and he told me about several topics which were not my mindset.


Clearance: in Iran, supervisor professor has more power that anywhere else in the world when it comes to leading subjects and topics, so students in Iran must have approval from supervisor (for any thing) even if they have a great project to work on, they can not work on that till supervisor approve. This system has lots of disadvantages, while the only way to get into university is Konkour (bachelor, master and PhD), so supervisor can get things in hand and put pressure on students as much as they can so students do what they want (no matter students like fields or not)


My professor had a project which was not even close to my background or field of interest, so I had to convince them to integrate my field of interests with his field of study, and after lots of sessions, the result was my master thesis:


## Thesis


_**Developing a machine learning algorithm to enhance image reconstruction in Electrical Capacitance Tomography (case study: bulk solid flow measurement)**_


I had a mixture feeling at first days but a little after, I end up with this idea: “I’m working on Machine Learning subject, professor said he will help me with ECT fundamentals (cause it takes lots of month to learn) and I have little interaction with ECT part”


So, I started to expand my knowledge about Machine Learning. We had a course which taught by Prof. Mahmoud Omid, I really enjoyed that lecture.


I knew about ML and I had some small information about it, but, by taking that course, I got familiar with machine learning concepts and worked practically on it. It was a set small, in-class homeworks, but useful for acquiring knowledge.


Due to coronavirus lock down, I couldn't get into university (dormitory) till start of 4th semester and soon after, I submited my proposal because I had to submit it, but the fact is, due to some problem with the instrument which I use its data, I had to wait a little bit.


It was a good rime to expand my knowledge about ML, Python programming and Cybersecurity.


I requested for financial aid of Coursera on Machine Learning course by Andrew Ng, and thankfully, I could get it. (Certification in my [CV](https://cv.alirezad.ir/))


First, in March 31th, my supervisor sent a database of data. 56 set of data. I started working on that. I use `scikit-learn` to work on data. `LogisticRegression` , `LogisticRegressionCV` , `SVM` and `k-nearest neighbot` models are used to train a model for enhancement, but, as I expected, they did not work properly because numbers are not seperatable linearly or based on any classical ML model.


There are two pair of data:

- Simulator ↔ LBP (Linear Back Projection)
- Simulator ↔ TekhonoV

These two reconstruction methods are among fastest with lower computational cost.

After that, I talked to my supervisor and they said, they will send a simulator which matches the real instrument.

An image of mentioned software.


{% include figure.liquid path="https://lh3.googleusercontent.com/pw/ADCreHdJEZXh6Pf6dqMx6pttdpxTnHg1aFamd3UkzZnrk42zkYZ5cW3120pXuM7SeZs_vopj8QM4tV4BSwGlihuNb1tNi0mlgcDhhHTH6Fe522czk4aJCWE=w1400" class="img-fluid rounded z-depth-1" zoomable=true %} 


(not related to me, but) this software is written in `C#` (why? because my supervisor had decided to use  for development), I did not even see its code (or any code from my supervisor)



### Classic Machine Learning models


NOTE: I include only some key sections in my writing.


#### Logistic Regression


Its the simplest model any starter can involve with.


No regularization, No tweak.


```python
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_validate

scoring_method = ['neg_root_mean_squared_error', 'r2']
model = LogisticRegression()
lr_noparam_cv_result = cross_validate(model, 
                        X, y,
                        scoring=scoring_method ,
                        cv=10, return_estimator=True)
```


result was:


```text
For LBP:
'test_neg_root_mean_squared_error': array([-0.42988679, -0.43964373, -0.38889035, -0.40696627, -0.37984266,
        -0.37347476, -0.40294122, -0.40522419, -0.3484282 , -0.22566016]),
 'test_r2': array([-0.2081578 , -0.26362213,  0.01128803, -0.08276019,  0.05560606,
         0.08700535, -0.0627451 , -0.0732062 ,  0.20655092,  0.66718549])}

For Tkh:
'test_neg_root_mean_squared_error': array([-0.4520538 , -0.45853519, -0.40378146, -0.40877501, -0.36396748,
        -0.35937625, -0.39038254, -0.39414535, -0.34523643, -0.26961774]),
 'test_r2': array([-0.33596691, -0.37455079, -0.06587974, -0.09240616,  0.13289661,
         0.15463458,  0.00246881, -0.01532541,  0.22102112,  0.52489523])}
```


> In `Scikit-learn` negative $$R^2$$ is possible because as they mentioned “because the model can be arbitrarily worse”
{: .prompt-info }


results in a Whisker-Box chart:

{% include figure.liquid path="https://lh3.googleusercontent.com/pw/ADCreHeOGaDJjW4q1FoTDjutrbHmddhj3TDB3983evNZkMcLP6eKYY57ab8AtSL58duVpHFzYn48IRmrDPZAtYPpK0PYwaHEkXdsfvu1zMqNwQRBG61-v6U=w1000" class="img-fluid rounded z-depth-1" zoomable=true %} 



with `LogisticRegressionCV` function results were looks like this

{% include figure.liquid path="https://lh3.googleusercontent.com/pw/ADCreHfxTBaX45ctJMJWVbzCIwfReZvDYQA-EHYbXW0I4kMu2n6uER2pE2h3N8SDZB0DvEon4DHD7qWlQwiIJbiFCEiEFqSgvVo6dNCSTBWLiZOcAuhcj7g=w1400" class="img-fluid rounded z-depth-1" zoomable=true %} 


#### K-Nearest-Neighbor


After tunning model, results acquired as below:

{% include figure.liquid path="https://lh3.googleusercontent.com/pw/ADCreHc7XrBBskJ48NG5Fb_r5IyNIHHzdo7Ncqf9K6mh4lxchpPgipPNOcHSdmYoq3o2hxmULlruuX_GKcwZybsaelAvMhW2gex3nuVeroQDp3Dp-9sEOS0=w2400" class="img-fluid rounded z-depth-1" zoomable=true %} 


#### Histogram Gradient Boosting


In this scenario, model tuning was not so effective and final results was as below chart:


{% include figure.liquid path="https://lh3.googleusercontent.com/pw/ADCreHcj90yOEuGKVgxFVk7Ff9FeD1MBlpOdMZZ1xor9xas6fR2_yaSo6UN2ZbiCdbG1s1aDb0-HhJEK5MhEB_NeO7xJ29syXqiLLm5-znfUkzlRPlL110E=w1400" class="img-fluid rounded z-depth-1" zoomable=true %} 

#### Conclusion on above models


These models have a large range of $$R^2$$ and based other tests, they showed very different results, by that I can conclude that generalization is not enough.


### Multilayer Perceptron


In this case, after testing different scenarios, I realized that different combination of “number of neurons in each layer” lead to different error results. so I tested different combinations based on a repeat rule.


#### 2 layers

{% include figure.liquid path="https://lh3.googleusercontent.com/pw/ADCreHdU_Xg5_GReccrqnqnkOrD2UojGyM5DFqo7i0_xOTjAbgC7kXZkz5qQJh9DR04DZ3EQjnB57mqTYGwyz6Ug1RcBufGgTmBXIe9G0EoJdkIUQPCsPc0=w1600" class="img-fluid rounded z-depth-1" zoomable=true %} 


Vertical column: layers and neurons (number on neurons in each layer)


Horizontal columns: $$R^2$$ results


results are good, and generalization is much better than previous models.


#### 3 layers


In three layers, same method repeated. Results were better and generalization was better, too.


#### 4 layers


In four layer, improvement was good but it was not very noticeable.


#### 5 and 6 and 7 layers


It was more than required but I test it and result did not changed significantly.


## My thesis done, I defensed


Due to some problem, I had to defense sooner than I expected, its okay but I must change my plan and work on CNN out of thesis scope, so I decided to do it and write my scientific paper based on that.

{% include figure.liquid path="https://lh3.googleusercontent.com/pw/ADCreHdSCuufXD0AuNCoOKDRCm0zHF4ndoh2rEDKUWUY8q6KItevaR7rSvJfJ6lYFjvLKtF6PurMCunojGlxJ9Y9JEop4T5ciOrNsrkiS9cuYO0BJZJ4nds=w1200" class="img-fluid rounded z-depth-1" zoomable=true %}
{% include figure.liquid path="https://lh3.googleusercontent.com/pw/ADCreHfY_85OhOaqzaLDbZcWnCQS_jT269hokGSc9Eu6zgyleBJygnVfg_IDxTQ33Si2UTmRjah3fj_vhaRfhttI2a3Qxq5P57-JUej95QCJZfazIND-XPM=w1200" class="img-fluid rounded z-depth-1" zoomable=true %}


### Get ready for CNN


… will be continued
