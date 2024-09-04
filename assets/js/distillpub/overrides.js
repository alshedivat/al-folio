<<<<<<< HEAD
$(document).ready(function(){document.querySelectorAll("d-footnote").forEach(function(o){o.shadowRoot.querySelector("sup > span").setAttribute("style","color: var(--global-theme-color);"),o.shadowRoot.querySelector("d-hover-box").shadowRoot.querySelector("style").sheet.insertRule(".panel {background-color: var(--global-bg-color) !important;}"),o.shadowRoot.querySelector("d-hover-box").shadowRoot.querySelector("style").sheet.insertRule(".panel {border-color: var(--global-divider-color) !important;}")}),document.querySelectorAll("d-cite").forEach(function(o){o.shadowRoot.querySelector("div > span").setAttribute("style","color: var(--global-theme-color);"),o.shadowRoot.querySelector("style").sheet.insertRule("ul li a {color: var(--global-text-color) !important; text-decoration: none;}"),o.shadowRoot.querySelector("style").sheet.insertRule("ul li a:hover {color: var(--global-theme-color) !important;}"),o.shadowRoot.querySelector("d-hover-box").shadowRoot.querySelector("style").sheet.insertRule(".panel {background-color: var(--global-bg-color) !important;}"),o.shadowRoot.querySelector("d-hover-box").shadowRoot.querySelector("style").sheet.insertRule(".panel {border-color: var(--global-divider-color) !important;}")})});
=======
$(document).ready(function () {
  // Override styles of the footnotes.
  document.querySelectorAll("d-footnote").forEach(function (footnote) {
    footnote.shadowRoot.querySelector("sup > span").setAttribute("style", "color: var(--global-theme-color);");
    footnote.shadowRoot
      .querySelector("d-hover-box")
      .shadowRoot.querySelector("style")
      .sheet.insertRule(".panel {background-color: var(--global-bg-color) !important;}");
    footnote.shadowRoot
      .querySelector("d-hover-box")
      .shadowRoot.querySelector("style")
      .sheet.insertRule(".panel {border-color: var(--global-divider-color) !important;}");
  });
  // Override styles of the citations.
  document.querySelectorAll("d-cite").forEach(function (cite) {
    cite.shadowRoot.querySelector("div > span").setAttribute("style", "color: var(--global-theme-color);");
    cite.shadowRoot.querySelector("style").sheet.insertRule("ul li a {color: var(--global-text-color) !important; text-decoration: none;}");
    cite.shadowRoot.querySelector("style").sheet.insertRule("ul li a:hover {color: var(--global-theme-color) !important;}");
    cite.shadowRoot
      .querySelector("d-hover-box")
      .shadowRoot.querySelector("style")
      .sheet.insertRule(".panel {background-color: var(--global-bg-color) !important;}");
    cite.shadowRoot
      .querySelector("d-hover-box")
      .shadowRoot.querySelector("style")
      .sheet.insertRule(".panel {border-color: var(--global-divider-color) !important;}");
  });
});
>>>>>>> master
