---
layout: page
title: HIV Testing Data Analysis
description:
img: assets/img/3.jpg
importance: 2
category: work
giscus_comments: false
---

**Analysis of HIV Testing Among Males Who Inject Drugs (mPWID) in Afghanistan**

Project Overview:
This project involves the analysis of a dataset on HIV testing among male people who inject drugs (mPWID) in Afghanistan. The goal was to summarize findings through descriptive statistics, prevalence estimation, and regression analysis, presenting the results in a clear and concise manner suitable for inclusion in a professional portfolio.

Dataset and Variables:
The dataset includes 1385 participants from 8 cities in Afghanistan, collected through time-location sampling (TLS). Key variables analyzed include city, language spoken, age, substance use, marital status, and history of sexual activity with other men.

_Results:_

Table 1: Characteristics of Study Participants
This table provides a descriptive summary of the participants across the eight cities. It includes demographic details and substance use patterns, highlighting significant differences across locations.

### Table 1: Characteristics of Study Participants

<style>
  table {
    font-size: 14px;
  }
  th, td {
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
</style>

| **Characteristics**                        | **Total N=1385 (%)** | **Kabul N=400 (%)** | **Herat N=200 (%)** | **Mazar-I-Sharif N=149 (%)** | **Jalalabad N=150 (%)** | **Kunduz N=151 (%)** | **Faizabad N=35 (%)** | **Kandahar N=150 (%)** | **Zaranj N=150 (%)** | **P-value** |
| ------------------------------------------ | -------------------- | ------------------- | ------------------- | ---------------------------- | ----------------------- | -------------------- | --------------------- | ---------------------- | -------------------- | ----------- |
| **Language spoken:**                       |                      |                     |                     |                              |                         |                      |                       |                        |                      |             |
| a) Pashtoo                                 | 435 (31.41)          | 76 (19)             | 1 (0.5)             | 10 (6.71)                    | 148 (98.7)              | 37 (24.5)            | 0 (0)                 | 130 (86.7)             | 33 (22)              | <0.001      |
| b) Dari                                    | 934 (67.44)          | 324 (81)            | 199 (99.5)          | 126 (84.56)                  | 1 (1.3)                 | 112 (74.2)           | 34 (97.1)             | 20 (13.3)              | 117 (78)             |             |
| c) Uzbek                                   | 16 (1.16)            | 0 (0)               | 0 (0)               | 13 (8.72)                    | 0 (0)                   | 2 (1.3)              | 1 (2.9)               | 0 (0)                  | 0 (0)                |             |
| **Age, mean (SD)**                         | 33.8 (9)             | 35.7 (9.3)          | 30.7 (9.4)          | 35.7 (8.4)                   | 31.4 (7.5)              | 32.9 (8)             | 30.7 (8.2)            | 34 (9.7)               | 35 (8.4)             | <0.001      |
| Frequent heroin use                        | 1376 (99.4)          | 395 (98.8)          | 200 (100)           | 149 (100)                    | 150 (100)               | 149 (98.7)           | 35 (100)              | 150 (100)              | 148 (98.7)           | 0.26        |
| Frequent cocaine use                       | 22 (1.6)             | 3 (0.8)             | 0 (0)               | 0 (0)                        | 1 (0.7)                 | 16 (10.6)            | 1 (2.9)               | 1 (0.7)                | 0 (0)                | <0.001      |
| Frequent opium use                         | 53 (3.8)             | 6 (1.5)             | 0 (0)               | 0 (0)                        | 0 (0)                   | 25 (16.6)            | 3 (8.6)               | 18 (12)                | 1 (0.7)              | <0.001      |
| Frequent amphetamine use                   | 4 (0.3)              | 0 (0)               | 0 (0)               | 0 (0)                        | 0 (0)                   | 4 (2.6)              | 0 (0)                 | 0 (0)                  | 0 (0)                | <0.001      |
| **Marital status**                         |                      |                     |                     |                              |                         |                      |                       |                        |                      | <0.001      |
| Single                                     | 570 (41.2)           | 148 (37)            | 98 (49)             | 53 (35.6)                    | 40 (26.7)               | 85 (56.3)            | 29 (82.9)             | 60 (40)                | 57 (38)              |             |
| Married and living with a partner          | 425 (30.7)           | 145 (36.3)          | 15 (7.5)            | 19 (12.8)                    | 103 (68.7)              | 51 (33.8)            | 3 (8.6)               | 61 (40.7)              | 28 (18.7)            |             |
| Married but not living with a partner      | 301 (21.7)           | 100 (25)            | 76 (38)             | 61 (40.9)                    | 3 (2)                   | 14 (9.3)             | 1 (2.9)               | 9 (6)                  | 37 (24.7)            |             |
| Not married but living with a partner      | 2 (0.1)              | 0 (0)               | 0 (0)               | 0 (0)                        | 0 (0)                   | 0 (0)                | 0 (0)                 | 2 (1.3)                | 0 (0)                |             |
| Separated/divorced                         | 53 (3.8)             | 4 (1)               | 5 (2.5)             | 14 (9.4)                     | 0 (0)                   | 1 (0.7)              | 2 (5.7)               | 9 (6)                  | 18 (12)              |             |
| Widowed                                    | 34 (2.5)             | 3 (0.8)             | 6 (3)               | 2 (1.3)                      | 4 (2.7)                 | 0 (0)                | 0 (0)                 | 9 (6)                  | 10 (6.7)             |             |
| Ever had anal or oral sex with another man | 53 (3.8)             | 9 (2.3)             | 13 (6.5)            | 0 (0)                        | 0 (0)                   | 3 (2)                | 1 (2.9)               | 11 (7.3)               | 16 (10.7)            | <0.001      |

### Table 2: Prevalence of HIV Testing

| **Subgroups**           | **N (Total)** | **Prevalence (%)** | **n (Number of cases)** | **HIV testing (n/N)** | **95% CI**    |
| ----------------------- | ------------- | ------------------ | ----------------------- | --------------------- | ------------- |
| **Overall HIV testing** | 1385          | 81.9%              | 1135                    | 81.9                  | 79.8 to 83.9  |
| **City**                |               |                    |                         |                       |               |
| Kabul                   | 400           | 75.0               | 300                     | 75.0                  | 70.7 to 79.2  |
| Herat                   | 200           | 87.0               | 174                     | 87.0                  | 82.33 to 91.6 |
| Mazar-I-Sharif          | 149           | 100                | 149                     | 100                   | 1 to 1        |
| Jalalabad               | 150           | 99.3               | 149                     | 99.3                  | 0.98 to 1.0   |
| Kunduz                  | 151           | 89.4               | 135                     | 89.4                  | 0.84 to 0.94  |
| Faizabad                | 35            | 97.1               | 34                      | 97.1                  | 0.91 to 1.0   |
| Kandahar                | 150           | 56.0               | 84                      | 56.0                  | 0.48 to 0.64  |
| Zaranj                  | 150           | 73.3               | 110                     | 73.3                  | 0.66 to 0.80  |

**Conclusion:**

1385 male injecting drug users were enlisted for the survey from hotspots in public places throughout 8 Afghan cities. Eight cities in Afghanistan are compared and their characteristics are shown in Table 1 by language, age, frequency of cocaine, heroin, opium, amphetamine usage, marital status, and history of having sex with other men. With the exception of Jalalabad and Kandahar, Dari was the most frequently spoken language among the 1385 participants (67.4%). Pashtoo was the most often spoken language in 98.7% of cases and 86.7% of cases, respectively, in both cities. The greatest age mean was 35.7 years in Kabul and Mazar-i-Sharif, and the minimum was 30.7 years in Herat and Faizabad. The mean age was 33.8 years.

The most widely used of the four addictive substances was heroin, which had a population prevalence of 99.4% overall and 100% in five of the eight cities. Amphetamine, which was consumed by 0.3% of the population, was the substance with the lowest popularity. The majority of persons were either single (41.2%) or married and cohabiting (30.7%). And only 53 individuals (3.8%) claimed to have ever engaged in anal or oral sex with another man. Eight cities had varied rates of those who had ever undergone HIV testing, and this difference was statistically significant (p0.0001) (Table 2). The frequency was 81.95% overall. Mazar-I-Sharif had the highest frequency at 100%, and Kandahar had the lowest at 56%.
In the multivariate analysis, the recent HIV testing was associated with city, frequent opium usage and different age groups (Table 3). After adjusting for ever had sex with man, language, marital status, other drugs use except opium, people living in Mazar-I-Sharif, Jalalabad, Zaranj had higher association with recent HIV-testing as compared to living Kabul. While living in Faizabad had lower Adjusted OR at 1.21 (2.54 to 2.17: 95%CI) as compared to Kabul. Having frequent use of opium had lower the AOR 1.37 (6.55 to 3.13). People in age groups 18- 24 had higher AOR 1.77 (1.00 to 3.13) as compared to reference group.

You can find the code and dataset on https://github.com/dr-vish/Data-Analysis-of-HIV-testing
