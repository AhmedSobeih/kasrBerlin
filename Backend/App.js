
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
var session = require('express-session');

const searchedFlights = [];
var multer = require('multer');
var upload = multer();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array()); 


/* Initializing the main project folder */
app.use(express.static('public'));
app.use(session({
    secret:'sobeih$$zakaria$$engy$$',
    resave:false,
    saveUninitialized:false}));

var searchResult = [];

//MS2
var departureFlight = null;
var returnFlight = null;

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

//returns the username of the session
app.get("/session",async(req,res)=>{
  res.send(session.username);
});

//MS2
app.get("/departureFlight", async(req,res)=>{
  res.send(departureFlight);
});

app.post("/departureFlight",async(req,res)=>{
  departureFlight=req.body;
  const user = await Users.find({username : session.username});
  console.log("hii");
  console.log(departureFlight);
  console.log(user[0]);
  console.log("finish");
  var flightsAlreadyReserved=[];
  flightsAlreadyReserved=user[0].flightsReserved;
  flightsAlreadyReserved.push(departureFlight.FlightNumber);
  Users.findOneAndUpdate({username:session.username},{flightsReserved:flightsAlreadyReserved},{}).then((user)=>{
    console.log("hii");
  console.log(user[0]);
  res.send(true);}
  ).catch((err) =>  res.send(false))


/*Flight.findOneAndUpdate(filter, req.body, {
        new: true,
      })
      .then((flight)=>{
        console.log("updated");
        res.send(true);//if successful, render the flight again with the new values
    }).catch((err) =>  res.send(false)) */

  });
 

  
  /*
      if(user.length==0)
      {
          res.send(result);
      }
      else
      {
        user[0].flightsReserved=departureFlight.FlightNumber;
        console.log("ohhh");
        console.log(user[0]);
      }
      */
      //we need to create a session


app.get("/returnFlight", async(req,res)=>{
  res.send(returnFlight);
});

app.post("/returnFlight",async(req,res)=>{
  returnFlight=req.body;
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



app.get('/flight', (req,res)=>{
  res.render(path.join(__dirname + '../'+ '/src/flight.js'));
})


app.get('/flight/:number', async (req,res)=>{
  const u = await Flight.find({FlightNumber : req.params.number});

  res.send(u[0]);
    
});

app.get('/reservation/:username', async (req,res)=>{
  console.log(req.params);
  const u = await Users.find({username : req.params.username});
  const flights = u[0].flightsReserved;
  const result = [];
  for (var i = 0; i < flights.length; i++) {
    var flight = await Flight.find({FlightNumber : flights[i]});
    result.push(flight);
}
  console.log(result)

  res.send(result);
    
});

//to get the username
app.get('/user/:username', async (req,res)=>{
  const u = await Users.find({username : req.params.username});

  res.send(u[0]);
    
});

app.get('/allFlights', async(req, res)=> {
 
  const u = await Flight.find();
  res.send(u);
 
});


app.get('/allUsers', async(req, res)=> {
 
  const u = await Users.find();
  res.send(u);
 
});


app.get('/searchResults', async(req, res)=> {
 
  res.send(searchResult);
 
});


app.post('/login',(req,res) =>{
  console.log(req.body.username);
  var result = { state: false, type : 1 };
  Users.find({username:req.body.username, password:req.body.password})
  .then((user)=>{


      // console.log(user);
      if(user.length==0)
      {
          res.send(result);
      }
      else
      {
        session.username=req.body.username;
        loggedIn = user[0].type;
        result.status = true;
        result.type = loggedIn;
        
        res.send(result);
        console.log(result);
      }
      //we need to create a session
  }).catch((err) => res.json({ error: err, username:req.body.username, password:req.body.password }));//if an error happened while accessing db, return string error
})

// for creating a new user (not completed yet)
app.post('/register',async(req,res) =>{
  console.log(req.body);
      const newUser =new Users({
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        homeAddress: req.body.homeAddress,
        telephoneNumbers: req.body.telephoneNumbers,
        email: req.body.email ,
        passportNumber: req.body.passportNumber,
        username: req.body.username,
        password: req.body.password,
        type : 1,
        flightsReserved : []
      })
      try{
        await newUser.save(newUser);
        res.send(true);
      }
      catch(err)
      {
        console.log(err);
      }
    });





app.post("/searchFlight",(req,res)=>{

  console.log(req.body);
    
  Object.keys(req.body).forEach(key => {
    if (req.body[key]== '') {

      delete req.body[key];
    }
    else{
        if(key == 'FlightNumber' || key == 'EconomySeats' || key == 'BusinessSeats' )
          req.body[key]= parseInt(req.body[key]);
        if(key == 'DepatureDate' || key == 'ArrivalDate' )
          req.body[key] = dateConversionToMongose(req.body[key]);
      }
    })
    
  if(req.body == {})
  {
    res.send(false);
  } 

  console.log(req.body);

  
  const s = { FlightNumber: 10 };
  
  // console.log(req.body);  
  Flight.find(req.body).then((result)=>{
    console.log(result);
    searchResult=result;
    res.send(result);
}).catch((err) =>  console.log('EEEEEEEEEEEEEEEEEEEE'))
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
        ArrivalAirport: req.body.arrivalAirport,
        FreeEconomySeatsNum: req.body.economySeats,
        FreeBusinessSeatsNum: req.body.businessSeats,
        EconomySeatPrice: req.body.economySeatPrice,
        BusinessSeatPrice: req.body.businessSeatPrice,
        IsEconomySeatBusy: Array.from({ length:req.body.economySeats/4 }, () => (
          Array.from({ length:4 }, ()=> false))),
        IsBusinessSeatBusy: Array.from({ length:req.body.businessSeats/4 }, () => (
          Array.from({ length:4 }, ()=> false)))
      });
      try{
        await newFlight.save(newFlight);
        console.log(newFlight);
        res.send(true);
      }
      catch(err)
      {
        console.log(err);
      }
    });

    app.put('/flight/:FlightNumber', (req,res)=>{
      const flightNumber = req.params;
      const filter = req.params;
      console.log(filter);
      console.log(req.body);
      Object.keys(req.body).forEach(key => {
          if(key == 'FlightNumber' || key == 'EconomySeats' || key == 'BusinessSeats' )
            req.body[key]= parseInt(req.body[key]);
          if(key == 'DepatureDate' || key == 'ArrivalDate' )
            req.body[key] = dateConversionToMongose(req.body[key]);
        }
        
      );
      console.log(req.body);
      console.log(filter);
      Flight.findOneAndUpdate(filter, req.body, {
        new: true,
      })
      .then((flight)=>{
        console.log("updated");
        res.send(true);//if successful, render the flight again with the new values
    }).catch((err) =>  res.send(false))
        
    });

    app.put('/user/:username', (req,res)=>{
      
      const username = req.params;
      const filter = req.params;
      console.log(filter);
      console.log(req.body);
      Users.findOneAndUpdate(filter, req.body, {
        new: true,
      })
      .then((user)=>{
        console.log("updated");
        res.send(true);//if successful, render the flight again with the new values
    }).catch((err) =>  res.send(false))
        
    });

    function dateConversionToMongose(date){
      let newDate = "";
      newDate = date+":00.000Z"; 
      // 2001-02-10T22:25
      //2000-10-10T15:02:00.000Z
      return newDate;
    }

    app.delete('/flight/:number', (req,res)=>{
      const flightNumber = req.params;
      console.log(flightNumber);
      const filter = {flightNumber: flightNumber};
      console.log(filter);
      Flight.findOneAndRemove(filter)
      .then((flight)=>{
        res.send('deleted');//if successful, redirect to the home page
    }).catch((err) =>  res.send(err))
        
    });




/*
                                                    End of your code
*/

// Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
