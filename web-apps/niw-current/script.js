const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getMonthNum(month) {
  return MONTH_NAMES.indexOf(month) + 1;
}

function parseDate(dateStr, monthLabel) {
  if (dateStr === "C" || !dateStr) {
    const [month, year] = monthLabel.split(" ");
    const monthNum = getMonthNum(month);
    return new Date(`${year}-${String(monthNum).padStart(2, "0")}-01`);
  }
  if (dateStr === "U") return null;
  return new Date(dateStr);
}

function getMonthDate(monthLabel) {
  const [month, year] = monthLabel.split(" ");
  const monthNum = getMonthNum(month);
  return new Date(`${year}-${String(monthNum).padStart(2, "0")}-01`);
}

function formatDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function daysBetween(date1, date2) {
  if (!date1 || !date2) return null;
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.abs(Math.round((date1 - date2) / msPerDay));
}

function daysToYearsMonths(days) {
  if (!days) return "";
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30.44);
  let result = "";
  if (years > 0) result += `${years} year${years > 1 ? "s" : ""}`;
  if (months > 0) {
    if (result) result += ", ";
    result += `${months} month${months > 1 ? "s" : ""}`;
  }
  return result || "0 months";
}

// Linear regression: returns {slope, intercept} where y = slope*x + intercept
function linearRegression(points) {
  const n = points.length;
  if (n < 2) return null;

  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumXX = 0;
  for (const { x, y } of points) {
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

// Predict when a target y-value will be reached
function predictXForY(regression, targetY) {
  if (!regression || regression.slope === 0) return null;
  return (targetY - regression.intercept) / regression.slope;
}

async function processData() {
  try {
    return visaData.sort((a, b) => {
      const getYearMonth = (m) => {
        const [month, year] = m.month.split(" ");
        return [parseInt(year), getMonthNum(month) - 1];
      };
      const [aYear, aMonth] = getYearMonth(a);
      const [bYear, bMonth] = getYearMonth(b);
      return aYear !== bYear ? aYear - bYear : aMonth - bMonth;
    });
  } catch (error) {
    console.error("Error processing data:", error);
    return [];
  }
}

async function createChart() {
  const data = await processData();
  const finalActionDates = data.map((d) => parseDate(d.final_action, d.month));
  const datesForFilingDates = data.map((d) =>
    parseDate(d.dates_for_filing, d.month),
  );
  const monthDates = data.map((d) => getMonthDate(d.month));

  // Build regression data from last 12 months with valid dates
  const regressionPoints = [];
  for (let i = 0; i < data.length; i++) {
    const fa = finalActionDates[i];
    const m = monthDates[i];
    if (fa && m && data[i].final_action !== "C") {
      regressionPoints.push({ x: m.getTime(), y: fa.getTime() });
    }
  }
  // Use last 12 data points for regression
  const recentPoints = regressionPoints.slice(-12);
  const faRegression = linearRegression(recentPoints);

  // Your priority date
  const myPriorityDate = new Date("2025-01-13");

  // Predict when your date becomes current (FA reaches your priority date)
  let predictedCurrentDate = null;
  if (faRegression) {
    const predictedX = predictXForY(faRegression, myPriorityDate.getTime());
    if (predictedX) {
      predictedCurrentDate = new Date(predictedX);
    }
  }

  // Generate projection line (from last data point to predicted date + buffer)
  const projectionData = [];
  if (faRegression && recentPoints.length > 0) {
    const lastMonth = new Date(
      Math.max(...monthDates.map((d) => d?.getTime() || 0)),
    );
    const projectionEnd = new Date("2028-06-30");

    // Add points along the projection
    let current = new Date(lastMonth);
    while (current <= projectionEnd) {
      const predictedY =
        faRegression.slope * current.getTime() + faRegression.intercept;
      projectionData.push({ x: current, y: new Date(predictedY) });
      current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    }
  }

  // Display prediction info
  const predictionDiv = document.getElementById("prediction-info");
  if (predictedCurrentDate && predictionDiv) {
    const currentFA = finalActionDates[finalActionDates.length - 1];
    const daysToGo = currentFA ? daysBetween(myPriorityDate, currentFA) : null;
    const monthsToWait = Math.round(
      (predictedCurrentDate - new Date()) / (30.44 * 24 * 60 * 60 * 1000),
    );
    const slopePerMonth = faRegression.slope * 30.44 * 24 * 60 * 60 * 1000; // days of FA progress per calendar month

    const dateOpts = { month: "short", day: "numeric", year: "numeric" };
    const shortDateOpts = { month: "short", year: "numeric" };

    predictionDiv.textContent = "";
    const lines = [
      {
        label: "Your Priority Date:",
        value: myPriorityDate.toLocaleDateString("en-US", dateOpts),
      },
      ...(currentFA
        ? [
            {
              label: "Current Final Action:",
              value: currentFA.toLocaleDateString("en-US", dateOpts),
            },
            { label: "Gap to close:", value: daysToYearsMonths(daysToGo) },
          ]
        : []),
      {
        label: "Trend:",
        value: `~${Math.round(slopePerMonth)} days FA advance per month`,
      },
    ];
    lines.forEach((line) => {
      const strong = document.createElement("strong");
      strong.textContent = line.label + " ";
      predictionDiv.appendChild(strong);
      predictionDiv.appendChild(document.createTextNode(line.value));
      predictionDiv.appendChild(document.createElement("br"));
    });
    const highlight = document.createElement("span");
    highlight.className = "prediction-highlight";
    highlight.textContent = `Est. Current: ${predictedCurrentDate.toLocaleDateString("en-US", shortDateOpts)} (~${monthsToWait} months)`;
    predictionDiv.appendChild(highlight);
  } else if (predictionDiv) {
    predictionDiv.style.display = "none";
  }

  const ctx = document.getElementById("visaChart").getContext("2d");

  // Light theme colors
  const colors = {
    accent: "#6366f1",
    accentSecondary: "#22c55e",
    accentWarning: "#f59e0b",
    textPrimary: "#111827",
    textSecondary: "#6b7280",
    textTertiary: "#9ca3af",
    gridLine: "rgba(0, 0, 0, 0.08)",
    referenceLine: "rgba(0, 0, 0, 0.15)",
  };

  new Chart(ctx, {
    type: "line",
    data: {
      labels: monthDates,
      datasets: [
        {
          label: "Y = X",
          data: monthDates,
          borderColor: colors.referenceLine,
          backgroundColor: "rgba(0, 0, 0, 0.02)",
          borderWidth: 1,
          pointRadius: 0,
          fill: false,
          order: 1,
        },
        {
          label: "Final Action Date",
          data: finalActionDates,
          borderColor: colors.accentSecondary,
          backgroundColor: "rgba(34, 197, 94, 0.1)",
          tension: 0.4,
          fill: {
            target: 0,
            above: "rgba(34, 197, 94, 0.1)",
            below: "rgba(239, 68, 68, 0.05)",
          },
          pointRadius: 4,
          pointHoverRadius: 8,
          pointBackgroundColor: colors.accentSecondary,
          pointBorderColor: "#000000",
          pointBorderWidth: 2,
          pointStyle: "circle",
          pointHoverBackgroundColor: "#16a34a",
          order: 2,
        },
        {
          label: "Dates for Filing",
          data: datesForFilingDates,
          borderColor: colors.accent,
          backgroundColor: "rgba(99, 102, 241, 0.1)",
          tension: 0.4,
          fill: false,
          pointRadius: 4,
          pointHoverRadius: 8,
          pointBackgroundColor: colors.accent,
          pointBorderColor: "#000000",
          pointBorderWidth: 2,
          pointStyle: "circle",
          pointHoverBackgroundColor: "#4f46e5",
          order: 3,
        },
        {
          label: "FA Projection (Linear)",
          data: projectionData.map((p) => ({ x: p.x, y: p.y })),
          borderColor: "rgba(34, 197, 94, 0.4)",
          borderWidth: 2,
          borderDash: [8, 4],
          pointRadius: 0,
          fill: false,
          order: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: "index",
      },
      plugins: {
        annotation: {
          annotations: {
            priorityDateLine: {
              type: "line",
              yMin: myPriorityDate.getTime(),
              yMax: myPriorityDate.getTime(),
              borderColor: "rgba(0, 0, 0, 0.25)",
              borderWidth: 2,
              borderDash: [6, 6],
              label: {
                display: true,
                content: `Priority: ${myPriorityDate.toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric", year: "numeric" },
                )}`,
                position: "start",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                color: colors.textSecondary,
                font: { weight: "500", family: "Inter" },
                padding: 6,
                borderRadius: 4,
              },
            },
            predictionPoint: predictedCurrentDate
              ? {
                  type: "point",
                  xValue: predictedCurrentDate.getTime(),
                  yValue: myPriorityDate.getTime(),
                  backgroundColor: colors.accentWarning,
                  borderColor: "#ffffff",
                  borderWidth: 2,
                  radius: 8,
                }
              : {},
            predictionLabel: predictedCurrentDate
              ? {
                  type: "label",
                  xValue: predictedCurrentDate.getTime(),
                  yValue: myPriorityDate.getTime(),
                  content: [
                    `Est. Current: ${predictedCurrentDate.toLocaleDateString(
                      "en-US",
                      { month: "short", year: "numeric" },
                    )}`,
                  ],
                  backgroundColor: colors.accentWarning,
                  color: "#ffffff",
                  font: { weight: "600", size: 12, family: "Inter" },
                  padding: 8,
                  yAdjust: -25,
                  borderRadius: 4,
                }
              : {},
          },
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          titleColor: colors.textPrimary,
          bodyColor: colors.textSecondary,
          borderColor: "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12,
          titleFont: { weight: "600", family: "Inter" },
          bodyFont: { family: "Inter" },
          callbacks: {
            label: function (context) {
              const idx = context.dataIndex;
              const faDate = finalActionDates[idx];
              const dfDate = datesForFilingDates[idx];
              const refDate = monthDates[idx];
              const gap = daysBetween(faDate, refDate);
              let label = "";

              if (context.dataset.label === "Final Action Date") {
                label = "Final Action: " + formatDate(faDate);
                if (gap !== null) {
                  label += ` (Gap: ${gap} days`;
                  const ym = daysToYearsMonths(gap);
                  if (ym) label += `, ~${ym}`;
                  label += ")";
                }
              } else if (context.dataset.label === "Dates for Filing") {
                label = "Dates for Filing: " + formatDate(dfDate);
              } else if (context.dataset.label === "Y = X") {
                label = "Reference: " + formatDate(refDate);
              }
              return label;
            },
          },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          type: "time",
          min: new Date("2021-10-01"),
          max: new Date("2028-06-30"),
          time: {
            unit: "month",
            stepSize: 3,
            displayFormats: {
              month: "MMM yyyy",
            },
          },
          grid: {
            display: true,
            color: colors.gridLine,
            lineWidth: 1,
          },
          ticks: {
            color: colors.textTertiary,
            font: { family: "Inter", size: 11 },
          },
          title: {
            display: false,
          },
        },
        y: {
          type: "time",
          min: new Date("2021-10-01"),
          max: new Date("2028-06-30"),
          time: {
            unit: "month",
            stepSize: 3,
            displayFormats: {
              month: "MMM yyyy",
            },
          },
          grid: {
            display: true,
            color: colors.gridLine,
            lineWidth: 1,
          },
          ticks: {
            color: colors.textTertiary,
            font: { family: "Inter", size: 11 },
          },
          title: {
            display: false,
          },
        },
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", createChart);
