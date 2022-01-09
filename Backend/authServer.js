require('dotenv').config()
var session = require('express-session');

const port = process.env.PORT || "8080";


const express = require('express')
const mongoose = require('mongoose');
const app = express()
const jwt = require('jsonwebtoken')

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

const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const e = require("express");

const MongoURI = 'mongodb://Ziad:z@cluster0-shard-00-00.izp8e.mongodb.net:27017,cluster0-shard-00-01.izp8e.mongodb.net:27017,cluster0-shard-00-02.izp8e.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-jkas6k-shard-0&authSource=admin&retryWrites=true&w=majority' ;


const Users = require('./Models/Users');
app.use(express.json())

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));


let refreshTokens = []

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

app.post('/login', (req, res) => {
  // Authenticate User
    console.log("I am here");
    var result = { state: false, type : 1 };
    const username = req.body.username
    console.log(req.body.username);
    Users.find({username:req.body.username, password:req.body.password})
  .then((user)=>{ 
    console.log("I am here2");
      // console.log(user);
      if(user.length == 0)
      {
          res.send(result);
      }
      else
      {
        const user = {name: username}

        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken)
        res.json({ accessToken: accessToken, refreshToken: refreshToken })
        // var loggedIn = user[0].type;
        // result.state = true;
        // result.type = loggedIn;
        
        // res.send(result);
        // console.log(result);
      }
      //we need to create a session
      console.log("I am here2");

  }).catch((err) => console.log(err));
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

app.listen(8080)