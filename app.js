const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {

  res.sendFile(__dirname + '/index.html');

});

app.post("/", function(req, res) {
  console.log(req.body);
  const city = req.body.city;

  const url = "https://api.openweathermap.org/data/3.0/onecall?lat=53.623470&lon=-99.771335&appid=72ec59e998085f058d95170c3785eb11&units=metric";

  https.get(url, function(response) {

    response.on("data", function(data) {

      var weather = JSON.parse(data);
      var weatherDescription = weather.weather[0].description;
      var icon = weather.weather[0].icon;
      res.write('<h1>The current weather in ' + weather.name + ' is ' + Math.round(weather.main.temp) + 'C and ' + weatherDescription + '.</h1>');
      res.write('<p><img src="http://openweathermap.org/img/wn/' + icon + '@2x.png"></p>')
      res.send()

    });
  });
});


app.listen(3000, () => console.log("Server running on port 3000"));
