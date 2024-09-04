<<<<<<< HEAD
import{highlightSearchTerm}from"./highlight-search-term.js";document.addEventListener("DOMContentLoaded",function(){const e=e=>{if(document.querySelectorAll(".bibliography, .unloaded").forEach(e=>e.classList.remove("unloaded")),CSS.highlights){const t=highlightSearchTerm({search:e,selector:".bibliography > li"});if(null==t)return;t.forEach(e=>{e.classList.add("unloaded")})}else document.querySelectorAll(".bibliography > li").forEach(t=>{-1==t.innerText.toLowerCase().indexOf(e)&&t.classList.add("unloaded")});document.querySelectorAll("h2.bibliography").forEach(function(e){let t=e.nextElementSibling,l=!0;for(;t&&"H2"!==t.tagName;){if("OL"===t.tagName){const e=t,n=e.querySelectorAll(":scope > li.unloaded"),o=e.querySelectorAll(":scope > li");n.length===o.length?(e.previousElementSibling.classList.add("unloaded"),e.classList.add("unloaded")):l=!1}t=t.nextElementSibling}l&&e.classList.add("unloaded")})},t=()=>{const t=decodeURIComponent(window.location.hash.substring(1));document.getElementById("bibsearch").value=t,e(t)};let l;document.getElementById("bibsearch").addEventListener("input",function(){clearTimeout(l);const t=this.value.toLowerCase();l=setTimeout(e(t),300)}),window.addEventListener("hashchange",t),t()});
=======
import { highlightSearchTerm } from "./highlight-search-term.js";

document.addEventListener("DOMContentLoaded", function () {
  // actual bibsearch logic
  const filterItems = (searchTerm) => {
    document.querySelectorAll(".bibliography, .unloaded").forEach((element) => element.classList.remove("unloaded"));

    // highlight-search-term
    if (CSS.highlights) {
      const nonMatchingElements = highlightSearchTerm({ search: searchTerm, selector: ".bibliography > li" });
      if (nonMatchingElements == null) {
        return;
      }
      nonMatchingElements.forEach((element) => {
        element.classList.add("unloaded");
      });
    } else {
      // Simply add unloaded class to all non-matching items if Browser does not support CSS highlights
      document.querySelectorAll(".bibliography > li").forEach((element, index) => {
        const text = element.innerText.toLowerCase();
        if (text.indexOf(searchTerm) == -1) {
          element.classList.add("unloaded");
        }
      });
    }

    document.querySelectorAll("h2.bibliography").forEach(function (element) {
      let iterator = element.nextElementSibling; // get next sibling element after h2, which can be h3 or ol
      let hideFirstGroupingElement = true;
      // iterate until next group element (h2), which is already selected by the querySelectorAll(-).forEach(-)
      while (iterator && iterator.tagName !== "H2") {
        if (iterator.tagName === "OL") {
          const ol = iterator;
          const unloadedSiblings = ol.querySelectorAll(":scope > li.unloaded");
          const totalSiblings = ol.querySelectorAll(":scope > li");

          if (unloadedSiblings.length === totalSiblings.length) {
            ol.previousElementSibling.classList.add("unloaded"); // Add the '.unloaded' class to the previous grouping element (e.g. year)
            ol.classList.add("unloaded"); // Add the '.unloaded' class to the OL itself
          } else {
            hideFirstGroupingElement = false; // there is at least some visible entry, don't hide the first grouping element
          }
        }
        iterator = iterator.nextElementSibling;
      }
      // Add unloaded class to first grouping element (e.g. year) if no item left in this group
      if (hideFirstGroupingElement) {
        element.classList.add("unloaded");
      }
    });
  };

  const updateInputField = () => {
    const hashValue = decodeURIComponent(window.location.hash.substring(1)); // Remove the '#' character
    document.getElementById("bibsearch").value = hashValue;
    filterItems(hashValue);
  };

  // Sensitive search. Only start searching if there's been no input for 300 ms
  let timeoutId;
  document.getElementById("bibsearch").addEventListener("input", function () {
    clearTimeout(timeoutId); // Clear the previous timeout
    const searchTerm = this.value.toLowerCase();
    timeoutId = setTimeout(filterItems(searchTerm), 300);
  });

  window.addEventListener("hashchange", updateInputField); // Update the filter when the hash changes

  updateInputField(); // Update filter when page loads
});
>>>>>>> master
