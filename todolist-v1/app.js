const express = require('express')
const bodyParser = require('body-parser')
const ejs = require("ejs")
const date = require(__dirname + "/date.js")
const app = express()

app.set('view engine', 'ejs')
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

let items = []
let workItems = []
app.get('/', function(req, res) {
    let day = date.getDate()
    res.render("list", {listTitle: day, newListItems: items})
})

app.post('/', function(req, res) {
  let item = req.body.newItem
  if (req.body.list === 'Work') {
    workItems.push(item)
    res.redirect('/work')
  } else {
  items.push(item)
  res.redirect('/')
  }

})

app.get('/work', function(req,res) {
  res.render("list", {listTitle: "Work", newListItems: workItems})
})

app.post("/work", function(req, res) {
  let item = req.body.newItem
  workItems.push(item)
  res.redirect('/work')
})
const port = 3000 || process.env.PORT
app.listen(port, function() {
    console.log("server running on port: " + port)
})
