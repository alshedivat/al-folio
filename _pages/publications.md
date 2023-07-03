---
layout: page
permalink: /publications/
title: publications
description:
years:
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->

- Ahmadi, S., Azin, Z., Belelli, S., Anastasopoulos, A. (2023) **“Approaches to Corpus Creation for
Low-Resource Language Technology: the Case of Southern Kurdish and Laki”**. In proceedings of the 17th
Conference of the European Chapter of the Association for Computational Linguistics.

- Azin, Z., Ahmadi, S. (2021) **“Creating an Electronic Lexicon for the Under-resourced Southern Varieties of Kurdish Language”**. Electronic lexicography in the 21st century (eLex) Post-editing lexicography, 83.

- Takhshid, R., Shojaei, R., Azin, Z., Bahrani, M. (Under Review) **“PAMR: Persian Abstract Meaning
Representation”**. Journal of Language Resources and Evaluation.• Azin, Z., Eryi˘git, G. (2019) “Towards Turkish Abstract Meaning Representation”. In proceedings of the
57th Conference of the Association for Computational Linguistics: Student Research Workshop (pp. 43-47).

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f {{ site.scholar.bibliography }} -q @*[year={{y}}]* %}
{% endfor %}

- Azin, Z., Bahrani, M., Sadeghi, S., Kowsari, Z. (2019) **“Automatic Blank Verse Poet Identification:
Semantic Features in Focus”**. In proceedings of the 2nd National Conference on Applied Research in
Computational Linguistics, Shiraz, Iran (pp. 321-331)
