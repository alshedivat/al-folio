---
layout: page
title: Model deployment
description: Deploying Machine Learning models on AWS using Serverless Framework.
img: /assets/img/serverless_architecture.png
importance: 1
category: Data Science
---

*You can find the full code in [here](https://github.com/DanielDaCosta/ml-serverless-deploy)*

In this repository we'll be building the following architecture:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/serverless_architecture.png' | relative_url }}" alt="" title="Serverless Architecture"/>
    </div>
</div>


Don't forget to set up your aws credentials using *aws cli*.

# Details

The input data will be stored in a S3 bucket, in our case the csv file. 

The model file will also be stored inside a S3 bucket. Since the model file can be quite large (>90Mb), we will need to load it during AWS Lambda inference execution from Amazon S3. You can observe that the model downloading was placed outside of the handler function. This was done in order to take advantage of AWS Lambda container reuse. Any code executed outside of the handler method will be invoked only once upon container creation and kept in memory across calls to the same Lambda container, making subsequent calls to Lambda faster.

## Files

- s3_utils.py: functions for read and write from s3
- config.py: load environments variables
- serverless.yml: Serverless Frameworl YML file
- handler.py: file to be invoked for AWS lambda when the service executes the code.
- requirement.txt: python dependencies
- .env: environment variables
- Images/: contains all images from repository

# Usage

Installing Serverless Framework

```
npm install -g serverless
```
In this repository will be using Python3. Create a repository, go inside and run the following command:
```
serverless create --template aws-python3
```

Installing *serverless-python-requirements plugin*. A Serverless v1.x plugin to automatically bundle dependencies from requirements.txt and make them available in your PYTHONPATH.:
```
sls plugin install -n serverless-python-requirements
```
Installing *serverless-dotenv-plugin*. Preload environment variables into serverless. Use this plugin if you have variables stored in a .env file that you want loaded into your serverless yaml config.:
```
npm i -D serverless-dotenv-plugin
```

Deployment
```
serverless deploy
```
## Code
The model used is an energy forecasting model using XGboost. The dataset consists of hourly energy consumption rates in kWh for an industrial utility. You can check more about it in [here](https://github.com/DanielDaCosta/energy-forecast).

The model has a *forecasting horizon* (The number of time periods to forecast into the future) of 1 hour.

The model inputs are stored in s3 Bucket. It consists of the model inputs parameter of the last hour. The parameters are:
- hour
- weekday 
- dayofyear
- is_weekend
- weekofyear
- month
- season
- shift
- lag_1
- lag_8
- lag_25

Having energy forecast as output.

**Inputs**

The inputs are saved in an s3 bucket as a *.csv*

**Model**

The XGboost model is saved as *.sav* in s3

**Results**

The results are also stored in s3 as a *.csv*

### Pipeline

CloudWatch trigger (every hour) -> Read Inputs -> Read Model -> Prediction -> Save Model

## Testing function locally
```
serverless invoke local -f function_name
```
