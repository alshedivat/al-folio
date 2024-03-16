---
layout: page
title: Decentralized CAS
description: "A DECENTRALIZED, DISTRIBUTED STORAGE SYSTEM DESIGNED FOR PEER-TO-PEER (P2P) FILE STORAGE. SUPPORTS
LARGE FILE STREAMING AND ENCRYPTED STORAGE ON REMOTE PEERS."
img: assets/img/cas.png
importance: 2
category: OpenSource
---

# Distributed CAS (Content Addressed Storage)

Implemented in Golang

We have a network of nodes each running this server on their systems; they can now save a file not only on their local disks but also on other nodes

Similarly they can retrieve their file from other nodes usign the key against which they had saved the file in the network.

All files are stored on remote peer/nodes in an encrypted fashion so they can't view their peer's private data.

# DOCS

## Overview

CAS (Content Addressed Storage) is a distributed storage system designed for peer-to-peer (P2P) file storage. It allows users to store and retrieve files across a network of distributed peers. In CAS, each peer in the network offers storage infrastructure, enabling files to be stored in an encrypted fashion on remote peers. The system supports streaming of files up to 5 GB in size and is primarily optimized for Write Once Read Many (WORM) operations. This means that data stored in CAS is intended to be immutable, making it suitable for content such as books, legal documents, movies, and other archival media.

## Architecture

The CAS system is built upon a custom P2P library that enables peers to listen for and accept connections, as well as consume a channel of messages. These messages can be categorized into three types:

1. **Incoming Message for Getting Data:** Peers can request data from the network by broadcasting a "get" request.
2. **Storing Data:** Peers can store files on the network by broadcasting a "store file" request. The file is replicated across three other peers in the network and stored locally on the requesting node.
3. **Receiving Peer List:** Peers periodically exchange their local peer lists with connected nodes, enabling active peer discovery.

## Storage and Retrieval

To store a file in the network, a peer broadcasts a "store file" request, resulting in the file being distributed and stored on three other peers in the network, as well as locally on the requesting node. Files are stored using a hashing algorithm, and each file is associated with a unique key. To retrieve a file, a "get" request is broadcasted, allowing a copy of the file to be retrieved from the network.

## Active Peer Discovery

For extensibility and network robustness, CAS implements active peer discovery. Peers periodically exchange their local peer lists with connected nodes, following a gossip protocol. This ensures that new peers are propagated throughout the network, enhancing network connectivity and resilience.

## File Transformation

Although files are hashed before storage on remote peers, they are transformed back into their original file type upon retrieval. This ensures seamless access to files stored in the CAS system.

By leveraging the CAS system, users can securely store and retrieve files across a distributed network, with built-in redundancy and active peer discovery mechanisms ensuring reliable and efficient operation.

## Networking

The CAS system offers flexibility in networking by providing a transport interface that allows connections on any protocol. Currently, only TCP (Transmission Control Protocol) is implemented, but nodes can be added over protocols such as WebSockets, HTTP, gRPC, etc. This modular approach enables seamless integration with different networking protocols, making CAS adaptable to various network environments and use cases.

![image](https://github.com/EggsyOnCode/CAS/assets/77304003/56ea9ca1-2188-40dc-9cbd-8b3c7325372f)

[link to the repo](https://github.com/EggsyOnCode/CAS)
