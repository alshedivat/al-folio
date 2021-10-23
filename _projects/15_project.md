---
layout: page
title: AWS Lambda module
description: Terraform module
img: /assets/img/lambda.png
importance: 5
category: Others
---

*You can find the full code in [here](https://github.com/DanielDaCosta/lambda-module)*

This is a short version of a terraform lambda module with some naming structure and patterns, used in order to give more scalability. The code was base on the following repository: [terraform-aws-module](https://github.com/terraform-aws-modules/terraform-aws-lambda) developed by Terraform AWS modules.

Check more on the following [Automating Lambda Modules Deployment With Gitlab-CI](https://medium.com/@danieldacosta_75030/automating-lambda-modules-deployment-with-gitlab-ci-b34cc58a7ac0).

## Usage

```terraform
module "lambda_sms" {
  source = "git@github.com:DanielDaCosta/lambda-module.git"

  lambda_name             = var.lambda_sms
  s3_bucket               = var.s3_bucket
  s3_key                  = "lambda-sms.zip"
  s3_object_version       = data.aws_s3_bucket_object.lambda_sms.version_id
  environment             = var.environment
  name                    = var.name
  description             = "Send SMS to user"
  role                    = data.aws_iam_role.lambda_exec_sms.arn
  runtime                 = "python3.7"

  reserved_concurrent_executions = 30

  vpc_subnet_ids          = tolist(data.aws_subnet_ids.private.ids)
  vpc_security_group_ids  = tolist([data.aws_security_group.postgres.id, aws_security_group.lambda.id])

  environment_variables = {
    ENV     = local.name_dash
  }

  create_async_event_config = true
  maximum_retry_attempts    = 0
  destination_on_failure    = data.aws_sqs_queue.sms_queue.arn
}
```