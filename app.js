const { log, error } = require("console");
const express = require("express");
const https=require("https");
const app = express();
const bodyParser = require("body-parser");
const { errorMonitor } = require("events");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'))

app.listen(3000,function (){
    console.log("Server started on port 3000");
})

app.get ("/",function(req,res){
    res.sendFile(__dirname+"/index.html")

})

app.post("/", function (req, res) {
    try {
      const query = req.body.cityName;
      const apiKey = "";//add your open weather key here
      const unit = "metric";
      const url =
        "https://api.openweathermap.org/data/2.5/weather?appid=" +
        apiKey +
        "&q=" +
        query +
        "&units=" +
        unit;
  
      https.get(url, function (response) {
        let responseData = "";
  
        response.on("data", function (data) {
          responseData += data;
        });
  
        response.on("end", function () {
          try {
            const weatherData = JSON.parse(responseData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const image =
              "https://openweathermap.org/img/wn/" + icon + "@4x.png";
  
            const reponeData = {
              cityName: query,
              temp: temp,
              weatherDescrption: weatherDescription,
              image: image,
            };
  
            res.json(reponeData);
          } catch (error) {
            // console.error("Error parsing weather data:", error);
            // res.status(500).json({ error: "Error parsing weather data" });
            res.send("undefined")
          }
        });
      });
    } catch (error) {
      console.error("Error retrieving weather data:", error);
      res.status(500).json({ error: "Error retrieving weather data" });
    }
  });
  



