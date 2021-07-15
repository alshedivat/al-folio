---
layout:     post
title:      Measuring Azure Functions performance
date:       2020-01-20 08:00
summary:    Why couldn't it be simpler?
categories: serverless
tags:       [serverless, azure]
---

Some time ago, I wrote [a short note](https://mcopik.github.io/serverless/2019/12/24/aws-lambda-durations/)
on measuring serverless functions durations and memory consumption on AWS Lambda.
This time we will take a look at Azure Functions, where the situation
is a bit more complicated. Microsoft serverless offerings do not offer a similar
level of comfort since the function response does not involve any information
on function execution. For that purpose, we need to query logs using [Azure
Application Insights](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview).

We can access Application Insights using [CLI](https://docs.microsoft.com/en-us/cli/azure/ext/application-insights/monitor/app-insights/events?view=azure-cli-latest) and a [REST API](https://dev.applicationinsights.io/quickstart). For
the former, it's sufficient to be logged in and identify the ID of the application,
while for the latter, we need to [generate an API key](https://docs.microsoft.com/en-us/cli/azure/ext/application-insights/monitor/app-insights/api-key?view=azure-cli-latest#ext-application-insights-az-monitor-app-insights-api-key-create).
Bear in mind that the App Insights ID is different than identification numbers used anywhere else.

### Time

First, we need to get Azure CLI running. You might use a [Dockerfile](https://gist.github.com/mcopik/20ffbc1a5a70cb3fa4def3677bc06f17)
that provides an image with Azure CLI and Azure Function Tools and log in with
the help of a browser. Alternatively, you can read my previous post on non-interactive login in Azure CLI.
To use application insights in a CLI mode, it is necessary to install an extension - for some reason,
it is not provided by default on Linux platforms:

```
az monitor: 'app-insights' is not in the 'az monitor' command group.
See 'az monitor --help'. If the command is from an extension, please make sure the
corresponding extension is installed. To learn more about extensions, please visit
https://docs.microsoft.com/en-us/cli/azure/azure-cli-extensions-overview
az extension add --name application-insights
```

First, we need to identify the ID by using App Insights components:

```console
az monitor app-insights component show
[
  {
    "appId": "XXX-XXX-XXX",
    ...
    "name": "XXXXX",
    ...
  }
]
```

Afterward, we can run queries on metrics or access all events related to a specific function,
using [az monitor app-insights events](https://docs.microsoft.com/en-us/cli/azure/ext/application-insights/monitor/app-insights/events?view=azure-cli-latest).
For example, receiving all execution requests of a function for the last 12h will
look like this, including much more verbose output with all details on execution:

```console
az monitor app-insights events show --type requests --app ${appID} --offset 12h
{
  "value": [
    {
      ...
      "request": {
        "duration": 606.0171,
        "id": "1a47461ed084a14a",
        "name": "handler",
        "performanceBucket": "500ms-1sec",
        "resultCode": "200",
        "source": "",
        "success": "True",
        "url": "https://411-image-recognition-python-3d785dee.azurewebsites.net/api/handler"
      },
      ...
    },
    ...
  ]
}
```

Flags `--start-time` and `--end-time` can be used to specify the exact time series
for a data query.
Events corresponding to function app execution contain additional data in
`customDimensions` field. This data can be used to find out the function invocation
by using the `InvocationId` field.

```json
"customDimensions": {
  "ai_legacyRequestId": "XXXX",
  "FunctionExecutionTimeMs": "2279.5392",
  "TriggerReason": "This function was programmatically called via the host APIs.",
  "FullName": "Functions.handler",
  "LogLevel": "Information",
  "Category": "Host.Results",
  "InvocationId": "XXXX",
  "HostInstanceId": "XXXX",
  "ProcessId": "37",
  "HttpMethod": "POST",
  "HttpPath": "/api/handler"
}
```

However, this data is not available when using Azure CLI.
It can always be accessed through the [REST API](https://dev.applicationinsights.io/), though.
To access it, we need the application ID accessed earlier and an API key created with
`az monitor app-insights api-key create` command. However, the API does not allow
to specify a detailed time interval which could be helpful to process a subset
of requests easily.

Finally, we can achieve the goal of finding correct requests by using detailed time
filtering with queries. For example, the following query looks for requests
with a given function app, function name and executed in a given time interval.
Results include a timestamp of the event, function name, boolean value signalizing
whether the execution was successful, result code, duration of the event, function app
name, invocation ID, and function execution time.

```
requests
| project timestamp, operation_Name, success, resultCode, duration, cloud_RoleName, invocationId=customDimensions['InvocationId'], functionTime=customDimensions['FunctionExecutionTimeMs']
| where cloud_RoleName =~ 'FUNC_APP_NAME' and operation_Name =~ 'FUNC_NAME'
| where timestamp > todatetime('2020-01-22 17:25:02 +01:00') and timestamp < todatetime('2020-01-22 17:26:02 +01:00')
| order by timestamp desc
```

This query can be executed with Azure CLI as well:

```shell
az monitor app-insights query --app ${APP_ID} --analytics-query
"requests | project timestamp, operation_Name, success, resultCode, duration, cloud_RoleName,
invocationId=customDimensions['InvocationId'],
functionTime=customDimensions['FunctionExecutionTimeMs']"
--start-time 2020-01-22 17:25:02 +01:00
--end-time 2020-01-22 17:26:02 +01:00
{
  "tables": [
    {
      "columns": [
        {
          "name": "timestamp",
          "type": "datetime"
        },
        {
          "name": "operation_Name",
          "type": "string"
        },
        {
          "name": "success",
          "type": "string"
        },
        {
          "name": "resultCode",
          "type": "string"
        },
        {
          "name": "duration",
          "type": "real"
        },
        {
          "name": "cloud_RoleName",
          "type": "string"
        },
        {
          "name": "invocationId",
          "type": "dynamic"
        },
        {
          "name": "functionTime",
          "type": "dynamic"
        }
      ],
      "name": "PrimaryResult",
      "rows": [
        [
          "2020-01-22T16:25:02.9820857Z",
          "handler",
          "True",
          "200",
          7691.1008,
          "111-dynamic-html-python-1489d84c",
          "XXXX",
          "2279.5392"
        ]
      ]
    }
  ]
}
```

### Memory

Azure Functions hosts function executions from a single function app inside the same process,
making it quite difficult to measure memory consumption of a single function, as [confirmed by the Azure
Functions team](https://github.com/Azure/azure-functions-host/issues/1451).
Even though memory is an important metric and it's necessary to understand billing and resource
requirements correctly, this feature does not seem to be a priority for the team.

What can we do? Instead of periodically measuring memory consumption, as it is
possible in some languages, [like NodeJS](https://nodejs.org/api/process.html#process_process_memoryusage),
we can use Azure Metrics to obtain averaged values. Obviously, such data is only
valid and meaningful for function apps consisting of a single function.
Otherwise, the data can represent a value averaged across completely different functions.

If we want to take a look at memory consumption of an entire function app,
[the recommended solution](https://docs.microsoft.com/en-us/azure/azure-functions/functions-consumption-costs) is to run a query on 
performance counters to find out values of `Private Bytes` counter:

```
performanceCounters
| project timestamp, name, counter, value, cloud_RoleName
| where cloud_RoleName =~ 'FUNCTION_APP'
| project-away cloud_RoleName 
| order by timestamp desc
```

This command can return values such as:

| timestamp [UTC] | counter | value |
|:-------------:|:-------------:|:-----:|
| 1/22/2020, 3:04:30.763 PM  | Private Bytes | 0 | 
| 1/22/2020, 3:04:30.763 PM  | % Processor Time Normalized | 0.425 |
| 1/22/2020, 3:04:30.762 PM  | % Processor Time  | 0.85  |

In my case, the memory consumption is not counted correctly for Python function
apps on the Linux system. [Hopefully, the problem will be resolved soon!](https://github.com/Azure/Azure-Functions/issues/1462).

