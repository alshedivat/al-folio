---
layout: page
title: AWS Aurora Cluster
description: Terraform module
img: /assets/img/aurora_cluster.jpeg
importance: 4
category: Others
---

*You can find the full code in [here](https://github.com/DanielDaCosta/aurora-cluster)*

Terraform module for creating an aurora cluster using an existing VPC and Subnets.

It creates and Aurora Cluster (Serverless or not) inside a subnet, and VPC. It creates the necessary Security Groups, and also, if necessary, the security group for the EC2 bastion.

# Requirements

## Mandatory

- VPC
- Subnets
- Availability Zones

## Optional
EC2 for bastion access. If desired, this module will create a security group for RDS and bastion communication. 

`bastion_access = true`

## Variables

```
app_name                = ""
availability_zones      = []
backup_retention_period = 1
db_port                 =
engine_type             = ""
engine_version          = ""
engine_mode             = ""
instance_class          = ""
instances_amount        = 0
master_db_user          = ""
encrypted               = true
scaling_configuration   = {}
bation_sg_id            = ""
```

# Usage

## Aurora Serverless

```
module "aurora" {
  source                  = "git@github.com:DanielDaCosta/aurora-cluster.git"
  app_name                = "example-name"
  availability_zones      = ["us-east-1a", "us-east-1b", "us-east-1c"]
  backup_retention_period = 7
  db_port                 = 5432
  engine_type             = "aurora-postgresql"
  engine_version          = ""
  engine_mode             = "serverless"
  master_db_user          = "postgres"
  encrypted               = true
  bastion_access          = true
  bastion_sg_id           = module.bastion.bastion_sg_id

  scaling_configuration   = {
    auto_pause               = true
    max_capacity             = 4
    min_capacity             = 2
    seconds_until_auto_pause = 600
  }
}
```


## Aurora Cluster Provisioned

Aurora Cluster Provisioned is the default configuration of this module

```
module "aurora" {
  source                  = "git@github.com:DanielDaCosta/aurora-cluster.git"
  app_name                = "example-name"
  availability_zones      = ["us-east-1a", "us-east-1b", "us-east-1c"]
  backup_retention_period = 10
  db_port                 = 5432
  engine_type             = "aurora-postgresql"
  engine_version          = ""
  instance_class          = "db.r4.large"
  instances_amount        = 2
  master_db_user          = "postgres"
  encrypted               = true
  bastion_access          = true
}

```
# References & Acknowledgements

- https://github.com/terraform-aws-modules/terraform-aws-rds-aurora
- https://gitlab.com/terraform147/aurora