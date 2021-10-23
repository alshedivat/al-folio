---
layout: page
title: Crypto Bot
description: Binance Exchange
img: /assets/img/10.jpg
importance: 1
category: Others
---

*You can find the full code in [here](https://github.com/DanielDaCosta/crypto-bot)*

Trading bot using RSI indicator for **Binance Exchange**. 

Default crypto used: `ETH` (*Ethereum*)

## Install Packages
Run:
```
pip install requirements.txt
```

For MacOs users you may run this command before installing the package `TA-lib`:
```
brew install ta-lib
```

## Config Variables
### API Credentials
Go to your Binance account on `API Management` and cretae your own api keys: `API_KEY` and `API_SECRET`

## References & Acknowledgments
- Code created based on a Youtube video: https://www.youtube.com/watch?v=GdlFhF6gjKo&t=2975s
- Original Github code: https://github.com/hackingthemarkets/binance-tutorials
- https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md#klinecandlestick-streams
