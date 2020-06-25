var el = document.querySelector("input.submit");
document.addEventListener("DOMContentLoaded", function () {
  el.addEventListener("submit", handleSubmit, false);
});

function handleSubmit(e) {
  e.preventDefault();
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
      document.getElementById("your-text").innerHTML = response.text;
      document.getElementById("polarity").innerHTML = response.polarity;
      document.getElementById("polarity_confidence").innerHTML =
        response.polarity_confidence;
      document.getElementById("subjectivity").innerHTML = response.subjectivity;
      document.getElementById("subjectivity_confidence").innerHTML =
        response.subjectivity_confidence;
    });
}

export { handleSubmit };
