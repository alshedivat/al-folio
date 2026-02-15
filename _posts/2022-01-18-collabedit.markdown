---
layout: single
comments: true
title: Design Collabrative Editing
date: 2022-01-18 00:00:00-0000
categories: ['System Design']
---

## Operation Tranformation

Operational transformation (OT) is a technology for supporting a range of collaboration functionalities in advanced collaborative software systems. OT was originally invented for `consistency maintenance` and `concurrency control` in collaborative editing of plain text documents

### System Architecture

* each client has their own copy of the document
* clients operate on their local copies in a lock-free, non-blocking manner
* the changes are then propagated to the rest of the clients
* When a client receives the changes propagated from another client, it typically transforms the changes before executing them; 
    * the transformation ensures that application-dependent consistency criteria (invariants) are maintained by all sites


### Basics

Given a text document with a string "abc" replicated at two collaborating sites; and two concurrent operations:
1. O1 = Insert[0, "x"] (to insert character "x" at position "0")
2. O2 = Delete[2, "c"] (to delete the character "c" at position "2")

Suppose the two operations are executed in the order of O1 and O2 (at site 1)

* After executing O1, the document becomes "xabc"
* To execute O2 after O1, O2 must be transformed against O1 to become: `O2' = Delete[3, "c"]`, whose positional parameter is incremented by one due to the insertion of one character "x" by O1
* Executing O2' on "xabc" deletes the correct character "c" and the document becomes "xab". However, if O2 is executed without transformation, it incorrectly deletes character "b" rather than "c"


<br/>
<div>
    <center>{% include figure.html path="assets/img/collabdoc/OT.png" %}</center>
</div>
<br/>

---

## Architecture


<br/>
<div>
    <center>{% include figure.html path="assets/img/collabdoc/Architecture.png" %}</center>
</div>
<br/>

