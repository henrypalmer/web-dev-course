//jshint esversion:6
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


// mongoose stuff
const itemSchema = {
  name: String
};

const Item = mongoose.model("Item", itemSchema);
let item1 = new Item({
  name: "Eat"
})
let item2 = new Item({
  name: "Sleep"
})
let item3 = new Item({
  name: "Play Valorant"
})
const defaultItems = [item1, item2, item3]

const listSchema = {
  name: String,
  items: [itemSchema]
}

const TodoList = mongoose.model("TodoList", listSchema);


// end of mongoose stuff



app.get("/", function (req, res) {

  Item.find(function (err, results) {
    if (results.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log("nice")
        }
      })
      res.redirect("/")
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: results
      });
    }
  })
});

app.get("/:customListName", function (req, res) {
  const customListName = req.params.customListName

  TodoList.findOne({
    name: customListName
  }, function (err, results) {
    if (results) {
      res.render("list", {
        listTitle: results.name,
        newListItems: results.items
      })
    } else {
      const newList = new TodoList({
        name: customListName,
        items: defaultItems
      })
      newList.save();
      res.redirect("/" + customListName)

    }
  })

});



app.post("/", function (req, res) {

  const item = req.body.newItem;
  let newItem = Item({
    name: item
  });
  let listTitle = req.body.list;

  if (listTitle != "Today") {
    TodoList.findOne({name: listTitle}, function (err, result) {
      if (!err) {
        result.items.push(newItem);
        result.save();
        res.redirect("/" + listTitle);
      }
    })
  } else {
    newItem.save()
    res.redirect("/")
  }

});


app.post("/delete", function (req, res) {
  let listTitle = req.body.listTitle;
  let id = req.body.checkBox;

  if (listTitle === "Today") {
    Item.deleteOne({_id: id}, function (err) {
      if (err) {
        console.log("Error deleting the list item.");
      } else {
        console.log("Success on deletion.")
      }
    })
    res.redirect("/");
  } else {
    TodoList.findOneAndUpdate({name: listTitle},
      {$pull: {items: {_id: id}}},
      function(err, result) {
        if (!err) {
          res.redirect("/" + listTitle);
        }
    })
  }

})


app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});