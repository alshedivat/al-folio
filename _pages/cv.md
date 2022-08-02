---
# layout: cv
# permalink: /cv/
# title: cv
# nav: false
# nav_order: 4
# cv_pdf: cv.pdf
layout: page
permalink: /cv/
title: cv
nav: true
nav_order: 4
cv_pdf: cv.pdf
---

Can I embed the PDF here?
<iframe src="{{ page.cv_pdf | prepend: 'assets/pdf/' | relative_url}}" width="100%" height="500px">
</iframe>