let currentStep = 1;

    document.addEventListener("DOMContentLoaded", function () {
      // Call showDescription with currentStep set to 1 when the page loads
      showDescription(currentStep);
    });

    function showDescription(stepNumber) {
      // If no step number is provided, default to step 1
      if (!stepNumber) {
        stepNumber = 1;
      }

      // Check if the stepNumber is within valid range (1 to 5)
      if (stepNumber < 1 || stepNumber > 6) {
        stepNumber = 1; // Reset to step 1 if the stepNumber is invalid
      }

      const descriptionBox = document.getElementById("description-box");
      const descriptionContent = document.getElementById("description-content");

      // Hide all descriptions
      const descriptionDivs = descriptionContent.getElementsByTagName("div");
      for (let i = 0; i < descriptionDivs.length; i++) {
        descriptionDivs[i].style.display = "none";
      }

      // Show the description for the selected step
      const stepDescription = document.getElementById(`step-${stepNumber}-description`);
      stepDescription.style.display = "block";

      // Update the current step
      currentStep = stepNumber;

      // Enable or disable navigation buttons based on the current step
      const previousButton = document.getElementById("previous-button");
      const nextButton = document.getElementById("next-button");

      previousButton.disabled = currentStep === 1;
      nextButton.disabled = currentStep === 6;

      // Remove active class from all steps
      const steps = document.getElementsByClassName("step");
      for (let i = 0; i < steps.length; i++) {
        steps[i].classList.remove("active");
      }

      // Add active class to the selected step
      const selectedStep = document.getElementById(`step-${currentStep}`);
      selectedStep.classList.add("active");
    }

    function navigate(direction) {
      const newStep = currentStep + direction;
      showDescription(newStep);
    }


function navigateHome() {
  window.location.href = "../index.html"; // Replace "your-home-page-link" with your desired link
}

