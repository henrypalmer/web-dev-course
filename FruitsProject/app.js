const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/fruitsDb", {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected")
});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please ensure a name was entered"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
})
const Fruit = mongoose.model("Fruit", fruitSchema)

const apple = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Highly recommend for mornings"
})
const kiwi = new Fruit({
    name: "kiwi",
    rating: 10,
    review: "Awesome"
})
const banana = new Fruit({
    name: "banana",
    rating: 10,
    review: "Great for smoothies"
})

// Fruit.insertMany([apple, banana, kiwi], function(err) {
//     if (err) {
//     console.log(err)
//     } else {
//         console.log("all saved")
//     }
// })


const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number
})

const Person = mongoose.model("Person", peopleSchema)

const henry = new Person({
    name: "Henry Palmer",
    age: 22
})

// henry.save()




Fruit.find(function(err, res) {
    if (err) {
        console.log(err)
    } else {
        res.forEach(function(fruit) {
            console.log(fruit.name)
        })
    }
    db.close(function() {
        console.log("Closed")
    });
})

Fruit.updateOne({name: "Kiwi"},{rating: 10})