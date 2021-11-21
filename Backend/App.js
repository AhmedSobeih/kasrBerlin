
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
const Users = require('./Models/Users');
var multer = require('multer');
var upload = multer();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload.array()); 


/* Initializing the main project folder */
app.use(express.static('public'));


// #Importing the userController



// configurations
// Mongo DB
mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));

/*
                                                    Start of your code
*/
app.get("/newAdmin",async(req,res)=>{
  const admin =new Users({
    firstName:"admin",
    lastName: "admin",
    homeAddress: "20 Staakener Strasse",
    telephoneNumbers:[01144675267],
    email: "admin@guc.edu.eg",
    passportNumber:"A215325",
    username:"Adminstrator",
    password:"Adminstrator"
  });
    await admin.save(admin)
    res.send(admin)
});

app.get("/newFlight",async(req,res)=>{
  const flight =new Flight({
        Number:5,
        flightDate : '2015-05-05',
        DepatureTime: '2015-05-05',
        ArrivalTime: '2015-05-05',
        EconomySeats: 25 ,
        BusinessSeats: 25 ,
        DepatureAirport: "BER",
        ArrivalAirport: "BAR"
  });
    await flight.save(flight)
    res.send(flight)
});


app.get('/', function(req, res) {
  res.render(path.join(__dirname, '../src/index.js'));
});

app.get('/createflight', function(req, res) {
  res.sendFile(path.join(__dirname, '/src/createFlight.html'));
});

app.get("/Home", (req, res) => {
  res.status(200).send("You have everything installed !");
});

app.get('/styles.css', function(req, res) {
  res.sendFile(__dirname , '/css/styles.css');
});

app.get('/AdminHomePage', function(req, res) {
  res.send('adminnnn');
});

app.get('/login', (req,res)=>{
    res.render('/login');
})

app.get('/searchFlight', (req,res)=>{
  res.render('/searchFlight');
})

app.get('/flight', (req,res)=>{
  res.render(path.join(__dirname + '../'+ '/src/flight.js'));
})


app.get('/flight/:number', async (req,res)=>{
  
  const u = await Flight.find({FlightNumber : req.params.number});
  res.send(u);
    
});

app.get('/allFlights', async(req, res)=> {
 
  const u = await Flight.find();
  res.send(u);
 
});

app.get('/allFlights', async(req, res)=> {
 
  const u = await Flight.find();
  res.send(u);
 
});


app.post('/login',(req,res) =>{
  console.log(req.body.username);
  Users.find({username:req.body.username, password:req.body.password})
  .then((user)=>{
      // console.log(user);
      if(user.length==0)
      {
          res.send(false);
      }
      else
      res.send(true);

      //we need to create a session
  }).catch((err) => res.json({ error: err, username:req.body.username, password:req.body.password }));//if an error happened while accessing db, return string error
})





  app.post("/searchFlight",(req,res)=>{
    const searchCriteria = req.body.searchCriteria;
    const searchValue = req.body.searchValue;
    if(searchCriteria == null)
    {
      console.log("allFlights");
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
        FlightNumber:req.body.flightNumber,
        DepatureDate: req.body.depatureDate,
        ArrivalDate: req.body.arrivalDate,
        EconomySeats: req.body.economySeats,
        BusinessSeats: req.body.businessSeats ,
        DepatureAirport: req.body.depatureAirport,
        ArrivalAirport: req.body.arrivalAirport
      });
      try{
        await newFlight.save(newFlight);
        res.send(true);
      }
      catch(err)
      {
        console.log(err);
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
