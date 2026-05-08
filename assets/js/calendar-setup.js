// Toggle calendar visibility
function toggleCalendar() {
  const el = document.getElementById("calendar-container");
  const btn = document.getElementById("calendar-toggle-btn");
  const isHidden = el.style.display === "none";
  el.style.display = isHidden ? "block" : "none";
  btn.innerText = isHidden ? "Hide Calendar" : "Show Calendar";

  // Update calendar URL when toggling to ensure correct theme
  if (isHidden) {
    updateCalendarUrl();
  }
}

// Initialize calendar on page load
document.addEventListener("DOMContentLoaded", updateCalendarUrl);
