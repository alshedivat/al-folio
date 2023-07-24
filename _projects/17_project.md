---
layout: page
title: Recommendation System
description: The project's goal is to create diverse recommendation systems that predict user-item ratings
img: /assets/img/recommendation_system.png
importance: 1
category: Data Science
---

*You can find the full code in [here](https://github.com/DanielDaCosta/recommendation-system)*

# Recommendation System

The project consists of building  different types of recommendation systems using the [Yelp](https://www.yelp.com/dataset) dataset to predict the ratings/stars for given user ids and business ids.

## Dataset

Original Yelp review dataset with some filters.

1. yelp_train.csv: the training data, which only include the columns: user_id, business_id, and stars.
2. yelp_val.csv: the validation data, which are in the same format as training data.
3. We are not sharing the test dataset.
5. review_train.json: review data only for the training pairs (user, business)
6. user.json: all user metadata
7. business.json: all business metadata, including locations, attributes, and categories d. checkin.json: user checkins for individual businesses
8. tip.json: tips (short reviews) written by a user about a business
9. photo.json: photo data, including captions and classifications


## Models

### Item-based CF recommendation system with Pearson similarity
The idea behind a item-to-item collaborative filtering is to rather than matching similar users, match user's rated items to similar items. In practice, often leads to faster online systems and better recommendations
Similarities between pairs of items i and j are computed off-line.
Predict rating of user “a” on item “i" with a simple weighted average

### Results 
File: code/competition.py
RMSE: 1.0575379905



## Model-based
In this project, I have implemented a Model-Based approach to predict user ratings. To achieve this, I utilized the powerful **XGBoost** model, which I fine-tuned through **RandomizedSearchCV** with a thoughtfully selected set of parameters. This rigorous tuning process aimed to optimize the model's performance and enhance its predictive capabilities.


### Fine-tuning
The hyperparameters that have been tuned were 
```
 {'max_depth': [7, 8, 9], 'learning_rate': [0.01, 0.03 ,0.05, 0.07, 0.1], 'n_estimators': [512], 'colsample_bytree': np.arange(0.7, 1, 0.1), 'colsample_bylevel': np.arange(0 7, 1.0, 0.1).}
 ```

I employed a **Model Stacking** technique with Cross Validation to train the model, generating 10 distinct models. To arrive at the final rating prediction, I averaged the individual predictions from each model.

For consistency and reproducibility, I saved all 10 models in the model/ folder and utilized the joblib library to read them for making predictions.

Additionally, I experimented with combining user-based, item-based, and model-based predictions using both switching and weighting techniques. Despite exploring these approaches, the model-based prediction consistently outperformed the other two methods.

### Features

In this project, significant effort was dedicated to feature engineering to optimize the predictive performance and minimize the Root Mean Squared Error (RMSE). To achieve this, a diverse set of features was explored, combining raw data from both the User and Business datasets with newly created features. The following features were developed:

1. n_attributes: The number of attributes associated with each business_id, providing additional information about the businesses' characteristics.

2. average_stars_user: The average star rating given by each user, offering insights into their general reviewing behavior.

3. avg_star_category: The average star rating given by each user for businesses falling within specific categories, enabling the model to capture preferences across different types of businesses.

4. The businesses were categorized into the following categories: ['restaurants', 'shopping', 'food', 'beauty', 'health', 'home', 'nightlife', 'automotive', 'bars', 'local'].

5. yelping_since_year: The year of each review, potentially uncovering trends or changes in reviewing habits over time.

6. review_count_business: The average number of reviews per business, which may reveal patterns related to business popularity or activity.

### Results
- Files: competion.py and train.py
- RMSE: 0.9772904711772428