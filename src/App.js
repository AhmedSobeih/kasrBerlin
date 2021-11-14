
// External variables
const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
const MongoURI = 'mongodb://Ziad:z@cluster0-shard-00-00.izp8e.mongodb.net:27017,cluster0-shard-00-01.izp8e.mongodb.net:27017,cluster0-shard-00-02.izp8e.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-jkas6k-shard-0&authSource=admin&retryWrites=true&w=majority' ;


//App variables
const app = express();
const port = process.env.PORT || "8000";
const Flight = require('./Models/Flight');
app.use(express.static('public'))
// #Importing the userController


// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

/*
                                                    Start of your code
*/
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/createflight', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/createFlight.html'));
});

app.get("/Home", (req, res) => {
  res.status(200).send("You have everything installed !");
});

app.get('/styles.css', function(req, res) {
  res.sendFile(__dirname , '/css/styles.css');
});



  app.get("/flight",(req,res)=>{
    Flight.find({Number : 55}).exec(function(err,Flight){
      res.send(Flight)
    });
    });
    app.get("/student",async(req,res)=>{
      const newFlight =new Flight({
        Number:55,
        flightDate : "<2001-05-20>",
        DepatureTime:"<2001-05-20>",
        ArrivalTime:"<2001-05-20>",
        EconomySeats:20,
        BusinessSeats:20,
        DepatureAirport:"BER",
        ArrivalAirport:"BAR"
      });
        await newFlight.save(newFlight)
        res.send(newFlight)
    });
// #Routing to usercontroller here




/*
                                                    End of your code
*/

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
