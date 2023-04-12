//https://stackoverflow.com/questions/5823722/how-to-serve-an-image-using-nodejs
const { MongoClient } = require("mongodb");

var path = require('path');
var express = require('express');
var app = express();
const uri = "mongodb://127.0.0.1:27017";

var options = {
    index: "myWebPage.html"
};

var dir = path.join(__dirname, '../frontend');

// Database stuff
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
    try {
        //Write databse Insert/Update/Query code here..
        var dbo = client.db("mydb");
        var myobj = { quoteName: n, salary: s, days: d }; //******CHECK!!!****
        await dbo.collection("quotes").insertOne(myobj, function (err, res) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log("1 quote inserted");
        });
        console.log('End the database stuff');

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);




app.get('/api', function (req, res) {
    res.send("Yes we have an API now")
});

// e.g. test using:
//http://127.0.0.1:8000/api/getPrice?salary=2000&days=20
app.get('/api/getPrice', function (req, res) {
    //res.send("Hello world!")
    // Copied from front end
    var s = req.query.salary;
    var d = req.query.days;
    console.log("Calculating price")
    console.log(s)
    console.log(d)
    let finalPrice = 0;
    dailyRate = s / 365;
    price = Math.round(dailyRate * d);
    var roundToNearest = 50;
    roundedPrice = Math.round((price + roundToNearest) / roundToNearest) * roundToNearest // Always round up
    res.send("" + roundedPrice)
});

app.use(express.static(dir, options));

// 404 page
app.use(function (req, res, next) {
    res.send('This page does not exist!')
});

app.listen(8000, function () {
    console.log('Listening on http://localhost:8000/');
});