const form = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

form.addEventListener("submit", e => {
  e.preventDefault();
  messageOne.textContent = "Loading...";
  fetch(`/weather?address=${input.value}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = `Location: ${data.location}`;
        messageTwo.textContent = `Forecast: ${data.forecast}`;
      }
    });
});
