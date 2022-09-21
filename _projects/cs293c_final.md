---
layout: page
title: Coverage-Guided Probabilistic Grammar Based Graybox Fuzzer for JSON
project_page: true
description: CMPSC 293C Final Project
img: assets/img/CS293C_Final_Cover.webp
importance: 3
category: Class Projects
github: https://github.com/saikumarysk/cs293c_final/
report_pdf: cs293c_final_report.pdf
---

We wrote a new fuzzer, VYFuzz, in this project, targeted toward JSON parsers.
The unique thing about our fuzzer is that it can generate JSON files with more than 800 kiB in size with no initial seeding.
We use context-free JSON grammar for our project.
In particular, we use the Backus-Naur form of grammar available in many sources.
We concentrate on using all the Unicode encoded characters available as - more often than not - modern parsers have difficulty dealing with them.
We couldn't utilize the reserved UTF-16 characters as we developed our project in Python.

We start with a simple grammar-based fuzzer for JSON, entirely written from scratch.
Our software under test(SUT) was two famous JSON parsers, Google's GSON and nlohmann/json.
While GSON was in Java, nlohmann/json was for C++.
Both the parsers have mechanisms to parse JSON files and convert them to respective JSON objects.
We uncovered one bug in nlohmann/JSON, triggered by JSON fields using large integers.
We reported this bug, and the developers fixed it in the latest release.

Our methodology utilized line and function coverages using C++'s lcov and Java's jacoco.
Using these metrics, we determined the JSON files that increased the coverage as iterating this approach would surely lead to buggy parts of the parsers.
To utilize the metrics, we include updated probabilities in the JSON grammar to guide the fuzzer to a specific location.
Then, we feed the newly generated JSON files to the parsers, and command line execution reports any errors and communicates them back to our error handler.
In the next iteration, we utilize the top 10% of the previous iteration's files to learn new probabilities for the grammar, and the iterative process starts over again.
We uncovered a bug in the nlohmann/JSON parser within three iterations.
We generated more than 6.5 GiB data while working on this project.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/java_line_coverage.jpg" title="Line Coverage Increase for Java" class="img-fluid rounded z-depth-1" %}
    </div>
	<div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/java_function_coverage.jpg" title="Function Coverage Increase for Java" class="img-fluid rounded z-depth-1" %}
    </div>
	<div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/cpp_error_percentage.jpg" title="Error Rate Increase for C++" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Results of our project show an increase in coverage and bugs as a result of the iterative process
</div>

<div class='social'>
<div class="contact-icons">
  Source Code: <a href="{{ page.github }}" title="GitHub"><i class="fab fa-github"></i></a>
  Report: <a href="{{ page.report_pdf | prepend: 'assets/pdf/' | relative_url}}" target="_blank" rel="noopener noreferrer"><i class="fas fa-file-pdf"></i></a>
</div>
</div>
