---
layout: page
title: Quadratic Funding Calculator
description: "A QUADRATIC FUNDING CALCULATOR APP; FOR PPL TO SIMULATE THEIR DONATIONS BEFORE MAKING THEM IRL ON
GITCOIN. AN IMPLEMENTATION OF VITALIK BUTERIN’S PAPER ON THE SAME CONCEPT."
img: assets/img/qf.jpg
importance: 2
category: OpenSource
---

Simulates real-world Quadratic funding using Sepolia testnet. Test out your donations before making them IRL on Gitcoin!

## Technologies used:

- ReactJS + Tailwind
- Node Server + Express API endpoints (server is located separately and deployed on vercel)
- EthersJS v5.7
- Solidity for writing Smart Contracts for QF
- Remix IDE for testing out Smart Contract code; instead of using local hardhat env
- MetaMask Wallet with Sepolia Testnet
- Alchemy API for making calls to Ethereum Node

## Inspiration

This QF calculator is an experimetal implementation of the original Quadratic Funding paper written by Vitalik Buterin, Co-Founder Ethereum; which can be read here ttps://vitalik.ca/general/2019/12/07/quadratic.html

The Calculator implements the Quadratic Funding formula explained the paper; since the calcualtions are done using JS (bignumber.js lib was used for this purpose) then results are NOT 100% accurate; off by 10-15% sometimes, othertimes even more. I am working on improve the accuracy of the results rn!

[link to the Deployed Webiste](https://qf-calculator.vercel.app/)
