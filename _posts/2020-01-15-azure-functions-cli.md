---
layout:     post
title:      Measuring AWS Lambda durations
date:       2019-12-24 08:00
summary:    A short note on CloudWatch metrics. 
categories: serverless
tags:       [serverless, python, aws]
---

## Non-interactive login


## Measuring logs

The extension is not installed by default on Linux platforms

```
az monitor: 'app-insights' is not in the 'az monitor' command group. See 'az monitor --help'. If the command is from an extension, please make sure the corresponding extension is installed. To learn more about extensions, please visit https://docs.microsoft.com/en-us/cli/azure/azure-cli-extensions-overview 
az extension add --name application-insights
```

We can access Application Insights using [CLI](https://docs.microsoft.com/en-us/cli/azure/ext/application-insights/monitor/app-insights/events?view=azure-cli-latest) and a [REST API](https://dev.applicationinsights.io/quickstart). For
the former it's sufficient to be logged in and identify the ID of application,
while for the latter we need to [generate an API key](https://docs.microsoft.com/en-us/cli/azure/ext/application-insights/monitor/app-insights/api-key?view=azure-cli-latest#ext-application-insights-az-monitor-app-insights-api-key-create).
Bear in mind that the App Insights ID is different than identification numbers used anywhere else.

First, we need to identify the ID by using App Insights components:

```
az monitor app-insights component show
[
  {                                                                                                                                                                                                                                                                                                                           
    "appId": "0812e055-3673-4e0d-84c0-90333f837bae",                                                                                                                                                                                                                                                                          
    "applicationId": "110-dynamic-html-python2",                                                                                                                                                                                                                                                                              
    "applicationType": "web",                                                                                                                                                                                                                                                                                                 
    "creationDate": "2020-01-14T16:16:50.073398+00:00",                                                                                                                                                                                                                                                                       
    "etag": "\"220059fa-0000-0200-0000-5e1deae10000\"",                                                                                                                                                                                                                                                                       
    "flowType": null,                                                                                                                                                                                                                                                                                                         
    "hockeyAppId": null,                                                                                                                                                                                                                                                                                                      
    "hockeyAppToken": null,                                                                                                                                                                                                                                                                                                   
    "id": "/subscriptions/9e6e3ebb-5957-4709-b841-148d3f855d3c/resourceGroups/myResourceGroup/providers/microsoft.insights/components/110-dynamic-html-python2",                                                                                                                                                              
    "instrumentationKey": "2bab859b-6015-4883-8206-1018e9dd0e51",                                                                                                                                                                                                                                                             
    "kind": "web",                                                                                                                                                                                                                                                                                                            
    "location": "westeurope",                                                                                                                                                                                                                                                                                                 
    "name": "110-dynamic-html-python2",                                                                                                                                                                                                                                                                                       
    "provisioningState": "Succeeded",                                                                                                                                                                                                                                                                                         
    "requestSource": null,                                                                                                                                                                                                                                                                                                    
    "resourceGroup": "myResourceGroup",                                                                                                                                                                                                                                                                                       
    "samplingPercentage": null,                                                                                                                                                                                                                                                                                               
    "tags": {},                                                                                                                                                                                                                                                                                                               
    "tenantId": "9e6e3ebb-5957-4709-b841-148d3f855d3c",                                                                                                                                                                                                                                                                       
    "type": "microsoft.insights/components"                                                                                                                                                                                                                                                                                   
  }                                                                                                                                                                                                                                                                                                                           
]
```

Afterwards we can run queries on metrics or access all events related to specific function. For example, receiving all execution requests for a function


```
az monitor app-insights events show --type requests --app ${appID} -offset 12h
  {                                                                                                                                                                                                                                                                                                                           
    "appId": "0812e055-3673-4e0d-84c0-90333f837bae",                                                                                                                                                                                                                                                                          
    "applicationId": "110-dynamic-html-python2",                                                                                                                                                                                                                                                                              
    "applicationType": "web",                                                                                                                                                                                                                                                                                                 
    "creationDate": "2020-01-14T16:16:50.073398+00:00",                                                                                                                                                                                                                                                                       
    "etag": "\"220059fa-0000-0200-0000-5e1deae10000\"",                                                                                                                                                                                                                                                                       
    "flowType": null,                                                                                                                                                                                                                                                                                                         
    "hockeyAppId": null,                                                                                                                                                                                                                                                                                                      
    "hockeyAppToken": null,                                                                                                                                                                                                                                                                                                   
    "id": "/subscriptions/9e6e3ebb-5957-4709-b841-148d3f855d3c/resourceGroups/myResourceGroup/providers/microsoft.insights/components/110-dynamic-html-python2",                                                                                                                                                              
    "instrumentationKey": "2bab859b-6015-4883-8206-1018e9dd0e51",                                                                                                                                                                                                                                                             
    "kind": "web",                                                                                                                                                                                                                                                                                                            
    "location": "westeurope",                                                                                                                                                                                                                                                                                                 
    "name": "110-dynamic-html-python2",                                                                                                                                                                                                                                                                                       
    "provisioningState": "Succeeded",                                                                                                                                                                                                                                                                                         
    "requestSource": null,                                                                                                                                                                                                                                                                                                    
    "resourceGroup": "myResourceGroup",                                                                                                                                                                                                                                                                                       
    "samplingPercentage": null,                                                                                                                                                                                                                                                                                               
    "tags": {},                                                                                                                                                                                                                                                                                                               
    "tenantId": "9e6e3ebb-5957-4709-b841-148d3f855d3c",                                                                                                                                                                                                                                                                       
    "type": "microsoft.insights/components"                                                                                                                                                                                                                                                                                   
  }                                                                                                                                                                                                                                                                                                                           
```
