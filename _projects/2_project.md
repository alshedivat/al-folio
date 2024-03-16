---
layout: page
title: Asset Swap
description: "A P2P DECENTRALIZED COMMERCE MICROSERVICES-BASED WEB APPLICATION WHICH FACILITATES SECURE,
TRANSPARENT, TRUSTLESS BUYING AND SELLING WITHOUT THE NEED FOR ADVANCE OR DOWNPAYMENTS ETC
"
img: assets/img/chainlink.png
importance: 1
category: OpenSource
giscus_comments: true
---

# Motivations

Earlier last year a family member of mine was defrauded during the purchase of a 2nd hand vehicle. The transaction was to be done p2p and not with a firm.

The seller backed out at the last minute and refused to return the $1000 we had given him as a collateral for estbalishing trust.

This made me think of a trustless system where trust of a transactional interaction was inherent in the system.

That's where the idea for Asset Swap was born.

It's A P2P DECENTRALIZED COMMERCE MICROSERVICES-BASED WEB APPLICATION WHICH FACILITATES SECURE,
TRANSPARENT, TRUSTLESS BUYING AND SELLING WITHOUT THE NEED FOR ADVANCE OR DOWNPAYMENTS ETC

# Tech Stack used

## Architecture

- Microservices ; Event Based; shared DB architecture
- RabbitMQ for microservices comms

## Tools

- NestJS as Backend Framework
- HTTP REST Apis
- DB:
  - Postgres
  - ORMS:
    - TypeORM
- Jest for unit testing

## Blockchain

- Foundry for smart contract dev and testing
- anvil as local blockchain node
- MetaMask as web3 wallet
- Storing NFT tokens of assets on IPFS nodes
  - nft.storage service used

## Cloud and DevOPS

- AWS S3 bucket for storing static data
- Docker for containerizing each microservice
- Deploying these images to AWS ECR private container registry
- AWS ECS to orchestrate a cluster of these docker images
- CI / CD:
  - AWS Codepipline to create ci / cd

## Front End

- VueJS
- Vuetify as design framework
- Figma for creating ui ux designs

[link to the backend repo](https://github.com/EggsyOnCode/asset-swap-server)

[link to the frontend repo](https://github.com/EggsyOnCode/asset-swap-vue)