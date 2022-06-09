---
layout: page
title: "Implementation of Model Free Training for End-to-End Communication Systems"
description: Implemented model based and model free auto-encoder based end-to-end communication system for AWGN and Rayleigh Block Fading (RBF) channels as given in the paper - Fay¸cal Ait Aoudia and Jakob Hoydis, "Model-Free Training of End-to-End Communication Systems".
img: 
importance: 1
category: work
---

The authors in the paper "Model-Free Training of End-to-End Communication Systems" consider *auto-encoder* based architecture for the entire transmitter and receiver model with the channel between the encoder (transmitter) and decoder (receiver). The following is the brief explaination of the paper.

* Here, *model-free* refers to the communication model where the channel is unknown or has non-differentiable components. Hence the encoder (transmitter) cann't be trained through backpropagation.

* The objective was to train the autoencoder such that the decoder is able to detect the transmitted messages that are transmitted through the channel.

* To train the autoencoder, the authors propose an alternating algorithm where the decoder (receiver) and the encoder (transmitter) are trained separatel.
* Since the encoder cann't be trained as the channel can be non-differentiable, approximate gradient of loss function is used to train the encoder (transmitter).

#### *Neural Network Architecture:*

* **Input**: One-hot encoded messages that are transmitted through AWGN/ Rayleigh Block Fading (RBF) channel after encoding.
  
* **Encoder**: 2 layers of fully connected network with *elu* as the activation function with normalization to satisfy the power constraints. The output of the encoder is the symbol that is transmitted.

* **Decoder**: 2 layers of fully connected network with *elu* as the activation function for the $1^{st}$ layer and *softmax* as the activation function for the $2^{nd}$ layer. Input to the decoder is the noisy version of the transmitted symbol.
  
* **Output**: Predict the transmitted symbol using the received symbol.

* **Loss Function**: Categorical cross-entropy
* **Optimizer**: Adam

* For each training iteration, the receiver and the transmitter are trained alternatively.

My replication of certain results of the mentioned research paper can be found [here](https://github.com/JS2498/Model_Free_E2E_Communication).
