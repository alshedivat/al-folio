---
layout: default
permalink: /cv
title: CV
years: [2021, 2020, 2019]
---
# Joshua G. Ortiz Baco
Digital Humanist, Digital Scholarship Librarian.

---
## Currently

`April 2022-current`<br>
__Digital Scholarship Librarian, Assistant Professor__<br>University Libraries, University of Tennessee Knoxville
<br><br>`August 2019-current`<br>
__Digital Repository Manager__<br>Puerto Rico Archivo de Herencia Arquitectónica | Puerto Rico Architectural Heritage Archive
<br><br>`January 2017-August 2019`<br>
__Digital Scholarship Office Graduate Research Assistant__<br>Latin American Digital Initiatives and Digital Scholarship Office, LLILAS Benson, University of Texas at Austin
---
### Research areas

Multilingual DH applied to 19th century Brazilian cultural studies, Cuban and Puerto Rican cultural studies, and the history of race and abolitionism.

---
### Research interests

My research combines cultural studies, digital humanities, and critical analog/digital archival theory<sup>[1]</sup> to remediate non-English historical objects in underresourced and underrepresentated cultural heritage institutions. 

---
### Education

`2016-2022`<br>
__PhD. - Department of Spanish and Portuguese__ <br>University of Texas at Austin

`2013-2016`<br>
__M.A. - Department of Comparative Literature__ <br> Universidad de Puerto Rico, Río Piedras

`2011-2012`<br>
__M.A. - Facultad de Filosofía y Letras__ <br> Universidad Autónoma de Madrid

---
### Awards

`2020-2021` Graduate School Thematic Diversity Dissertation Fellowship, College of Liberal Arts, UT Austin.

`2020-2021` Unearthing Brazilian, Cuban, and Puerto Rican Abolitionism in 19th Century U.S. Press, Grant-in-Aid, Andrew W. Mellon Foundation and U.S. Latino Digital Humanities Program, University of Houston

`2018` Foreign Language Area Studies Summer Fellowship, Rio de Janeiro, Brazil

`2016, 2020` Fath Recruitment Fellowship, Department of Spanish and Portuguese, UT Austin.

---
## Publications
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>

[1]: https://doi.org/10.1093/ahr/rhab359
