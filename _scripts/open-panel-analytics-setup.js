---
permalink: /assets/js/open-panel-analytics-setup.js
---
window.op =
  window.op ||
  function (...args) {
    (window.op.q = window.op.q || []).push(args);
  };
window.op("init", {
  clientId: "{{ site.openpanel_analytics }}",
  trackScreenViews: true,
  trackOutgoingLinks: true,
  trackAttributes: true,
});
