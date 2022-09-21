---
layout: page
title: Comparing Heuristic and SAT Based Approaches for Graph Coloring
project_page: true
description: CMPSC 292F Final Project
img: assets/img/CS292F_Final_Cover.png
importance: 3
category: Class Projects
github: https://github.com/saikumarysk/cs292f_final
report_pdf: cs292f_final_report.pdf
---

In this project, we compared different approaches to solve the NP-complete graph 3-coloring problem.
As the problem is Karp-reducible to 3-SAT, we can use many modern SAT solvers and efficient boolean SAT solvers to solve 3-coloring.
But many exciting graphs with high connectivity negate this approach inefficient, taking hours to solve.
Another approach is to use efficient heuristic methods that might not be 100% correct.
A caveat in using heuristic approaches is that they also break down when faced with massive graphs.
So, currently, which is the best approach to solve this problem?
Our project aims to address this question.

The test suite we used for this project deserves a separate discussion.
We used Texas A&M's SparseSuite Matrices database.
We converted approximately 1600 sparse matrices into appropriate adjacency matrices.
These matrices are converted to graphs and, ultimately, boolean SAT formulas.
As the matrices are sparse, the number of edges is minimal, and my local machine will be able to handle the load better compared to massive dense graphs.

We used boolean SAT solvers such as PySAT and Z3 to find the efficient SAT solver that can solve the graph 3-coloring problem.
We found that PySAT's Glucose4 is far better than Z3 in solving boolean SAT problems.
Moreover, we saw over a 90% decrease in average solving time when using PySAT.
But a significant portion of the matrices remains unsolved, taking more than 45 minutes to be solved.
We then proceeded to use the eigenvector partition-based heuristic approach for coloring.
A significant limitation of this approach is that it only works on block-regular matrices.
We found roughly 800 block regular matrices and used them to calculate the approximate graph coloring.
In many instances, the heuristic approach failed when Z3 and PySAT were successful.
Overall, we found that the SAT-based approach is still superior to the eigenvector-based partitioning approach, and in general, PySAT's Glucose4 is the ideal candidate to solve graph 3-coloring.

<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.html path="assets/img/Z3_PySAT.png" title="Comparison between Z3 and PySAT" class="img-fluid rounded z-depth-1" %}
    </div>
	<div class="col-sm mt-2 mt-md-0">
        {% include figure.html path="assets/img/Heuristic.png" title="Comparison between SAT and heuristic based approach" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Results of our project which show the average time for all the approaches
</div>

<div class='social'>
<div class="contact-icons">
  Source Code: <a href="{{ page.github }}" title="GitHub"><i class="fab fa-github"></i></a>
  Report: <a href="{{ page.report_pdf | prepend: 'assets/pdf/' | relative_url}}" target="_blank" rel="noopener noreferrer"><i class="fas fa-file-pdf"></i></a>
</div>
</div>
