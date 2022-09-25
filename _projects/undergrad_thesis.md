---
layout: page
title: Blockchain For Business Networks
project_page: true
description: Undergraduate Thesis
img: assets/img/Thesis_Cover.jpg
importance: 1
category: Thesis
github: https://github.com/saikumarysk/BlockchainForBusinessNetworks
report_pdf: Undergrad_Thesis_report.pdf
---

Blockchains are distributed ledger services introduced by Satoshi Nakamoto in 2009 to serve as a decentralized open-source anonymous ledger for his infamous cryptocurrency, Bitcoin.
In my thesis advisor, Prof. Shweta Agrawal's words, blockchains are a beautiful blend of theory and practice to solve the ornate problem of distributed anonymous consensus.
Although the infamy of Bitcoin has clouded the potential of blockchain, they are nevertheless one of the best ways to achieve consensus among unacquainted parties.
In this project, we explored the intricacies of using blockchains as a distributed ledger to produce a consensus among intra-organizational and inter-organizational groups.
This project was part of Phase I of a joint venture between IIT Madras, IIT Kanpur, and the Government of Uttar Pradesh, India, under the [National Blockchain Project](https://blockchain.cse.iitk.ac.in/index.html#about)'s umbrella.

To delve deeper into the project, I investigated several open source blockchain implementations and several blockchain settings to find an optimal framework that any organization can readily use as a ledger service.
For organizational use, we need blockchains that are more privileged than the general purpose blockchains, unlike in the general purpose Bitcoin setting.
Hence, we narrowed our search towards the permissioned blockchain setting, less restricted than the private and more privileged than the public blockchain setting.
We also explored solutions for optimal blockchain settings, such as [Fruitchains](https://eprint.iacr.org/2016/916.pdf).
We used IBM's Hyperledger project, an open-source permissioned blockchain implementation consisting of several suites of blockchain products.
We utilized Hyperledger Fabric to build a database that stores CRUD operations on a blockchain and Hyperledger Composer to create a business application using NodeJS & AngularJS and expose several APIs that UI components can use.

<div class="row">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/Thesis_Composer.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.html path="assets/img/Thesis_Layer.JPG" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Brief overview of Hyperledger Composer and Hyperledger Fabric and their interplay in the project.
</div>

As part of the implementation, we created two business networks.
A business network is a network of individuals who use the permissioned blockchain to make changes to their database.
A central blockchain database stores these ledger updates.
The first business network is a student record business network which consists of records of several students in IIT Madras.
We derived as much information as possible from the institute to stress test the underlying Hyperledger Composer-based blockchain database can handle.
We included several multimedia blobs and various dummy information about students to populate the database.
In addition, we created a completely fake land record network in which individuals can add/view/modify land record information visible to all the network participants (technically, individuals with sufficient access).
This network was used to stress test the implementation and has random values.
The records themselves are stored in a LAMP stack to reduce the storage disadvantages inherent to blockchains.
The report contains several details about implementation and testing.
UI applications can use the various APIs exposed by these networks.
The project's main aim was to demonstrate the use of blockchains as a viable method to store and access information to increase transparency and trust while reducing corruption.

<div class="row">
    <div class="col-sm mt-md-0">
        {% include figure.html path="assets/img/Thesis_REST.png" title="Exposed APIs" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
	    APIs exposed by our project for the student business network.
</div>

**Work After Graduation:** I continued working on this project after I graduated from IIT Madras.
I worked with several master's degree students who were building on my solution to use the Hyperledger composer-based blockchain database as secure storage for doctor-patient records, which can be accessed using a proxy re-encryption scheme to build anonymity and trust in the network.

:warning: [Hyperledger Composer](https://hyperledger.github.io/composer/latest/) is deprecated as of August 2019 and reached its End of Life by August 2021 :disappointed: :warning:
<div class='social'>
<div class="contact-icons">
  Source Code: <a href="{{ page.github }}" title="GitHub"><i class="fab fa-github"></i></a>
  Report: <a href="{{ page.report_pdf | prepend: 'assets/pdf/' | relative_url}}" target="_blank" rel="noopener noreferrer"><i class="fas fa-file-pdf"></i></a>
</div>
</div>
