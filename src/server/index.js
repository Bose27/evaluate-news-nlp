var dotenv = require("dotenv");
dotenv.config();
var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
var aylienApi = require("aylien_textapi");
// set aylien API credentias
var textapi = new aylienApi({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

const app = express();
app.use(express.static("dist"));

// Configuring that express use cors
const cors = require("cors");
app.use(cors());

/** Middleware
 *   "body-parser extract the entire body portion of an incoming request stream and exposes it on req.body."
 *   (Source: https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express)
 **/
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log(__dirname);

// Setting up the GET route (Client takes data from Server)
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  //res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

// Setting up the POST Route (Client sending data to Server)
app.post("/sendText", function (req, res) {
  // https://docs.aylien.com/textapi/sdks/#node-js-sdk
  console.log(req.body.formText);

  textapi.sentiment(
    {
      url: req.body.formText,
    },
    function (error, response) {
      if (error === null) {
        console.log("Success: You got the Aylien results");
        res.send(response);
        console.log(response);
      } else {
        console.log("Error: Aylien request not successful");
        console.log(error);
        return;
      }
    }
  );
});
