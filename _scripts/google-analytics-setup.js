---
permalink: /assets/js/google-analytics-setup.js
---
window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "{{ site.google_analytics }}");
