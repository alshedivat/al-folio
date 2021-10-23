---
layout: page
title: Heart Disease Classification
description: a project with a background image
img: /assets/img/12.jpg
importance: 5
category: Data Science
---

*You can find the full code in [here](https://github.com/DanielDaCosta/HeartDisease-Classification)*

Classification model built based on `Mission_Prediction_Dataset.csv` data that can predict the presence of a disease in the patient. 
Model created as part of CYBERLABS Mission: Disease Classification.

## Requirements
Install the following packages: `pip install -r requirements.txt`
* Python 3.7
* Numpy: V1.16.4
* Pandas: V0.24.2
* Seaborn: V0.9.0
* Keras: V2.2.4
* Keras-Applications: V1.0.8
* Keras-Preprocessing: V1.1.0
* Scikit-learn: V0.21..2
* Scipy: V1.3.0
* Matplotlib: V3.1.0

## Developing Process
### Preprocessing 
The first step was to analyze the dataset. After verifying the non existence of missing values, the following step was to 
understand how the features were distributed. As some of the variables had similar distributions the dataset was reorganized
so that these features would be side by side.

The output histogram showed that the data was well balanced: 54.45% for sick people and 45.54% for non sick.

In order to analyze each feature contribution to the output, the correlation matrix was plotted. Every feature was correlated
to the output and there wasn't any multicollinearity problem. On the other hand, outliers were detected through a scatter plot
of the data. For a more precise detection, Z-score was used in order to find and remove them.

Since the features have different scales and in order to make the training less sensitive to the scales of variables,
the dataset was normalized. For those with gaussian distributions the best way to rescale them was using standardization.
The binary data did not need normalization so its values did not change. For the rest of the data, they were normalized using a MinMaxScale function.

### Creating ML Model

#### Neural Network

For this problem a Neural Network classification model was used. Because of its versatility and also the fact that I was
already familiar with this Machine Learning Model, it ended up being chosen. Due to the complexity of the data, 
with multiples variables, a Multilayer Perceptron with two hidden layers was the best configuration to use. 

The inputs range were basically between -1 and 1 (some values were higher due to standardization), so for the hidden layers' 
activation functions the 'tanh' function was chosen. Since it was a classification problem a 'sigmoid' was used in output
layer.

To prevent overfitting methods such as: Droup out and L1 and L2 Regularization, were used, but the result was not good 
enough, due to the small neural network configuration (only 7 neurons in each layer). The best result was obtained using 
the early stopping method. The model efficiency was measured using accuracy metric, as it was asked.

30% of the data was used to test the model, 10% as validation set and the rest was used for training.

The model has an accuracy an average accuracy 84,366% on the test set and 87,55% on the train set. 
It's a reasonable result but not the best one. The model showed itself to be difficult to optimize since the neural
network was small and so was the dataset.

#### Support Vector Machines

In order to compare the obtained result using the Neural Network method, another ML model was used. The chosen one was
Support Vector Machine modes. SVM was chosen since iis capable of doing classification, has an easy implementation and 
also due to the fact that the input data is the same type of the one used in the last model. Using 30% of the data to 
test the model and the rest for training.

Because of data's complexity and since the target has only two classes, a 'sigmoid' was used as the kernel. The other ones:
linear, gaussian and polynomial were also tested, but they did not give the best result.

The model has an average accuracy of 84,36%, almost the same obtained with the last model, which shows the consistency of 
the results.


## Output.txt file

This file contains a list of ten prediction results of both models and also an average accuracy for each of them.

## Execution

The path to the csv file: *Mission_Prediction_Dataset.csv*, should be added in the function pd.read_csv("*Add path here*"), 
line 21. The python file 'Daniel_Prediction.py' just have to be executed with all the needed libraries, Python 3.7 was used. The output contains the following figures, 16 in total. Comment the last line of the code, line 166, if the figures do not want to be displayed:

* Distributions graphs of each feature (thirtenn figures)
* Histogram of the output data
* Correlation Matrix 
* Neural Network Loss function of training and test sets

The Neural Networks results (confusion Matrix and accuracy) and SVM results (confusion Matrix and accuracy) will be 
shown on the screen, in that order.

## Acknowledgemetns

The dataset came from a Kaggle competition that can be foud here [here](https://www.kaggle.com/cdabakoglu/heart-disease-classifications-machine-learning).
