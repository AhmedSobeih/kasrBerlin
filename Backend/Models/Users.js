const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//first name, last name, home address, country code, telephone number(s), email and passport number.

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  homeAddress: {
    type: String,
    required: true,
  },
  telephoneNumbers: {
    type: [String],
    required: true
  },
  email: {
    type: String,
    unique:true,
    required: true
  },
  passportNumber: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique:true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  //should include : the chosen cabin (Economy/ Business Class), the chosen seat and the total price paid for the entire ticket along with a confirmation/ booking number).
  flightsReserved: {
    type:[Number],
    required:true 
  },
 // [8,20]
  //["Economy",[110,112,113], price],[]
  // Economy   seats   price
  //Or business
  flightsReservedDetails:{
    type:[[]],
    required: true
  }

}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;
