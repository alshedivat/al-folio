---
layout: page
title: Non-Interactive PSI from Functional Encryption
project_page: true
description: Master's Thesis
img: assets/img/PSI.png
importance: 1
category: Thesis
---

In a traditional public-key encryption scheme, users who possess the secret key learn the entire message from the ciphertext whereas other users do not learn anything. With the advent of cloud computing and the increasing demand for privacy-preserving technologies a more sophisticated tool that provides fine-grained access to data is required. Functional encryption is one such tool which reveals the value of a function $$f$$ acted upon $$x$$ i.e, $$f(x)$$ for any user in the possession of the ciphertext corresponding to $$x$$ and a secret key $$\mathsf{msk}_f$$ associated with $$f$$.

Private Set Intersection is a cryptographic scheme that helps two parties, Alice and Bob, to find the intersection of their input sets A and B while revealing nothing more than A $$\cap$$ B to each other. Efficient and practical implementations of this scheme are already in use in the industry in intra- and inter-organizational settings serving as a solution to many problems ranging from private digital marketing to international data privacy laws. However, most solutions are interactive and require both parties to be online and repeat the entire procedure if any changes to either party's sets are to be considered.

Eliminating this interactive nature of the problem is the key to overcoming inevitable obstacles. However, the non-interactive version of this problem presents many obstacles that require efficient utilization techniques from a multitude of cryptographic domains. We pose the problem as a version of an message-hiding functional encryption scheme in which the ciphertexts and the secret keys are associated with the two parties' inputs.

Although several functional encryption schemes are present for general functions in various computational models, only a handful functional encryption schemes for specialized functions are present. The main contributions are two fold:

1. We construct an semi-adaptively secure collusion-resistant private-key functional encryption scheme for set intersection. The encryption time and secret key generation time grow linearly with the maximum set size. Moreover, the sizes of ciphertexts and secret-keys also grow linearly in the maximum set size.
1. We construct an adaptively secure bounded-collusion public-key functional encryption scheme for set intersection. The encryption time, secret key generation time, ciphertext size, and secret-key size grow linearly with the query bound $$Q$$.

**Thesis File:** You can find my thesis at [eScholaship](https://escholarship.org/uc/item/8n42n95q).