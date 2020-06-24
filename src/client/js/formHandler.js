const dotenv = require("dotenv");
dotenv.config();

let baseURL = "https://api.aylien.com/api/v1/sentiment";

var aylien = require("aylien_textapi");
// set aylien API credentias
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

var el = document.querySelector("input.submit");
document.addEventListener("DOMContentLoaded", function () {
  el.addEventListener("submit", handleSubmit, false);
});

function handleSubmit(e) {
  // check what text was put into the form field
  let formText = document.querySelector("#text").value;
  console.log(formText);

  fetch("http://localhost:8081/sendText", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formText }), // body data type must match "Content-Type" header
  })
    // Sends a JSON response composed of the specified data
    .then((res) => res.json())
    .then(function (response) {
      console.log("Aylien results listed below");
      console.log(response);
      // Adding results into HTML
      document.querySelector("#results").innerHTML = response.polarity;
    });
}

export { handleSubmit };
