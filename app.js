const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){ //this was original befor app.post was created

res.sendFile(__dirname+"/index.html")

});

app.post("/", function(req,res){

const query = req.body.cityName;
const apiKey = "38486f15eab054743c8c286bd783ad1c";
const unit = "metric"

const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

https.get(url, function(response) {

  console.log(response.statusCode);

  response.on("data", function(data) {
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png"
    res.write("<p>The Weather is currently " + weatherDescription + "<p>");
    res.write("<h1>The temprature in "+query+" is:" + temp + "Degree celcius.</h1>");
    res.write("<img src=" + imageURL + ">")
    res.send();

  });

});
})


app.listen(3000, function(){

  console.log("Server is running on port 3000");

});
