const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html')
})



app.listen('3000', function() {
    console.log("server is running on port 3000")
})