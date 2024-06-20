$(document).ready(() => {
  // actual bibsearch logic
  function filterItems(searchTerm) {
    $(".bibliography > .unloaded").removeClass("unloaded");
    // Add unloaded class to all non-matching items
    $(".bibliography > li")
      .filter((index, element) => {
        // we simply search in the text representation of the bibtex entry
        let text = $(element).text().toLowerCase();
        return text.indexOf(searchTerm) == -1;
      })
      .addClass("unloaded");
    // add unladed class to year if no item left in this year
    $("h2.bibliography")
      .filter(function () {
        let $this = $(this);
        let $nextSibling = $this.next("ol.bibliography");

        // Check if all <li> items within the <ol> have the '.unloaded' class
        return $nextSibling.find("li.unloaded").length === $nextSibling.find("li").length;
      })
      .addClass("unloaded"); // Add the '.unloaded' class to the filtered elements
  }

  function updateInputField() {
    let hashValue = decodeURIComponent(window.location.hash.substring(1)); // Remove the '#' character
    $("#bibsearch").val(hashValue);
    filterItems(hashValue);
  }

  // sensitive search. only start searching if there's been no input for 300 ms
  let timeoutId;
  $("#bibsearch").on("keyup", () => {
    clearTimeout(timeoutId); // Clear the previous timeout
    let searchTerm = $("#bibsearch").val().toLowerCase();
    timeoutId = setTimeout(filterItems(searchTerm), 300);
  });

  $(window).on("hashchange", updateInputField); // Update the filter when the hash changes

  updateInputField(); // Update filter when page loads
});
