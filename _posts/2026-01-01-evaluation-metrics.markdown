---
layout: single
comments: true
title: Evaluation Metrics for Classification Models
date: 2026-01-01 00:00:00-0000
description: Evaluation Metrics
categories: ['Artificial Intelligence']
---

## Evaluation Metrics for Classification Models

Evaluation metrics are essential for assessing the performance of classification models. This post covers commonly used metrics, including **Accuracy**, **Precision**, **Recall**, and **F1 Score**, and illustrates their application in binary, multi-class, and multi-label settings.

---

### Metrics Overview

- **Accuracy**: The proportion of correctly predicted instances among all instances.  
- **Precision**: The proportion of predicted positive instances that are actually positive.  
- **Recall**: The proportion of actual positive instances that are correctly predicted.  
- **F1 Score**: The harmonic mean of Precision and Recall, providing a balance between correctness and completeness.

These metrics provide complementary information and are often used together to evaluate model performance.

---

### Confusion Matrix Terminology

Evaluation metrics are derived from the confusion matrix:

- **True Positive (TP)**: Predicted positive and actually positive.  
  *Example*: Predicting **Cat** for an image that contains a cat.
- **False Positive (FP)**: Predicted positive but actually negative.  
  *Example*: Predicting **Cat** for an image that contains a dog.
- **False Negative (FN)**: Predicted negative but actually positive.  
  *Example*: Predicting **Dog** for an image that contains a cat.
- **True Negative (TN)**: Predicted negative and actually negative.  
  *Example*: Predicting **Dog** for an image that contains a dog.

Metrics such as Precision, Recall, and F1 Score are calculated using these values.

---

### Binary Classification Example

Binary classification involves predicting one of two possible labels. Consider the following example of classifying images as **Cat** or **Not Cat**:

| Image | Actual Label | Predicted Label | Outcome |
|-------|--------------|----------------|---------|
| 1     | Cat          | Cat            | TP      |
| 2     | Cat          | Dog            | FN      |
| 3     | Dog          | Cat            | FP      |
| 4     | Dog          | Dog            | TN      |

From this table:

- **Precision** = TP / (TP + FP)  
- **Recall** = TP / (TP + FN)  
- **F1 Score** = 2 × (Precision × Recall) / (Precision + Recall)

---

### Multi-class Classification Example

Multi-class classification involves selecting one label out of multiple possible classes. Consider three classes: **Cat**, **Dog**, **Bird**.

| Image | Actual Label | Predicted Label | Outcome |
|-------|--------------|----------------|---------|
| 1     | Cat          | Cat            | Correct |
| 2     | Dog          | Cat            | Incorrect |
| 3     | Bird         | Bird           | Correct |
| 4     | Dog          | Dog            | Correct |
| 5     | Cat          | Bird           | Incorrect |

Metrics can be calculated **per class**. For example, for the **Dog** class:

- TP = 1 (Image 4)  
- FP = 0  
- FN = 1 (Image 2)  
- **Precision** = TP / (TP + FP) = 1.0  
- **Recall** = TP / (TP + FN) = 0.5  
- **F1** = 0.67

---

### Multi-label Classification Example

In multi-label classification, a single instance may have multiple labels simultaneously. For example:

```
{Cat, Cute, Indoor}
```

Metrics are computed **per label** and then averaged across labels. Averaging strategies include:

- **Micro averaging**: Combines counts of TP, FP, FN across all labels before computing metrics.  
- **Macro averaging**: Computes metrics per label and averages them equally.  
- **Weighted averaging**: Computes metrics per label and averages them weighted by the number of true instances.

This ensures fair evaluation even when some labels are rare.

---

### Metrics Comparison Across Classification Types

The following table summarizes how evaluation metrics are computed and interpreted in binary, multi-class, and multi-label settings:

| Metric / Type         | Binary | Multi-class | Multi-label |
|-----------------------|--------|------------|------------|
| Precision             | TP / (TP + FP) | Per class, then averaged | Per label, then averaged (micro/macro/weighted) |
| Recall                | TP / (TP + FN) | Per class, then averaged | Per label, then averaged (micro/macro/weighted) |
| F1 Score              | Harmonic mean of Precision and Recall | Per class, then averaged | Per label, then averaged (micro/macro/weighted) |
| Accuracy              | (TP + TN) / Total | Correct predictions / Total | Can be misleading; usually calculated per label and averaged |
| Averaging Method      | N/A | Macro / Micro / Weighted | Macro / Micro / Weighted |
| Notes                 | Straightforward | Class imbalance should be considered | Rare labels require micro or weighted averaging |

---

Evaluation metrics such as Precision, Recall, F1 Score, and Accuracy are critical for measuring classification model performance. Proper understanding of these metrics, along with the confusion matrix and averaging strategies, enables effective assessment and comparison of models across binary, multi-class, and multi-label tasks.
