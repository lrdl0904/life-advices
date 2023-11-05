const adviceContainer = document.getElementById("advice-container");
const box = document.getElementById("box");
const adviceElement = document.getElementById("advice");
const adviceButton = document.querySelector(".circle");
const adviceNumber = document.getElementById("advice__number");
const img = document.getElementById("divider");
let counter = 0;

// window.innerWidth <= 560
//   ? (img.src = "images/pattern-divider-mobile.svg")
//   : (img.src = "images/pattern-divider-desktop.svg");
fetchAdvice();
// Add an event listener to the window's resize event
window.addEventListener("resize", function () {
  window.innerWidth <= 560
    ? (img.src = "images/pattern-divider-mobile.svg")
    : (img.src = "images/pattern-divider-desktop.svg");
});

adviceButton.addEventListener("click", function () {
  adviceButton.classList.add("disabled-button");
  fetchAdvice();
  //this updates the height of box
  updateBoxHeight();

  // Set a timeout to re-enable the button after 2 seconds (2000 milliseconds)
  setTimeout(() => {
    adviceButton.classList.remove("disabled-button");
  }, 2000);
});

function fetchAdvice() {
  // Define the API URL
  const apiUrl = "https://api.adviceslip.com/advice";

  // Show the "Loading advice..." message
  adviceContainer.textContent = "Loading advice...";

  // Use the fetch API to make a GET request to the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.slip && data.slip.advice) {
        const advice = data.slip.advice;
        adviceContainer.textContent = '"' + advice + '"';
      } else {
        adviceContainer.textContent = "Failed to fetch advice.";
      }
      counter++;
      adviceNumber.textContent = `ADVICE #${counter}`;
    })
    .catch((error) => {
      console.error("Error:", error);
      adviceContainer.textContent = "Failed to fetch advice: " + error.message;
    });
}

function updateBoxHeight() {
  const adviceHeight = adviceContainer.offsetHeight;

  const minHeight = 200; // Minimum height

  // Set the box height to the maximum of the advice content height and the minimum height
  box.style.minHeight = `${Math.max(adviceHeight, minHeight)}px`;
}
