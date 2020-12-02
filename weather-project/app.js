const express = require("express")
const app = express()
const https = require("https")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', function(req,res) {
  const query = req.body.zipCode
  const apiKey = 'd84b4e08cbb37df567c39baf7f598140'
  const units = "imperial"
  const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + query + "&appid=" + apiKey + "&units=" + units
  https.get(url, function(response) {
    console.log(response.statusCode)
    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      console.log(weatherData)
      const weatherIcon = weatherData.weather[0].icon
      res.write("<h1>The temp in " + weatherData.name + " is: " +weatherData.main.temp + " degrees Fahrenheit. <br>")
      res.write("Description: " + weatherData.weather[0].description + "</h1>")
      res.write("<img src=http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png>")
      res.send()
    })
  })
})







app.listen(3000, function() {
  console.log("running on port 3000, Ctrl+C to stop")
})
