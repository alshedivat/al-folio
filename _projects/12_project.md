---
layout: page
title: Lambda Email
description: Lambda that sends email to user
img: /assets/img/2.jpg
importance: 2
category: Others
---

*You can find the full code in [here](https://github.com/DanielDaCosta/lambda-email)*

Lambda that sends email to user, built using Terraform. It receives an array of dictionaries containing
email subject, content and the email to receive the message.

Lamba event input:

```
{
    "data": {
        [
            {
                'subject': 'Hello there from Python!',
                'message': 'This message sent from lambda',
                'to': 'teste@gmail.com'
            },
            {
                'subject': 'Hello there from Python Again!',
                'message': 'This message sent from lambda Again',
                'to': 'unitys@gmail.com'
            }
        ]
    }
}
```
# Details

The repository already contains the required SendGrid 6.4.3 package installed inside the *package* folder.
This repo has both Sendgrid and stmlib implentations! Chose the one that you prefer.

# Usage

This modules reads all its variables from Lambda Environment variables, as it can be seen in the file *config.py*.

For sendGrid credentials, you can create your free account in their website: https://sendgrid.com

## Example of lambda call

Lambda *asynchronous invocation* is preferable

```python
import json
import boto3
from config import MS_SMS

# MS_SMS = "name_of_function"

messages_array = {
    'data': [{
        'subject': 'HELLO THERE!',
        'message': 'NICE MEETING YOY',
        'to': 'TEST_EMAIL@gmail.com'}]
    }

def send_sms(messages_array):
    """Send sms
    Args:
        phone_number (string): the phone number that will receive the sms
        body_message (string): the message
    """
    client = boto3.client('lambda')
    payload = {
        "data": messages_array
    }
    client.invoke(
        FunctionName=MS_SMS,
        InvocationType='Event',
        Payload=json.dumps(payload),
        LogType='None'
    )
```

## Calling module

```terraform
# Module 
module "sms" 
    source = "git@github.com:DanielDaCosta/lambda-email.git"

    lambda_name             = var.lambda_sms
    environment             = var.environment
    name                    = var.name
    region                  = var.region
    EMAIL_ADDRESS           = var.EMAIL_ADDRESS
    EMAIL_PASS              = var.EMAIL_PASS
    SENDGRID_API_KEY        = var.SENDGRID_API_KEY
}
```

# References & Acknowledgments
- https://www.youtube.com/watch?v=JRCJ6RtE3xU
- https://stackabuse.com/how-to-send-emails-with-gmail-using-python/
- https://sendgrid.com/docs/for-developers/sending-email/v3-python-code-example/