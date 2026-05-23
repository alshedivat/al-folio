---
layout: post
title: Naive Bayes for text classification
image: /assets/img/TextClassification.png
description: Naive Bayes explained and used in an example for text classification. Coded from scratch for illustration purposes and also with scikitlearn.
---


## 1. Goal
Given a series of classes $C_i$ compute the probability that a sequence of words $\\{w_1, w_2, \ldots , w_n\\}$ belongs to the class $C_i$. Mathematically:


\begin{equation}
P(C_i\mid w_1, w_2, \ldots, w_n) 
\label{eq:goal}
\end{equation}

<!--more-->

## 2. *Naive* Assumption

We assume that in **each class** the words are **independent** from each other:

\begin{equation}
P(w_1, w_2, \ldots, w_n \mid C_i) = \prod_{j=1}^n P(w_j \mid C_i) \iff  \text{Words are independent in each class}
 \label{eq:assumption}
\end{equation}

That is clearly not completely true, there are correlations between words, but we will assume there are not. 

This simplifies enormously the analysis and computations---that is why it is widely used. On the other hand this assumption can be too weak when what we try to compute depends on the semantics of the language. For example this model could not differentiate whatsoever between the following two sentences:

* I know what I like
* I like what I know

because both sentences contain the same words: for Naive Bayes Classifier the order of the words do **not** matter. If you are trying to do sentiment analysis Naive Bayes Classifier might not be the best option in terms of performance. Instead you can use [ULMFit](https://www.kaggle.com/arnaujimnez/ulmfit-fastai-sentiment-analysis/data) or [Transformers](https://medium.com/towards-artificial-intelligence/text-classification-with-simple-transformers-a29d13358135) if your model needs to capture more complex relations.



## 3. Computation: Bayes' formula

As we said our goal was to estimate the probability that a sequence of words $\\{w_1, w_2, \ldots , w_n\\}$ belongs to the class $C_i$. But we want to use our naive Ansatz: here is where Bayes' formula comes into play. We can rewritte equation \eqref{eq:goal} as:

$$
P(C_i\mid w_1, w_2, \ldots, w_n)  =  \frac{P( w_1, w_2, \ldots, w_n \mid C_i) P(C_i)}{P(w_1, w_2, \ldots, w_n)}
$$

remember this is still completely general, we have made no assumption so far. Now assume that the words in each class are independent (eq. \eqref{eq:assumption}):

$$
\implies P(C_i\mid w_1, w_2, \ldots, w_n)  = \frac{P(C_i)}{P(w_1, w_2, \ldots, w_n)}\prod_{j=1}^n P(w_j \mid C_i) 
$$

This last equation is not general, but it is really useful because the quantities on the right of the equation are pretty easy to compute.
We have therefore translated the problem of computing $P(C_i\mid w_1, w_2, \ldots, w_n)$ to computing $P(C_i)$ and $P(w_j \mid C_i)$. The probability in the denominator is always ignored because it is a normalization factor and we are just interested in which of the conditional probabilites is the biggest. Both set of probabilites are easy to estimate:

- The probability $P(w_j \mid C_i) $ is estimated as the frequency of word $w_j$  in category $C_i$:

$$
P(w_j \mid C_i) := \frac{n^{(i)}_j}{N^{(i)}}\,  ,      \quad     N^{(i)} = \sum_j n^{(i)}_j
$$

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where $n^{(i)}_j$ is the number of times the word $w_j$ appears in the category $C_i$.

- The probability $P(C_i) $  is the frequency of the category $i$ in the dataset.

## 4. Subtleties
If a word $w_k$ does not appear in class $C_i$ this makes the whole estimation to be zero:

$$
\implies P(C_i\mid w_1, w_2, \ldots, w_k, \ldots, w_n) \propto P(w_k \mid C_i) = 0 
$$
 
In order to avoid this problem Laplace smoothing is used:


$$
P(w_j \mid C_i) := \frac{n^{(i)}_j +\alpha}{N^{(i)} + \alpha \cdot d}\,  ,      \quad     N^{(i)} = \sum_j n^{(i)}_j \, , \quad d = \# \,\text{ of different words in the whole dataset}
$$

and $\alpha=1$. Note that $\alpha$ could be any value bigger than zero.

## 5. Code example

### 5.1 From Scratch

```python
from sklearn.datasets import fetch_20newsgroups
# Load the dataset
data = fetch_20newsgroups()
# Get the text categories
text_categories = data.target_names
# define the training set
train_data = fetch_20newsgroups(subset="train", categories=text_categories)
# define the test set
test_data = fetch_20newsgroups(subset="test", categories=text_categories)

from sklearn.feature_extraction.text import CountVectorizer
vectorizer = CountVectorizer(min_df=10, token_pattern= '[a-zA-Z]+')
X_train = vectorizer.fit_transform(train_data.data[:])
X_test = vectorizer.transform(test_data.data)

# integer to word
i2o = dict(enumerate(vectorizer.get_feature_names()))
# word to integer
o2i = {v:k for k,v in i2o.items()}

from sklearn.utils.extmath import safe_sparse_dot
smoothed_fc = np.stack([X_train[train_data.target==i].sum(axis=0)+ 1 for i in np.unique(train_data.target)])
words_per_class = [X_train[train_data.target==i].sum() for i in np.unique(train_data.target)]
smoothed_cc = np.array([w + X_train.shape[1] for w in words_per_class])
feature_log_prob = np.log(smoothed_fc) - np.log(smoothed_cc.reshape(-1, 1))

preds = [safe_sparse_dot(X_train[i], feature_log_prob.T).argmax() for i in range(50)]
np.sum(train_data.target[:50]==preds)/50 

```

### 5.2 Sklearn 

```python
from sklearn.datasets import fetch_20newsgroups
# Load the dataset
data = fetch_20newsgroups()
# Get the text categories
text_categories = data.target_names
# define the training set
train_data = fetch_20newsgroups(subset="train", categories=text_categories)
# define the test set
test_data = fetch_20newsgroups(subset="test", categories=text_categories)

import seaborn as sns
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import confusion_matrix, accuracy_score
# Build the model
model = make_pipeline(CountVectorizer(), MultinomialNB())
# Train the model using the training data
model.fit(train_data.data, train_data.target)
# Predict the categories of the test data
predicted_categories = model.predict(test_data.data)


# plot the confusion matrix
mat = confusion_matrix(test_data.target, predicted_categories)
sns.heatmap(mat.T, square = True, annot=True, fmt = "d", xticklabels=train_data.target_names,yticklabels=train_data.target_names)
plt.xlabel("true labels")
plt.ylabel("predicted label")
plt.show()
print("The accuracy is {}".format(accuracy_score(test_data.target, predicted_categories)))

```


## References

- [The Naive Bayes Model, Maximum-Likelihood
Estimation, and the EM Algorithm](http://www.cs.columbia.edu/~mcollins/em.pdf)

- [Slide Lectures Naive Bayes](http://www.cs.cmu.edu/~tom/10601_sp09/lectures/NBayes-1-28-2009-ann.pdf)

- [Conditional Probability Lecture Notes](http://web.stanford.edu/class/cs109/lectureNotes/LN04_cond_bayes.pdf)

- [Implemementing Naive Bayes in sklearn](https://towardsdatascience.com/text-classification-using-naive-bayes-theory-a-working-example-2ef4b7eb7d5a)



