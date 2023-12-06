---
layout: post
title: "Finishing my Data Career Masterplan"
date: 2023-10-06 04:00:00
description: Thoughts after being a D. Engineer, D. Scientist, and ML Engineer
tags: ['Career']
---
- [1. Introduction](#1-introduction)
- [2. Role Complexity and Intersecting Responsibilities](#2-role-complexity-and-intersecting-responsibilities)
  - [2.1. Why Role Overlap Exists](#21-why-role-overlap-exists)
  - [2.2. Core Responsibilities in Each Role](#22-core-responsibilities-in-each-role)
  - [2.3. What Roles Can Learn From Each Other](#23-what-roles-can-learn-from-each-other)
- [3. Engineering vs. Data Science in Companies](#3-engineering-vs-data-science-in-companies)
- [4. Conclusion](#4-conclusion)
- [5. TLDR](#5-tldr)




# 1. Introduction

In today's data world, the lines between Data Engineering (DE), Data Science (DS), and Machine Learning Engineering (MLE) are blurry. This isn't a mere assumption—I've walked the path through each of these roles myself (you can verify that on my [LinkedIn](https://www.linkedin.com/in/romulo-drumond/)). Why, you ask? The simple answer: to explore the end-to-end pipeline of data products.

The primary objective of this post is to share my experiences and insights into these roles, shed light on their overlapping responsibilities, especially in smaller organizations like startups, and finally help you understand what you're signing up for when you see that job posting. Trust me, the job titles often provide little information about the job you will be doing.

<div style="text-align: center">
    {% include figure.html path="assets/img/posts/2023-10-06-finishing-my-data-career-masterplan/the_de_the_ds_and_the_mle.jpg" class="img-fluid rounded z-depth-1" zoomable=true 
    width="50%"
    caption = "Figure 1 - The DS, The DE and The MLE."
    %}
</div>
<style>
    /* For desktops and larger tablets */
    @media (min-width: 768px) {
        .img-fluid {
            width: 65%;
        }
    }

    /* For mobile phones and smaller devices */
    @media (max-width: 767px) {
        .img-fluid {
            width: 100%;
        }
    }
</style>


# 2. Role Complexity and Intersecting Responsibilities

## 2.1. Why Role Overlap Exists

Role ambiguity in DE, DS, and MLE is particularly noticeable in small companies and startups. The primary driver of this problem? Resource constraints. When you're operating on a shoestring budget and rapid timelines, multi-disciplinarity is not just an extra—it's a necessity. But you might see this in big companies too, in those cases they are usually trying to get their feet wet on the data/ML world, so they try to minimize risk by contracting a jack-of-all-trades employee to run the first proofs of concept (POCs). Therefore, the emergence of the Full Stack Data Scientist (FSDS), an unicorn expected to have a holistic skill set, running the gamut from data acquisition to delivering machine learning (ML) models through customer-facing APIs. 

<div style="text-align: center">
    {% include figure.html path="assets/img/posts/2023-10-06-finishing-my-data-career-masterplan/the_fsds_appears.jpg" class="img-fluid rounded z-depth-1" zoomable=true 
    width="60%"
    caption = "Figure 2 - The trio is baffled by the appearance of a mythical creature called FSDS."
    %}
</div>

The term FSDS is not just startup jargon; it encapsulates the reality of many job descriptions. The overlap exists because organizations are in a constant state of defining and redefining what each role should take ownership of. And let's not forget, that the pace of technological advancements is merciless, adding another layer of complexity.

## 2.2. Core Responsibilities in Each Role

While the responsibilities may overlap, each role possesses a unique focus within the data pipeline. In a few words:
- Data Engineers: focus on getting and orchestrating the data for the organization, ensuring efficient storage solutions;
- Data Scientists: focus on analytics of the company's data and on developing ML models to mine actionable insights;
- Machine Learning Engineers: focus on deploying and monitoring ML models and dealing with the peculiarities of these "data-fueled" software entities, known for their opaque operational mechanics. 

So, naturally, they fit in the data pipeline just like in Figure 3.


<div style="text-align: center">
    {% include figure.html path="assets/img/posts/2023-10-06-finishing-my-data-career-masterplan/roles_on_data_pipeline.png" class="img-fluid rounded z-depth-1" zoomable=true 
    width="90%"
    caption = "Figure 3 - Roles boundaries on a data pipeline."
    %}
</div>


As you may see, we naturally have some overlapping in the data products pipeline (DE requires to know DS data needs, DS may need to know some serving constraints such as latency for deciding model size, etc.) but the day-to-day activities and skills overlap differently, just like Figure 4.

<div style="text-align: center">
    {% include figure.html path="assets/img/posts/2023-10-06-finishing-my-data-career-masterplan/veen_diagram.jpeg" class="img-fluid rounded z-depth-1" zoomable=true 
    width="60%"
    caption = "Figure 4 - Skill intersections of the roles."
    %}
</div>

This diagram is adorable but doesn't always accurately reflect real-world scenarios. Often, various job titles are stand-ins for an FSDS role. At times, there are hybrid roles, combining DS with MLE or DE with DS. (When you encounter a job post that seems to merge DE and MLE, it often implies you're expected to be proficient in DS as well, essentially making it an FSDS role.) So, when roles are well-defined and functionally separate within a company, what can one expect from these overlapping skills/activities?

- DE $$\cap$$ DS $$\cap$$ MLE:
  - **Data Quality**: No matter your title, maintaining data quality is paramount. The age-old saying, "garbage in, garbage out," holds across all steps of the data lifecycle. The difference lies in *how* each role interacts with this asset. Data Engineers may set up validation pipelines, Data Scientists might focus on outlier detection and feature selection, while Machine Learning Engineers ensure that the data feeding into models is squeaky-clean.
  - **Domain Expertise**: Technological expertise is essential, but nothing defeats domain-specific knowledge. Whether it's identifying which features to build for customer engagement or understanding the regulatory landscape, domain expertise offers a competitive edge that is often overlooked.

- DS $$\cap$$ ML:
  - **Agile in ML/DS Projects**: Implementing Agile methodologies in this context is filled with challenges. The traditional Agile paradigm is designed to incrementally answer, "Is this software delivering value?" However, ML/DS projects often revolve around the question, "Is such a model feasible?" Iterative, incremental improvements and a flexible scope are crucial, but organizations might struggle to understand and budget the open-ended question that is modeling. For example, serving a classification model might change due to performance metrics, if a model doesn't reach some predefined threshold it might be used as an internal productivity tool for human labelers instead of an automatic labeling software.

## 2.3. What Roles Can Learn From Each Other

The lines may be blurred, but that doesn't mean these roles can't benefit from each other's specialized skill sets:

- **Data Scientists** should invest more in understanding code quality and software engineering practices. Models are code, after all, and poor code can undermine even the most statistically robust model. As DevOps tries to bridge the gap between developers and operations people, MLOps tries to bridge the gap between DS and MLE.
  
- **Data Engineers** need to appreciate the nuances of analytics and machine learning models. You're not just constructing pipelines; you're laying the groundwork for intelligent decision-making.
  
- **Machine Learning Engineers** ought to prioritize data quality and have an intimate understanding of domain-specific needs. A model is only as good as the data it's trained on and the problem it's solving.

In closing this section, we can affirm that roles in the data realm are still fluid. The key takeaway is that you shouldn't just box yourself into one title or set of responsibilities. Understanding the core competencies of each role not only makes you adaptable but also more valuable in this ever-evolving landscape.

# 3. Engineering vs. Data Science in Companies

In most organizations, engineering roles often get the short end of the stick, relegated to the status of "persona non grata." Let's not mince words: working as an engineer is frequently an "ungrateful" job. While the glory often goes to data scientists for their analytical insights or new ML models, engineers are usually brought into the spotlight only when things go wrong. An uptime of 99.8% won't make headlines, but half an hour of downtime will certainly draw ire.

This is not just an anecdotal observation; it's indicative of an older industry trend. A rapid look at old job postings reveals an excessive focus on Data Science roles, often at the expense of Engineering positions. This dynamic mirrors the longstanding divide between frontend and backend webdev roles, where the former is often considered more relevant due to its direct interaction with users. 

Nowadays there is an unmistakable shift towards acknowledging the importance of data processes in informed decision-making. Data, after all, is king—models are its subjects, not its rulers. Companies are gradually discovering that **"garbage in, company out"**, a well-oiled data pipeline can be a true goldmine. 

Even simple models like linear regression, when backed by high-quality data and domain expertise, can substantially empower organizations. The utility of data isn't restricted to just complex machine learning models; sometimes, the most effective solutions are also the simplest.

In summary, although engineering roles have been historically underappreciated, the scenario is changing. The market is undergoing a correction, emphasizing the equilibrium needed between DS, DE, and MLE. The division of labor is not a zero-sum game; each role brings unique value to the table. Those who adapt to this shift will not just survive but thrive in the data-driven landscape that's rapidly taking shape.

It's heartening to note that many mature companies, and even some startups led by data-savvy founders, are adopting an "engineering-aware" strategy. They understand that for a data project to be successful, it doesn't suffice to have just a cutting-edge model; you also need robust data pipelines, efficient data storage solutions, and a reliable deployment strategy. 



# 4. Conclusion

This post began as an endeavor to de-mystify the often blurry lines between DE, DS, and MLE roles. Through a deep dive into role complexity, the intersecting responsibilities, and the underappreciated but crucial importance of engineering roles, we've mapped out the complex landscape of the data domain.

The data world is in a state of constant change, thanks to ever-evolving technologies and shifting organizational priorities. However, what remains constant is the crucial need for a balanced approach that encompasses Data Science and Engineering capabilities. The underappreciation of engineering roles is beginning to recede, and we're witnessing a market correction that places equal emphasis on all pillars of the data domain.

Some pragmatic takeaways:
- For Professionals: Don't pigeonhole yourself into one role; adaptability is your most valuable asset in the tech industry.
- For Employers: It's imperative to understand that a well-oiled data organization needs a balanced team. Invest not just in 'sexy' models but also in robust engineering that ensures data quality and robust operation.

The data realm is complex, nuanced, and dynamic. As we move further into this data-centric era, those who can marry analytical rigor with engineering excellence will not just survive but flourish.

# 5. TLDR

Navigating a career in the data domain is complex, with overlapping responsibilities across Data Engineering, Data Science, and Machine Learning Engineering roles. This overlap is more pronounced in startups but exists even in mature companies. The industry focus is shifting—moving away from the 'model hype' to a more balanced outlook that includes robust engineering.

Key points to remember:
- Role overlap is often a necessity, especially in startups and small companies.
- Data quality is universally vital across all roles.
- Agile methodologies pose unique challenges in ML/DS projects.
- The industry is slowly moving from a Data Science-centric focus to a balanced approach, incorporating more Data Engineering and Machine Learning Engineering roles.
  
Working in engineering may seem like an "ungrateful" job, but those who adapt to the evolving demands will find themselves well-equipped to succeed in this data-driven age.