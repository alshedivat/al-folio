---
layout: page
title: NLP model development for IBD Medication Classification
description: Internship at Bakar Computational Health Sciences Institute
img:
importance: 3
category: work
---

**Introduction**
This project, presented by Vishakha Malhotra for Health Data Science at UCSF, focuses on the extraction and classification of medications from clinical notes pertaining to Inflammatory Bowel Disease (IBD). The aim is to improve the efficiency and accuracy of medication extraction from unstructured and often poorly written clinical notes, which pose significant challenges in healthcare data management.

**Need for Medication Extraction**

The extraction of patient medication from clinical notes is essential for:

- Understanding the types of medications used to address patient needs.
- Addressing the inconsistencies and errors due to poor grammar and unstructured notes.
- Overcoming the lack of standardization in prescription writing.
- Reducing the resource-intensive nature of manual labeling, which requires multiple cross-verifications.

**Corpus and Annotation Protocol**
The corpus consists of 350 annotated patient notes, categorized into five groups for testing. The annotation protocol includes:

- Advanced therapies and steroids due to their significant side effects.
- Differentiating between past, current, and future medications.
- Achieving a high interrater reliability score of 92%.

**Keyword-Based Medication Classification:**
Keywords were defined to detect past, present, and future medications:

- Past Keywords: Exhaust failure, was on, prior treatments.
- Current Keywords: Continue, level, stop, wean.
- Future Keywords: Start, restart, begin, initiation.

**Model 1: Basic Parsing Approach**
The initial model used parsers to analyze the assessment and plan, and recommendation sections without sentence splitting. The results were:

- Assessment and plan parser accuracy: 96%
- Recommendation section parser accuracy: 90%
- Medication and tense parser accuracy: 72%

**Drawbacks Identified:**
The first model had several limitations:

- Difficulty in differentiating between sentences.
- Less generalizable due to reliance on string concatenation.
- Missed medications prescribed in the assessment and plan section.
- Inadequate handling of word boundaries.

**Model 2: Regex-Based Approach**

To address the shortcomings, a second model employing regular expressions (regex) was developed. This approach improved accuracy by:

- Splitting sentences accurately and handling custom patterns.
- Using regex for detecting medications and their corresponding tenses.
- Ensuring context preservation and flexibility for additional rules.
- Regex Implementation
- The regex pattern used was:

\b{re.escape(keyword)}\b.\*?\b{re.escape(med_name)}\b

- This pattern ensures whole word matching, escapes special characters in keywords and medication names, matches any characters between keywords and medication names non-greedily, and is case-insensitive for broader applicability.

**Results and Accuracy**
The regex-based model significantly improved the accuracy of detecting medications and tenses to 88%. However, there were still challenges with vague statements in the notes.

**Next Steps:**
The future steps involve:

- Prioritizing the closest keyword to the medication.
- Testing on additional patient notes.
- Enhancing the parser's capability to better handle complexities in clinical notes.

**Conclusion:**
The project demonstrates a substantial improvement in extracting medication information from clinical notes through advanced NLP techniques. By transitioning from a basic parsing approach to a regex-based model, the accuracy and generalizability of the model were significantly enhanced, contributing to better data management in healthcare.
