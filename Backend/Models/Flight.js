const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  FlightNumber: {
    type: Number,
    unique:true,
    required: true,
  },
  DepatureDate: {
    type: Date,
    required: true
  },
  ArrivalDate:{
    type:Date,
    required: true
  },
  EconomySeats: {
    type: Number,
    required: true
  },
  BusinessSeats: {
    type: Number,
    required: true
  },
  DepatureAirport: {
    type: String,
    required: true
  },
  ArrivalAirport: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
