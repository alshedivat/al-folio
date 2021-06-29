---
layout:     post
title:      Measuring AWS Lambda performance
date:       2020-01-09 08:00
summary:    A short note on CloudWatch metrics.
categories: serverless
tags:       [serverless, python, aws]
---

Measuring AWS Lambda execution times can be in three ways: measure total time
of synchronous execution on client side when using HTTP trigger, measure function runtime
and return time with the result, as seen below, and use measurements provided
by cloud service. The first option is far from ideal since measurements include
the cost and variability of client-cloud communication. Such a setup is useful
only when measuring the effect of using different cloud regions. The second approach
does not include overheads of initialization, and we have no way of measuring cold
starts.


```python
import datetime

import function

def handler(event, context):
    begin = datetime.datetime.now()
    ret = function.handler(event)
    end = datetime.datetime.now()
    return {
        "time" : (end - begin) / datetime.timedelta(microseconds=1),
        "message": ret
    }
```

This leaves us an only option: rely on the cloud to share with us exact measurements.
On AWS, we can access metrics stored in [AWS CloudWatch](https://aws.amazon.com/cloudwatch/),
**as long as our function has permissions to access CloudWatch metrics**. We can
use Python SDK to access metrics with [`get_metric_data`](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/cloudwatch.html#CloudWatch.Client.get_metric_data).
The query requires multiple parameters and some of them are not that obvious. So
we start with listing available metrics:

```python
import boto3
client = boto3.client('cloudwatch','us-east-1')
client.list_metrics()
```

The returned JSON includes multiple various metrics; here, we show those relevant
to AWS Lambda:

```json
{
  "Metrics": [
    {
      "Namespace": "AWS/Lambda",
      "MetricName": "Throttles",
      "Dimensions": [
        {
          "Name": "FunctionName",
          "Value": "111_dynamic_html_python_128"
        }
      ]
    },
    {
      "Namespace": "AWS/Lambda",
      "MetricName": "Errors",
      "Dimensions": [
        {
          "Name": "FunctionName",
          "Value": "111_dynamic_html_python_128"
        }
      ]
    },
    {
      "Namespace": "AWS/Lambda",
      "MetricName": "Invocations",
      "Dimensions": [
        {
          "Name": "FunctionName",
          "Value": "111_dynamic_html_python_128"
        }
      ]
    },
    {
      "Namespace": "AWS/Lambda",
      "MetricName": "Duration",
      "Dimensions": [
        {
          "Name": "FunctionName",
          "Value": "111_dynamic_html_python_128"
        }
      ]
    },
    {
      "Namespace": "AWS/Lambda",
      "MetricName": "ConcurrentExecutions",
      "Dimensions": [
        {
          "Name": "FunctionName",
          "Value": "111_dynamic_html_python_128"
        }
      ]
    }
  ],
  "ResponseMetadata": {
    "RequestId": "4569d7d8-324e-49a1-b7a9-46893833133a",
    "HTTPStatusCode": 200,
    "HTTPHeaders": {
      "x-amzn-requestid": "4569d7d8-324e-49a1-b7a9-46893833133a",
      "content-type": "text/xml",
      "content-length": "9038",
      "vary": "accept-encoding",
      "date": "Thu, 09 Jan 2020 17:06:44 GMT"
    },
    "RetryAttempts": 0
  }
}
```

As we can see, for each function, we can measure the number of invocations, execution times,
concurrency and errors. Continuing with Python API, we can run queries such as the
one below, computing average duration for all one-hour periods on the 9th of January. 

```python
client.get_metric_data(
  MetricDataQueries=[{
    "Id": "myRequest",
    "Label": "myRequestLabel",
    "ReturnData": True,
    "MetricStat": {
      "Period": 3600,
      "Unit": "Milliseconds",
      "Stat": "Average",
      "Metric": {
        "Namespace": "AWS/Lambda",
        "MetricName": "Duration"
      }
    }
  }],
  StartTime=datetime.datetime(2020, 1, 9),
  EndTime=datetime.datetime(2020, 1, 10))
```

The query provides results for each time period:

```python
{
  'MetricDataResults': [{
    'Id': 'myRequest',
    'Label': 'myRequestLabel',
    'Timestamps': [
      datetime.datetime(2020, 1, 9, 21, 0, tzinfo=tzutc()),
      datetime.datetime(2020, 1, 9, 20, 0, tzinfo=tzutc()),
      datetime.datetime(2020, 1, 9, 19, 0, tzinfo=tzutc()),
      datetime.datetime(2020, 1, 9, 18, 0, tzinfo=tzutc()),
      datetime.datetime(2020, 1, 9, 17, 0, tzinfo=tzutc()),
      datetime.datetime(2020, 1, 9, 16, 0, tzinfo=tzutc()),
      datetime.datetime(2020, 1, 9, 10, 0, tzinfo=tzutc()),
      datetime.datetime(2020, 1, 9, 1, 0, tzinfo=tzutc())
    ],
    'Values': [
      3529.3, 3583.6459999999997, 87.735, 114.9690909090909,
      49.782000000000004, 8.254999999999999, 0.34, 0.27
    ],
    'StatusCode': 'Complete'
  }],
  'Messages': [],
  'ResponseMetadata': {
    'RequestId': '48c7aedc-e87d-45bb-9045-adf8156be358',
    'HTTPStatusCode': 200,
    'HTTPHeaders': {
      'x-amzn-requestid': '48c7aedc-e87d-45bb-9045-adf8156be358',
      'content-type': 'text/xml',
      'content-length': '1240',
      'date': 'Fri, 10 Jan 2020 12:19:11 GMT'},
    'RetryAttempts': 0
  }
}
```

Although the [set of available statistics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Statistic)
is quite extensive, including even percentiles to measure tail latency, it is not possible to access raw data since the lowest sampling
period is 60 seconds. While it's definitely useful for large applications where
functions could be executed dozens of thousands of times per day, we can't do detailed
experiments and obtain histogram to understand stragglers and outliers.

Fortunately, more detailed data is available in CloudWatch logs. Each function
execution is followed by the message summarizing not only compute but also
initialization time:

```
START RequestId: bb6b75bb-e119-464c-8e24-1db141d951fa Version: $LATEST
END RequestId: bb6b75bb-e119-464c-8e24-1db141d951fa
REPORT RequestId: bb6b75bb-e119-464c-8e24-1db141d951fa
  Duration: 33.99 ms
  Billed Duration: 100 ms
  Memory Size: 128 MB
  Max Memory Used: 57 MB
  Init Duration: 55.74 ms
```

To obtain that information, we don't have to query logs since it can be returned with every function call when we provide Tail as log type in function invocation. The return will include a base64-encoded log which can be parased with the following code to obtain exact time measurements in milliseconds precision.

```python
ret = self.client.invoke(
  FunctionName=name,
  Payload=payload,
  LogType='Tail'
)
if 'FunctionError' in ret:
  logging.error('Invocation of {} failed!'.format(name))
  logging.error('Input: {}'.format(payload.decode('utf-8')))
  raise RuntimeError()
log = base64.b64decode(ret['LogResult'])
vals = {}
for line in log.decode('utf-8').split('\t'):
  if not line.isspace():
    split = line.split(':')
    vals[split[0]] = split[1].split()[0]
return vals
```

```python
{
  'START RequestId': '2430372f-9fcb-4b9c-8179-8b4b71c86f28',
  'Duration': '18.37',
  'Billed Duration': '100',
  'Memory Size': '128',
  'Max Memory Used': '57',
  'Init Duration': '60.74'
}
```


### Query CloudWatch logs

However, the solution presented above works quite well only when we invoke the
function synchronously. If we choose 'Event' invoke type, the return value consists
only of return code, `202` in case of a correct enqueue of function invocation to
AWS queue. It's a useful feature when we want test our function or evaluate performance
by scheduling multiple invocations at the same time. How can we query the function log afterwards?
The only option is to use the [AWS CloudWatch](https://aws.amazon.com/cloudwatch/). The query language
description with samples is available in [AWS docs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax-examples.html),
here we focus only on getting `REPORT` events that contain information interesting to us.

```python

region = ''
lambda_function = ''
startTime = 0 # seconds from epoch
endTime = 0 # seconds from epoch


client = boto3.client('logs', region)
query = client.start_query(
    logGroupName='/aws/lambda/{}'.format(lambda_function),
    queryString="filter @message like /REPORT/",
    startTime=startTime,
    endTime=endTime
)
query_id = query['queryId']
response = None

while response == None or response['status'] == 'Running':
    time.sleep(1)
    response = client.get_query_results(
        queryId=query_id
    )
```

The query result will contain information on results selected

```console
"statistics": {
  "recordsMatched": 15.0,
  "recordsScanned": 63.0,
  "bytesScanned": 11802.0
}
```

and a long array of function reports found for a given time period.

```console
[
  {
    "field": "@timestamp",
    "value": "2020-01-21 15:24:18.198"
  },
  {
    "field": "@message",
    "value": "REPORT RequestId: 33792b95-4e1f-4c69-a5f5-5dacea2067cd\tDuration: 25.98 ms\tBilled Duration: 100 ms\tMemory Size: 512 MB\tMax Memory Used: 54 MB\tInit Duration: 1.01 ms\t\n"
  },
  {
    "field": "@ptr",
    "value": "CnYKPQo5MjYxNDkwODAzNzQ5Oi9hd3MvbGFtYmRhLzQxMV9pbWFnZV9yZWNvZ25pdGlvbl9weXRob25fNTEyEAUSNRoYAgXVWRJZAAAAAMQBWcsABeJxcZAAAACSIAEolaPRxfwtMJaj0cX8LTgDQNwESJ8XUJ0REAIYAQ=="
  }
]
```


And what about function result? Well, in that case it's ignored and the only solution
to retain it is to export function result into a dedicated S3 bucket.
The `context` argument to every lambda function includes request identification
`context.aws_request_id' which can be used to connect output in storage with
CloudWatch logs.
