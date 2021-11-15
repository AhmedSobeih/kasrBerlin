
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
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
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

app.get('/login', (req,res)=>{
    res.render('/login');
})

app.get('/searchFlight', (req,res)=>{
  res.render('/searchFlight');
})
app.get('/flight/:number', (req,res)=>{
      
  Flight.find({Number : req.params.number})
  .then((flights)=>{
    res.render('result', {searchResult: flights});
}).catch((err) =>  res.render('result', null))
    
});

app.get('/allFlights', (req,res)=>{
  Flight.find({})
  .then((flights)=>{
    res.render('result', {searchResult: flights});
}).catch((err) =>  res.render('result', null))
    
});


app.post('login',(req,res) =>{
  Users.find({username:req.body.username, password:req.body.password})
  .then((user)=>{
      if(user==null)
      {
          //if user not found in database render the same login page with usertype null
          res.render('/', {userType: null})
          return;
      }
      //we need to create a session
      res.render('AdminHomePage', {userType: 'Admin', name: user.name});
  }).catch((err) => res.render('/', {userType: 'error'}));//if an error happened while accessing db, return string error
})





  app.post("/searchFlight",(req,res)=>{
    const searchCriteria = req.body.searchCriteria;
    const searchValue = req.body.searchValue;
    if(searchCriteria == null)
    {
      res.redirect('allFlights');
    }  
    Flight.find({searchCriteria : searchValue})
    .then((flights)=>{
      res.render('result', {searchResult: flights});
  }).catch((err) =>  res.render('result', null))
    });

    //For creating a flight
    app.post("/flight",async(req,res)=>{
      const newFlight =new Flight({
        Number:req.body.number,
        flightDate : req.body.date,
        DepatureTime: req.body.depatureTime,
        ArrivalTime: req.body.arrivalTime,
        EconomySeats: req.body.economySeats,
        BusinessSeats: req.body.businessSeats ,
        DepatureAirport: req.body.depatureAirport,
        ArrivalAirport: req.body.arrivalAirport
      });
      try{
        await newFlight.save(newFlight);
        res.redirect(`/flight/${newFlight.Number}`);
      }
      catch(err)
      {
        console.log(err);//error must be sent to user
      }
    });

    app.put('/flight/:number', (req,res)=>{
      const flightNumber = req.body.params;
      const filter = {Number: flightNumber};
      const criteria = req.body.criteria;
      const value = req.body.value; 
      const update = {criteria : value};
      Flight.findOneAndUpdate(filter, update, {
        new: true,
      })
      .then((flight)=>{
        res.redirect(`/flight/${flightNumber}`);//if successful, render the flight again with the new values
    }).catch((err) =>  res.send(err))
        
    });

    app.delete('/flight/:number', (req,res)=>{
      const flightNumber = req.body.params;
      const filter = {Number: flightNumber};
    
      Flight.findOneAndRemove(filter)
      .then((flight)=>{
        res.redirect('/AdminHomePage');//if successful, redirect to the home page
    }).catch((err) =>  res.send(err))
        
    });
// #Routing to usercontroller here


/*
                                                    End of your code
*/

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
