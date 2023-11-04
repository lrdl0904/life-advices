const adviceContainer = document.getElementById("advice-container");
const adviceElement = document.getElementById("advice");
const adviceButton = document.querySelector(".circle");
const adviceNumber = document.getElementById("advice__number");
let counter = 0;

fetchAdvice();

adviceButton.addEventListener("click", function () {
  adviceButton.classList.add("disabled-button");
  fetchAdvice();
  // Set a timeout to re-enable the button after 3 seconds (3000 milliseconds)
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
