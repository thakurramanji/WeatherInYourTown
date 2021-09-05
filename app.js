const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

 const query = req.body.cityName;
 const apiKey = "5e90592bd78559cebd5e10b72213a1c6"
 const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey +"&units=metric";
 https.get(url, function(response) {
   console.log(response.statusCode);

   response.on("data", function(data) {
     const weatherData = JSON.parse(data);
     const temp = weatherData.main.temp;
     const description = weatherData.weather[0].description;
     const icons = weatherData.weather[0].icon;
     const imgUrl = " http://openweathermap.org/img/wn/" + icons + "@2x.png"

     res.write("<p>The Weather is currently " + description + " </p>");
     res.write("<h1>The temperature in "+ query +" is " + temp + " degree Celcius.</h1>");
     res.write("<img src=" + imgUrl + ">")
     res.send();
   })
 });

});



app.listen(3000, function() {
  console.log("Server is running on port 3000 !");
})
