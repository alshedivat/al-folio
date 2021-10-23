---
layout: page
title: Text Classifier
description: Random Forest Classifier with MultiOuputClassifier  
img: /assets/img/classifier_1.png
importance: 3
category: Data Science
---
*You can find the full code in [here](https://github.com/DanielDaCosta/disaster-webapp)*

The project consists of a Multi-Label Text Classifier project using a Random Forest Classifier with MultiOuputClassifier from Scikit-learn.

The dataset consists of disaster messages that are classified into 36 different classes. The goal of the model is to classify an input message into these different classes.

A Web Application was developped allowing to analyze the dataset and write your own message to be classified.

## Dataset
The dataset consists of disaster messages that are classified into 36 different classes. The dataset in highly imbalanced, having different distributions for each class. In order to reduce this problem a class weighted approach was used, where we make the classifier aware of the imbalanced data by incorporating the weights of classes into the cost function.

In the **Random Forest** model, the parameter *class_weight* was set to *'balanced'*, using the values of y to automatically adjust weights inversely proportional to class frequencies in the input data.

## Web Application

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/classifier_1.png' | relative_url }}" alt="" title="Classifier 1"/>
    </div>
</div>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/classifier_2.png' | relative_url }}" alt="" title="Classifier 2"/>
    </div>
</div>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/classifier_3.png' | relative_url }}" alt="" title="Classifier 3"/>
    </div>
</div>


## Usage

- data/ : ETL folder. Data preparation. To load the data from scratch:

```python process_data.py disaster_messages.csv disaster_categories.csv DisasterResponse.db ```

- models/ : Machine Learning models. To train the model:

```python train_classifier.py ../data/DisasterResponse.db classifier.pkl```

- app/ : Contains the scripts for the web application. In order to run de application go into the app/ folder an run the command:

``` python run.py```

### File Structure

```
.
├── LICENSE
├── README.md
├── app
│   ├── run.py # Flask file that runs app
│   └── templates
│       ├── go.html # classification result page of web app
│       └── master.html # main page of web app
├── data
│   ├── DisasterResponse.db # database to save clean data to
│   ├── disaster_categories.csv # data to process
│   ├── disaster_messages.csv # data to process
│   └── process_data.py
├── models
│   ├── classifier.pkl # saved model 
│   └── train_classifier.py
└── requirements.txt
```

## Installation

```
pip install -r requirements.py
```
## Development
Other models architetures were also explored. You can check the solution for the same problem using **RNN with keras** in this other GitHub Repo: [Multi-Label Text classification problem with Keras](https://github.com/DanielDaCosta/RNN-Keras/blob/master/ML-Pipeline-RNN.ipynb)

## Acknowledgments and References
Special thanks to [Figure Eight](https://appen.com/) for the dataset.
- https://towardsdatascience.com/another-twitter-sentiment-analysis-bb5b01ebad90
- https://www.kaggle.com/gunesevitan/nlp-with-disaster-tweets-eda-cleaning-and-bert#3.-Target-and-N-grams
- https://towardsdatascience.com/accuracy-precision-recall-or-f1-331fb37c5cb9
