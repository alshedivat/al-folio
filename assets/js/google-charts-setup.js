/* Create google charts chart as another node and hide the code block, appending the google charts node after it */
document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {
    google.charts.load('current');
    google.charts.setOnLoadCallback(drawCharts);

    function drawCharts() {
      document.querySelectorAll("pre>code.language-google_charts").forEach((elem, index) => {
        let jsonData = elem.textContent;
        const backup = elem.parentElement;
        backup.classList.add("unloaded");
        /* create google charts node */
        let chartElement = document.createElement("div");
        chartElement.classList.add("google-charts");
        chartElement.setAttribute("id", "google-charts-" + index);
        // add containerId to jsonData, replace if it exists
        if (jsonData.includes('"containerId":')) {
          jsonData = jsonData.replace(/"containerId":\s*".*?"/, '"containerId": "google-charts-' + index + '"');
        }
        else {
          jsonData = jsonData.replace(/(\{)/, '$1"containerId": "google-charts-' + index + '",');
        }
        backup.after(chartElement);

        /* create google charts */
        var chart = new google.visualization.ChartWrapper(jsonData);
        chart.draw();
      });
    }
  }
});
