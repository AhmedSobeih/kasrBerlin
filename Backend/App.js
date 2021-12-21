
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
const Reservation = require('./Models/Reservation');

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
var userPreferredCriteria=null;
var reservationNumber=1;
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
  if(session.username==undefined)
    res.send(false);
  else
    res.send(session.username);
});

//MS2
app.get("/departureFlight", async(req,res)=>{
  res.send(departureFlight);
});

app.post("/departureFlight",async(req,res)=>{

  departureFlight=req.body;
  res.send(true);
  // const user = await Users.find({username : session.username});
  // console.log("hii");
  // console.log(departureFlight);
  // console.log(user[0]);
  // console.log("finish");
  // var flightsAlreadyReserved=[];
  // flightsAlreadyReserved=user[0].flightsReserved;
  // flightsAlreadyReserved.push(departureFlight.FlightNumber);
  // Users.findOneAndUpdate({username:session.username},{flightsReserved:flightsAlreadyReserved},{}).then((user)=>{
  //   console.log("hii");
  // console.log(user[0]);
  // res.send(true);}
  // ).catch((err) =>  res.send(false))


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

app.get("/reserveFlight", async(req,res)=>{
      console.log("hii");
      if(session.username==undefined)
      {
        res.send(false);
        return;
      }
      reservationNumber++;
      const newReservation =new Reservation({
        ReservationNumber:reservationNumber,
        DepartureFlightNumber:parseInt(departureFlight.FlightNumber),
        ArrivalFlightNumber: parseInt(returnFlight.FlightNumber),
        CabinClass: userPreferredCriteria.CabinClass,
        Price: parseInt(departureFlight.FlightPrice)+parseInt(returnFlight.FlightPrice),
        User: session.username ,
        Seats:[1]
      })
      try{
        await newReservation.save(newReservation);
        res.send(true);
      }
      catch(err)
      {
        console.log(err);
      }
    
    //UPDATE DEPARTURE FLIGHT SEATS NUMBER
    var depFlightNewFreeSeats = 0;
    var filter = {};
    var toBeUpdated = {};
    if(departureFlight.CabinClass=="Economy Class")
    {
      depFlightNewFreeSeats=parseInt(departureFlight.FreeEconomySeatsNum)-(parseInt(userPreferredCriteria.NumberOfAdults) + parseInt(userPreferredCriteria.NumberOfChildren));
      filter = {FlightNumber: departureFlight.FlightNumber};
      toBeUpdated = {FreeEconomySeatsNum: depFlightNewFreeSeats};
      Flight.findOneAndUpdate(filter, toBeUpdated, {
        new: true,
      })
      .then((flight)=>{
        console.log("updated");
    }).catch((err) =>  console.log(err) )
    }  
    else if(departureFlight.CabinClass=="Business Class")
    { 
       depFlightNewFreeSeats=parseInt(departureFlight.FreeBusinessSeatsNum)-(parseInt(userPreferredCriteria.NumberOfAdults) + parseInt(userPreferredCriteria.NumberOfChildren));
       filter = {FlightNumber: departureFlight.FlightNumber};
       toBeUpdated = {FreeBusinessSeatsNum: depFlightNewFreeSeats};
       Flight.findOneAndUpdate(filter, toBeUpdated, {
         new: true,
       })
       .then((flight)=>{
         console.log("updated");
     }).catch((err) =>  console.log(err)  ) 
    }
      else 
    {
       depFlightNewFreeSeats=parseInt(departureFlight.FreeFirstSeatsNum)-(parseInt(userPreferredCriteria.NumberOfAdults) + parseInt(userPreferredCriteria.NumberOfChildren));
       filter = {FlightNumber: departureFlight.FlightNumber};
       toBeUpdated = {FreeFirstSeatsNum: depFlightNewFreeSeats};
       Flight.findOneAndUpdate(filter, toBeUpdated, {
         new: true,
       })
       .then((flight)=>{
         console.log("updated");
     }).catch((err) =>  console.log(err) )
    }

    //UPDATE RETURN FLIGHT SEATS NUMBER
    var returnFlightNewFreeSeats = 0;
    var filter = {};
    var toBeUpdated = {};
    if(returnFlight.CabinClass=="Economy Class")
    {
      returnFlightNewFreeSeats=parseInt(returnFlight.FreeEconomySeatsNum)-(parseInt(userPreferredCriteria.NumberOfAdults) + parseInt(userPreferredCriteria.NumberOfChildren));
      filter = {FlightNumber: returnFlight.FlightNumber};
      toBeUpdated = {FreeEconomySeatsNum: returnFlightNewFreeSeats};
      Flight.findOneAndUpdate(filter, toBeUpdated, {
        new: true,
      })
      .then((flight)=>{
        console.log("updated");
    }).catch((err) =>  console.log(err) )
    }  
    else if(returnFlight.CabinClass=="Business Class")
    { 
       returnFlightNewFreeSeats=parseInt(returnFlight.FreeBusinessSeatsNum)-(parseInt(userPreferredCriteria.NumberOfAdults) + parseInt(userPreferredCriteria.NumberOfChildren));
       filter = {FlightNumber: returnFlight.FlightNumber};
       toBeUpdated = {FreeBusinessSeatsNum: returnFlightNewFreeSeats};
       Flight.findOneAndUpdate(filter, toBeUpdated, {
         new: true,
       })
       .then((flight)=>{
         console.log("updated");
     }).catch((err) =>  console.log(err)  ) 
    }
      else 
    {
       returnFlightNewFreeSeats=parseInt(returnFlight.FreeFirstSeatsNum)-(parseInt(userPreferredCriteria.NumberOfAdults) + parseInt(userPreferredCriteria.NumberOfChildren));
       filter = {FlightNumber: returnFlight.FlightNumber};
       toBeUpdated = {FreeFirstSeatsNum: returnFlightNewFreeSeats};
       Flight.findOneAndUpdate(filter, toBeUpdated, {
         new: true,
       })
       .then((flight)=>{
         console.log("updated");
     }).catch((err) =>  console.log(err) )
    }


});


app.get("/reservedFlight", async(req,res)=>{
  const reservedFlight= await Reservation.find({username : session.username , DepartureFlightNumber:departureFlight.FlightNumber});
  res.send(reservedFlight);
});


app.get("/returnFlight", async(req,res)=>{
  res.send(returnFlight);
});

app.post("/returnFlight",async(req,res)=>{
  returnFlight=req.body;
  res.send(true);
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
  const u = await Reservation.find({User : seesion.username});
  for(let i=0 ; i<u.length;i++)
  {
    const flights = u[i];
    const result = [];
    var departureFlight = await Flight.find({FlightNumber : flights.DepartureFlightNumber});
    var ArrivalFlight = await Flight.find({FlightNumber : flights.ArrivalFlightNumber});
    result[j]= {DepatureFlightFlightNumber: flights.DepartureFlightNumber,
                DepatureFlightDepatureDate: departureFlight.DepatureDate,
                DepatureFlightArrivalDate: departureFlight.ArrivalDate,
                DepatureFlightDepatureAirport: departureFlight.DepatureAirport,
                DepatureFlightArrivalAirport: departureFlight.ArrivalAirport,
                ArrivalFlightFlightNumber: flights.ArrivalFlightNumber,
                ArrivalFlightDepatureDate: arrivalFlight.DepatureDate,
                ArrivalFlightArrivalDate: arrivalFlight.ArrivalDate,
                ArrivalFlightDepatureAirport: arrivalFlight.DepatureAirport,
                ArrivalFlightArrivalAirport: arrivalFlight.ArrivalAirport,
                CabinClass: flights.CabinClass,
                Seats: flights.Seats,
                Price: flights.Price,
                ReservationNumber: flights.ReservationNumber};
      
  }

  res.send(result);
    
});

//to get the username
app.get('/user/:username', async (req,res)=>{
  const u = await Users.find({username : req.params.username});

  res.send(u[0]);
    
});

app.get('/allFlights', async(req, res)=> {
 
  const u = await Flight.find();
  console.log(u);
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
  var result = { state: false, type : 1 };
  Users.find({username:req.body.username, password:req.body.password})
  .then((user)=>{

      // console.log(user);
      if(user.length == 0)
      {
          res.send(result);
      }
      else
      {
        session.username=req.body.username;
        loggedIn = user[0].type;
        result.state = true;
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
        flightsReserved : [],
        flightsReservedDetails : []
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
        FirstSeats: req.body.firstSeats ,

        DepatureAirport: req.body.depatureAirport,
        ArrivalAirport: req.body.arrivalAirport,
        FreeEconomySeatsNum: req.body.economySeats,
        FreeBusinessSeatsNum: req.body.businessSeats,
        FreeFirstSeatsNum: req.body.firstSeats,

        EconomySeatPrice: req.body.economySeatPrice,
        BusinessSeatPrice: req.body.businessSeatPrice,
        FirstSeatPrice: req.body.firstSeatPrice,
        BaggageAllowance: req.body.baggageAllowance,

        
        IsBusinessSeatBusy: Array.from({ length:req.body.businessSeats }, ()=> false),
        IsEconomySeatBusy: Array.from({ length:req.body.economySeats }, ()=> false),  
        IsFirstSeatBusy: Array.from({ length:req.body.firstSeats }, ()=> false) ,
        BaggageAllowance: req.body.baggageAllowance 
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
   
   


        
    });

    app.put('/password/:username', async (req,res)=>{
      
      const username = req.params;
      const filter = req.params;
      var result = {status : false, response: ""};
      const u = await Users.find({username : session.username, password: req.body.oldPassword});
      console.log(u[0]== null);
      if(u[0] != null)
      {
        Users.findOneAndUpdate({username : session.username}, {password: req.body.newPassword}, {
          new: true,
        })
        .then((user)=>{
          result.status = true;
          console.log(result);
          res.send(result);
      }).catch((err) =>  res.send(result))
      }
      else
      {
        result.response = "Old Password is wrong";
        res.send(result);
      }
        
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

    app.delete('/reservation/:username',async (req,res)=>{
      const username = seesion.username;
      const flightNumber = parseInt(req.body.flightNumber);
      console.log(flightNumber);
      const u = await Users.find({username : req.params.username});
      const flights = u[0].flightsReserved;
      console.log(u[0]);
      const flightsReservedDetails = u[0].flightsReservedDetails;
      console.log("flightsReserved before: " + flights);
    console.log("flightsReservedDetails before: " + flightsReservedDetails);
      for (var i = 0; i < flights.length; i++) {
        if(flights[i]== flightNumber)
        {
          flights.splice(i,1)
          flightsReservedDetails.splice(i,1);
        }
    }
    console.log("flightsReserved: " + flights);
    console.log("flightsReservedDetails" + flightsReservedDetails);
      
      
      const filter = {flightsReserved : flights,flightsReservedDetails : flightsReservedDetails };
      console.log(filter);
      console.log(username);
      Users.findOneAndUpdate({username:username}, filter, {
        new: true,
      })
      .then((flight)=>{
        console.log("updated");
        res.send(true);
    }).catch((err) =>  res.send(false))
        
    });


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
///////////////////////////////////////////////////////////////////////////////////////////

app.get("/userCriteria", async(req,res)=>{
  res.send(userPreferredCriteria);
});

app.post("/userCriteria", async(req,res)=>{
  userPreferredCriteria=req.body;
});
app.post("/searchFlightUser",(req,res)=>{

    var isReturnFlight = req.body.isReturnFlight;
    var numberOfAdults=0;
    var numberOfChildren=0;
    var cabinClass = 'Economy Class';  
  Object.keys(req.body).forEach(key => {
    
    if(key == "NumberOfAdults" && (req.body[key]!==''))
    {
      numberOfAdults = parseInt(req.body[key]);
      delete req.body[key];
    }     
    if(key == "NumberOfChildren")
     {
       numberOfChildren = parseInt(req.body[key]);
       delete req.body[key];
     }    
     if(key == "CabinClass")
     {
       cabinClass = req.body[key];
       delete req.body[key];
     }    
     if(key == "isReturnFlight")
     {
       delete req.body[key];
     }    
    if (req.body[key]== '' && key != "NumberOfAdults" && key != "NumberOfChildren") {

      delete req.body[key];
    }
    else{
        if(key == 'DepatureDate' || key == 'ArrivalDate' )
          req.body[key] = dateConversionToMongose(req.body[key]);
      }
    })
    


  Flight.find(req.body).then((result)=>{
    for(var i=0; i<result.length; i++)
    {
      if(isReturnFlight==true)
      {
        if(!isDateTrue(result[i].departureDate,departureFlight.ArrivalDate))
        {
          result.splice(i,1);
          i--;
          continue;
        }
      }
      if(cabinClass=="Economy Class")
      {
        if(result[i].FreeEconomySeatsNum<(numberOfAdults+numberOfChildren))
         {
          result.splice(i,1);
          i--;
         } 
      }
      else if(cabinClass=="Business Class"){
        if(result[i].FreeBusinessSeatsNum<(numberOfAdults+numberOfChildren))
        {
          result.splice(i,1);
          i--;
        }
      }
      
     
    }
    searchResult=result;
    res.send(result);
}).catch((err) =>  console.log(err))
  });

  app.get("/flight",async(req,res)=>{
    if(session.username=="")
      res.send(false);
    else
    res.send(true);
  });

  isDateTrue("2002-10-10T16:00:00.000Z","2002-10-10T15:15:00.000Z");
function isDateTrue(departureDate, arrivalDate){
    var departureYear = "";
    var arrivalYear ="";
    for(let i=0;i<4; i++)
    {
        departureYear += departureDate.charAt(i);
        arrivalYear += arrivalDate.charAt(i);
    }
    departureYear = parseInt(departureYear);
    arrivalYear = parseInt(arrivalYear);

    var departureMonth = "";
    var arrivalMonth ="";
    for(let i=5;i<7; i++)
    {
        departureMonth += departureDate.charAt(i);
        arrivalMonth += arrivalDate.charAt(i);
    }
    departureMonth = parseInt(departureMonth);
    arrivalMonth = parseInt(arrivalMonth);

    var departureDay = "";
    var arrivalDay ="";

    for(let i=8;i<10; i++)
    {
        departureDay += departureDate.charAt(i);
        arrivalDay += arrivalDate.charAt(i);
    }
    departureDay = parseInt(departureDay);
    arrivalDay = parseInt(arrivalDay);

    var departureHour = "";
    var arrivalHour ="";

    for(let i=11;i<13; i++)
    {
        departureHour += departureDate.charAt(i);
        arrivalHour += arrivalDate.charAt(i);
    }
    departureHour = parseInt(departureHour);
    arrivalHour = parseInt(arrivalHour);


    var departureMin = "";
    var arrivalMin ="";

    for(let i=14;i<16; i++)
    {
        departureMin += departureDate.charAt(i);
        arrivalMin += arrivalDate.charAt(i);
    }
    departureMin = parseInt(departureMin);
    arrivalMin = parseInt(arrivalMin);


    const date2 = new Date(arrivalYear, arrivalMonth, arrivalDay, arrivalHour, arrivalMin);
    const date1 = new Date(departureYear,departureMonth,departureDay,departureHour,departureMin);
    var diff = date2.valueOf() - date1.valueOf();
    if(diff>=0)
        return true;
    else
        return false;
  }

    // Starting server
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
