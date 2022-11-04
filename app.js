const express = require("express");
const https = require("https");
// const bodyParser = require("body-parser"); *not in use anymore, included in express*
const app = express();
require("dotenv").config();


app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
  const query = req.body.cityName
  const MAPI_KEY = process.env.API_KEY
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + MAPI_KEY+ "&units=" + unit;


  https.get(url, function(response) {
      response.on("data", function(data) {
          const weatherData = JSON.parse(data);
          const temp = weatherData.main.temp;
          const weatherDescription = weatherData.weather[0].description;
          const iconImg = weatherData.weather[0].icon;
          res.write ("<p>The weather is currently " + weatherDescription + "</p>");
          res.write ("<h1>The temperature in "+ query + " is " + temp + " degrees Celsius</h1>");
          res.write("<img src='http://openweathermap.org/img/wn/"+iconImg+"@2x.png'>");
          res.send();
      })
  })
})









app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
